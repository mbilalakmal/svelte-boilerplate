<script lang="ts">
  import { database } from "../Firebase";
  import { collection, doc, setDoc } from "firebase/firestore";

  import {
    eventTypes,
    SomeEvent,
    SomeEventType,
  } from "../types/SomeEvent.type";
  import EventValues from "./EventValues.svelte";
  import { convertSpanToRanges } from "../utils/span-ranges-helper";

  let startSeconds: number;
  let endSeconds: number;

  let selectedType: SomeEventType;
  let name: string;
  let values: number[] = [];

  const addValue = (e: CustomEvent<number>) => {
    const newVal = e.detail;
    values = [...values, newVal];
  };

  const removeValue = (e: CustomEvent<number>) => {
    const idx = e.detail;
    values.splice(idx, 1);
    values = values;
  };

  const reset = () => {
    startSeconds = null;
    endSeconds = null;
    selectedType = null;
    name = null;
    values = [];
  };

  const submit = async () => {
    const newEventRef = doc(collection(database, "events"));

    const ranges = convertSpanToRanges(startSeconds, endSeconds, 100);

    const newEvent: SomeEvent = {
      id: newEventRef.id,
      name: name,
      type: selectedType,
      startSeconds: startSeconds,
      endSeconds: endSeconds,
      values: values,
      ranges: ranges,
    };
    await setDoc(newEventRef, newEvent);
    reset();
    console.log(newEvent);
  };
</script>

<form on:submit|preventDefault={submit}>
  <h3>Add New Event</h3>
  <ul>
    <li>
      <label for="startSeconds">Start</label>
      <input
        type="number"
        step="any"
        id="startSeconds"
        placeholder="0"
        required
        min="0"
        max="10800"
        bind:value={startSeconds}
      />
    </li>

    <li>
      <label for="EndSeconds">End</label>
      <input
        type="number"
        step="any"
        id="EndSeconds"
        placeholder="100"
        required
        min="0"
        max="10800"
        bind:value={endSeconds}
      />
    </li>

    <li>
      <label for="selectedType">EventType</label>
      <select id="selectedType" bind:value={selectedType} required>
        {#each eventTypes as eventType}
          <option value={eventType}>
            {eventType}
          </option>
        {/each}
      </select>
    </li>

    <li>
      <label for="eventName">Name</label>
      <input
        type="text"
        id="eventName"
        required
        minLength="3"
        maxLength="20"
        bind:value={name}
      />
    </li>

    <EventValues
      {values}
      on:add-value={addValue}
      on:remove-value={removeValue}
    />

    <li>
      <button type="submit">Add</button>
    </li>
  </ul>
</form>

<style>
  form {
    margin: 0 auto;
    padding: 1em;
    border: 1px solid black;
    border-radius: 1em;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  form li + li {
    margin-top: 1em;
  }

  label {
    /* Uniform size & alignment */
    display: inline-block;
    text-align: right;
  }
</style>
