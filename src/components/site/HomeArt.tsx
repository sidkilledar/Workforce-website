import Image from "next/image";

/** Original editorial illustrations. Dimensions reserve space; labels stay in HTML. */
export const homeArt = {
  operationWide: { src: "/art/operation-wide.webp", width: 2400, height: 1280 },
  operationMobile: { src: "/art/operation-mobile.webp", width: 1000, height: 1250 },
  adoption: { src: "/art/adoption.webp", width: 2400, height: 1000 },
  handbook: { src: "/art/handbook.webp", width: 1200, height: 1000 },
  restaurants: { src: "/art/restaurants.webp", width: 1200, height: 800 },
  catering: { src: "/art/catering.webp", width: 1200, height: 800 },
  campus: { src: "/art/campus.webp", width: 1200, height: 800 },
};

export type ArtName = keyof typeof homeArt;

export function ArtSlot({ name, className }: { name: ArtName; className?: string }) {
  const { src, width, height } = homeArt[name];
  const sizes = {
    operationWide: "(min-width: 1280px) 1200px, 100vw",
    operationMobile: "(min-width: 520px) 480px, calc(100vw - 40px)",
    adoption: "(min-width: 1280px) 1200px, 100vw",
    handbook: "(min-width: 1024px) 600px, 100vw",
    restaurants: "(min-width: 720px) 33vw, calc(100vw - 40px)",
    catering: "(min-width: 720px) 33vw, calc(100vw - 40px)",
    campus: "(min-width: 720px) 33vw, calc(100vw - 40px)",
  }[name];
  return (
    <div
      className={`straw-art ${className ?? ""}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      data-art={name}
      aria-hidden="true"
    >
      {src ? (
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          sizes={sizes}
          loading="lazy"
        />
      ) : null}
    </div>
  );
}
