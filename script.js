// let cart = [];
const products =[
  {
    id: 1,
    name: "sofa",
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
    name: "phone",
    image: "phone.jpeg",
    price: 20000.0,
    quantity: 15,
  },
  {
    id: 5,
    name: "sofa",
    image: "sofa.jpeg",
    price: 1500.0,
    quantity: 25,
  },
  {
    id: 6,
    name: "Water Bottle",
    image: "bottle.jpeg",
    price: 225.0,
    quantity: 10,
  },
  {
    id: 7,
    name: "sofa",
    image: "sofa.jpeg",
    price: 20000.0,
    quantity: 15,
  },
  {
    id: 8,
    name: "Watch",
    image: "watch.jpeg",
    price: 1500.0,
    quantity: 25,
  },
  {
    id: 9,
    name: "Water Bottle",
    image: "bottle.jpeg",
    price: 225.0,
    quantity: 10,
  },
  {
    id: 10,
    name: "sofa",
    image: "sofa.jpeg",
    price: 20000.0,
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
        <button style="background:red" onclick="decrementQuantity(${product.id})">-</button>
        <button style="background:blue" onclick="decrementQuantity(${product.id})">+</button>
       
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
  updateCartDisplay();
}




 // Increment product quantity
 function incrementQuantity(id) {
  const product = cart.find(item => item.id === id);
  if (product) {
    product.quantity += 1;
  }
  updateCartDisplay();
}

// Decrement product quantity
function decrementQuantity(id) {
  const product = cart.find(item => item.id === id);
  if (product && product.quantity > 1) {
    product.quantity -= 1;
  }
  updateCartDisplay();
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartDisplay();
}

// Calculate Total Price
function calculateTotalPrice() {
  return cart.reduce((total, product) => total + product.price * product.quantity, 0);
}

// Calculate Average Price
function calculateAveragePrice() {
  if (cart.length === 0) return 0;
  return calculateTotalPrice() / cart.length;
}

// Clear Cart
function clearCart() {
  products = [];
  console.log("Your cart is now empty.");
  updateCartDisplay();
  hideClearCartButton(); 
}

// Update Cart Display
function updateCartDisplay() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";  // Clear the cart display

  if (cart.length === 0) {
    // If the cart is empty, hide the Clear Cart button
    hideClearCartButton();
  } else {
    // Display the cart items
    products.forEach((product) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <h4>${product.name}</h4>
        <img src="${product.image}" alt="${product.name}" style="width:100px;height:100px;">
        <p>Price: $${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
        <button onclick="removeFromCart(${product.id})">Remove  from cart</button>
      `;
      cartContainer.appendChild(cartItem);
    });
  }


  document.getElementById("total-price").innerText = `Total Price: $${calculateTotalPrice().toFixed(2)}`;
  document.getElementById("average-price").innerText = `Average Price: $${calculateAveragePrice().toFixed(2)}`;
}
