export type SomeEvent = {
  id: string;
  name: string;
  type: SomeEventType;
  startSeconds: number;
  endSeconds: number;
  values: number[];
  ranges: number[];
};

export type SomeEventType = "A" | "B" | "C";

export const eventTypes: SomeEventType[] = ["A", "B", "C"];
