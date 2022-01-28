<script lang="ts">
  import { database } from "../Firebase";
  import { collection, doc, setDoc } from "firebase/firestore";

  import type { SomeEvent, SomeEventType } from "../types/SomeEvent.type";

  import Button from "./Button.svelte";

  export let eventTypes: string[];

  let startSeconds: number;
  let endSeconds: number;

  let selectedType: SomeEventType;
  let name: string;
  let values: number[] = [];
  let newValue: number;

  const reset = () => {
    startSeconds = null;
    endSeconds = null;
    selectedType = null;
    name = null;
    values = [];
    newValue = null;
  };

  const submit = async () => {
    console.log("sbumtied" + selectedType);

    const newEventRef = doc(collection(database, "events"));

    const newEvent: SomeEvent = {
      id: newEventRef.id,
      name: name,
      type: selectedType,
      startSeconds: startSeconds,
      endSeconds: endSeconds,
      values: values,
    };
    await setDoc(newEventRef, newEvent);
    reset();
    console.log(newEvent);
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="input-group">
    <label for="startSeconds">Start</label>
    <input
      type="number"
      id="startSeconds"
      placeholder="0"
      required
      min="0"
      max="10800"
      bind:value={startSeconds}
    />
    <br />

    <label for="EndSeconds">End</label>
    <input
      type="number"
      id="EndSeconds"
      placeholder="100"
      required
      min="0"
      max="10800"
      bind:value={endSeconds}
    />
    <br />

    <label for="selectedType">EventType</label>
    <select id="selectedType" bind:value={selectedType} required>
      {#each eventTypes as eventType}
        <option value={eventType}>
          {eventType}
        </option>
      {/each}
    </select>
    <br />

    <label for="eventName">Name</label>
    <input
      type="text"
      id="eventName"
      required
      minLength="3"
      maxLength="20"
      bind:value={name}
    />
    <br />

    <label for="values">Values</label>
    <br />
    {#each values as value, idx}
      <span>{value}</span>
      <button
        type="button"
        on:click={() => {
          values.splice(idx, 1);
          values = [...values];
        }}>x</button
      ><br />
    {/each}
    <input
      type="number"
      id="newValue"
      placeholder="100"
      bind:value={newValue}
    />
    <Button
      style="secondary"
      on:click={() => {
        if (newValue == undefined) return;
        values = [...values, newValue];
        newValue = null;
      }}>+</Button
    >
    <br />

    <Button type="submit">Add</Button>
  </div>
</form>
