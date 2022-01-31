<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { EventQuery } from "../types/EventQuery.type";

  import { eventTypes, SomeEventType } from "../types/SomeEvent.type";
  import EventValues from "./EventValues.svelte";

  export let eventQuery: EventQuery;

  const dispatch = createEventDispatcher();

  const placeholder = "All types";
  const updateType = (selection: SomeEventType | undefined) =>
    dispatch("update-type", selection);

  const addValue = (e: CustomEvent<number>) => {
    const newVal = e.detail;
    const values = eventQuery.values
      ? [...eventQuery.values, newVal]
      : [newVal];
    dispatch("update-values", values);
  };

  const removeValue = (e: CustomEvent<number>) => {
    const idx = e.detail;
    const values = [...eventQuery.values];
    values.splice(idx, 1);
    dispatch("update-values", values);
  };

  /// Svelte hacks
  $: selection = eventQuery.type;
  $: updateType(selection);
</script>

<label for="selectedType">EventType</label>
<select id="selectedType" bind:value={eventQuery.type} required>
  {#if placeholder}
    <option value="" selected>{placeholder}</option>
  {/if}
  {#each eventTypes as eventType}
    <option value={eventType}>
      {eventType}
    </option>
  {/each}
</select>
{eventQuery.type}

<EventValues
  values={eventQuery.values ?? []}
  on:add-value={addValue}
  on:remove-value={removeValue}
/>
EventQueryFilter
