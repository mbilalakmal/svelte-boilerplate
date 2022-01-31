<script lang="ts">
  import EventForm from "./components/EventForm.svelte";
  import SomeEventsList from "./components/SomeEventsList.svelte";
</script>

<main>
  <SomeEventsList />
  <EventForm />
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
