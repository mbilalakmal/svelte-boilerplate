import type { SomeEventType } from "./SomeEvent.type";

export type EventQuery = {
  type?: SomeEventType;
  values?: number[];
  spans?: number;
  range?: number;
};
