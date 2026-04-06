<script lang="ts">
  import {socketState} from "../utils/socketStore.svelte.ts";

  let message = $state('');
  let status = $state('idle');

  const isSending = $derived(status === 'sending')
  const isSuccess = $derived(status === 'success')
  const isError = $derived(status === 'error')
  const isConnected = $derived(socketState.status === 'connected');

  async function handleSubmit() {
    if(isConnected && socketState.socket) {
      status = 'sending';
      socketState.socket.send(JSON.stringify({
        sender: socketState.tabName,
        message,
      }));
      status = 'idle'
      message = '';
    }
  }

</script>

<form onsubmit={handleSubmit} class="form-container">
    <div class="form">
        <div class="field">
            <input
                    id="message"
                    type="text"
                    bind:value={message}
                    placeholder="Message"
                    required
            />
        </div>

        <button type="submit" disabled={isSending || !isConnected}>
            {#if !isConnected}
                Connecting...
            {:else if isSending}
                Sending...
            {:else}
                Send Message
            {/if}
        </button>
    </div>

    {#if isSuccess}
        <p class="success-msg">Message sent successfully!</p>
    {/if}
    {#if isError}
        <p class="error-msg">Something went wrong. Please try again.</p>
    {/if}
</form>

<style>
    .form-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
    }
    .form {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .field {
        display: flex;
        flex: 1 0 auto;
        flex-direction: column;
        gap: 0.25rem;
    }

    input, textarea {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        background-color: #ff3e00;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:disabled {
        background-color: #ccc;
    }

    .success-msg { color: green; font-size: 0.9rem; }
    .error-msg { color: red; font-size: 0.9rem; }
</style>
