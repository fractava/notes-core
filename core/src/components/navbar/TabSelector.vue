<template>
    <md-tab :md-label="content" v-on:click="select"></md-tab>
</template>

<script>

export default {
    props: {
        "id": {
            default: 0,
        },
        "content": {
            type: String,
            default: "",
        },
    },
    methods: {
        select: function() {
            this.$store.commit("selectNavbarTab", {id: this.id,}, {module: 'core' });
        },
    }
};
</script>

<style>
.tabSelector {
    padding-left: 5px;
    padding-right: 5px;
}
</style>