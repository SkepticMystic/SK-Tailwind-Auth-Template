<script lang="ts">
  import "../app.css";
  import { session } from "$app/stores";
  import { user } from "$lib/stores/user";
  import { luciaRedirect } from "$lib/utils";
  import { Lucia, signOut } from "lucia-sveltekit/client";

  console.log($user?.user);
</script>

<Lucia {session} />

{#if $user}
  <button
    on:click={async () => {
      await signOut();
      luciaRedirect();
    }}>Logout</button
  >
{:else}
  <a href="/login">Login</a>
{/if}

<slot />
