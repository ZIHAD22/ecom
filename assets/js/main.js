/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== Menu Show =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== Hide Show =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== IMAGE GALLERY ===============*/
function imgGallery() {
  const mainImg = document.querySelector(".details__img"),
    smallImg = document.querySelectorAll(".details__small-img");

  smallImg.forEach((img) => {
    img.addEventListener("click", function () {
      mainImg.src = this.src;
    });
  });
}

imgGallery();

/*=============== SWIPER CATEGORIES ===============*/
let swiperCategories = new Swiper(".categories__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    350: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
  },
});

/*=============== SWIPER PRODUCTS ===============*/
let swiperProducts = new Swiper(".new__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

/*=============== PRODUCTS TABS ===============*/
const tabs = document.querySelectorAll("[data-target]"),
  tabsContents = document.querySelectorAll("[content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabsContents.forEach((tabsContent) => {
      tabsContent.classList.remove("active-tab");
    });

    target.classList.add("active-tab");

    tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });

    tab.classList.add("active-tab");
  });
});

/*=============== API ===============*/
/*=============== login register ===============*/

document.addEventListener("DOMContentLoaded", () => {
  // Select the login and register forms
  const loginForm = document.querySelector(".login form");
  const registerForm = document.querySelector(".register form");

  // Login Form Submission
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = loginForm.querySelector("input[type='email']").value;
      const password = loginForm.querySelector("input[type='password']").value;

      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();
        console.log(data);
        if (data.success) {
          alert(data.message); // Success message
          console.log("Token:", data.data.accessToken); // Access token for use
          localStorage.setItem("accessToken", data.data.accessToken); // Store token
          // Redirect to another page (e.g., dashboard)
          window.location.href = "index.html";
        } else {
          alert(data.message || "Login failed!");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Something went wrong. Please try again!");
      }
    });
  }

  // Register Form Submission
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = registerForm.querySelector(
        "input[placeholder='Username']"
      ).value;
      const email = registerForm.querySelector("input[type='email']").value;
      const password = registerForm.querySelector(
        "input[type='password']"
      ).value;
      const confirmPassword = registerForm.querySelector(
        "input[placeholder='Confirm Password']"
      ).value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          }
        );

        const data = await response.json();

        if (data.success) {
          alert(data.message); // Success message
          console.log("Registered User ID:", data.data.id); // User ID
          // Redirect to login page
          window.location.href = "login-register.html";
        } else {
          alert(data.message || "Registration failed!");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Something went wrong. Please try again!");
      }
    });
  }
});

/*=============== dynamic header ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const authItem = document.getElementById("auth-item");
  const authLink = document.getElementById("auth-link");

  // Check if user is logged in
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    // If logged in, show Logout
    authLink.textContent = "Logout";
    authLink.href = "#";
    authLink.classList.add("logout-link");

    // Add logout functionality
    authLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("accessToken"); // Remove token
      window.location.reload(); // Reload the page to update UI
    });
  } else {
    // If not logged in, show Login/Register
    authLink.textContent = "Login";
    authLink.href = "login-register.html";
    authLink.classList.remove("logout-link");
  }
});

/*=============== dynamic header ===============*/

