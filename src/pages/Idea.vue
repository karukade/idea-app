<template>
  <div class="m-cnt">
    <div>
      <div class="m-left">
        <div>
          <div class="title">{{ data.theme }}</div>
          <div class="title" v-for="(chips, index) in data.themeChips" :key="index">{{ chips }}</div>
        </div>
      </div>
      <div class="m-right">
        <div v-for="(word, index) in data.shiritori" :key="index" class="title mt-10">{{ word }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.m-left {
  z-index: 2;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 20px;
}
.m-right {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  padding-left: 32%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
<script>
import { mapState } from "vuex";
import switchField from "../component/switchField.vue";
export default {
  components: {
    "switch-field": switchField
  },
  computed: mapState(["data"]),
  methods: {
    switchReadOnly(e) {
      e.currentTarget.readonly = !e.target.readonly;
    }
  }
};
</script>