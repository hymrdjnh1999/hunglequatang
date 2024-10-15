import { MyData } from "./data.js";

const productList = new MyData().getMockProductList();
var category = "";
const settingProductKeys = () => {
  const categorySection = document.querySelector("#category");
  let categoryHTML = ``;

  Object.keys(productList).forEach((categoryKey) => {
    categoryHTML += `<h2 class="category" category='${categoryKey}'>
    ${categoryKey}
  </h2>`;
  });

  categorySection.innerHTML = categoryHTML;
  setTimeout(() => {
    const cates = document.querySelectorAll(".category");
    cates.forEach(onClickCategory);
  }, 100);
};

const handleClickBackButton = () => {
  const backButtonSection = document.querySelector("#back-button");
  backButtonSection.addEventListener("click", () => {
    category = "";
    handleShowScreen();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  settingProductKeys();
  handleShowScreen();
  handleClickBackButton();
});

const handleShowScreen = () => {
  const backButtonSection = document.querySelector("#back-button");
  const titleSection = document.querySelector("#add-title");
  const formAddSection = document.querySelector("#form-add");
  const categorySection = document.querySelector("#category");

  let title = "Thêm sản phẩm";
  if (category) {
    title = `Thêm sản phẩm - ${category}`;
  }
  titleSection.innerHTML = title;
  categorySection.classList.remove("d-none");
  backButtonSection.classList.add("d-none");
  formAddSection.classList.add("d-none");
  if (category) {
    categorySection.classList.add("d-none");
    formAddSection.classList.remove("d-none");
    backButtonSection.classList.remove("d-none");
  }
};

const onClickCategory = (item) => {
  item.addEventListener("click", (event) => {
    category = item.getAttribute("category");
    handleShowScreen();
  });
};
