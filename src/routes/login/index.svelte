<script lang="ts">
  import axios from "axios";
  import { luciaRedirect } from "$lib/utils";

  let email = "";
  let password = "";
  let err = "";

  async function login() {
    if (!email || !password)
      return (err = "Please enter an email and password");

    try {
      await axios.post("/api/auth/login", { email, password });
      luciaRedirect();
    } catch (error) {
      err = error.response.data.error;
    }
  }

  $: if (email || password) err = "";
</script>

<div>
  <label for="email">Email</label>
  <input class="border" type="email" name="email" bind:value={email} />

  <label for="password">Password</label>
  <input class="border" type="password" name="password" bind:value={password} />

  <button on:click={async () => login()}>Login</button>

  {#if err}
    <p class="text-red-400">{err}</p>
  {/if}

  <div>Or, <a href="/signup">signup</a></div>
</div>
