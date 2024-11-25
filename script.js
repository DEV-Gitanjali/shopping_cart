let cart = [];
const products =[
  {
    id: 1,
    name: "Sofa",
    image: "sofa.jpeg",
    price: 20000.0,
    quantity: 15,
  },
  {
    id: 2,
    name: "Watch",
    image: "watch.jpeg",
    price: 1500.0,
    quantity: 25,
  },
  {
    id: 3,
    name: "Water Bottle",
    image: "bottle.jpeg",
    price: 225.0,
    quantity: 10,
  },

  {
    id: 4,
    name: "Phone",
    image: "phone.jpeg",
    price: 20000.0,
    quantity: 15,
  },

  {
    id: 5,
    name: "HeadPhone",
    image: "headphone.jpeg",
    price: 2000.0,
    quantity: 15,
  },
 
 
 
 
]

    // Display products
    const container = document.getElementById("product-list");
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product-card");
      productElement.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}">
        <p>Price: $${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
        <button onclick="addToCart(${product.id}, '${product.name}', '${product.image}', ${product.price}, 1)">Add to Cart</button>
       
      `;
      container.appendChild(productElement);
    });

    
// Add to Cart
function addToCart(id, name, image, price, quantity) {
  const existingProduct = cart.find((item) => item.id === id);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ id, name, image, price, quantity });
  }
  updateCartIcon();
}


// Update cart icon count
function updateCartIcon() {
  const cartIcon = document.querySelector(".cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartIcon.textContent = totalItems;
}


// Handle Cart Slider
const cartSlider = document.getElementById("cart-slider");
const closeCartBtn = document.getElementById("close-cart");
const cartIcon = document.querySelector(".icon[href='#cart']");
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

// Open the cart slider
cartIcon.addEventListener("click", () => {
  cartSlider.classList.add("active");
  displayCartItems();
});

// Close the cart slider
closeCartBtn.addEventListener("click", () => {
  cartSlider.classList.remove("active");
});



// Function to calculate the total price
function calculateTotalPrice() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Function to calculate the average price
function calculateAveragePrice() {
  if (cart.length === 0) return 0; // Avoid division by zero
  const totalPrice = calculateTotalPrice();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (totalPrice / totalItems).toFixed(2); // Rounded to 2 decimal places
}


// Function to calculate the average price
function calculateAveragePrice() {
  if (cart.length === 0) return 0; // Avoid division by zero
  const totalPrice = calculateTotalPrice();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (totalPrice / totalItems).toFixed(2); // Rounded to 2 decimal places
}

// Function to display cart items
// Function to increment the quantity of a cart item
function incrementQuantity(id) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity++;
  }
  updateCart();
}

// Function to decrement the quantity of a cart item
function decrementQuantity(id) {
  const item = cart.find((item) => item.id === id);
  if (item && item.quantity > 1) {
    item.quantity--;
  } else if (item) {
    // Remove item if quantity goes to zero
    cart = cart.filter((item) => item.id !== id);
  }
  updateCart();
}


// Function to remove an item from the cart
function removeFromCart(id) {
  // Filter out the item with the matching id
  cart = cart.filter((item) => item.id !== id);
  
  // Update the cart display and cart icon
  updateCart();
}


// Function to update cart items and prices

// Function to update the cart
function updateCart() {
  displayCartItems();
  updateCartIcon();
}

// Function to display cart items and total/average price
function displayCartItems() {
  cartItemsContainer.innerHTML = ""; // Clear previous items

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
    totalPriceElement.textContent = `Total Price: $0`;
    document.getElementById("average-price").textContent = `Average Price: $0`;
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Price: $${item.price * item.quantity}</p>
        <p>
          <button class="quantity-btn" onclick="decrementQuantity(${item.id})">-</button>
          ${item.quantity}
          <button class="quantity-btn" onclick="incrementQuantity(${item.id})">+</button>
        </p>
      </div>
      <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  // Update total and average price
  totalPriceElement.textContent = `Total Price: $${calculateTotalPrice()}`;
  document.getElementById("average-price").textContent = `Average Price: $${calculateAveragePrice()}`;
}



function clearCart() {
  
  cart = [];
  
  
  updateCart();  
  cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
  
  
  totalPriceElement.textContent = "Total Price: $0";
  averagePriceElement.textContent = "Average Price: $0";
}












