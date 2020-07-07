<template>
	<div>
		<span style="width: 80%;" ref="mathquill"></span>
	</div>
</template>
<script>

export default {
	mounted: function() {
		var config = {
		  spaceBehavesLikeTab: true, // configurable
		  handlers: {
		    edit: function() { // useful event handlers
		      //latexSpan.textContent = mathField.latex(); // simple API
		    }
		  }
		};

		var MQ = MathQuill.getInterface(2);
		var mathField = MQ.MathField(this.$refs.mathquill, config);
	},
};
</script>
