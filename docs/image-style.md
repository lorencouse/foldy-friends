# Lifestyle photography: the style contract

The site's lifestyle pictures (real-looking kids and parents folding paper)
are drawn with Gemini's image model, `gemini-3.1-flash-image` ("Nano
Banana"), by `tools/gen-images.mjs`. The workflow is ported from Kouzr's
`tools/gen-mkt-images.mjs`. Read this before writing a subject.

| What                | Where                                                              |
| ------------------- | ------------------------------------------------------------------ |
| The generator       | `tools/gen-images.mjs`                                             |
| The contract itself | `CONTRACT` in that file; `node tools/gen-images.mjs --print-style` |
| The subjects        | `tools/images.json`, one entry per picture                         |
| Spend ledger        | `tools/.images-ledger.json` (gitignored)                           |
| Model originals     | `tools/.masters/` (gitignored; `FOLDY_MASTERS_DIR` overrides)      |
| Review draws        | `tools/.review/` (gitignored; `--review-dir` overrides)            |

The contract is joined to every subject at draw time. A subject never
restates it; to change the look, change `CONTRACT` and the set moves together.

## What the pictures are

Candid, natural-light documentary photographs of real families, not stock and
not AI-glossy:

- Real children of about 5 to 12, and their ordinary parents, with varied
  backgrounds across the set. Natural skin texture, untidy hair, creased
  everyday clothes, real expressions caught mid-moment. Nobody poses for the
  camera unless the subject asks.
- Real homes and classrooms: a kitchen table, a living-room floor, a
  bedside lamp, ordinary clutter.
- Simple generic origami (cranes, fox and dog faces, frogs, boats) in plain
  coloured squares, with visible creases, the white reverse showing, and the
  small imperfections of a child's folding.
- Warm, soft colour that sits with the site: cream and off-white rooms, warm
  wood, soft navy, and the bright colour coming only from the paper in the
  origami-sheet accents (tomato, sunshine, sky, mint, blush; midnight for a
  Moon Dreamers bedtime scene).

## Never in the pixels

- **No Foldy products.** No kits, paper packs, glue, boxes or anything that
  could be read as what the shop sells. An AI picture of a product can show
  details a customer will not get; product photos are real photographs.
- No text, letters, numbers, logos, labels, brand packaging or watermarks.
  The model cannot spell, and a book or sheet in frame is blank.
- No screens showing anything.

## Writing a subject

The model holds a quality bound to a named thing and ignores one stated in
the abstract. Bind what must be present rather than only banning what must
not. A subject that works names, in order:

1. **Who, and how they are seen**: age, look, where they sit in the frame,
   the camera's height.
2. **What each wears**, in plain words.
3. **What their hands are doing.** This is the picture: pinching a wing
   point, pressing a crease, holding out a finished dog.
4. **The paper**: which model, which colour, how finished.
5. **The room and the light**, and the incidental life on the table.
6. **The cast count**: "There are exactly two people in the picture." Without
   it the model adds a third.

Vary ages, backgrounds, which parent appears and the camera angle across a
set, and give each placement the aspect it is shown at (`aspect` in the
manifest: 3:2, 4:3, 16:9 and so on).

## What to check on every frame

The model's usual failures for this kind of picture. Look for them at full
size before approving anything:

- **Hands**: extra, missing or fused fingers; a finger with too many joints;
  a third hand; a hand that grows out of the wrong arm.
- **Paper**: paper melting into a hand or the table, folding like fabric,
  impossible folds, a model that is not any recognisable animal, the same
  crane cloned across the table.
- **Faces**: uncanny glassy eyes, identical perfect teeth, waxy or plastic
  skin, cloned faces, everyone smiling at the camera.
- **Glossiness**: airbrushed skin, studio rim light, HDR colour, heavy bokeh.
  These are what made the 2023 pictures read as fake.
- **Text and products**: any letters or logos, any box or packaging.
- **Scene**: warped furniture, a ghost second copy of an object, more people
  than the subject asked for.

## Workflow and spending

    node tools/gen-images.mjs --dry-run --review --review-dir <dir> a b c d   # free: prices it
    node tools/gen-images.mjs --batch --review --review-dir <dir> a b c d     # draws + _contact-sheet.jpg
    node tools/gen-images.mjs --batch-collect --review-dir <dir>              # if the wait was cut short
    node tools/gen-images.mjs --promote --review-dir <dir> a b                # approved draws -> public/<out>.webp, free

- Nothing draws without the captain's approval for that batch: how many, what
  for, and the estimated cost. Draw a few, look, then decide; a test sheet
  comes before any live batch, and approval to draw is never approval to ship.
- **Batch API only.** Same model at half the price; there is no interactive
  path in the script. A batch normally returns in minutes, but Google allows
  up to 24 hours. The state file is written before the wait, so a killed run
  is collected with `--batch-collect`, never resubmitted.
- **Price from measured tokens, not the price list.** Google documents 1,680
  output tokens for a 2K picture; Kouzr's 2K batch calls in November 2026
  billed 2,080 to 2,529. At $30 per 1M batch output tokens that is about
  $0.076 a picture worst case, not $0.050. The estimate uses the worst case,
  and the ledger records what Google actually counted.
- `--max-usd` (default $0.50) refuses any batch whose estimate is over it.
- Draw into a review dir, look at every frame, then `--promote` only the
  approved ones; promoting costs nothing and never redraws.
- Existing files are never redrawn without `--force`; a forced review redraw
  parks the old frame in `<review-dir>/_superseded/`.
- Draw at the size the placement needs. `width` and `height` in the manifest
  are the WebP written to `public/`; 2K is right for full-width pictures, 1K
  for anything shown in a small box.
