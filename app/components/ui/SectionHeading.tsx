interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      <h2
        className={`font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl tracking-wide ${
          light ? "text-white" : "text-dark"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg max-w-2xl ${align === "center" ? "mx-auto" : ""} ${
            light ? "text-white/80" : "text-neutral"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 h-1 w-16 rounded-full ${light ? "bg-primary-light" : "bg-primary"} ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
