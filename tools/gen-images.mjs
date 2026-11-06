/**
 * Draws the site's lifestyle photographs with Gemini's image model
 * ("Nano Banana"), through the Batch API only, against one style contract.
 * A trimmed port of Kouzr's tools/gen-mkt-images.mjs.
 *
 *   node tools/gen-images.mjs --dry-run --review a b c d        # free: prices the batch, draws nothing
 *   node tools/gen-images.mjs --batch --review a b c d          # draws into the review dir + a contact sheet
 *        ...--review-dir <path> picks the review dir (default tools/.review)
 *   node tools/gen-images.mjs --batch a b                       # draws into public/ (entries with an `out`)
 *   node tools/gen-images.mjs --batch --force a                 # redraw one that exists
 *   node tools/gen-images.mjs --batch-collect                   # pick up a batch this process stopped waiting on
 *   node tools/gen-images.mjs --sheet a b c d                   # retile the contact sheet, free
 *   node tools/gen-images.mjs --promote a b                     # approved review draws -> public/<out>.webp, free
 *   node tools/gen-images.mjs --print-style                     # the contract every prompt is joined to
 *   node tools/gen-images.mjs --list-models                     # what the key can reach
 *
 * Every draw is billed, so nothing draws without the captain's go for that
 * batch. Read docs/image-style.md before writing a subject.
 *
 * - Drawing is always the Batch API: half the interactive price, and it
 *   waits. There is no interactive path in this script on purpose.
 * - A batch whose estimate is over --max-usd (default $0.50) is refused
 *   before anything is sent.
 * - Existing files are never redrawn without --force. A forced review redraw
 *   moves the old copy to <review>/_superseded/ first.
 * - The spend ledger is tools/.images-ledger.json (gitignored). It records
 *   the token counts Google returns, and prices them, so the spend is a fact.
 * - Output goes through sharp: WebP at the width and height the placement
 *   needs, never enlarged. The model's own bytes are kept as the master
 *   (FOLDY_MASTERS_DIR, default tools/.masters) so a re-crop costs nothing.
 *
 * GEMINI_API_KEY comes from the environment or the repo's gitignored .env.
 * sharp comes in with next (`npm ci`).
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = join(ROOT, "tools/images.json");
const LEDGER = join(ROOT, "tools/.images-ledger.json");
const MASTERS = process.env.FOLDY_MASTERS_DIR || join(ROOT, "tools/.masters");
const DEFAULT_REVIEW = process.env.FOLDY_REVIEW_DIR || join(ROOT, "tools/.review");

const MODEL = process.env.FOLDY_IMAGE_MODEL || "gemini-3.1-flash-image";
// v1, not v1beta: the 3.x image models 404 (with an empty body) on v1beta
// for generateContent. The batch endpoints are tried on v1 then v1beta.
const API = "https://generativelanguage.googleapis.com/v1";

// Pricing. Google bills image output per token: $60 per 1M interactive,
// $30 per 1M through the Batch API; input is $0.50 / $0.25 per 1M.
// Google documents 1,120 tokens for a 1K picture and 1,680 for 2K, but
// Kouzr's own 2K batch calls in November 2026 came back at 2,080 to 2,529
// output tokens (median 2,353). Estimates use the measured worst case, not
// the documented figure, so a cap holds. 1K is scaled by the same ratio
// until one is measured here; the ledger shows what each call really cost.
const OUT_USD_PER_TOKEN = { batch: 30 / 1e6 };
const IN_USD_PER_TOKEN = { batch: 0.25 / 1e6 };
const EST_OUT_TOKENS = { "0.5K": 1130, "1K": 1690, "2K": 2530, "4K": 3800 };
const EST_IN_TOKENS = 1200;
const estUsd = (size) =>
  EST_OUT_TOKENS[size] * OUT_USD_PER_TOKEN.batch + EST_IN_TOKENS * IN_USD_PER_TOKEN.batch;
const usageUsd = (u) =>
  ((u.out || 0) + (u.thoughts || 0)) * OUT_USD_PER_TOKEN.batch + (u.in || 0) * IN_USD_PER_TOKEN.batch;

// A batch result is read into memory whole; at roughly 8MB of base64 per
// 2K picture this keeps it far below V8's ~537MB string cap.
const MAX_JOBS = 20;

/**
 * The style contract. It is joined to every subject at draw time, so a
 * subject never restates it; change it here and the whole set moves
 * together. Written as construction (what is in the frame, bound to named
 * things) rather than adjectives, because the model holds a quality bound to
 * an object and ignores one stated in the abstract.
 */
