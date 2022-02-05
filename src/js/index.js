import { getDog } from "../helpers/getDog.js";
const board = document.querySelector(".board");
/*NUMBER_CARDS needs to be an even number */
const NUMBER_CARDS = 12;
const imagesCards = [];

function generateCard(image){
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("board__card-container");
  
  const card = document.createElement("div");
  card.classList.add("card");
  
  const cardFront = document.createElement("div");
  cardFront.classList.add("card__front");

  const cardBack = document.createElement("div");
  cardBack.classList.add("card__back");
  cardBack.style.backgroundImage = `url(${image})`;
  cardBack.style.backgroundSize = "cover";
  cardBack.style.backgroundPosition = "center";
  cardBack.style.backgroundRepeat = "no-repeat";

  card.appendChild(cardFront);
  card.appendChild(cardBack);
  card.addEventListener("click", function(){
    this.classList.toggle("card-hover");
  });

  cardContainer.appendChild(card);

  board.appendChild(cardContainer);
}

window.onload = async() => {
  const images = await generateRandomAssignment();
  for(let i = 0; i < NUMBER_CARDS; i++){
    generateCard(images[i]);
  }
};

async function getRandomImage(){
  try {
    const {message} = await getDog();
    imagesCards.push(message);
  } catch (error) {
    console.error(error);
  }
}

async function generateRandomAssignment() {
  const middle = Math.floor(NUMBER_CARDS / 2);
  for(let i = 0; i < middle; i++){
    await getRandomImage();
  }
  const duplicatedImages = imagesCards.reduce((acc, curr) => [...acc, curr, curr], []);

  const imagesInRandomOrder = duplicatedImages
    .map(image => ({data: image, random: Math.random()}))
    .sort((a, b) => a.random - b.random)
    .map(obj => obj.data);

  return imagesInRandomOrder;
}