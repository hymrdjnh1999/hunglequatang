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
    data: [...cups, ...cups],
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
const renderCategories = (category, isClickAllCate = true) => {
  const { contentKey, data, key } = category;
  const productHtml = data
    .map((product, productIndex) =>
      renderProductList({
        product,
        productIndex,
        productKey: key,
        isClickAllCate,
      })
    )
    .join("");
  const contentData = document.querySelector(`#${contentKey}`);
  setTimeout(() => {
    const productItems = document.querySelectorAll(".cate-items");
    productItems.forEach(onClickProductDetail);
  }, 200);
  contentData.className = "swiper-wrapper";
  const cateTitles = document.querySelectorAll(".cate-title");
  cateTitles.forEach((cate) => {
    cate.className = "h3 cate-title category-separate pt-2";
  });
  if (!isClickAllCate) {
    contentData.className = "cate-product-clicked";
    cateTitles.forEach((cate) => {
      cate.className = "h3 cate-title category-separate pt-2 d-none";
    });
  }
  contentData.innerHTML = "";
  if (productHtml) {
    contentData.innerHTML = productHtml;
    const contentEl = document.querySelector(`#${key}`);
    contentEl.classList.remove("d-none");
    contentEl.className = "swiper";
    if (!isClickAllCate) {
      contentEl.className = "";
    }
    if (isClickAllCate) {
      setTimeout(settingSwipper, 100);
    }
    return;
  }
  document.querySelector(`#${key}`).classList.add("d-none");
};
const renderProductList = (data) => {
  const { product, productKey, isClickAllCate, productIndex } = data;
  const { imageURL, productName, productPrice } = product;
  return `<div data-product='${JSON.stringify({
    product,
    productIndex,
    productKey,
  })}' class=" ${
    !isClickAllCate ? "cate-clicked-product-item" : "swiper-slide"
  } d-flex flex-column cate-items">
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

const onClickProductDetail = (item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const productData = JSON.parse(item.getAttribute("data-product"));
    const { product, productIndex, productKey } = productData;
    console.log(productData, "productData");
    localStorage.removeItem("productList");
    localStorage.setItem("productList", JSON.stringify(productList));
    localStorage.removeItem("selectProduct");
    localStorage.setItem(
      "selectProduct",
      JSON.stringify({
        product,
        productIndex,
        productKey,
      })
    );
  });
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
  Object.values(productList).forEach((data) => renderCategories(data, true));
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

  renderCategories(productList[cate], false);
};

document.addEventListener("DOMContentLoaded", settingSwipper);

function settingSwipper() {
  const currentBreakpoint = getCurrentBreakpoint();
  const mapping = {
    mobile: 1,
    tablet: 3,
    desktop: 4,
    largeDesktop: 5,
  };

  var swiper = new Swiper(".swiper", {
    direction: "horizontal",
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    slidesPerView: mapping[currentBreakpoint],
    slidesPerGroup: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

const breakpoints = {
  mobile: "0px",
  tablet: "768px",
  desktop: "1024px",
  largeDesktop: "1200px",
};

function getCurrentBreakpoint() {
  if (window.matchMedia(`(min-width: ${breakpoints.largeDesktop})`).matches) {
    return "largeDesktop";
  } else if (window.matchMedia(`(min-width: ${breakpoints.desktop})`).matches) {
    return "desktop";
  } else if (window.matchMedia(`(min-width: ${breakpoints.tablet})`).matches) {
    return "tablet";
  } else {
    return "mobile";
  }
}
window.addEventListener("resize", settingSwipper);

const onClickLogo = () => {
  console.log("logo clicked")
  window.location.href = "/";
};
