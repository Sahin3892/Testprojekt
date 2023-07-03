let food = [
  {
    name: "Cheesburger",
    description: "100% Rindfleisch Salat Tomate Käse",
    price: "12.90",
  },
  {
    name: "Cheeseburger Deluxe",
    description:
      "Saftiges 100% Rindfleisch, Salat, Tomate, Käse, Zwiebeln, Spezialsauce",
    price: "14.90",
  },
  {
    name: "Spicy Jalapeno Burger",
    description:
      "100% Rindfleisch, Salat, Tomate, Käse, Jalapenos, scharfe Sauce",
    price: "14.90",
  },
  {
    name: "Mushroom Swiss Burger",
    description: "100% Rindfleisch, Salat, Tomate, Schweizer Käse, Champignons",
    price: "15.90",
  },
  {
    name: "BBQ Bacon Burger",
    description:
      "100% Rindfleisch, Salat, Tomate, Käse, knuspriger Bacon, BBQ-Sauce",
    price: "16.90",
  },
  {
    name: "Fish Burger",
    description: "Frisch gebratener Fisch, Salat, Tomate, Remoulade",
    price: "15.50",
  },
  {
    name: "Chicken Burger",
    description:
      "Gegrilltes Hähnchenfilet, Salat, Tomate, Käse, Honigsenfsauce",
    price: "13.50",
  },
  {
    name: "Veggie Burger",
    description: "Gemüse-Patty, Salat, Tomate, Käse, Avocado",
    price: "11.50",
  },
  {
    name: "Pommes frites",
    description: "Knusprige Kartoffelstäbchen. Perfekt gewürzt",
    price: "3.50",
  },
  {
    name: "Onion Rings",
    description: "Knusprig panierte Zwiebelringe",
    price: "4.50",
  },
  {
    name: "Coleslaw",
    description: "Erfrischender Krautsalat mit cremigem Dressing",
    price: "3.00",
  },
  {
    name: "Hausgemachte Limonade",
    description:
      "Erfrischende Limonade mit verschiedenen Fruchtgeschmacksrichtungen",
    price: "3.50",
  },
  {
    name: "Erdnussbutter-Milkshake",
    description: "Cremiger Milkshake mit Erdnussbutter und Schokolade",
    price: "5.50",
  },
  {
    name: "Cola",
    description: "Erfrischendes Softgetränk",
    price: "2.50",
  },
  {
    name: "Gelbe-Cola",
    description: "Kohlensäurehaltiges Getränk",
    price: "2.50",
  },
];

let basket = {}; // Use an object to store the basket

function render() {
  // Get the element with the ID "menu"
  const menuElement = document.getElementById("menu");

  // Clear the current content of the "menu" element
  menuElement.innerHTML = "";

  // Iterate over each food item in the "food" array
  for (let i = 0; i < food.length; i++) {
    const foodItem = food[i];

    // Add a new HTML div element to the "menu" element
    menuElement.innerHTML += /*html*/ `
      <div class="menu-list">
        <h4>${foodItem.name}</h4>
        <p>${foodItem.description}</p>
        <p>${foodItem.price.replace(".", ",")} €</p>
        <div class="add-btn-justify"><img class="add-btn" onclick="addToBasket(${i})" src="src/icons/plus.ico" alt="">
        </div>
      </div>
    `;
  }
}

function addToBasket(index) {
  const selectedFood = food[index];
  const name = selectedFood.name;
  const price = parseFloat(selectedFood.price);

  // Check if the selected food is already in the basket
  if (basket[name]) {
    // If yes, increase the quantity by 1
    basket[name].quantity++;
  } else {
    // If not, add the food item to the basket
    basket[name] = {
      name: name,
      price: price,
      quantity: 1,
    };
  }

  // Update the shopping basket display
  updateShoppingBasket();
}

function updateShoppingBasket() {
  let sum = 0;

  // Get the element with the ID "basket"
  const basketElement = document.getElementById("basket-items");

  // Clear the current content of the "basket" element
  basketElement.innerHTML = "";

  // Iterate over each item in the basket
  for (const itemName in basket) {
    const item = basket[itemName];
    const subtotal = item.price * item.quantity;
    sum += subtotal;

    // Add a new HTML p element to the "basket" element
    basketElement.innerHTML += /*html*/ ` <div>
         <p>${item.quantity}x - <span class="item-name">${
      item.name
    }</span> ${subtotal
      .toFixed(2)
      .replace(
        ".",
        ","
      )} € <img class="addMoreDelete" onclick="deleteOneFood(this)" src="src/icons/minus16.ico" alt=""> <img class="addMoreDelete" onclick="addOneMore(this)" src="src/icons/plus.ico" alt="" srcset=""> </p> </div>
`;
  }

  // Update the total sum display in the basket
  basketElement.innerHTML += /*html*/ `
    <p>Lieferkosten Frei</p>
  `;
  basketElement.innerHTML +=
    "Gesamtpreis " + sum.toFixed(2).replace(".", ",") + " €";
  basketElement.innerHTML += /*html*/ `
    <div onclick="order()" class="order-btn">Bestellen</div>
  `;
}

function addOneMore(element) {
  // Get the name of the item from the parent <p> element
  const itemName = element.parentNode.querySelector(".item-name").textContent;

  if (basket[itemName]) {
    basket[itemName].quantity++;
    updateShoppingBasket();
  }
}

function deleteOneFood(element) {
  const itemName = element.parentNode.querySelector(".item-name").textContent;

  if (basket[itemName]) {
    basket[itemName].quantity--;

    if (basket[itemName].quantity === 0) {
      delete basket[itemName]; // Delete Food
      
    }

    updateShoppingBasket();
  }
}


function order() {
  if (Object.keys(basket).length === 0) {
    alert("Bitte fügen Sie Artikel zum Warenkorb hinzu.");
  } else {
    alert("Wird geliefert!");
  }
}
