export type SomeEvent = {
  id: string;
  name: string;
  type: SomeEventType;
  startSeconds: number;
  endSeconds: number;
  values: number[];
};

export type SomeEventType = "A" | "B" | "C";
