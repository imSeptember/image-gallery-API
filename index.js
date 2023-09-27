const input = document.getElementById("input");
const welcomeText = document.querySelector(".welcome__container");
const plusZoom = document.querySelector(".zoom");

document.addEventListener("DOMContentLoaded", function () {
  input.focus();
});

input.addEventListener("keydown", function (event) {
  if (input.value !== "") {
    if (event.key === "Enter") getImages();
  }
});

async function getImages() {
  if (input.value !== "") {
    welcomeText.style.display = "none";
    // plusZoom.setAttribute("src", "IMG/plus-icon.png");
    const url =
      "https://api.unsplash.com/search/photos/?query=" +
      input.value +
      "&per_page=8&client_id=hGYlnHPMzxf89GDIdQJdkmyAd0mF8ccfGxv8Cz-K7xo";

    const response = await fetch(url);

    if (response.ok) {
      makingCards(await response.json());
    } else console.log(await response.json());
  }
}

const gridImages = document.querySelector(".grid");

function makingCards(arr) {
  clearCards();

  arr.results.forEach((element) => {
    const imageEl = document.createElement("div");
    imageEl.classList.add("img");
    imageEl.style.backgroundImage = "url(" + element.urls.raw + ")";
    gridImages.appendChild(imageEl);
  });
}

function clearCards() {
  gridImages.innerHTML = "";
}

// RANDOM

async function getRandomImages(count) {
  const urls = [];
  for (let i = 0; i < count; i++) {
    const url =
      "https://api.unsplash.com/photos/random?client_id=hGYlnHPMzxf89GDIdQJdkmyAd0mF8ccfGxv8Cz-K7xo";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const imageData = await response.json();
        const imageUrl = imageData.urls.raw;
        urls.push(imageUrl);
      } else {
        console.error(
          `Failed to fetch random image ${i + 1}:`,
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error(
        `An error occurred while fetching random image ${i + 1}:`,
        error
      );
    }
  }

  return urls;
}

// Fetch two random images
getRandomImages(2)
  .then((imageUrls) => {
    imageUrls.forEach((element) => {
      const imageEl = document.createElement("div");
      imageEl.classList.add("img");
      imageEl.style.backgroundImage = "url(" + element + ")";
      gridImages.appendChild(imageEl);
    });
  })
  .catch((error) => {
    console.error("Failed to fetch random images:", error);
  });
