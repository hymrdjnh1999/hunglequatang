export class MyData {
  

  productList = {};
  constructor() {
    

    // Call setProductIds inside the constructor
   
  }
  getMockProductList() {
    return this.productList;
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
          others: [],
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
