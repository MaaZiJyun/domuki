import { Fragment, type ReactNode } from "react";

type ProcessStep = {
  number: string;
  title: string;
  detail: ReactNode;
};

export default function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max items-stretch" role="list">
        {steps.map((step, index) => (
          <Fragment key={step.number}>
            <div
              className="flex w-[clamp(150px,18vw,180px)] shrink-0 flex-col border border-current/15 p-4"
              role="listitem"
            >
              <span className="text-[9px] tracking-[0.16em] opacity-55">{step.number}</span>
              <p className="my-1 font-semibold">{step.title}</p>
              <div className="mt-auto pt-2 text-sm leading-6 opacity-75">{step.detail}</div>
            </div>

            {index < steps.length - 1 && (
              <div
                className="flex w-8 shrink-0 items-center justify-center opacity-35"
                aria-hidden="true"
              >
                <span className="h-px w-4 bg-current" />
                <span className="-ml-1 border-y-[4px] border-l-[6px] border-y-transparent border-l-current" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
