<template>
    <md-button v-on:click="select" :class="{'md-raised': id == selectedPencilId}">
        <md-icon :style="{color: pencils[id].color,}">create</md-icon>
    </md-button>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    props: {
        id: {
            type: Number,
            default: 0,
        },
    },
    computed: mapState({
        pencils: state => state.core.pencils,
        selectedPencilId: state => state.core.selectedPencilId,
    }),
    methods: {
        select: function() {
            this.$store.commit("selectPencil", {id: this.id,}, {module: 'core' });
        }
    }
};
</script>