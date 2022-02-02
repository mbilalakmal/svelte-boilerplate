export const convertSpanToRanges = (
  start: number,
  end: number,
  step: number
) => {
  const first = Math.ceil(start / step);
  const last = Math.ceil(end / step);
  const ranges = Array.from(
    new Array(last - first + 1),
    (_, i) => (i + first) * step
  );
  return ranges;
};

export const convertValueToRange = (value: number, step: number) =>
  Math.ceil(value / step) * step;
