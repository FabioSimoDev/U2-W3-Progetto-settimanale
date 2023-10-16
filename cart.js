const cart = JSON.parse(localStorage.getItem("cart")) || undefined;
const cartTotal = parseFloat(localStorage.getItem("cartTotal")) || undefined;

const buttonGroup = document.querySelector(".btn-group"); //i bottoni 'acquista'e 'rimuovi tutto'

console.log(cart);
console.log(cartTotal);

const cartContainer = document.querySelector(".cart-container");

const showEmptyCart = function () {
  cartContainer.innerHTML += `<p class='lead text-center text-warning'>carrello vuoto</p>`;
  if (buttonGroup) {
    buttonGroup.classList.add("d-none");
  }
};

if (cart && cartContainer && cart.length > 0) {
  let cartContainerHTML = "";
  Array.from(cart).forEach((game) => {
    cartContainerHTML += `
                                      <li class="list-group-item d-flex align-items-center justify-content-between">
                                          ${game.name} - ${game.price}&euro; 
                                          <button class="btn btn-outline-danger border-0 remove-element-btn" data-game-id="${game._id}">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-dash" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                          </svg>
                                          </button>
                                      </li>`;
  });
  cartContainer.innerHTML = cartContainerHTML;
  const removeElementBtn =
    cartContainer.querySelectorAll(".remove-element-btn") || [];
  Array.from(removeElementBtn).forEach((btn) => {
    btn.addEventListener("click", () => {
      const gameId = btn.getAttribute("data-game-id");
      removeFromCart(btn, gameId);
    });
  });
} else if ((!cart && cartContainer) || cart.length === 0) {
  showEmptyCart();
}

const removeFromCart = function (li, id) {
  li.parentElement.remove();
  console.log(li);
  console.log(id);
  cart.forEach((prop, index) => {
    if (prop._id === id) {
      cart.splice(index, 1);
    }
  });
  if (cart.length > 0) {
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    localStorage.removeItem("cart");
    console.log(cart.length);
    showEmptyCart();
  }
};

const removeAllBtn = document.getElementById("remove-all-btn");
removeAllBtn.addEventListener("click", () => {
  removeAll("cartTotal", "cart", cart);
});

const buyAllBtn = document.getElementById("buy-all-btn");
buyAllBtn.addEventListener("click", () => {
  if (confirm(`Sicuro? pagherai ${cartTotal.toFixed(2)} euro.`)) {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartTotal");
    alert(`Hai acquistato ${cart.length} giochi.`);
    location.reload();
  }
});

//azzera dinamicamente tutti i valori che gli passi come argomento, e opzionalmente svuota anche una key nel local storage
const removeAll = function (
  localStorageKey = undefined,
  localStorageKey2,
  ...elements
) {
  console.log("rimuovo..", localStorageKey, elements);
  elements.forEach((element) => {
    if (Array.isArray(element)) {
      element.length = 0;
      console.log("è un array");
    } else if (typeof element === "number") {
      element = 0;
    } else if (typeof element === "string") {
      element = "";
    }
  });
  if (localStorageKey) {
    localStorage.removeItem(localStorageKey);
    if (localStorageKey2) {
      localStorage.removeItem(localStorageKey2);
    }
  }
  location.reload();
  console.log("dopo la rimozione: ", localStorageKey, elements);
};

// export { removeAll };
