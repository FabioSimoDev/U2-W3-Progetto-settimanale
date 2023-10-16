// import { removeAll } from "./cart.js"; era una prova inutile

const saved = JSON.parse(localStorage.getItem("saved")) || undefined;
const savedTotal = parseFloat(localStorage.getItem("savedTotal")) || undefined;
console.log(saved);
console.log(savedTotal);

const buttonGroup = document.querySelector(".btn-group"); //i bottoni 'acquista'e 'rimuovi tutto'

const savedContainer = document.querySelector(".saved-container");

const showEmptySaved = function () {
  savedContainer.innerHTML += `<p class='lead text-center text-warning'>nessun gioco salvato</p>`;
  if (buttonGroup) {
    buttonGroup.classList.add("d-none");
  }
};

if (saved && savedContainer && saved.length > 0) {
  let savedContainerHTML = "";
  Array.from(saved).forEach((game) => {
    savedContainerHTML += `
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
  savedContainer.innerHTML = savedContainerHTML;
  const removeElementBtn =
    savedContainer.querySelectorAll(".remove-element-btn") || [];
  Array.from(removeElementBtn).forEach((btn) => {
    btn.addEventListener("click", () => {
      const gameId = btn.getAttribute("data-game-id");
      removeFromsaved(btn, gameId);
    });
  });
} else if ((!saved && savedContainer) || saved.length === 0) {
  showEmptySaved();
}

const removeFromSaved = function (li, id) {
  li.parentElement.remove();
  console.log(li);
  console.log(id);
  saved.forEach((prop, index) => {
    if (prop._id === id) {
      saved.splice(index, 1);
    }
  });
  if (saved.length > 0) {
    localStorage.setItem("saved", JSON.stringify(saved));
  } else {
    localStorage.removeItem("saved");
    console.log(saved.length);
  }
};

const removeAllBtn = document.getElementById("remove-all-btn");
removeAllBtn.addEventListener("click", () => {
  removeAll("saved", "savedTotal", saved);
});

const addAllToCartBtn = document.getElementById("add-all-to-cart-btn");
addAllToCartBtn.addEventListener("click", () => {
  addAllToCart();
});

const addAllToCart = function () {
  const localStorageCart = JSON.parse(localStorage.getItem("cart"));
  let localStorageCartTotal = parseFloat(localStorage.getItem("cartTotal"));
  if (localStorageCart && localStorageCartTotal) {
    saved.forEach((savedGame) => {
      localStorageCart.push(savedGame);
      localStorageCartTotal += savedGame.price;
    });
    localStorage.setItem("cart", JSON.stringify(localStorageCart));
    localStorage.setItem("cartTotal", localStorageCartTotal);
  } else {
    console.log("cart non esiste nel localStorage > li creo");
    localStorage.setItem("cart", JSON.stringify(saved));
    localStorage.setItem("cartTotal", savedTotal);
  }
  localStorage.removeItem("saved");
  localStorage.removeItem("savedTotal");
  location.reload();
};

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
