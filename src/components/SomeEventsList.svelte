<script lang="ts">
  import SomeEventItem from "./SomeEventItem.svelte";

  import { database } from "../Firebase";
  import {
    collection,
    where,
    query,
    doc,
    deleteDoc,
    QueryConstraint,
    orderBy,
    Query,
  } from "firebase/firestore";
  import { collectionData } from "rxfire/firestore";
  import { map, startWith } from "rxjs/operators";
  import EventQueryFilter from "./EventQueryFilter.svelte";
  import type { EventQuery } from "../types/EventQuery.type";
  import type { SomeEvent, SomeEventType } from "../types/SomeEvent.type";
  import { convertValueToRange } from "../utils/span-ranges-helper";
  import type { DocumentData } from "rxfire/firestore/interfaces";
  import type { Observable } from "rxjs";

  const collectionRef = collection(database, "events");

  let eventQuery: EventQuery = {};
  let events$: Observable<SomeEvent[]>;

  $: {
    const constraints: QueryConstraint[] = [orderBy("startSeconds")];

    if (eventQuery.type) constraints.push(where("type", "==", eventQuery.type));

    if (eventQuery.values && eventQuery.values.length)
      constraints.push(
        where("values", "array-contains-any", eventQuery.values)
      );
    else if (eventQuery.spans != undefined)
      constraints.push(where("ranges", "array-contains", eventQuery.range));

    if (eventQuery.spans != undefined)
      constraints.push(where("startSeconds", "<=", eventQuery.spans));

    const eventsRef = query(collectionRef, ...constraints);
    events$ = collectionData(eventsRef).pipe(
      startWith<DocumentData[]>([]),
      map<DocumentData[], SomeEvent[]>((x) => {
        let events = x.map<SomeEvent>((doc: DocumentData) => doc as SomeEvent);
        console.log(events.length);
        if (eventQuery.spans != undefined)
          events = events.filter(
            (event) => event.endSeconds >= eventQuery.spans
          );
        return events;
      })
    );
  }

  const updateQueryType = (e: CustomEvent<SomeEventType | undefined>) => {
    console.log(e.detail);
    eventQuery = {
      values: eventQuery.values,
      type: e.detail,
      spans: eventQuery.spans,
      range: eventQuery.range,
    };
  };
  const updateQueryValues = (e: CustomEvent<number[] | undefined>) => {
    console.log(e.detail);
    eventQuery = {
      values: e.detail,
      type: eventQuery.type,
      spans: eventQuery.spans,
      range: eventQuery.range,
    };
  };

  const updateQuerySpan = (e: CustomEvent<number | undefined>) => {
    console.log(e.detail);
    const range =
      e.detail == undefined ? undefined : convertValueToRange(e.detail, 100);
    eventQuery = {
      values: eventQuery.values,
      type: eventQuery.type,
      spans: e.detail,
      range: range,
    };
  };

  const remove = async (id: string) => {
    console.log("remove");
    await deleteDoc(doc(database, "events", id));
  };
</script>

<h3>Events</h3>
<EventQueryFilter
  {eventQuery}
  on:update-type={updateQueryType}
  on:update-values={updateQueryValues}
  on:update-span={updateQuerySpan}
/>
<ul>
  {#each $events$ as event}
    <SomeEventItem someEvent={event} on:remove={() => remove(event.id)} />
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
