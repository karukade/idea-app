<template>
  <v-container>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2 class="headline font-weight-bold mb-3">1.考えたいテーマを決める</h2>
            <v-text-field outlined single-line type="text" v-model="theme"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2 class="headline font-weight-bold mb-3">2.テーマから連想される言葉をいくつか考える</h2>
            <v-combobox appendIcon v-model="themeChips" multiple chips></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2 class="headline font-weight-bold mb-3">3.組み合わせる言葉をしりとりでリストアップ＋組み合わせから発想</h2>
            <div class="mb-3">
              <div v-for="(word, index) in shiritori" :key="index">
                <v-container>
                  <v-row>
                    <v-col cols="4">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="title">{{ word }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                    <v-col cols="8">
                      <multiple-input :theme="theme" :shiritori="word" />
                    </v-col>
                  </v-row>
                </v-container>
                <v-divider></v-divider>
              </div>
            </div>
            <v-text-field
              single-line
              outlined
              type="text"
              v-model="wordinput"
              :disabled="theme.length === 0"
              @keyup.enter="goNextWord"
              @blur="goNextWord"
            >
              <template v-slot:prepend>
                <div class="m-first-word">{{ lastWord }}</div>
              </template>
            </v-text-field>
            <div
              v-if="shiritoriError.isError"
              class="red--text"
            >{{ `${shiritoriError.value}はさっき言ったよ` }}</div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <!-- <v-btn
      x-large
      block
      rounded
      :disabled="isFilled"
      class="font-weight-bold title"
      color="primary"
      to="/idea"
      @click="update"
    >
      <v-icon left>mdi-lightbulb-on-outline</v-icon>発想する
    </v-btn>-->
  </v-container>
</template>
<style>
.m-first-word {
  display: inline-block;
  padding: 10px;
  border-radius: 50%;
  background-color: #ededed;
  text-align: center;
  line-height: 1;
}
</style>
<script>
import axios from "axios";
import { UPDATE_DATA } from "../store/mutation-type";
import multiPleInput from "../component/multipeField.vue";
const endPoint = "https://labs.goo.ne.jp/api/hiragana";
const ignoreWord = ["ー", "っ"];
const smallWordMap = {
  ゃ: "や",
  ゅ: "ゆ",
  ょ: "よ"
};
const kanaToHira = str => {
  return str.replace(/[\u30a1-\u30f6]/g, function(match) {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
};
const convertSmallWord = str => {
  const w = smallWordMap[str];
  return w ? w : str;
};
const isKanji = char => {
  const code = char.codePointAt(0);
  return (
    (0x4e00 <= code && code <= 0x9fef) || // CJK統合漢字
    (0x3400 <= code && code <= 0x4db5) || // CJK統合漢字拡張A
    (0x20000 <= code && code <= 0x2a6d6) || // CJK統合漢字拡張B
    (0x2a700 <= code && code <= 0x2b734) || // CJK統合漢字拡張C
    (0x2b740 <= code && code <= 0x2b81d) || // CJK統合漢字拡張D
    (0x2b820 <= code && code <= 0x2cea1) || // CJK統合漢字拡張E
    (0x2ceb0 <= code && code <= 0x2ebe0) || // CJK統合漢字拡張F
    (0xf900 <= code && code <= 0xfaff) || // CJK互換漢字
    (0x2f800 <= code && code <= 0x2fa1f) || // CJK互換漢字補助
    (0xe0100 <= code && code <= 0xe01ef) || // 異体字セレクタ補助
    (0x2f00 <= code && code <= 0x2fdf) || // 康煕部首
    (0x2e80 <= code && code <= 0x2eff) || // CJK部首補助
    (0x31c0 <= code && code <= 0x31ef) // CJKの筆画
  );
};
const getLastWord = w => {
  const word = kanaToHira(w);
  let wordIndex = -1;
  let lastWord = word.slice(wordIndex);
  while (ignoreWord.includes(lastWord)) {
    --wordIndex;
    lastWord = word.slice(wordIndex, wordIndex + 1);
  }
  lastWord = convertSmallWord(lastWord);
  return lastWord;
};
export default {
  data: () => ({
    theme: "",
    themeChips: [],
    shiritori: [],
    wordinput: "",
    lastWord: "り",
    shiritoriError: { isError: false, value: "" }
  }),
  mounted() {
    const { theme, themeChips, shiritori } = this.$store.state.data;
    this.theme = theme ? theme : "";
    this.themeChips = themeChips ? themeChips : [];
    this.shiritori = shiritori ? shiritori : ["しりとり"];
  },
  computed: {
    isFilled() {
      return !(
        this.theme !== "" &&
        this.themeChips.length > 0 &&
        this.shiritori.length > 1
      );
    }
  },
  methods: {
    async goNextWord() {
      if (this.wordinput === "") return;
      if (this.shiritori.includes(this.wordinput)) {
        this.shiritoriError = { isError: true, value: this.wordinput };
        this.wordinput = "";
        return;
      }

      if (this.shiritoriError.isError) {
        this.shiritoriError = { isError: false, value: "" };
      }

      const wordInput = this.wordinput;
      const lastWord = getLastWord(wordInput);

      this.lastWord = "";
      this.wordinput = "";

      this.shiritori.push(wordInput);

      if (isKanji(lastWord)) {
        const converted = await this.toHiragana(wordInput);
        this.lastWord = getLastWord(converted);
      } else {
        this.lastWord = lastWord;
      }

      this.wordinput = "";
    },
    async toHiragana(word) {
      const {
        data: { converted }
      } = await axios.post(endPoint, {
        app_id:
          "ca97fd2ddaf8c535b3e3f50daf9dd112696e0a8adfdc322215657a496f9b386e",
        sentence: word,
        output_type: "hiragana"
      });
      return converted;
    },
    update() {
      const { theme, themeChips, shiritori } = this;
      this.$store.commit(UPDATE_DATA, { theme, themeChips, shiritori });
    }
  },
  components: {
    "multiple-input": multiPleInput
  }
};
</script>
