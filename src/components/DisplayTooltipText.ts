import Vue from "vue";

Vue.component("DisplayTooltipText", {
  props: {
    string: {
      required: true,
      type: String,
    },
    decorate: {
      required: false,
      type: Boolean,
      default: true,
    },
  },
  render(h) {
    const render = {
      template: this.formattedText,
    };
    return h(render);
  },
  computed: {
    formattedText() {
      var split_input = this.string.split("_");
      for (var index in split_input) {
        if (this.$store.getters.existsInAnyGlossary(split_input[index])) {
          split_input[index] =
            '<tooltip input="' +
            split_input[index] +
            '" :decorate="' +
            this.decorate +
            '"></tooltip>';
        }
      }
      var merged_input = split_input.join("");
      return (
        "<span style='display: inline-block;'>" +
        this.$marked.parse(merged_input) +
        "</span>"
      );
    },
  },
});
