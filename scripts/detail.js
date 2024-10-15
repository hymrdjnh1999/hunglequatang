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
  settingSwipper();
});

const settingProductInfo = (product) => {
  console.log(product);
  const { imageURL, productName, productPrice } = product;
  const productImgSection = document.querySelector("#img-slides");
  const productImgThumsSection = document.querySelector("#img-slides-thums");
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
};

function settingSwipper() {
  setTimeout(() => {
    var swiper = new Swiper(".galley-thums", {
      spaceBetween: 10,
      slidesPerView: 6,
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

const onClickLogo = () => {
  window.location.href = localStorage.getItem("rootURL");
};
