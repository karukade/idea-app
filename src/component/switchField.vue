<template>
  <v-text-field :value="value" :readonly="readonly" @click="switchReadOnly" @blur="onBlur"></v-text-field>
</template>

<script>
export default {
  props: ["value"],
  data: () => ({
    readonly: true
  }),
  methods: {
    switchReadOnly() {
      if (!this.readonly) return;
      this.readonly = !this.readonly;
    },
    onBlur() {
      this.readonly = true;
    }
  }
};
</script>>