document.addEventListener("DOMContentLoaded", () => {});

document.addEventListener("DOMContentLoaded", () => {
  const { product, productKey } = JSON.parse(
    localStorage.getItem("productSelect")
  );
  const productListOrigin = JSON.parse(localStorage.getItem("productList"));
  const productListByKey = productListOrigin[productKey].data.filter(
    (x) => x.productId !== product.productId
  );
  settingProductInfo(product);
  settingProductNext(productListByKey);
  settingSwipper();
});

const settingProductNext = (productlist) => {
  const productNextSection = document.querySelector("#product-next");

  const productListByKeyHTML = productlist
    .map((product) =>
      renderProductNext({
        product,
      })
    )
    .join("");
  productNextSection.innerHTML =
    productListByKeyHTML || "Không còn sản phẩm nào";
};

const renderProductNext = (data) => {
  const { product } = data;
  const { imageURL, productName, productPrice, productKey } = product;
  return `<div data-product='${JSON.stringify({
    product,
    productKey,
  })}' class=" d-flex flex-column product-items">
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

const settingProductInfo = (product) => {
  console.log(product);
  const { imageURL, productName, productPrice, infomation, status } = product;
  const productImgSection = document.querySelector("#img-slides");
  const productImgThumsSection = document.querySelector("#img-slides-thums");
  const productInfoSection = document.querySelector("#product-info");
  let productImgHTML = "";
  let productImgThumsHTML = "";
  for (const image of imageURL) {
    productImgHTML += `
    <div class="swiper-slide">
        <img
        class="product-img"
        src="${image}"
        loading="lazy"
        alt="image 1"
        srcset=""
        />
    </div>`;
    productImgThumsHTML += `
    <div class="swiper-slide">
      <img
        class="product-img-thums"
        src="${image}"
        loading="lazy"
        alt="image 1"
        srcset=""
      />
    </div>`;
  }
  productImgSection.innerHTML = productImgHTML;
  productImgThumsSection.innerHTML = productImgThumsHTML;
  const productInfoHTML = `
  <div class="h2">${productName}</div>
          <div class="product-status">
            Tình trạng: <span class="status ${
              status ? "text-success" : "text-danger"
            }">${status ? "Còn hàng" : "Hết hàng"}</span>
          </div>
          <div class="price text-danger h2 mt-3">${formatNumber(
            productPrice
          )}</div>
          <div class="option-wrapper">
          ${
            infomation
              ? Object.values(infomation)
                  .map((option) => `<div class="option">${option}</div>`)
                  .join("")
              : ""
          }
          </div>
          <a class="buy-now-btn phone-mobile" href="tel:+84984869201">
            Bấm vào đây để liên hệ mua ngay
          </a>`;
  productInfoSection.innerHTML = productInfoHTML;
};

function settingSwipper() {
  setTimeout(() => {
    const currentBreakpoint = getCurrentBreakpoint();
    const mapping = {
      mobile: 3,
      tablet: 5,
      desktop: 5,
      largeDesktop: 6,
    };

    var swiper = new Swiper(".galley-thums", {
      spaceBetween: 10,
      slidesPerView: mapping[currentBreakpoint],
      freeMode: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".galley", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
      autoplay: {
        deplay: 2000,
        disableOnInteraction: false,
      },
    });
  }, 10);
}

window.addEventListener("resize", () => {
  console.log("screen resize");
  settingSwipper();
});

const onClickLogo = () => {
  window.location.href = localStorage.getItem("rootURL");
};

const renderProductList = (data) => {
  const { product, productKey, isClickAllCate, productIndex } = data;
  const { imageURL, productName, productPrice } = product;
  return `<div data-product='${JSON.stringify({
    product,
    productIndex,
    productKey,
  })}'  d-flex flex-column product-items">
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