const CONTRACT = `A candid documentary photograph, taken by a parent or a family photographer on a full-frame camera with a 35mm or 50mm lens, available light only. It is an ordinary moment in a real family's week, caught while it happens, not a staged shoot and not a stock photo.

Light: soft daylight from a window to one side, or warm lamp light in the evening. Gentle natural shadows, true-to-life white balance, a little fine film grain. No studio lighting, no rim light, no glow, no lens flare, no HDR, no heavy background blur and no bokeh balls; the background is softly out of focus but still readable as a room.

People: real children between about five and twelve and their ordinary parents, with varied ethnic backgrounds across the set. Real, untouched skin with visible texture, pores, freckles or a little redness; nobody is airbrushed or glossy. Hair is a bit untidy, flyaways and a crooked parting. They wear everyday clothes with small creases: a faded t-shirt, a knit jumper, pyjamas, a cardigan with pushed-up sleeves. Faces are asymmetrical and individual, expressions are natural and in the moment: concentrating, mid-laugh, pleased with themselves. Nobody poses or looks into the camera unless the subject says so. Every person has exactly two hands and every hand has exactly four fingers and one thumb, with real knuckles and short, unpolished nails; children's hands are small and soft.

Paper: plain square sheets of thin matte origami paper, each sheet one solid colour on one side and white on the other, about 15cm across. The folded models are simple and generic: a crane, a fox face, a jumping frog, a boat, a dog face. Each has sharp visible crease lines, slightly uneven edges, the white reverse showing at the folds, and the small imperfections of a child's folding. Paper is always paper: it has a thin edge, it casts a small shadow, it never bends like fabric and never merges into a hand or the table.

Places: lived-in real homes and classrooms with ordinary clutter: a wooden kitchen table with a mug and a pencil on it, a rug on a living-room floor with a sofa behind, a bedside lamp. Nothing is styled for a catalogue.

Colour: warm and soft. Rooms sit in cream, off-white, warm wood and soft navy. The bright colour in the frame comes only from the paper: tomato red, sunshine yellow, sky blue, mint green and blush pink. Nothing is oversaturated.

Never in the picture: any text, letters, numbers, logos, brand names, labels, watermarks or printed instructions; any product packaging, boxes, kits, paper packs, glue bottles or craft-shop products; screens showing anything. If a book or sheet of paper is visible, its surface is blank.

Avoid the known failures of AI pictures: extra or fused fingers, a hand with too many joints, paper melting into skin, plastic or waxy skin, uncanny glassy eyes, identical perfect teeth, everyone smiling at the camera, cloned faces, warped furniture, a second ghost copy of an object.`;

function apiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const envFile = join(ROOT, ".env");
  if (!existsSync(envFile)) return null;
  const line = readFileSync(envFile, "utf8")
    .split("\n")
    .find((l) => /^\s*GEMINI_API_KEY\s*=/.test(l));
  return line
    ? line
        .split("=")
        .slice(1)
        .join("=")
        .trim()
        .replace(/^["']|["']$/g, "") || null
    : null;
}

const readJson = (path, fallback) => (existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : fallback);
const stamp = () => new Date().toISOString().replace(/[-:]/g, "").slice(0, 15);

function argValue(args, flag) {
  const i = args.indexOf(flag);
  if (i === -1) return null;
  const v = args[i + 1];
  if (!v || v.startsWith("--")) throw new Error(`${flag} needs a value`);
  args.splice(i, 2);
  return v;
}

/** One request body. The prompt is the subject first, then the contract. */
function requestFor(entry) {
  return {
    contents: [{ role: "user", parts: [{ text: `${entry.prompt.trim()}\n\nStyle: ${CONTRACT}` }] }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: entry.aspect || "3:2", imageSize: entry.size || "2K" },
    },
  };
}

