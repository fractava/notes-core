<template>
	<div class="materialCard">
		<slot />
	</div>
</template>

<style>
.materialCard {
	box-shadow:rgb(230, 230, 230) 1px 1px 5px 0px;	color: #424242;
	transition: all 0.3s ease-out 0s;
	-webkit-font-smoothing: antialiased;
	-webkit-tap-highlight-color:rgba(0, 0, 0, 0.1);
	padding-bottom:16px;
	padding-left:16px;
	padding-right:16px;
	padding-top:16px;
	border-radius: 10px;
	background-color: white;
	margin: 4px;
    width: fit-content;
}
</style>