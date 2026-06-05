import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

export default function Section({ children, className = "", innerClassName = "" }: SectionProps) {
  return (
    <section className={`px-5 py-20 md:px-8 md:py-28 ${className}`}>
      <div className={`mx-auto max-w-7xl ${innerClassName}`}>{children}</div>
    </section>
  );
}
