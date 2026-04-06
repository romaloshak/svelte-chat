<script>
    import {socketState} from "../utils/socketStore.svelte.ts";

    $inspect(socketState)
</script>

    <div class="messages">
        {#each socketState.messages as msg}
            <div class="message-wrapper {msg.sender === socketState.tabName ? 'me' : 'them'}">
                <div class="bubble">
                    <span class="sender">{msg.sender}</span>
                    <p>{msg.message}</p>
                </div>
            </div>
        {/each}
    </div>

<style>
    .messages { flex: 1; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 8px; }

    .message-wrapper { display: flex; width: 100%; }
    .me { justify-content: flex-end; }
    .them { justify-content: flex-start; }

    .bubble {
        max-width: 70%;
        padding: 8px 12px;
        border-radius: 12px;
        font-size: 0.9rem;
    }

    .me .bubble { background: #0088cc; color: white; border-bottom-right-radius: 2px; }
    .them .bubble { background: #eee; color: #333; border-bottom-left-radius: 2px; }

    .sender { display: block; font-size: 0.7rem; opacity: 0.7; margin-bottom: 2px; }
</style>