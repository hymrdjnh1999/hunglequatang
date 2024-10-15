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
  getMockProductList() {
    return this.productList;
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
    return newProductList;
  }

  getProductListFromIndexedDB() {
    return new Promise((resolve, reject) => {
      // Open the IndexedDB database
      let request = indexedDB.open("ProductDatabase", 1);

      request.onsuccess = function (event) {
        let db = event.target.result;
        let transaction = db.transaction(
          ["cups", "memories", "medals", "flags"],
          "readonly"
        );

        // Object to hold all the retrieved product data
        let allProducts = {
          cups: [],
          memories: [],
          medals: [],
          flags: [],
        };

        // Function to get data from a specific store
        const getStoreData = (storeName) => {
          return new Promise((storeResolve, storeReject) => {
            const objectStore = transaction.objectStore(storeName);
            const getAllRequest = objectStore.getAll(); // Fetch all entries in the store

            getAllRequest.onsuccess = function () {
              storeResolve(getAllRequest.result);
            };

            getAllRequest.onerror = function (event) {
              storeReject(event.target.error);
            };
          });
        };

        // Fetch data from all stores
        Promise.all([
          getStoreData("cups").then((data) => (allProducts.cups = data)),
          getStoreData("memories").then(
            (data) => (allProducts.memories = data)
          ),
          getStoreData("medals").then((data) => (allProducts.medals = data)),
          getStoreData("flags").then((data) => (allProducts.flags = data)),
        ])
          .then(() => {
            resolve(allProducts); // Return all the products once fetched
          })
          .catch((error) => {
            reject("Error fetching data from IndexedDB: " + error);
          });
      };

      request.onerror = function (event) {
        reject("Error opening IndexedDB: " + event.target.error);
      };
    });
  }

  async getProductList() {
    try {
      const productList = await this.getProductListFromIndexedDB();
      console.log(productList); // You can now work with the productList
      return productList;
    } catch (error) {
      console.error(error);
    }
  }

  updateProductList(newProductList) {
    this.productList = newProductList;

    // Open IndexedDB
    let request = indexedDB.open("ProductDatabase", 1);

    request.onupgradeneeded = function (event) {
      let db = event.target.result;

      // Create an object store for each product category (if not already existing)
      if (!db.objectStoreNames.contains("cups")) {
        db.createObjectStore("cups", { keyPath: "productId" });
      }
      if (!db.objectStoreNames.contains("memories")) {
        db.createObjectStore("memories", { keyPath: "productId" });
      }
      if (!db.objectStoreNames.contains("medals")) {
        db.createObjectStore("medals", { keyPath: "productId" });
      }
      if (!db.objectStoreNames.contains("flags")) {
        db.createObjectStore("flags", { keyPath: "productId" });
      }
    };

    request.onsuccess = function (event) {
      let db = event.target.result;

      // Loop through product categories and add data to IndexedDB
      for (const category in newProductList) {
        if (newProductList.hasOwnProperty(category)) {
          const transaction = db.transaction([category], "readwrite");
          const store = transaction.objectStore(category);

          // Clear previous data
          store.clear();

          // Add updated data
          newProductList[category].data.forEach((product) => {
            store.put(product); // Insert each product
          });

          transaction.oncomplete = function () {
            console.log(`Data for category ${category} added to IndexedDB`);
          };

          transaction.onerror = function (event) {
            console.error(
              `Error adding data to ${category}:`,
              event.target.error
            );
          };
        }
      }
    };

    request.onerror = function (event) {
      console.error("Error opening IndexedDB:", event.target.error);
    };
  }

  addProduct(category, product) {
    return new Promise((resolve, reject) => {
      // Open the IndexedDB database
      let request = indexedDB.open("ProductDatabase", 1);

      request.onsuccess = function (event) {
        let db = event.target.result;

        // Check if the category exists in the database
        if (!db.objectStoreNames.contains(category)) {
          reject(`Category ${category} does not exist in IndexedDB`);
          return;
        }

        // Start a transaction for the target object store
        let transaction = db.transaction([category], "readwrite");
        let store = transaction.objectStore(category);

        // Add the product to the object store
        let addRequest = store.put(product); // Use `put` to update or insert if `productId` exists

        addRequest.onsuccess = function () {
          resolve(`Product added to ${category} successfully!`);
        };

        addRequest.onerror = function (event) {
          reject(`Error adding product to ${category}: ` + event.target.error);
        };

        transaction.oncomplete = function () {
          console.log("Transaction completed for adding product.");
        };

        transaction.onerror = function (event) {
          console.error("Transaction error:", event.target.error);
        };
      };

      request.onerror = function (event) {
        reject("Error opening IndexedDB: " + event.target.error);
      };
    });
  }
}
