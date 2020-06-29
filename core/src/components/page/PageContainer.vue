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
.PageContainer::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 8px;
}
.PageContainer::-webkit-scrollbar-button {
    display: none;
}
.PageContainer::-webkit-scrollbar-corner, .PageContainer::-webkit-scrollbar-track {
    background: #e1e1e1;
}
.PageContainer::-webkit-scrollbar-thumb {
    background: #757575;
}
</style>