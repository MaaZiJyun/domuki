import katex from "katex";

type MathFormulaProps = {
  children: string;
  display?: boolean;
};

export default function MathFormula({ children, display = false }: MathFormulaProps) {
  const markup = katex.renderToString(children, {
    displayMode: display,
    throwOnError: false,
    output: "htmlAndMathml",
  });

  if (display) {
    return (
      <div
        className="my-6 overflow-x-auto py-2 text-center text-[clamp(16px,2.2vw,21px)]"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    );
  }

  return (
    <span
      className="whitespace-nowrap"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
