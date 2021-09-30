import { clubs, diamonds, hearts, spades } from "./deck.js";

const dealCardsButton = document.querySelector("button");
dealCardsButton.addEventListener("click", setupGame);

function setupGame() {
  const handMaxSize = 5;
  const twoPair = 2;
  const { hand, pairs } = deal(handMaxSize, twoPair);

  const oldContainer = document.querySelector("#container");
  const handContainer = createHandContainer(hand);
  const result = createResult(pairs, twoPair);
  const newContainer = createContainer([
    pairs.length < 2 ? dealCardsButton : "",
    handContainer,
    result,
  ]);
  oldContainer.replaceWith(newContainer);
}

function deal(handMaxSize, twoPair) {
  const deck = clubs.concat(diamonds, hearts, spades);
  const hand = [];
  const pairs = [];

  while (hand.length < handMaxSize) {
    const index = parseInt(Math.random() * deck.length);
    const randomCard = deck[index];

    if (!hand.includes(randomCard)) {
      const pair = findPair(pairs, hand, randomCard);

      if (pair && pairs.length < twoPair) {
        pairs.push(pair);
      }
      hand.push(randomCard);
    }
  }
  return { hand, pairs };
}

function findPair(pairs, hand, newCard) {
  const isEmpty = pairs.length < 1;

  for (const card of hand) {
    const isTaken = !isEmpty && pairs[0].includes(card);
    const isSameValue = card.value === newCard.value;

    if ((isEmpty && isSameValue) || (!isTaken && isSameValue)) {
      return [card, newCard];
    }
  }
}

function createContainer(content) {
  const container = document.createElement("div");
  container.setAttribute("id", "container");
  container.append(...content);

  return container;
}

function createHandContainer(cards) {
  const handContainer = document.createElement("div");
  handContainer.setAttribute("id", "hand-container");

  const listOfCards = createListOfCards(cards);
  const info = document.createElement("strong");
  info.innerText = "Your hand";

  handContainer.append(info, listOfCards);

  return handContainer;
}

function createResult(pairs, twoPair) {
  const resultContainer = document.createElement("div");
  resultContainer.setAttribute("id", "result-container");

  const result = document.createElement("div");
  result.setAttribute("id", "result");

  const resultText = document.createElement("p");

  result.append(resultText);
  resultContainer.append(result);

  if (pairs.length < twoPair) {
    resultText.innerText = "You lose!";
  }
  if (pairs.length >= twoPair) {
    resultText.innerText = "You got a two pair!";

    const listOfPairs = createListOfPairs(pairs);
    result.append(listOfPairs);

    const continueButton = createButton("", "Play again");
    resultContainer.append(continueButton);
  }
  return resultContainer;
}

function createButton(id, content) {
  const button = document.createElement("button");
  button.setAttribute("id", id);
  button.addEventListener("click", setupGame);
  button.innerText = content;

  return button;
}

function createListOfCards(cards) {
  const list = document.createElement("ul");

  cards.forEach((card) => {
    const item = document.createElement("li");
    item.innerText = card.value + " of " + card.suit;
    list.append(item);
  });
  return list;
}

function createListOfPairs(pairs) {
  const list = document.createElement("ol");

  pairs.forEach((pair) => {
    const item = document.createElement("li");
    item.innerText = `${pair[0].value} of ${pair[0].suit} and ${pair[1].value} of ${pair[1].suit}`;
    list.append(item);
  });
  return list;
}
