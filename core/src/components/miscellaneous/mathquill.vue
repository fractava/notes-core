<template>
	<div>
		<span style="width: 80%;" ref="mathquill"></span>
		<div>
			<md-button v-on:click="cmd('\\sqrt')">
				sqaure root
			</md-button>
			<md-button v-on:click="cmd('\\frac')">
				fracture
			</md-button>
		</div>
	</div>
</template>
<script>

export default {
	data: function() {
		return {
			MQ: undefined,
			mathField: undefined,
		};
	},
	mounted: function() {
		let self = this;
		var config = {
		  spaceBehavesLikeTab: true, // configurable
		  handlers: {
		    edit: function() { // useful event handlers
		      //latexSpan.textContent = ; // simple API
					self.$emit("input", self.mathField.latex());
		    }
		  }
		};

		this.MQ = MathQuill.getInterface(2);
		this.mathField = this.MQ.MathField(this.$refs.mathquill, config);
	},
	methods: {
		cmd: function(content) {
			this.mathField.cmd(content);
		},
	},
};
</script>
