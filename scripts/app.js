const cups = [
  {
    imageURL: ["./assets/images/cups/cup-ngoi-sao/cup-ngoi-sao.jpg"],
    productName: "Cúp pha lê hình trụ ngôi sao",
    productPrice: "130000",
  },
  {
    imageURL: [
      "./assets/images/cups/cup-pha-le-canh-buom/cup-pha-le-canh-buom.webp",
    ],
    productName: "Cúp pha lê cánh buồm",
    productPrice: "",
  },
  {
    imageURL: [
      "./assets/images/cups/cup-pha-le-vinh-danh/cup-pha-le-vinh-danh.jpg",
    ],
    productName: "Cúp pha lê vinh danh",
    productPrice: "130000",
  },
  {
    imageURL: [
      "./assets/images/cups/cup-pha-le-vinh-danh2/cup-pha-le-vinh-danh2.jpg",
    ],
    productName: "Cúp pha lê vinh danh",
    productPrice: "",
  },
  {
    imageURL: ["./assets/images/cups/cup-ngoi-sao/cup-ngoi-sao.jpg"],
    productName: "Cúp pha lê hình trụ ngôi sao",
    productPrice: "",
  },
];
const memories = [
  {
    imageURL: ["./assets/images/cups/cup-ngoi-sao/cup-ngoi-sao.jpg"],
    productName: "Cúp pha lê hình trụ ngôi sao",
    productPrice: "130000",
  },
];
const medals = [
  {
    imageURL: ["./assets/images/medals/huy-chuong1/huy-chuong-cac-loai-1.webp"],
    productName: "Huy chương các loại",
    productPrice: "",
  },
];
const flags = [
  {
    imageURL: [
      "./assets/images/flags/khung-bang-khen-a3/khung-bang-khen-a3.jpg",
    ],
    productName: "Khung bằng khen A3",
    productPrice: "60000",
  },
];
const productList = {
  cups: {
    key: "cups",
    contentKey: "cups-content",
    data: cups,
  },
  memories: {
    key: "memories",
    contentKey: "memories-content",
    data: memories,
  },
  medals: {
    key: "medals",
    contentKey: "medals-content",
    data: medals,
  },
  flags: {
    key: "flags",
    contentKey: "flags-content",
    data: flags,
  },
};
const renderCategories = (category) => {
  const { contentKey, data, key } = category;
  const productHtml = data.map(renderProductList).join("");
  const contentData = document.querySelector(`#${contentKey}`);
  contentData.innerHTML = "";
  if (productHtml) {
    contentData.innerHTML = productHtml;
    document.querySelector(`#${key}`).classList.remove("d-none");

    return;
  }
  document.querySelector(`#${key}`).classList.add("d-none");
};
const renderProductList = (product) => {
  const { imageURL, productName, productPrice } = product;
  return `<div class="product-items d-flex flex-column">
  <div class="product-img-section p-4 animate__animated animate__flipInX">
    <img
      class="product-img"
      loading="lazy"
      src="${imageURL[0]}"
      alt="${productName}"
    />
  </div>
  <div class="product-content mt-2 px-2 h3 text-center">
    ${productName}
  </div>
  <div class="product-price text-danger h3 text-center mt-2 pb-3">${formatNumber(
    productPrice
  )}</div>
</div>`;
};

const formatNumber = (number) => {
  if (!number) {
    return "Liên Hệ";
  }
  return parseInt(number).toLocaleString("en-US").replace(/,/g, ".") + " đ";
};
setTimeout(() => {
  genAllCategories();
}, 200);

const genAllCategories = () => {
  Object.values(productList).forEach(renderCategories);
};
const onClickCategory = (cate, key) => {
  const classActive = "cate-item--active";
  const activeCate = document.querySelector(`.${classActive}`);
  activeCate.classList.remove(classActive);
  const selectEl = document.querySelector(`#${key}`);
  selectEl.classList.add(classActive);
  if (cate === "all") {
    return genAllCategories();
  }
  Object.keys(productList).forEach((itemKey) => {
    if (itemKey !== cate) {
      document.querySelector(`#${itemKey}`).classList.add("d-none");
    }
  });

  renderCategories(productList[cate]);
};
