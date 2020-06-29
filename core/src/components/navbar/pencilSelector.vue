<template>
    <div>
        <md-button v-on:click="select" :class="{'md-raised': id == selectedPencilId}">
            <md-icon :style="{color: pencils[id].color,}">create</md-icon>
        </md-button>
        <md-card style="position: relative; width: 100px;" v-if="id == selectedPencilId">
            <md-card-header>
                <div class="md-title">Pencil Settings</div>
            </md-card-header>
            <md-card-content>Color: Width:
            </md-card-content>
        </md-card>
    </div>
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