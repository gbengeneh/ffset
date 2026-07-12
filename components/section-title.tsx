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
    <div className={`mb-6 flex max-w-2xl flex-col gap-2.5 md:mb-8 ${alignment}`}>
      <span className="eyebrow text-[0.68rem]">{eyebrow}</span>
      <h2 className="display-font text-[1.7rem] leading-[1.1] font-semibold text-white sm:text-[2rem] md:text-[2.5rem]">
        {title}
      </h2>
      <p className="text-[0.85rem] leading-6 text-[var(--muted)] sm:text-[0.92rem] sm:leading-7 md:text-base">
        {description}
      </p>
    </div>
  );
}
