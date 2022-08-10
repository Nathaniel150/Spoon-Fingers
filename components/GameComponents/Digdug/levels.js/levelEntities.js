import { DirtArray } from "../entities";
import { levels } from "./level1";
export var levelEntities = [
  {
    dirtArray: {
      playerPosition: [1, 1],
      guardPositions: [
        {
          xPos: 5,
          yPos: 0,
          stunned: false,
          stunnedTimer: 0,
        },
      ],
      levelNum: 0, //what level this is
      levels: levels, // pass a copy of levels, so I don't modify the actual data file
      renderer: <DirtArray />,
    },
  },
  {
    dirtArray: {
      playerPosition: [1, 1],
      guardPositions: [
        {
          xPos: 3,
          yPos: 6,
          stunned: false,
          stunnedTimer: 0,
        },
        {
          xPos: 5,
          yPos: 0,
          stunned: false,
          stunnedTimer: 0,
        },
      ],
      levelNum: 1,
      levels: levels,

      renderer: <DirtArray />,
    },
  },
];
