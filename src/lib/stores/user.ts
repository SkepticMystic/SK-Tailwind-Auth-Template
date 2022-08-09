import { session } from "$app/stores";
import { derived } from 'svelte/store'

export const user = derived(session, sesh => sesh.lucia)