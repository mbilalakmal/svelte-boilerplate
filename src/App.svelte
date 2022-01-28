<script lang="ts">
  import EventForm from "./components/EventForm.svelte";
  import SomeEventsList from "./components/SomeEventsList.svelte";
  import type { SomeEventType } from "./types/SomeEvent.type";

  const eventTypes: SomeEventType[] = ["A", "B", "C"];
</script>

<main>
  <EventForm {eventTypes} />
  <SomeEventsList />
</main>

<style>
  main {
    background-color: burlywood;
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
