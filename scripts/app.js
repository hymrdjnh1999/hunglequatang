const cups = [
  {
    /** imageURL: ảnh của sản phẩm 
      => muốn hiển ảnh ở trang chủ hãy để ảnh đó lên đầu
      => ví dụ như ở sản phẩm này ảnh: 
      ./assets/images/cups/cup-ngoi-sao/cup-ngoi-sao.jpg 
      sẽ được hiển thị lên trang chủ 
     */
    imageURL: [
      "./assets/images/cups/cup-ngoi-sao/cup-ngoi-sao.jpg",
      "./assets/images/cups/cup-pha-le-canh-buom/cup-pha-le-canh-buom.webp",
      "./assets/images/cups/cup-pha-le-vinh-danh/cup-pha-le-vinh-danh.jpg",
      "./assets/images/cups/cup-pha-le-vinh-danh2/cup-pha-le-vinh-danh2.jpg",
      "./assets/images/cups/cup-ngoi-sao/cup-ngoi-sao.jpg",
      "./assets/images/flags/khung-bang-khen-a3/khung-bang-khen-a3.jpg",
    ],
    // Tên sản phẩm
    productName: "Cúp pha lê hình trụ ngôi sao",
    // Giá sản phẩm
    productPrice: "130000",
    // status là trạng thái => true là còn hàng, false là hết hàng
    status: true,
    // infomation: là thông tin của sản phẩm => mô tả về sản phẩm
    infomation: {
      info1: "Bề dày khung: 3.5cm",
      info2: "Bản khung sâu: 1cm",
      info3: "Kích thước: (21x30)cm",
      info4:
        "Chất liệu: Nhựa composite sản xuất theo công nghệ Hàn Quốc, chống mối mọt.",
      info5: "Mặt trước: Khung có mặt mica dày 1ly(hoặc kính)",
      info6:
        "Mặt sau (hậu): MDF trắng 2 mặt chống mốc. Có thể thay đổi thành bề mặt mica(3rem) báo giá riêng",
      info7:
        "Hình thức: Khung có móc treo ngang, dọc. Khung để bàn có móc treo và chân trống để bàn báo giá riêng",
    },
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
// Sản phẩm: Kỷ Niệm Chương
const memories = [
  {
    imageURL: ["./assets/images/cups/cup-ngoi-sao/cup-ngoi-sao.jpg"],
    productName: "Cúp pha lê hình trụ ngôi sao",
    productPrice: "130000",
  },
];
// Sản phẩm: Huy Chương
const medals = [
  {
    imageURL: ["./assets/images/medals/huy-chuong1/huy-chuong-cac-loai-1.webp"],
    productName: "Huy chương các loại",
    productPrice: "",
  },
];
// Sản phẩm: Cờ
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
function setProductIds(productList) {
  let productCounter = 0;

  Object.keys(productList).forEach((category) => {
    productList[category].data = productList[category].data.map((product) => {
      productCounter += 1;
      const randomPart = Math.random().toString(36).substring(2, 8);
      product.productId = `${category}-${randomPart}-${productCounter}`;
      return product;
    });
  });
}

setProductIds(productList);
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
    const productItems = document.querySelectorAll(".product-items");
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
  } d-flex flex-column product-items">
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
    localStorage.removeItem("productList");
    localStorage.setItem("productList", JSON.stringify(productList));
    localStorage.removeItem("productSelect");
    localStorage.removeItem("productList");
    localStorage.setItem("productList", JSON.stringify(productList));
    localStorage.setItem(
      "productSelect",
      JSON.stringify({
        product,
        productIndex,
        productKey,
      })
    );
    let href = "/detail.html";
    if (localStorage.getItem("rootURL") !== "/") {
      href = localStorage.getItem("rootURL") + "/detail.html";
    }
    window.location.href = href;
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

document.addEventListener("DOMContentLoaded", () => {
  let rootURL = "/" + window.location.pathname?.split("/")[1];
  if (["127.0.0.1", "localhost"].includes(window.location.host.split(":")[0])) {
    rootURL = "/";
  }

  localStorage.removeItem("rootURL");
  localStorage.setItem("rootURL", rootURL);
  settingSwipper();
});

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
window.addEventListener("resize", () => {
  console.log("screen resize");
  settingSwipper();
});

const onClickLogo = () => {
  window.location.href = localStorage.getItem("rootURL");
};
