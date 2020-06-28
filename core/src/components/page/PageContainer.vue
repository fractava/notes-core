<template>
    <div class="PageContainer">
        <slot />
    </div>
</template>
<style>
.PageContainer {
    width: 100%;
    overflow: scroll;
    touch-action: none;
}
</style>