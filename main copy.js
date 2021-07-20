const clubs = [
  "Clubs Ace",
  "Clubs 2",
  "Clubs 3",
  "Clubs 4",
  "Clubs 5",
  "Clubs 6",
  "Clubs 7",
  "Clubs 8",
  "Clubs 9",
  "Clubs 10",
  "Clubs Jack",
  "Clubs Queen",
  "Clubs King",
];
const diamonds = [
  "Diamonds Ace",
  "Diamonds 2",
  "Diamonds 3",
  "Diamonds 4",
  "Diamonds 5",
  "Diamonds 6",
  "Diamonds 7",
  "Diamonds 8",
  "Diamonds 9",
  "Diamonds 10",
  "Diamonds Jack",
  "Diamonds Queen",
  "Diamonds King",
];
const hearts = [
  "Hearts Ace",
  "Hearts 2",
  "Hearts 3",
  "Hearts 4",
  "Hearts 5",
  "Hearts 6",
  "Hearts 7",
  "Hearts 8",
  "Hearts 9",
  "Hearts 10",
  "Hearts Jack",
  "Hearts Queen",
  "Hearts King",
];
const spades = [
  "Spades Ace",
  "Spades 2",
  "Spades 3",
  "Spades 4",
  "Spades 5",
  "Spades 6",
  "Spades 7",
  "Spades 8",
  "Spades 9",
  "Spades 10",
  "Spades Jack",
  "Spades Queen",
  "Spades King",
];

// const deck = clubs
const deck = clubs.concat(diamonds, hearts, spades);
const hand = [];

while (hand.length < 5) {
  const randomIndex = parseInt(Math.random() * deck.length);
  const randomCard = deck[randomIndex];
  if (!hand.includes(randomCard)) {
    hand.push(deck[randomIndex]);
  }
}

const ul = document.createElement("ul");

hand.forEach((card) => {
  const li = document.createElement("li");
  li.innerText = card;
  ul.append(li);

    const suit = card.split(" ")[0];
    const value = card.split(" ")[1];
    hand.forEach((card) => {
      console.log(card, value, card.includes(value));
    });
    console.log("-------");
});

document.querySelector("body").append(ul);
