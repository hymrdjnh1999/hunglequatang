import { productList } from "./app.js";
const { createApp, ref } = Vue;

createApp({
  setup() {},
  data() {
    return {
      productList,
      category: "",
      newProduct: {
        productName: "",
        productPrice: "",
      },
    };
  },
  methods: {
    clickCategory(category) {
      this.category = category;
    },
    onClickBackButton() {
      this.category = "";
    },
    submitForm() {},
  },
}).mount("#app");
