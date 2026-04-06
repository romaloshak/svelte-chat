<script lang="ts">
    import ChatWrapper from "../components/ChatWrapper.svelte";
    import {onMount} from "svelte";
    import {initSocket} from "../utils/socketStore.svelte.ts";

    onMount(() => {
      const socket = initSocket();
      return () => socket.close(); // Cleanup on app destroy
    });

</script>

<ChatWrapper/>
