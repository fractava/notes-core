<template>
    <div>
			<md-menu
				md-direction="bottom-start"
				md-align-trigger
				class="addSymbolButton"
			>
				<md-button md-menu-trigger>
					<md-icon>emoji_symbols</md-icon>
				</md-button>

				<md-menu-content class="symbolsMenu">
					<span>
						<span class="md-headline">Symbols:</span>
						<div class="symbolsContainer">
							<md-button v-for="(symbol, index) in symbols" v-on:click="add(symbol)" :key="'symbol'+index">
				        <md-icon>{{ symbol }}</md-icon>
				      </md-button>
						</div>
					</span>
				</md-menu-content>
			</md-menu>
    </div>
</template>

<script>
export default {
	data: function(){
		return {
			symbols: ["€", "£", "¥", "©", "®", "™", "±", "≠", "≤", "≥", "÷", "×", "∞", "µ", "α", "β", "π", "Ω", "Σ", "Δ", "√",],
		};
	},
	methods: {
		add: function(symbol) {
			this.$store.commit("insertText", {text: symbol,}, {module: "core" });
		},
	},
};
</script>
<style>
.addSymbolButton, .addSymbolButton button {
	height: 100%;
}
.symbolsContainer {
	display: grid;
  grid-template-columns: 25% 25% 25% 25%;
	width: fit-content;
}
.symbolsMenu, .symbolsMenu .md-menu-content-container {
	min-width: fit-content;
	max-width: fit-content !important;
  height: fit-content;
	max-width: 60vh;
}
</style>