document.addEventListener("DOMContentLoaded", () => {
  // Get the current URL
  const url = new URL(window.location.href);

  // Get the value of the 'cat' query parameter
  const category = url.searchParams.get("cat");

  console.log(category);
  const data = [
    {
      id: 1,
      name: "Colorful Pattern Shirts",
      category: "T-shirt",
      images: {
        default: "assets/img/product-1-1.jpg",
        hover: "assets/img/product-1-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "Hot",
      links: {
        details: "details.html",
      },
    },
    {
      id: 2,
      name: "Colorful Pattern Shirts",
      category: "T-shirt",
      images: {
        default: "assets/img/product-2-1.jpg",
        hover: "assets/img/product-2-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-30%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 3,
      name: "Colorful Pattern Shirts",
      category: "Shoes",
      images: {
        default: "assets/img/product-3-1.jpg",
        hover: "assets/img/product-3-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-22%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 4,
      name: "Colorful Pattern Shirts",
      category: "Jumpsuit",
      images: {
        default: "assets/img/product-4-1.jpg",
        hover: "assets/img/product-4-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-22%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 5,
      name: "Colorful Pattern Shirts",
      category: "Scarf-Cap",
      images: {
        default: "assets/img/product-5-1.jpg",
        hover: "assets/img/product-5-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: null,
      links: {
        details: "details.html",
      },
    },
    {
      id: 6,
      name: "Colorful Pattern Shirts",
      category: "T-shirt",
      images: {
        default: "assets/img/product-6-1.jpg",
        hover: "assets/img/product-6-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-30%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 7,
      name: "Colorful Pattern Shirts",
      category: "Jumpsuit",
      images: {
        default: "assets/img/product-7-1.jpg",
        hover: "assets/img/product-7-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-22%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 8,
      name: "Colorful Pattern Shirts",
      category: "T-shirt",
      images: {
        default: "assets/img/product-8-1.jpg",
        hover: "assets/img/product-8-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: null,
      links: {
        details: "details.html",
      },
    },
    {
      id: 9,
      name: "Colorful Pattern Shirts",
      category: "T-shirt",
      images: {
        default: "assets/img/product-9-1.jpg",
        hover: "assets/img/product-9-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-22%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 10,
      name: "Colorful Pattern Shirts",
      category: "Sandal",
      images: {
        default: "assets/img/product-10-1.jpg",
        hover: "assets/img/product-10-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-30%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 11,
      name: "Colorful Pattern Shirts",
      category: "Jumpsuit",
      images: {
        default: "assets/img/product-11-1.jpg",
        hover: "assets/img/product-11-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-22%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 12,
      name: "Colorful Pattern Shirts",
      category: "Jumpsuit",
      images: {
        default: "assets/img/product-12-1.jpg",
        hover: "assets/img/product-12-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: null,
      links: {
        details: "details.html",
      },
    },
  ];

  const productContainer = document.getElementById("product-container");
  const totalProducts = document.getElementById("total-products");

  // Ensure that the elements exist before proceeding
  if (!productContainer || !totalProducts) {
    console.error("Required elements are missing in the DOM.");
    return;
  }

  // Filter products if category is provided in the URL
  const productsToDisplay = category
    ? data.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      )
    : data; // If no category, display all products

  totalProducts.textContent = `We found ${productsToDisplay.length} items for you!`;

  // Loop through filtered products and create HTML
  productsToDisplay.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product__item");

    productItem.innerHTML = `
      <div class="product__banner">
        <a href="details.html?productId=${product.id}" class="product__images">
          <img
            src="${product.images.default}"
            alt="${product.name}"
            class="product__img default"
          />
          <img
            src="${product.images.hover}"
            alt="${product.name}"
            class="product__img hover"
          />
        </a>
        <div class="product__actions">
          <a href="${product.name}" class="action__btn" aria-label="Quick View">
            <i class="fi fi-rs-eye"></i>
          </a>
          <a href="${
            product.name
          }" class="action__btn" aria-label="Add to Wishlist">
            <i class="fi fi-rs-heart"></i>
          </a>
          <a href="${product.name}" class="action__btn" aria-label="Compare">
            <i class="fi fi-rs-shuffle"></i>
          </a>
        </div>
        <div class="product__badge light-pink">${product.badge || ""}</div>
      </div>
      <div class="product__content">
        <span class="product__category">${product.category}</span>
        <a href="details.html?productId=${product.id}">
          <h3 class="product__title">${product.name}</h3>
        </a>
        <div class="product__rating">
          ${[...Array(product.ratings)]
            .map(() => '<i class="fi fi-rs-star"></i>')
            .join("")}
        </div>
        <div class="product__price flex">
          <span class="new__price">$${product.price.current.toFixed(2)}</span>
          ${
            product.price.old
              ? `<span class="old__price">$${product.price.old.toFixed(
                  2
                )}</span>`
              : ""
          }
        </div>
        <button class="action__btn cart__btn" aria-label="Add To Cart" onclick="addToCart(${
          product.id
        })">
          <i class="fi fi-rs-shopping-bag-add"></i>
        </button>
      </div>
    `;

    // Append the product item to the container
    productContainer.appendChild(productItem);

    // here add to cart section
  });
});
let cart;
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function updateCartCount() {
  const cartCountElement = document.querySelector("#cart");
  if (cartCountElement) {
    cartCountElement.textContent = cart.length; // Display total number of items in the cart
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the cart from localStorage or as an empty array
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to save the cart to localStorage

  // Function to update the cart count display

  // Add product to cart function that accepts product id

  // Update cart count when the page is loaded
  updateCartCount();
});
function addToCart(productId) {
  const data = [
    {
      id: 1,
      name: "Colorful Pattern Shirts",
      category: "T-shirt",
      images: {
        default: "assets/img/product-1-1.jpg",
        hover: "assets/img/product-1-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "Hot",
      links: {
        details: "details.html",
      },
    },
    {
      id: 2,
      name: "Colorful Pattern Shirts",
      category: "T-shirt",
      images: {
        default: "assets/img/product-2-1.jpg",
        hover: "assets/img/product-2-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-30%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 3,
      name: "Colorful Pattern Shirts",
      category: "Shoes",
      images: {
        default: "assets/img/product-3-1.jpg",
        hover: "assets/img/product-3-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-22%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 4,
      name: "Colorful Pattern Shirts",
      category: "Jumpsuit",
      images: {
        default: "assets/img/product-4-1.jpg",
        hover: "assets/img/product-4-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-22%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 5,
      name: "Colorful Pattern Shirts",
      category: "Scarf-Cap",
      images: {
        default: "assets/img/product-5-1.jpg",
        hover: "assets/img/product-5-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: null,
      links: {
        details: "details.html",
      },
    },
    {
      id: 6,
      name: "Colorful Pattern Shirts",
      category: "T-shirt",
      images: {
        default: "assets/img/product-6-1.jpg",
        hover: "assets/img/product-6-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-30%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 7,
      name: "Colorful Pattern Shirts",
      category: "Jumpsuit",
      images: {
        default: "assets/img/product-7-1.jpg",
        hover: "assets/img/product-7-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-22%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 8,
      name: "Colorful Pattern Shirts",
      category: "T-shirt",
      images: {
        default: "assets/img/product-8-1.jpg",
        hover: "assets/img/product-8-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: null,
      links: {
        details: "details.html",
      },
    },
    {
      id: 9,
      name: "Colorful Pattern Shirts",
      category: "T-shirt",
      images: {
        default: "assets/img/product-9-1.jpg",
        hover: "assets/img/product-9-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-22%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 10,
      name: "Colorful Pattern Shirts",
      category: "Sandal",
      images: {
        default: "assets/img/product-10-1.jpg",
        hover: "assets/img/product-10-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-30%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 11,
      name: "Colorful Pattern Shirts",
      category: "Jumpsuit",
      images: {
        default: "assets/img/product-11-1.jpg",
        hover: "assets/img/product-11-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: "-22%",
      links: {
        details: "details.html",
      },
    },
    {
      id: 12,
      name: "Colorful Pattern Shirts",
      category: "Jumpsuit",
      images: {
        default: "assets/img/product-12-1.jpg",
        hover: "assets/img/product-12-2.jpg",
      },
      actions: {
        quickView: "#",
        wishlist: "#",
        compare: "#",
        addToCart: "#",
      },
      ratings: 5, // All 5 stars
      price: {
        current: 238.85,
        old: 245.8,
      },
      badge: null,
      links: {
        details: "details.html",
      },
    },
  ];

  // Find the product by id from the data array
  const product = data.find((product) => product.id === productId);

  if (!product) {
    console.error("Product not found!");
    return; // Exit if product doesn't exist
  }

  // Log the product details
  console.log("Product Added to Cart:", {
    id: product.id,
    name: product.name,
    price: product.price.current,
    image: product.images.default,
  });

  // Check if the product is already in the cart
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex === -1) {
    // Add the product to the cart if it's not already there
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price.current,
      image: product.images.default,
    });
  } else {
    // Optionally, you can update the quantity if the product is already in the cart
    // cart[existingProductIndex].quantity += 1;
  }

  // Save the updated cart to localStorage
  saveCartToLocalStorage();

  // Update the cart count display
  updateCartCount();
}
