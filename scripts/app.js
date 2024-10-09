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
const memories = [];
const medals = [];
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
};
const renderCategories = (category) => {
  const { contentKey, data } = category;
  const productHtml = data.map(renderProductList).join("");
  const contentData = document.querySelector(`#${contentKey}`);
  if (productHtml) {
    contentData.innerHTML = productHtml;
  }
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
  Object.values(productList).forEach(renderCategories);
}, 200);
