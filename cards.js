class Card {
  constructor(id, name, player) {
    this.id = id;
    this.name = name;
    this.player = player;
  }
}

const hand1 = [
  new Card(1,  "skunk",     1),
  new Card(2,  "papousek",  1),
  new Card(3,  "klokan",    1),
  new Card(4,  "opice",     1),
  new Card(5,  "chameleon", 1),
  new Card(6,  "tulen",     1),
  new Card(7,  "zebra",     1),
  new Card(8,  "zirafa",    1),
  new Card(9,  "had",       1),
  new Card(10, "krokodyl",  1),
  new Card(11, "hroch",     1),
  new Card(12, "lev",       1),
];

const hand2 = [
  new Card(1,  "skunk",     2),
  new Card(2,  "papousek",  2),
  new Card(3,  "klokan",    2),
  new Card(4,  "opice",     2),
  new Card(5,  "chameleon", 2),
  new Card(6,  "tulen",     2),
  new Card(7,  "zebra",     2),
  new Card(8,  "zirafa",    2),
  new Card(9,  "had",       2),
  new Card(10, "krokodyl",  2),
  new Card(11, "hroch",     2),
  new Card(12, "lev",       2),
];

const hand3 = [
  new Card(1,  "skunk",     3),
  new Card(2,  "papousek",  3),
  new Card(3,  "klokan",    3),
  new Card(4,  "opice",     3),
  new Card(5,  "chameleon", 3),
  new Card(6,  "tulen",     3),
  new Card(7,  "zebra",     3),
  new Card(8,  "zirafa",    3),
  new Card(9,  "had",       3),
  new Card(10, "krokodyl",  3),
  new Card(11, "hroch",     3),
  new Card(12, "lev",       3),
];

const hand4 = [
  new Card(1,  "skunk",     4),
  new Card(2,  "papousek",  4),
  new Card(3,  "klokan",    4),
  new Card(4,  "opice",     4),
  new Card(5,  "chameleon", 4),
  new Card(6,  "tulen",     4),
  new Card(7,  "zebra",     4),
  new Card(8,  "zirafa",    4),
  new Card(9,  "had",       4),
  new Card(10, "krokodyl",  4),
  new Card(11, "hroch",     4),
  new Card(12, "lev",       4),
];

module.exports = {
  hand1,
  hand2,
  hand3,
  hand4,
};
