<script lang="ts">
  export let icon: string;
</script>

<button
  on:click
  class="hover:bg-zinc-800 text-gray-500 p-1 pr-2 transition-colors flex items-center gap-1 rounded-sm {$$props.class}"
>
  <i class="material-symbols-outlined">{icon}</i>
  <slot />
</button>
