<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { SomeEvent } from "../types/SomeEvent.type";

  export let someEvent: SomeEvent;

  const dispatch = createEventDispatcher();
  const remove = () => dispatch("remove");
</script>

<li class="event-item">
  <span>Name: {someEvent.name}</span>
  <span>Type: {someEvent.type}</span>
  <span>({someEvent.startSeconds}-{someEvent.endSeconds})</span>
  <span
    >Values: (
    {#each someEvent.values as value}
      {value},
    {/each}
    )
  </span>
  <button type="button" on:click={remove}>x</button>
</li>

<style>
  .event-item {
    padding-bottom: 4px;
  }
</style>
