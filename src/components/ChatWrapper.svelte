<script lang="ts">
    import InputMessage from "./InputMessage.svelte";
    import Dialog from "./Dialog.svelte";

</script>

<div class="chat-container">
    <Dialog/>
    <InputMessage/>
</div>

<style>
    .chat-container { display: flex; flex-direction: column; height: 400px; border: 1px solid #ccc; }
</style>