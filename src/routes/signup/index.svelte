<script lang="ts">
  import axios from "axios";
  import { luciaRedirect } from "$lib/utils";
  import Loading from "$lib/components/loading.svelte";

  let email = "";
  let password = "";
  let err = "";
  let loading = false;

  async function signup() {
    if (!email || !password)
      return (err = "Please enter an email and password");

    loading = true;
    try {
      await axios.post("/api/auth/signup", {
        email,
        password,
      });

      luciaRedirect();
    } catch (error) {
      console.log(error);
      err = error.response.data.error;
    }
    loading = false;
  }

  $: if (email || password) err = "";
</script>

<div>
  <label for="email">Email</label>
  <input class="border" type="email" name="email" bind:value={email} />

  <label for="password">Password</label>
  <input class="border" type="password" name="password" bind:value={password} />

  <Loading {loading}>
    <button on:click={async () => signup()}>Signup</button>
  </Loading>

  {#if err}
    <p class="text-red-400">{err}</p>
  {/if}

  <div>Or, <a href="/login">login</a></div>
</div>
