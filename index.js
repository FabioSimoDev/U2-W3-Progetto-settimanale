const row = document.querySelector(".row");

const cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartTotal = localStorage.getItem("cartTotal") || 0;

const saved = JSON.parse(localStorage.getItem("saved")) || [];
let savedTotal = localStorage.getItem("savedTotal") || 0;

let sortedCryteria = "standard";

let allGames = [];

const fillCards = function (card, gameData) {
  const img = card.querySelector("img");
  const title = card.querySelector(".card-title");
  const price = card.querySelector(".card-subtitle");
  const description = card.querySelector(".card-text");
  const button = card.querySelector(".btn");

  img.src = gameData.imageUrl;
  title.textContent = gameData.name;
  price.innerHTML =
    gameData.price !== 0 ? `${gameData.price}&euro;` : `<i>GRATIS`;
  description.textContent = gameData.description;
  resizeImage(img);

  img.addEventListener("click", () => {
    openDetails(
      gameData.name,
      gameData._id,
      gameData.description,
      gameData.price,
      gameData.imageUrl,
      gameData.brand
    );
  });
  title.addEventListener("click", () => {
    openDetails(
      gameData.name,
      gameData._id,
      gameData.description,
      gameData.price,
      gameData.imageUrl,
      gameData.brand
    );
  });
};

const createCard = function (data, sortMode = sortedCryteria) {
  const cardContainer = document.querySelectorAll(".card-container");
  console.log(
    "sono nella funzione createCard, data:",
    data,
    "allGames:",
    allGames
  );
  if (sortedCryteria === "reverse") {
    data.reverse();
    console.log("reverse!");
  } else if (data[0]._id !== allGames[0]._id) {
    console.log("sono diversi!: ", data[0], allGames[0]);
    data.reverse();
  } else {
    console.log("sono uguali!: ", data[0], allGames[0]);
  }
  //console.log(allGames);
  data.forEach((game, index) => {
    //console.log("sono nel foreach di data!", data, sortedCryteria);
    let column;
    if (cardContainer.length === 0) {
      column = document.createElement("div");
      column.classList.add(
        "col-xxl-2",
        "col-xl-3",
        "col-md-4",
        "col-sm-6",
        "col-12",
        "mb-4",
        "card-container"
      );
    } else {
      column = cardContainer[index];
    }
    column.innerHTML = `
                      <div class="card">
                          <img src="..." class="card-img-top card-image" alt="game-logo" role="button"/>
                          <div class="card-body">
                              <h5 class="card-title text-truncate mb-2 fw-bold" role="button">Card title</h5>
                              <h6 class="card-subtitle text-body-secondary mb-2"></h6>
                              <p class="card-text text-body-secondary" style="display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;">
                                  Some quick example text to build on the card title and make up
                                  the bulk of the card's content.
                              </p>
                              <div class="btn-group w-100 d-flex mx-auto" role="group">
                                <button class="btn btn-success w-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                </button>
                                <button class="btn  btn-outline-primary w-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
                                </svg></button>
                              </div>
                          </div>
                      </div>`;
    row.appendChild(column);
    const currentCard = column.querySelector(".card");
    const addToCartBtn = currentCard.querySelector(".btn.btn-success");
    const saveForLaterBtn = currentCard.querySelector(
      ".btn.btn-outline-primary"
    );
    addToCartBtn.addEventListener("click", () => {
      addToCart(game);
    });
    saveForLaterBtn.addEventListener("click", () => {
      saveForLater(game);
    });
    fillCards(currentCard, game);
  });
};

const sort = function () {
  sortedCryteria = sortedCryteria === "standard" ? "reverse" : "standard";
  createCard(JSON.parse(JSON.stringify(allGames)), sortedCryteria);
  //ho perso tre ore a provare a capire per quale motivo, dopo il primo sort, 'allGames' veniva invertito.
  //alla fine era la cosa più stupida del mondo, lo passavo come argomento alla funzione quindi 'data' non era più il risultato della fetch, ma 'allGames'.
  //per risolvere questo problema, passo come argomento alla funzione 'createCard' una copia 'profonda' di allGames.
};

const addToCart = function (game) {
  cartTotal += game.price;
  cart.push(game);
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("cartTotal", cartTotal);
};

const openCart = function () {
  location.assign("cart.html");
};

const saveForLater = function (game) {
  savedTotal++;
  saved.push(game);
  localStorage.setItem("saved", JSON.stringify(saved));
  localStorage.setItem("savedTotal", savedTotal);
};

const openDetails = function (title, id, description, price, img, brand) {
  title = encodeURIComponent(title);
  const url = `detail.html?title=${title}&id=${id}&description=${description}&price=${price}&imgUrl=${img}&brand=${brand}`;
  location.assign(url);
};

// const deepCopyArrayOfObjects = function (arr) {
//   return arr.map((obj) => {
//     return Object.keys(obj).reduce((acc, key) => {
//       if (typeof obj[key] === "object" && obj[key] !== null) {
//         acc[key] = deepCopyArrayOfObjects([obj[key]])[0];
//       } else {
//         acc[key] = obj[key];
//       }
//       return acc;
//     }, {});
//   });
// };

window.onload = () => {
  const spinner = document.getElementById("loading-spinner");
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "GET", //lo specifico perchè mi trovo meglio
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWRkODEzOWM0MzAwMTg4MTQ1NjAiLCJpYXQiOjE2OTcxODExNDUsImV4cCI6MTY5ODM5MDc0NX0.3SpNy2LF39kbucnrx1U4bVx4rBMRkB2BN6DPHQh9-9w"
    }
  })
    .then((res) => {
      if (res.ok) {
        spinner.classList.add("d-none");
        return res.json();
      } else {
        throw new Error("Errore nella POST");
      }
    })
    .then((games) => {
      // console.log(games);
      console.log("allGames prima della copia: ", allGames);
      allGames = JSON.parse(JSON.stringify(games));
      console.log("allGames dopo la copia: ", allGames);
      console.log("games nel fetch:", games);
      //console.log(allGames);
      createCard(games);
    })
    .catch((err) => {
      console.log("errore: ", err);
      spinner.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-x-lg" viewBox="0 0 16 16">
                              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                            <p class="fs-6 mt-2">Il server non risponde, riprova più tardi.</p>`;
    });
};

const aspectRatio = 1.3;
const desiredHeight = 350;

function resizeImage(img = undefined) {
  if (img) {
    const calculatedHeight = aspectRatio * img.clientWidth;
    img.style.height = `${calculatedHeight}px`;
  } else {
    const allImages = document.querySelectorAll(".card-image");
    Array.from(allImages).forEach((img) => {
      const calculatedHeight = aspectRatio * img.clientWidth;
      img.style.height = `${calculatedHeight}px`;
    });
  }
}

window.addEventListener("resize", () => {
  resizeImage();
});
