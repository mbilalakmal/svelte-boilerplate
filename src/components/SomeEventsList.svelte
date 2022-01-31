<script lang="ts">
  import SomeEvent from "./SomeEvent.svelte";

  import { database } from "../Firebase";
  import {
    collection,
    where,
    query,
    doc,
    deleteDoc,
    QueryConstraint,
  } from "firebase/firestore";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";
  import EventQueryFilter from "./EventQueryFilter.svelte";
  import type { EventQuery } from "../types/EventQuery.type";
  import type { SomeEventType } from "../types/SomeEvent.type";

  const collectionRef = collection(database, "events");

  let eventsRef = query(collectionRef);
  let eventQuery: EventQuery = {};

  $: {
    const constraints: QueryConstraint[] = [];
    if (eventQuery.type) constraints.push(where("type", "==", eventQuery.type));
    if (eventQuery.values && eventQuery.values.length)
      constraints.push(
        where("values", "array-contains-any", eventQuery.values)
      );
    eventsRef = query(collectionRef, ...constraints);
  }

  $: events$ = collectionData(eventsRef).pipe(startWith([]));

  const updateQueryType = (e: CustomEvent<SomeEventType | undefined>) => {
    console.log(e.detail);
    eventQuery = { values: eventQuery.values, type: e.detail };
  };
  const updateQueryValues = (e: CustomEvent<number[] | undefined>) => {
    console.log(e.detail);
    eventQuery = { values: e.detail, type: eventQuery.type };
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
/>
<ul>
  {#each $events$ as event}
    <SomeEvent someEvent={event} on:remove={() => remove(event.id)} />
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
