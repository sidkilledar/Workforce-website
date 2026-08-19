/** Cascading word-by-word reveal for headlines, honoring reduced-motion via the global stylesheet. */
export function RevealText({
  text,
  delayStep = 45,
  baseDelay = 0,
}: {
  text: string;
  delayStep?: number;
  baseDelay?: number;
}) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.15em]">
          <span
            className="animate-fade-up inline-block"
            style={{ animationDelay: `${baseDelay + index * delayStep}ms` }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </>
  );
}
