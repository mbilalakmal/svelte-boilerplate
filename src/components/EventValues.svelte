<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let values: number[] = [];

  const dispatch = createEventDispatcher();
  const addValue = () => dispatch("add-value", newValue);
  const removeValue = (idx: number) => dispatch("remove-value", idx);

  let newValue: number;
</script>

<label for="values">Values</label>
{#each values as value, idx}
  <span>{value}</span>
  <button type="button" on:click={() => removeValue(idx)}>x</button>
{/each}
<br />
<input type="number" id="newValue" placeholder="100" bind:value={newValue} />
<button
  type="button"
  on:click={() => {
    if (newValue == undefined) return;
    addValue();
    newValue = null;
  }}>+</button
>
