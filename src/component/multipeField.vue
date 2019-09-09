<template>
  <div>
    <v-text-field
      single-line
      outlined
      v-model="input"
      @keypress.enter="pushInputs"
      :placeholder="`${theme} × ${shiritori} = ???`"
    ></v-text-field>
    <div v-for="(word, index) in inputs" :key="index">
      <v-row align="center">
        <v-checkbox v-model="checkedWord" :value="index" hide-details class="shrink ml-2 mt-0"></v-checkbox>
        <v-text-field :value="word" single-line @keypress.enter="(e) => {updateInputs(index, e)}"></v-text-field>
      </v-row>
    </div>
  </div>
</template>

<script>
import { ADD_SELECTED, REMOVE_SELECTED } from "../store/mutation-type";
export default {
  props: ["theme", "shiritori"],
  data: () => ({
    input: "",
    inputs: [],
    checkedWord: []
  }),
  watch: {
    checkedWord(newVal, oldVal) {
      const isAdd = newVal.length > oldVal.length;
      if (isAdd) {
        const [added] = newVal.filter(item => !oldVal.includes(item));
        this.$store.commit(ADD_SELECTED, this.inputs[added]);
      } else {
        const [removed] = oldVal.filter(item => !newVal.includes(item));
        this.$store.commit(REMOVE_SELECTED, this.inputs[removed]);
      }
    }
  },
  methods: {
    pushInputs() {
      if (this.input === "") return;
      const word = this.input;
      this.input = "";
      this.inputs.push(word);
    },
    updateInputs(index, e) {
      this.inputs[index] = e.currentTarget.value;
    }
  }
};
</script>>