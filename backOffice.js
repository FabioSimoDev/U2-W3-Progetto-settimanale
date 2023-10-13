const addressBarContent = new URLSearchParams(location.search);
const gameID = addressBarContent.get("id");
const gameTitle = addressBarContent.get("title");
const gamePrice = addressBarContent.get("price");
const gameDescription = addressBarContent.get("description");
const gameImg = addressBarContent.get("img");
const gameBrand = addressBarContent.get("brand");

const modify_gameID = document.querySelector(".game-id-container");

let URL = "https://striveschool-api.herokuapp.com/api/product/";
let methodToUse = "POST";

const nameInput = document.getElementById("game-title");
const descriptionInput = document.getElementById("game-description");
const priceInput = document.getElementById("game-price");
const starsInput = document.getElementById("game-stars");
const brandInput = document.getElementById("game-brand");
const imageInput = document.getElementById("game-image");

const submitBTN = document.querySelector(".submit-btn");
console.log(submitBTN);

if (gameID) {
  methodToUse = "PUT";
  URL += gameID;

  Array.from(modify_gameID.querySelectorAll("label, input")).forEach(
    (element) => {
      element.removeAttribute("disabled");
      if (element.type === "text") {
        element.value = gameID;
      }
    }
  );
  nameInput.value = gameTitle;
  descriptionInput.textContent = gameDescription;
  priceInput.value = gamePrice;
  imageInput.value = gameImg;
  brandInput.value = gameBrand;
}

const formReference = document.getElementById("form");
//quando clicco il bottone del form
formReference.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("invio i dati all'API");

  console.log(
    nameInput.value,
    descriptionInput.value,
    priceInput.value,
    brandInput.value,
    imageInput.value
  );

  const newGame = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    // stars: starsInput.value,
    brand: brandInput.value,
    imageUrl: imageInput.value
  };

  fetch(URL, {
    method: methodToUse,
    body: JSON.stringify(newGame),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWRkODEzOWM0MzAwMTg4MTQ1NjAiLCJpYXQiOjE2OTcxODExNDUsImV4cCI6MTY5ODM5MDc0NX0.3SpNy2LF39kbucnrx1U4bVx4rBMRkB2BN6DPHQh9-9w"
    }
  })
    .then((res) => {
      if (res.ok) {
        console.log("tutto ok");
      } else {
        throw new Error("Errore nella POST");
      }
    })
    .catch((err) => {
      console.log("errore: ", err);
    });
});

const passToModify = function () {
  if (!gameID) {
    Array.from(modify_gameID.querySelectorAll("label, input")).forEach(
      (element) => {
        console.log("dfggdf");
        element.removeAttribute("disabled");
      }
    );
  } else {
  }
};

const remove = function () {
  if (confirm("sicuro?")) {
    methodToUse = "DELETE";
    submitBTN.click();
  }
};
