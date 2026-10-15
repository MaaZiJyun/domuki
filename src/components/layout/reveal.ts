export type RevealDelay = 0 | 1 | 2 | 3 | 4 | 5;

const revealDelays: Record<RevealDelay, string> = {
  0: "delay-0",
  1: "delay-100",
  2: "delay-200",
  3: "delay-300",
  4: "delay-500",
  5: "delay-700",
};

export function revealClass(isReady: boolean, delay: RevealDelay = 0) {
  return `transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none ${
    isReady
      ? `translate-y-0 opacity-100 ${revealDelays[delay]}`
      : "translate-y-5 opacity-0"
  }`;
}

export function fadeClass(isReady: boolean, delay: RevealDelay = 0) {
  return `transition-opacity duration-700 ease-out motion-reduce:transition-none ${
    isReady ? `opacity-100 ${revealDelays[delay]}` : "opacity-0"
  }`;
}
