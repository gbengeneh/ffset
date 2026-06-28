type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`mb-10 flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="display-font text-4xl leading-tight font-semibold text-white md:text-5xl">
        {title}
      </h2>
      <p className="text-base leading-8 text-[var(--muted)] md:text-lg">{description}</p>
    </div>
  );
}
