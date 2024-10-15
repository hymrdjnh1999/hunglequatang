export class MyData {
  cups = [
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
  memories = [
    {
      imageURL: ["./assets/images/cups/cup-ngoi-sao/cup-ngoi-sao.jpg"],
      productName: "Cúp pha lê hình trụ ngôi sao",
      productPrice: "130000",
    },
  ];
  // Sản phẩm: Huy Chương
  medals = [
    {
      imageURL: [
        "./assets/images/medals/huy-chuong1/huy-chuong-cac-loai-1.webp",
      ],
      productName: "Huy chương các loại",
      productPrice: "",
    },
  ];
  // Sản phẩm: Cờ
  flags = [
    {
      imageURL: [
        "./assets/images/flags/khung-bang-khen-a3/khung-bang-khen-a3.jpg",
      ],
      productName: "Khung bằng khen A3",
      productPrice: "60000",
    },
  ];

  productList = {};
  constructor() {
    this.productList = {
      cups: {
        key: "cups",
        contentKey: "cups-content",
        data: [...this.cups, ...this.cups],
      },
      memories: {
        key: "memories",
        contentKey: "memories-content",
        data: this.memories,
      },
      medals: {
        key: "medals",
        contentKey: "medals-content",
        data: this.medals,
      },
      flags: {
        key: "flags",
        contentKey: "flags-content",
        data: this.flags,
      },
    };

    // Call setProductIds inside the constructor
    this.productList = this.setProductIds(this.productList);
  }

  setProductIds(productList) {
    const newProductList = { ...productList };
    for (const category in productList) {
      let data = [];
      if (Object.hasOwnProperty.call(productList, category)) {
        const element = productList[category];
        data = element.data.map((x, idx) => ({
          ...x,
          productId: `${category}-${idx}`,
        }));
        newProductList[category] = { ...newProductList[category], data };
      }
    }
    console.log(newProductList);
    return newProductList;
  }

  getProductList() {
    return this.productList;
  }
  updateProductList(newProductList) {
    this.productList = newProductList;
  }
}
