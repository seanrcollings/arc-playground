<script lang="ts">
  import { fly } from "svelte/transition";

  export let notifications: AppNotification[] = [];
</script>

<div class="absolute bottom-4 right-4 pointer-events-auto">
  {#each notifications as notif (notif.id)}
    <div
      transition:fly={{ x: 100, duration: 500 }}
      class="p-4 text-white rounded-md mb-4 max-w-sm"
      class:bg-red-500={notif.type === "error"}
      class:bg-indigo-500={notif.type === "info"}
    >
      {notif.message}
    </div>
  {/each}
</div>
