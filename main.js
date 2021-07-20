const clubs = [
  { suit: "Clubs", value: "Ace" },
  { suit: "Clubs", value: "Two" },
  { suit: "Clubs", value: "Three" },
  { suit: "Clubs", value: "Four" },
  { suit: "Clubs", value: "Five" },
  { suit: "Clubs", value: "Six" },
  { suit: "Clubs", value: "Seven" },
  { suit: "Clubs", value: "Eight" },
  { suit: "Clubs", value: "Nine" },
  { suit: "Clubs", value: "Ten" },
  { suit: "Clubs", value: "Jack" },
  { suit: "Clubs", value: "Queen" },
  { suit: "Clubs", value: "King" },
];
const diamonds = [
  { suit: "Diamonds", value: "Ace" },
  { suit: "Diamonds", value: "Two" },
  { suit: "Diamonds", value: "Three" },
  { suit: "Diamonds", value: "Four" },
  { suit: "Diamonds", value: "Five" },
  { suit: "Diamonds", value: "Six" },
  { suit: "Diamonds", value: "Seven" },
  { suit: "Diamonds", value: "Eight" },
  { suit: "Diamonds", value: "Nine" },
  { suit: "Diamonds", value: "Ten" },
  { suit: "Diamonds", value: "Jack" },
  { suit: "Diamonds", value: "Queen" },
  { suit: "Diamonds", value: "King" },
];
const hearts = [
  { suit: "Hearts", value: "Ace" },
  { suit: "Hearts", value: "Two" },
  { suit: "Hearts", value: "Three" },
  { suit: "Hearts", value: "Four" },
  { suit: "Hearts", value: "Five" },
  { suit: "Hearts", value: "Six" },
  { suit: "Hearts", value: "Seven" },
  { suit: "Hearts", value: "Eight" },
  { suit: "Hearts", value: "Nine" },
  { suit: "Hearts", value: "Ten" },
  { suit: "Hearts", value: "Jack" },
  { suit: "Hearts", value: "Queen" },
  { suit: "Hearts", value: "King" },
];
const spades = [
  { suit: "Spades", value: "Ace" },
  { suit: "Spades", value: "Two" },
  { suit: "Spades", value: "Three" },
  { suit: "Spades", value: "Four" },
  { suit: "Spades", value: "Five" },
  { suit: "Spades", value: "Six" },
  { suit: "Spades", value: "Seven" },
  { suit: "Spades", value: "Eight" },
  { suit: "Spades", value: "Nine" },
  { suit: "Spades", value: "Ten" },
  { suit: "Spades", value: "Jack" },
  { suit: "Spades", value: "Queen" },
  { suit: "Spades", value: "King" },
];

const mockHand = [
  { suit: "Diamonds", value: "King" },
  { suit: "Clubs", value: "King" },
  { suit: "Hearts", value: "King" },
  { suit: "Spades", value: "King" },
  { suit: "Diamonds", value: "Three" },
];

const dealCardsButton = document.querySelector("button");
dealCardsButton.addEventListener("click", setupGame);

function setupGame() {
  const hand = deal();
  const pairs = findPairs(hand);

  const oldContainer = document.querySelector("#container");
  const handContainer = createHandContainer(hand);
  const result = createResult(pairs);
  const newContainer = createContainer([
    pairs.length < 2 ? dealCardsButton : "",
    handContainer,
    result,
  ]);
  oldContainer.replaceWith(newContainer);
}

function deal() {
  const deck = clubs.concat(diamonds, hearts, spades);
  const hand = [];

  while (hand.length < 5) {
    const index = parseInt(Math.random() * deck.length);
    const randomCard = deck[index];
    if (!hand.includes(randomCard)) {
      hand.push(randomCard);
    }
  }
  return hand;
}

function findPairs(hand) {
  const pairs = [];

  hand.forEach((currentCard) => {
    hand.forEach((card) => {
      if (isPair(pairs, currentCard, card)) {
        pairs.push([currentCard, card]);
      }
    });
  });
  return pairs;
}

function isPair(pairs, firstCard, secondCard) {
  const isTaken =
    isDuplicate(pairs, firstCard) || isDuplicate(pairs, secondCard);
  const isSameSuit = firstCard.suit === secondCard.suit;
  const isSameValue = firstCard.value === secondCard.value;

  return !isTaken && !isSameSuit && isSameValue;
}

function isDuplicate(pairs, currentCard) {
  for (const pair of pairs) {
    for (const card of pair) {
      if (currentCard.suit === card.suit && currentCard.value === card.value) {
        return true;
      }
    }
  }
  return false;
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

function createResult(pairs) {
  const resultContainer = document.createElement("div");
  resultContainer.setAttribute("id", "result-container");

  const result = document.createElement("div");
  result.setAttribute("id", "result");

  const resultText = document.createElement("p");

  result.append(resultText);
  resultContainer.append(result);

  if (pairs.length < 2) {
    resultText.innerText = "You lose!";
  }
  if (pairs.length >= 2) {
    resultText.innerText = "You got two pairs of cards!";

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
