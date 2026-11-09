import { GluePen, Moon, Panda, PaperStack } from "@/components/menagerie";
import { PageBanner } from "@/components/page-banner";
import { TapedPhoto } from "@/components/taped-photo";
import type { Category } from "@/lib/categories";

/** A lifestyle photo taped into the banner, with the paper art as a sticker on its corner. */
type BannerPhoto = {
  src: string;
  alt: string;
  position: string;
  tape: string;
  sticker: React.ReactNode;
  /** A portrait original is shown square, and smaller, rather than cropped wide. */
  square?: boolean;
};

const BANNERS: Record<
  "all" | Category,
  { tone: string; ink: string; dark?: boolean } & ({ art: React.ReactNode } | { photo: BannerPhoto })
> = {
  all: {
    tone: "var(--color-mint-pale)",
    ink: "#2E5E4E",
    photo: {
      src: "/images/child-choosing-origami-paper.webp",
      alt: "A girl choosing a sheet of yellow origami paper from a fan of coloured squares on a wooden table",
      position: "80% 50%",
      tape: "var(--color-blush)",
      sticker: <Panda className="w-full" />,
    },
  },
  paper: {
    tone: "var(--color-sky-pale)",
    ink: "#2F4F75",
    photo: {
      src: "/images/kids-folding-origami-classroom.webp",
      alt: "Three children folding paper boats and cranes together at a classroom table",
      position: "50% 45%",
      tape: "var(--color-sun)",
      sticker: <PaperStack colors={["#F2A0B5", "#F6B93B", "#FFFDF8", "#3FB58E"]} className="w-full" />,
    },
  },
  tools: {
    tone: "var(--color-sun-pale)",
    ink: "#6B4E12",
    art: <GluePen colors={["#F2A0B5", "#5B9BE0", "#D23F2C"]} className="w-36 sm:w-44" />,
  },
  kits: {
    tone: "var(--color-midnight)",
    ink: "#D9DEEE",
    dark: true,
    photo: {
      src: "/images/grandmother-and-boy-folding-frogs.webp",
      alt: "A grandmother watching her grandson fold a blue paper frog on the living-room rug",
      position: "50% 60%",
      tape: "var(--color-sky)",
      sticker: <Moon fill="#F6B93B" sheen className="w-full" />,
      square: true,
    },
  },
};

export function ShopBanner({
  category,
  eyebrow,
  title,
  blurb,
}: {
  category?: Category;
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  const b = BANNERS[category ?? "all"];
  return (
    <PageBanner tone={b.tone} ink={b.ink} dark={b.dark} eyebrow={eyebrow} title={title} blurb={blurb}>
      {"photo" in b ? (
        <TapedPhoto
          src={b.photo.src}
          alt={b.photo.alt}
          priority
          sizes={b.photo.square ? "300px" : "(min-width: 768px) 460px, 90vw"}
          aspect={b.photo.square ? "aspect-square" : "aspect-[2/1] sm:aspect-[16/9]"}
          objectPosition={b.photo.position}
          tapes={[{ color: b.photo.tape, className: "-top-3 left-[40%] -rotate-3" }]}
          className={`${b.photo.square ? "max-w-[240px] flex-[1_1_220px] sm:max-w-[300px]" : "max-w-[460px] flex-[1_1_280px]"} relative rotate-[1.5deg] p-2.5 shadow-[0_20px_34px_-22px_rgba(31,42,68,.55)] sm:p-3`}
        >
          <span
            aria-hidden="true"
            className="absolute -bottom-5 -left-5 w-16 -rotate-6 sm:-bottom-6 sm:-left-7 sm:w-22"
            style={{ filter: "drop-shadow(0 6px 6px rgba(31,42,68,.22))" }}
          >
            {b.photo.sticker}
          </span>
        </TapedPhoto>
      ) : (
        <div className="flex items-end gap-2.5" aria-hidden="true">
          {b.art}
        </div>
      )}
    </PageBanner>
  );
}
