<template>
    <div class="tabSelector" v-on:click="select">
        <span>Tab {{ id }}</span>
    </div>
</template>

<script>
import materialCard from "../miscellaneous/MaterialCard.vue";

export default {
    props: {
        "id": {
            default: 0,
        },
    },
	components: {
        materialCard,
    },
    methods: {
        select: function() {
            this.$store.commit("selectNavbarTab", {id: this.id,}, {module: 'core' });
        },
    }
};
</script>