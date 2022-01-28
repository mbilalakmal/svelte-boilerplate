<script lang="ts">
  import SomeEvent from "./SomeEvent.svelte";

  import { database } from "../Firebase";
  import { collection, where, query, doc, deleteDoc } from "firebase/firestore";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  let eventsRef = query(
    collection(database, "events"),
    where("type", "==", "A"),
    where("values", "array-contains", 420)
  );
  let events$ = collectionData(eventsRef).pipe(startWith([]));

  const remove = async (id: string) => {
    console.log("remove");
    await deleteDoc(doc(database, "events", id));
  };
</script>

<ul>
  {#each $events$ as event}
    <SomeEvent
      someEvent={event}
      on:remove={() => remove(event.id)}
      on:update={() => console.log("update")}
    />
  {/each}
</ul>
