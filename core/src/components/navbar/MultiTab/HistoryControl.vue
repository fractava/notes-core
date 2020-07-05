<template>
    <div class="historyControlContainer">
        <md-button class="historyControlButton" v-on:click="undo">
            <md-icon>undo</md-icon>
        </md-button>
        <md-button class="historyControlButton" v-on:click="redo">
            <md-icon>redo</md-icon>
        </md-button>
    </div>
</template>

<script>
export default {
	name: "HistoryControl"
};
</script>

<style scoped>
    .historyControlContainer {
        height: 100%;
    }
    .historyControlButton {
        height: 100%;
        margin: 0px;
    }
</style>