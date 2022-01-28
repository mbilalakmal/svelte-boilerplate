<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { SomeEvent } from "../types/SomeEvent.type";

  export let someEvent: SomeEvent;

  const dispatch = createEventDispatcher();
  const remove = () => dispatch("remove", "id");
  const update = () => dispatch("update", "id");
</script>

<li>
  <span>{someEvent.name}</span>
  <span>{someEvent.type}</span>
  <button type="button" on:click={remove}>x</button>
</li>

<style>
</style>
