const { createApp, onMounted, ref, computed, watch } = Vue;

const appConfig = {
  setup() {
    const products = ref([
      {
        id: 1,
        name: "Auto",
        desc: "Average savings of over $750*",
        img: "auto.svg",
      },
      {
        id: 2,
        name: "Homeowners",
        desc: "Protection for you and the roof over your head",
        img: "home.svg",
      },
      {
        id: 3,
        name: "Commercial Auto",
        desc: "Customize your coverage to fit your business needs",
        img: "commercial.svg",
      },
      {
        id: 4,
        name: "Boat",
        desc: "Coverage for your days on the water",
        img: "boat.svg",
      },
      {
        id: 5,
        name: "Motorcycle",
        desc: "Coverage for life on the open road",
        img: "motorcycle.svg",
      },
    ]);

    const selectedProducts = ref([]);

    const isPopupOpen = ref(false);

    const addToCart = (product) => {
      if (selectedProducts.value.some((item) => item.id === product.id)) {
        alert("You have already choosed this product!");
      } else {
        selectedProducts.value.push(product);
        localStorage.setItem(
          "selectedProducts",
          JSON.stringify(selectedProducts.value)
        );
      }
    };

    const removeFromCart = (index) => {
      selectedProducts.value.splice(index, 1);
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(selectedProducts.value)
      );
    };

    const selectedProductsDetails = computed(() => {
      return selectedProducts.value;
    });

    const selectedProductsCount = computed(() => {
      return selectedProducts.value.length;
    });

    watch(selectedProductsCount, (newCount) => {
      if (newCount === 0) {
        isPopupOpen.value = false;
      }
    });

    onMounted(async () => {
      const storedProducts = localStorage.getItem("selectedProducts");
      if (storedProducts) {
        selectedProducts.value = JSON.parse(storedProducts);
      }
      try {
        const response = await fetch("http://localhost:8000/products");
        const data = await response.json();
        products.value = data;
      } catch (err) {
        console.error("Error fetching pricing data:", err);
      }
      console.log("Vue is mounted");
    });

    return {
      products,
      selectedProductsDetails,
      selectedProductsCount,
      addToCart,
      removeFromCart,
      isPopupOpen,
    };
  },
};

createApp(appConfig).mount("#products");
