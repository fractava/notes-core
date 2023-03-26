<template>
    <div>
			<!--<md-menu
				md-direction="bottom-start"
				md-align-trigger
				class="navbarButton"
			>
				<md-button md-menu-trigger class="smallNavbarButton">
					<md-icon>emoji_symbols</md-icon>
				</md-button>

				<md-menu-content class="navbarMenu">
					<span>
						<span class="md-headline">Symbols:</span>
						<div class="symbolsContainer">
							<md-button v-for="(symbol, index) in symbols" v-on:click="add(symbol)" :key="'symbol'+index">
								<md-icon>{{ symbol }}</md-icon>
							</md-button>
						</div>
					</span>
				</md-menu-content>
			</md-menu>-->
    </div>
</template>

<script>
import { mapActions } from "pinia";
import { useCoreStore } from "../../../pinia/core.js";

export default {
	data: function(){
		return {
			symbols: ["€", "£", "¥", "©", "®", "™", "±", "≠", "≤", "≥", "÷", "×", "∞", "µ", "α", "β", "π", "Ω", "Σ", "Δ", "√","∩", "∪", "⊆"],
		};
	},
	computed: {
		...mapActions(useCoreStore, ['insertText'])
	},
	methods: {
		add: function(symbol) {
			this.insertText({text: symbol,});
		},
	},
};
</script>
<style>
.symbolsContainer {
	display: grid;
  grid-template-columns: 25% 25% 25% 25%;
	width: fit-content;
}
</style>
