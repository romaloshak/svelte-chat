<script>
    import {socketState} from "../utils/socketStore.svelte.ts";

    let chat = $derived(socketState.chat)
</script>

<div class="dialog">
        {#if chat.length}
            {#each chat as data}
                <div class="message">
                    <span>{JSON.parse(data.message).text}</span>
                </div>
            {/each}
        {/if}
</div>

<style>
    .dialog {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        min-height: 100px;
        margin-bottom: 1rem;
    }
    .message {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>