<template>
    <md-button v-on:click="add">
        <md-icon>add</md-icon>
    </md-button>
</template>

<script>
export default {
    methods: {
        add: function() {
            this.$store.commit("addPencil", {color: "#000000", width: 8,}, {module: 'core' });
        },
    },
};
</script>