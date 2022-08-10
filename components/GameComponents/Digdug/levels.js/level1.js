let hole = {
  isRock: false,
  visited: true,
  win: false,
  guardStunned: false,
  isSpoon: false,
};
let rock = {
  isRock: true,
  visited: false,
  win: false,
  guardStunned: false,
  isSpoon: false,
};
let ground = {
  isRock: false,
  visited: false,
  win: false,
  guardStunned: false,
  isSpoon: false,
};
let win = {
  isRock: false,
  visited: false,
  win: true,
  guardStunned: false,
  isSpoon: false,
};

export var levels = [
  [
    [
      { ...rock },
      { ...hole },
      { ...rock },
      { ...ground },
      { ...ground },
      { ...ground },
    ],
    [
      { ...rock },
      { ...hole },
      { ...rock },
      { ...ground },
      { ...ground },
      { ...ground },
    ],
    [
      { ...ground },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...win },
    ],
    [
      { ...rock },
      { ...rock },
      { ...rock },
      { ...rock },
      { ...rock },
      { ...ground },
    ],
    [
      { ...rock },
      { ...hole },
      { ...hole },
      { ...ground },
      { ...ground },
      { ...ground },
    ],
    [
      { ...win },
      { ...hole },
      { ...rock },
      { ...ground },
      { ...ground },
      { ...ground },
    ],
  ],
  [
    [
      { ...rock },
      { ...rock },
      { ...ground },
      { ...rock },
      { ...rock },
      { ...rock },
      { ...ground },
      { ...rock },
      { ...rock },
      { ...rock },
      { ...rock },
      { ...rock },
    ],
    [
      { ...rock },
      { ...ground },
      { ...win },
      { ...hole },
      { ...ground },
      { ...ground },
      { ...rock },
      { ...rock },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...rock },
    ],
    [
      { ...rock },
      { ...ground },
      { ...rock },
      { ...hole },
      { ...hole },
      { ...rock },
      { ...ground },
      { ...rock },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...rock },
    ],
    [
      { ...rock },
      { ...hole },
      { ...hole },
      { ...hole },
      { ...hole },
      { ...hole },
      { ...ground },
      { ...rock },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...rock },
    ],
    [
      { ...rock },
      { ...hole },
      { ...rock },
      { ...hole },
      { ...rock },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...rock },
    ],
    [
      { ...hole },
      { ...hole },
      { ...rock },
      { ...hole },
      { ...rock },
      { ...ground },
      { ...ground },
      { ...rock },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...ground },
    ],
    [
      { ...rock },
      { ...ground },
      { ...ground },
      { ...hole },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...rock },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...rock },
    ],
    [
      { ...rock },
      { ...ground },
      { ...rock },
      { ...hole },
      { ...ground },
      { ...ground },
      { ...rock },
      { ...rock },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...rock },
    ],
    [
      { ...rock },
      { ...ground },
      { ...rock },
      { ...hole },
      { ...ground },
      { ...rock },
      { ...ground },
      { ...rock },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...rock },
    ],
    [
      { ...rock },
      { ...ground },
      { ...ground },
      { ...hole },
      { ...ground },
      { ...ground },
      { ...ground },
      { ...rock },
      { ...ground },
      { ...ground },
      { ...win },
      { ...rock },
    ],

    [
      { ...rock },
      { ...rock },
      { ...ground },
      { ...rock },
      { ...rock },
      { ...ground },
      { ...rock },
      { ...rock },
      { ...rock },
      { ...rock },
      { ...rock },
      { ...rock },
    ],
  ],
];
