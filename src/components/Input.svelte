<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let timout = 1000;
  export let id: string | undefined = undefined;
  const dispatch = createEventDispatcher();
  let timer: NodeJS.Timeout;

  const debounce = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const val = e.target.value === "" ? undefined : Number(e.target.value);
      dispatch("update", val);
    }, timout);
  };
</script>

<input {id} type="number" step="any" on:input={debounce} />
