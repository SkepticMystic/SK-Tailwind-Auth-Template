<script lang="ts">
  import { Jumper } from "svelte-loading-spinners";

  export let loading: boolean;
</script>

{#if loading}
  <Jumper />
{:else}
  <slot />
{/if}
