const addressBarContent = new URLSearchParams(location.search);

const gameImg = addressBarContent.get("imgUrl");
const gameName = addressBarContent.get("title");
const gameId = addressBarContent.get("id");
const gameDescription = addressBarContent.get("description");
const gamePrice = addressBarContent.get("price");
const gameBrand = addressBarContent.get("brand");

const imgContainer = document.querySelector(".img-section");
const detailsContainer = document.querySelector(".detail-section");
const pageImg = imgContainer.querySelector("img");
const pageTitle = detailsContainer.querySelector("h3");
const pagePrice = detailsContainer.querySelector("h5");
const pageDescription = detailsContainer.querySelector(".description");

pageImg.src = gameImg;
pageTitle.innerHTML = `${gameName}
                 <svg onclick="openBackOffice()" role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                    >
                    <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                    />
                    <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                </svg>`;
pagePrice.innerHTML = gamePrice !== 0 ? `${gamePrice}&euro;` : `GRATIS`;
pageDescription.textContent = gameDescription;

const openBackOffice = function () {
  const gameTitle = encodeURIComponent(gameName);
  const url = `backoffice.html?id=${gameId}&title=${gameTitle}&description=${gameDescription}&price=${gamePrice}&img=${gameImg}&brand=${gameBrand}`;
  location.assign(url);
};
