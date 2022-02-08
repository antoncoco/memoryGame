import { getDog } from "../helpers/getDog.js";
const board = document.querySelector(".board");
const wins = document.querySelector(".wins__number");
/*NUMBER_CARDS needs to be an even number */
const NUMBER_CARDS = 12;
const imagesCards = [];

let cardPairs = [];
let countPairsFound = 0;
let numberWins = 0;

function generateCard(image){
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("board__card-container");
  
  const card = document.createElement("div");
  card.classList.add("card");
  
  const cardFront = document.createElement("div");
  cardFront.classList.add("card__front");

  const cardBack = document.createElement("div");
  cardBack.classList.add("card__back");
  cardBack.setAttribute("number", image.number);
  cardBack.style.backgroundImage = `url(${image.value})`;
  cardBack.style.backgroundSize = "cover";
  cardBack.style.backgroundPosition = "center";
  cardBack.style.backgroundRepeat = "no-repeat";

  card.appendChild(cardFront);
  card.appendChild(cardBack);
  card.addEventListener("click", logicGame);

  cardContainer.appendChild(card);

  board.appendChild(cardContainer);
  wins.innerText = numberWins;
}

async function logicGame(evt){
  if(cardPairs.length >= 2){
    return;
  }
  cardPairs.push(this);
  this.classList.toggle("card-hover");
  if(cardPairs.length === 2){
    const cardBack1 = cardPairs[0].childNodes[1];
    const cardBack2 = cardPairs[1].childNodes[1];
    if(compareCards(cardBack1, cardBack2)){
      cardPairs[0].removeEventListener("click", logicGame);
      cardPairs[1].removeEventListener("click", logicGame);
      countPairsFound++;
      if(countPairsFound == Math.floor(NUMBER_CARDS / 2)){
        numberWins++;
        wins.innerText = numberWins;
      }
    }else{
      await new Promise(resolve => setTimeout(resolve, 500));
      cardPairs[0].classList.remove("card-hover");
      cardPairs[1].classList.remove("card-hover");
    }
    cardPairs = [];
  }
}

function compareCards(cardBack1, cardBack2) {
  return (
    cardBack1.style.backgroundImage === cardBack2.style.backgroundImage
    && (
      cardBack1.getAttribute("number") == 1 && cardBack2.getAttribute("number") == 2
      || cardBack1.getAttribute("number") == 2 && cardBack2.getAttribute("number") == 1
    )
  )
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
  const duplicatedImages = imagesCards.reduce(
    (acc, curr) => [
      ...acc, 
      {value: curr, number: 1}, 
      {value: curr, number: 2}
    ], []
  );

  const imagesInRandomOrder = duplicatedImages
    .map(image => ({data: image, random: Math.random()}))
    .sort((a, b) => a.random - b.random)
    .map(obj => obj.data);

  return imagesInRandomOrder;
}