/** GET or POST against v1, falling back to v1beta only on a 404. */
async function call(key, path, body) {
  let last;
  for (const base of [API, API.replace("/v1", "/v1beta")]) {
    const res = await fetch(`${base}${path}`, {
      method: body ? "POST" : "GET",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const text = await res.text();
    if (res.ok) return JSON.parse(text);
    if (res.status === 429 && /prepayment credits/i.test(text)) {
      throw new Error("out of AI Studio credits: top up at https://ai.studio/projects");
    }
    last = `${res.status} ${text.slice(0, 400)}`;
    if (res.status !== 404) break;
  }
  throw new Error(last);
}

async function listModels(key) {
  const body = await call(key, "/models?pageSize=200");
  for (const m of body.models || []) console.log(m.name.replace("models/", ""));
}

/** Where a job's files go. Review jobs keep the model's bytes only. */
function jobFor(entry, reviewDir) {
  const size = entry.size || "2K";
  const reviewFile = reviewDir ? join(reviewDir, `${entry.slug}.jpeg`) : null;
  const dest = entry.out ? join(ROOT, "public", `${entry.out}.webp`) : null;
  return { slug: entry.slug, entry, size, reviewFile, dest, master: join(MASTERS, `${entry.slug}.jpeg`) };
}

async function writeWebp(buf, dest, width, height) {
  mkdirSync(dirname(dest), { recursive: true });
  await sharp(buf)
    .resize(width, height, { fit: "cover", position: "centre", withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(dest);
}

/** One finished picture, put where it belongs and recorded once. */
async function deliver(job, buf, usage, ledger, batchName) {
  if (job.reviewFile) {
    mkdirSync(dirname(job.reviewFile), { recursive: true });
    writeFileSync(job.reviewFile, buf);
  } else {
    mkdirSync(dirname(job.master), { recursive: true });
    writeFileSync(job.master, buf);
    await writeWebp(buf, job.dest, job.entry.width, job.entry.height);
  }
  const usd = usage.out ? usageUsd(usage) : estUsd(job.size);
  ledger.calls.push({
    at: new Date().toISOString(),
    slug: job.slug,
    model: MODEL,
    size: job.size,
    batch: batchName,
    usage,
    usd,
  });
  ledger.images += 1;
  ledger.usd = Number((ledger.usd + usd).toFixed(4));
  writeFileSync(LEDGER, `${JSON.stringify(ledger, null, 2)}\n`);
  return usd;
}

// One state file per batch, written BEFORE anything is waited on, so a
// killed process comes back with --batch-collect instead of paying for the
// same pictures twice.
const stateDir = (reviewDir) => reviewDir || join(ROOT, "tools/.batches");
const stateFile = (dir, name) => join(dir, `_batch-${String(name).split("/").pop()}.json`);

async function submit(key, jobs, reviewDir) {
  const requests = jobs.map((j) => ({ request: requestFor(j.entry), metadata: { key: j.slug } }));
  const job = await call(key, `/models/${MODEL}:batchGenerateContent`, {
    batch: { display_name: `foldy-${stamp()}`, input_config: { requests: { requests } } },
  });
  if (!job.name) throw new Error(`batch created with no name: ${JSON.stringify(job).slice(0, 300)}`);
  const dir = stateDir(reviewDir);
  mkdirSync(dir, { recursive: true });
  const file = stateFile(dir, job.name);
  writeFileSync(
    file,
    `${JSON.stringify({ name: job.name, at: new Date().toISOString(), reviewDir, slugs: jobs.map((j) => j.slug) }, null, 2)}\n`,
  );
  console.log(`batch ${job.name} submitted, ${jobs.length} image(s); state in ${file}`);
  return { name: job.name, file };
}

/** Rows of a finished batch, whichever nesting the server used. */
function rowsOf(job) {
  const r = job.response || job;
  const list = r.inlinedResponses?.inlinedResponses || r.inlinedResponses || [];
  return Array.isArray(list) ? list : [];
}

function imageFrom(res) {
  const parts = res?.candidates?.[0]?.content?.parts || [];
  const img = parts.find((p) => p.inlineData?.data);
  const u = res?.usageMetadata || {};
  const usage = {
    in: u.promptTokenCount,
    out: u.candidatesTokenCount,
    thoughts: u.thoughtsTokenCount,
    total: u.totalTokenCount,
  };
  if (!img) {
    const why = res?.candidates?.[0]?.finishReason || res?.promptFeedback?.blockReason || "no image";
    return { error: `${why}: ${JSON.stringify(res).slice(0, 300)}`, usage };
  }
  return { buf: Buffer.from(img.inlineData.data, "base64"), usage };
}

async function collect(key, name, file, jobs, ledger) {
  const bySlug = new Map(jobs.map((j) => [j.slug, j]));
  const limit = Number(process.env.FOLDY_BATCH_WAIT || 3600);
  let waited = 0;
  for (;;) {
    const s = await call(key, `/${name}?fields=name,done,error`);
    if (s.done && s.error) throw new Error(`batch failed: ${JSON.stringify(s.error).slice(0, 400)}`);
    if (s.done) break;
    if (waited >= limit) {
      console.log(
        `\nstill running after ${Math.round(waited / 60)}min; it keeps going. Collect it with --batch-collect`,
      );
      return false;
    }
    const gap = waited < 60 ? 10 : waited < 600 ? 30 : 60;
    await new Promise((r) => setTimeout(r, gap * 1000));
    waited += gap;
    process.stdout.write(`\r  waiting, ${Math.round(waited / 60)}min ...   `);
  }
  console.log("\n  done, downloading the result");
  const result = await call(key, `/${name}?fields=response`);
  const rows = rowsOf(result);
  let ok = 0;
  let spent = 0;
  const seen = new Set();
  for (const [i, row] of rows.entries()) {
    const slug = row.metadata?.key || jobs[i]?.slug;
    if (seen.has(slug)) continue;
    seen.add(slug);
    const job = bySlug.get(slug);
    if (!job) {
      console.log(`no job for ${slug}`);
      continue;
    }
    if (row.error) {
      console.log(`${slug} FAILED: ${JSON.stringify(row.error).slice(0, 300)}`);
      continue;
    }
    const got = imageFrom(row.response);
    if (got.error) {
      console.log(`${slug} FAILED: ${got.error}`);
      continue;
    }
    const usd = await deliver(job, got.buf, got.usage, ledger, name);
    spent += usd;
    ok += 1;
    console.log(
      `${slug}  tokens in ${got.usage.in} out ${got.usage.out}${got.usage.thoughts ? ` thoughts ${got.usage.thoughts}` : ""}  $${usd.toFixed(4)}`,
    );
  }
  renameSync(file, `${file}.done`);
  console.log(`batch done: ${ok}/${jobs.length} drawn, about $${spent.toFixed(4)} by Google's token counts`);
  if (!rows.length)
    console.log(`no rows found in the result; its top-level keys were: ${Object.keys(result).join(", ")}`);
  return true;
}

/** A labelled grid of the review originals, two across. */
async function contactSheet(entries, reviewDir) {
  const cellW = 1000;
  const bar = 52;
  const gap = 16;
  const tiles = [];
  for (const e of entries) {
    const f = join(reviewDir, `${e.slug}.jpeg`);
    if (!existsSync(f)) continue;
    const img = sharp(f).resize({ width: cellW });
    const buf = await img.jpeg({ quality: 90 }).toBuffer();
    const { height } = await sharp(buf).metadata();
    tiles.push({ slug: e.slug, buf, h: height });
  }
  if (!tiles.length) return null;
  const cols = Math.min(2, tiles.length);
  const rows = Math.ceil(tiles.length / cols);
  const rowH = [];
  for (let r = 0; r < rows; r += 1)
    rowH.push(Math.max(...tiles.slice(r * cols, r * cols + cols).map((t) => t.h)) + bar);
  const width = cols * cellW + (cols + 1) * gap;
  const height = rowH.reduce((a, b) => a + b + gap, gap);
  const layers = [];
  let top = gap;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const t = tiles[r * cols + c];
      if (!t) continue;
      const left = gap + c * (cellW + gap);
      layers.push({ input: t.buf, left, top });
      const label = Buffer.from(
        `<svg width="${cellW}" height="${bar}" xmlns="http://www.w3.org/2000/svg"><text x="4" y="34" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="700" fill="#1f2a44">${r * cols + c + 1}. ${t.slug}</text></svg>`,
      );
      layers.push({ input: label, left, top: top + t.h });
    }
    top += rowH[r] + gap;
  }
  const dest = join(reviewDir, "_contact-sheet.jpg");
  await sharp({ create: { width, height, channels: 3, background: "#f6f0e2" } })
    .composite(layers)
    .jpeg({ quality: 88 })
    .toFile(dest);
  return dest;
}

async function main() {
  const args = process.argv.slice(2);
  const reviewDirFlag = argValue(args, "--review-dir");
  const maxUsd = Number(argValue(args, "--max-usd") ?? 0.5);
  if (!Number.isFinite(maxUsd) || maxUsd < 0) throw new Error("--max-usd needs a dollar amount like 0.5");
  const flags = new Set(args.filter((a) => a.startsWith("--")));
  const wanted = args.filter((a) => !a.startsWith("--"));
  const review = flags.has("--review");
  const reviewDir = review ? resolve(reviewDirFlag || DEFAULT_REVIEW) : null;
  const force = flags.has("--force");
  const dryRun = flags.has("--dry-run");

  if (flags.has("--print-style")) return console.log(CONTRACT);
  const manifest = readJson(MANIFEST, { images: [] });
  const ledger = readJson(LEDGER, { calls: [], images: 0, usd: 0 });
  const unknown = wanted.filter((s) => !manifest.images.some((e) => e.slug === s));
  if (unknown.length) throw new Error(`not in tools/images.json: ${unknown.join(", ")}`);

  if (flags.has("--sheet")) {
    const dir = resolve(reviewDirFlag || DEFAULT_REVIEW);
    const picked = manifest.images.filter((e) => !wanted.length || wanted.includes(e.slug));
    console.log((await contactSheet(picked, dir)) || "no review files to tile");
    return;
  }

  // --promote takes approved review originals live: the model's bytes become
  // the master and the WebP is written to public/<out>.webp. Nothing is drawn.
  if (flags.has("--promote")) {
    if (!wanted.length) throw new Error("--promote needs the slugs to take live");
    const dir = resolve(reviewDirFlag || DEFAULT_REVIEW);
    for (const entry of manifest.images.filter((e) => wanted.includes(e.slug))) {
      const job = jobFor(entry, null);
      const src = join(dir, `${entry.slug}.jpeg`);
      if (!job.dest) throw new Error(`${entry.slug} has no "out" path to promote to`);
      if (!existsSync(src)) throw new Error(`${entry.slug}: nothing in ${dir} to promote`);
      if (existsSync(job.dest) && !force) {
        console.log(`${entry.slug}: ${job.dest} exists, skipped (--force to replace)`);
        continue;
      }
      const buf = readFileSync(src);
      mkdirSync(dirname(job.master), { recursive: true });
      writeFileSync(job.master, buf);
      await writeWebp(buf, job.dest, entry.width, entry.height);
      console.log(`${entry.slug} -> ${job.dest.replace(`${ROOT}/`, "")}`);
    }
    return;
  }

  const key = apiKey();
  if (flags.has("--list-models")) {
    if (!key) throw new Error("GEMINI_API_KEY not set (repo .env or the environment)");
    return listModels(key);
  }

  if (flags.has("--batch-collect")) {
    if (!key) throw new Error("GEMINI_API_KEY not set (repo .env or the environment)");
    const dir = reviewDirFlag ? resolve(reviewDirFlag) : stateDir(null);
    const files = existsSync(dir) ? readdirSync(dir).filter((f) => /^_batch-[\w-]+\.json$/.test(f)) : [];
    if (!files.length) throw new Error(`no batch waiting in ${dir} (pass --review-dir for a review batch)`);
    for (const f of files) {
      const saved = readJson(join(dir, f), null);
      const entries = manifest.images.filter((e) => saved.slugs.includes(e.slug));
      const jobs = entries.map((e) => jobFor(e, saved.reviewDir));
      console.log(`collecting ${saved.name}, submitted ${saved.at}`);
      if ((await collect(key, saved.name, join(dir, f), jobs, ledger)) && saved.reviewDir) {
        console.log(await contactSheet(entries, saved.reviewDir));
      }
    }
    return;
  }

  if (!wanted.length)
    throw new Error("name the slugs to draw (see tools/images.json); nothing draws by default");

  const jobs = [];
  const superseded = [];
  for (const entry of manifest.images.filter((e) => wanted.includes(e.slug))) {
    const job = jobFor(entry, reviewDir);
    if (!review && !job.dest)
      throw new Error(`${entry.slug} has no "out" path, so it can only be drawn with --review`);
    const target = review ? job.reviewFile : job.dest;
    if (existsSync(target) && !force) {
      console.log(`${entry.slug}: exists, skipped (--force to redraw)`);
      continue;
    }
    if (review && existsSync(target)) superseded.push(job);
    jobs.push(job);
  }

  if (!jobs.length) {
    console.log("nothing to draw");
    if (review)
      console.log(
        (await contactSheet(
          manifest.images.filter((e) => wanted.includes(e.slug)),
          reviewDir,
        )) || "",
      );
    return;
  }
  if (jobs.length > MAX_JOBS)
    throw new Error(`${jobs.length} jobs; split it into batches of ${MAX_JOBS} or fewer`);

  const bySize = {};
  for (const j of jobs) bySize[j.size] = (bySize[j.size] || 0) + 1;
  const tally = Object.entries(bySize)
    .map(([s, n]) => `${n}x ${s}`)
    .join(", ");
  const cost = jobs.reduce((n, j) => n + estUsd(j.size), 0);
  console.log(
    `${jobs.length} image(s) at ${tally}, via the Batch API (50% off), estimated up to $${cost.toFixed(2)}`,
  );
  for (const j of jobs)
    console.log(
      `  ${j.slug}  ${j.entry.aspect || "3:2"}  ${j.size}  ~$${estUsd(j.size).toFixed(3)}  -> ${j.reviewFile || j.dest}`,
    );
  console.log(`spent so far (ledger): ${ledger.images} image(s), about $${ledger.usd.toFixed(2)}`);
  if (cost > maxUsd) {
    throw new Error(
      `refused: the estimate $${cost.toFixed(2)} is over the cap of $${maxUsd.toFixed(2)} (--max-usd to change it)`,
    );
  }
  if (dryRun) return;
  if (!flags.has("--batch"))
    throw new Error("drawing goes through the Batch API only: add --batch to submit");
  if (!key) throw new Error("GEMINI_API_KEY not set (repo .env or the environment)");

  // A forced review redraw keeps the frame it replaces, moved aside only once
  // nothing can refuse the run.
  for (const j of superseded) {
    const kept = join(reviewDir, "_superseded", `${j.slug}-${stamp()}.jpeg`);
    mkdirSync(dirname(kept), { recursive: true });
    renameSync(j.reviewFile, kept);
  }
  const { name, file } = await submit(key, jobs, reviewDir);
  if ((await collect(key, name, file, jobs, ledger)) && review) {
    console.log(
      await contactSheet(
        jobs.map((j) => j.entry),
        reviewDir,
      ),
    );
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
