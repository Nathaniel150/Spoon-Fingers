import { levels } from "./levels.js/level1";

var TIMER_LENGTH = 50;
// var currLevel = 0;

const MoveAvatar = (entities, { events, dispatch }) => {
  // console.log("Entites: ", entities);
  let { dirtArray } = entities; //get the dirt entity

  currLevel = dirtArray.levelNum;
  let x = dirtArray.playerPosition[0];
  let y = dirtArray.playerPosition[1];

  //if the guard and player on on the same square, and the guard is not stunned.
  // I dispatch "caught" event so the game engine ends the game.
  if (gotCaught(x, y, dirtArray.guardPositions)) {
    dispatch("caught");
  }

  handleStun(dirtArray.guardPositions);

  if (events.length) {
    events.forEach((e) => {
      switch (e) {
        case "move-down":
          //only update if the next square is not a rock
          if (canMove(x, y + 1)) {
            dirtArray.playerPosition[1] += 1;
          }
          moveGuard(dirtArray.playerPosition, dirtArray.guardPositions);
          return;
        case "move-up":
          if (canMove(x, y - 1)) {
            dirtArray.playerPosition[1] -= 1;
          }
          moveGuard(dirtArray.playerPosition, dirtArray.guardPositions);
          return;
        case "move-left":
          if (canMove(x - 1, y)) {
            dirtArray.playerPosition[0] -= 1;
          }
          moveGuard(dirtArray.playerPosition, dirtArray.guardPositions);
          return;
        case "move-right":
          if (canMove(x + 1, y)) {
            dirtArray.playerPosition[0] += 1;
          }
          moveGuard(dirtArray.playerPosition, dirtArray.guardPositions);
          return;
        case "break-rock-down":
          breakRock(
            dirtArray.playerPosition[0],
            dirtArray.playerPosition[1],
            0,
            1
          );
          moveGuard(dirtArray.playerPosition, dirtArray.guardPositions);
          return;
        case "break-rock-up":
          breakRock(
            dirtArray.playerPosition[0],
            dirtArray.playerPosition[1],
            0,
            -1
          );
          moveGuard(dirtArray.playerPosition, dirtArray.guardPositions);
          return;
        case "break-rock-left":
          breakRock(
            dirtArray.playerPosition[0],
            dirtArray.playerPosition[1],
            -1,
            0
          );
          moveGuard(dirtArray.playerPosition, dirtArray.guardPositions);
          return;
        case "break-rock-right":
          breakRock(
            dirtArray.playerPosition[0],
            dirtArray.playerPosition[1],
            1,
            0
          );
          moveGuard(dirtArray.playerPosition, dirtArray.guardPositions);
          return;
        case "throw-spoon-down":
          throwSpoon(dirtArray.playerPosition, dirtArray.guardPositions, 0, 1);
          return;
        case "throw-spoon-up":
          throwSpoon(dirtArray.playerPosition, dirtArray.guardPositions, 0, -1);
          return;
        case "throw-spoon-left":
          throwSpoon(dirtArray.playerPosition, dirtArray.guardPositions, -1, 0);
          return;
        case "throw-spoon-right":
          throwSpoon(dirtArray.playerPosition, dirtArray.guardPositions, 1, 0);
          return;
        case "move-guard":
          //TODO make some pop up that shows the player is out of spoons
          moveGuard(dirtArray.playerPosition, dirtArray.guardPositions);
          break;
      }
    });
  }

  //when the player reaches the winning square, dispatch a "winner" event to tell the game engine they won
  if (levels[currLevel][x][y].win) {
    dispatch("winner");
  }

  return { ...entities };
};

const moveGuard = (playerPosition, guardPositions) => {
  //when the guard is stunned, he can't move;
  // if (stunned) {
  //   return;
  // }
  for (let i = 0; i < guardPositions.length; i++) {
    //skip the guards that are stunned
    if (guardPositions[i].stunned) {
      continue;
    }

    let pX = playerPosition[0];
    let pY = playerPosition[1];
    let gX = guardPositions[i].xPos;
    let gY = guardPositions[i].yPos;
    //find the difference between where the guard is and where the player is.
    let diffX = pX - gX;
    let diffY = pY - gY;
    //player is to the right;
    if (
      diffX > 0 &&
      canMove(gX + 1, gY) &&
      levels[currLevel][gX + 1][gY].visited
    ) {
      guardPositions[i].xPos += 1;
    }
    //player is below
    else if (
      diffY > 0 &&
      canMove(gX, gY + 1) &&
      levels[currLevel][gX][gY + 1].visited
    ) {
      guardPositions[i].yPos += 1;
    }
    //move the guard left if the player is to the left, and the square to the left is not a rock
    else if (
      diffX < 0 &&
      canMove(gX - 1, gY) &&
      levels[currLevel][gX - 1][gY].visited
    ) {
      //move left
      guardPositions[i].xPos -= 1;
    } else if (
      diffY < 0 &&
      canMove(gX, gY - 1) &&
      levels[currLevel][gX][gY - 1].visited
    ) {
      guardPositions[i].yPos -= 1;
    }
  }
};

const gotCaught = (x, y, guardPositions) => {
  for (let i = 0; i < guardPositions.length; i++) {
    if (
      x == guardPositions[i].xPos &&
      y == guardPositions[i].yPos &&
      !guardPositions[i].stunned
    ) {
      return true;
    }
  }

  return false;
};

//tries to throw a spoon in the specified direction
//returns true if the spoon hits a guard, false otherwise.
const throwSpoon = async (playerPosition, guardPositions, xDir, yDir) => {
  let spoonPosX = playerPosition[0];
  let spoonPosY = playerPosition[1];

  let stunnedAGuard = false;
  while (!stunnedAGuard && canThrowSpoon(spoonPosX, spoonPosY)) {
    //TODO Make the spoon appeard on the screen
    //reset the current square to not have a spoon
    levels[currLevel][spoonPosX][spoonPosY].isSpoon = false;
    spoonPosX += xDir;
    spoonPosY += yDir;

    //set the spoon into the new square
    for (let i = 0; i < guardPositions.length; i++) {
      //when the spoonPosition matches the guardPosition, the guard is hit;
      if (
        spoonPosX == guardPositions[i].xPos &&
        spoonPosY == guardPositions[i].yPos
      ) {
        guardPositions[i].stunned = true;
        //the guard will be stunned until this timer hits 0.
        guardPositions[i].stunnedTimer = TIMER_LENGTH;

        //only one guard should be stunned
        stunnedAGuard = true;
        //set the square in the level to stunned so it can render correctly.
        levels[currLevel][guardPositions[i].xPos][
          guardPositions[i].yPos
        ].guardStunned = true;
        break;
      }
    }

    //reset the current square to not have a spoon
    levels[currLevel][spoonPosX][spoonPosY].isSpoon = false;
  }
};

const breakRock = (i, j, dirX, dirY) => {
  //if the rock they want to break is in bounds, break it;
  if (canBreakRock(i + dirX, j + dirY)) {
    //set the status of rock to false to indicate that the rock has been broken/ removed
    levels[currLevel][i + dirX][j + dirY].isRock = false;
    return;
  }
};

//takes coordinates and checks if the square is a valid place to move
const canMove = (i, j) => {
  return (
    i >= 0 &&
    i < levels[currLevel].length &&
    j >= 0 &&
    j < levels[currLevel][0].length &&
    !levels[currLevel][i][j].isRock
  );
};

const canThrowSpoon = (i, j) => {
  return (
    i >= 0 &&
    i < levels[currLevel].length &&
    j >= 0 &&
    j < levels[currLevel][0].length &&
    levels[currLevel][i][j].visited &&
    !levels[currLevel][i][j].isRock
  );
};

const canBreakRock = (i, j) => {
  return (
    i >= 0 &&
    i < levels[currLevel].length &&
    j >= 0 &&
    j < levels[currLevel][0].length
  );
};

const handleStun = (guardPositions) => {
  for (let i = 0; i < guardPositions.length; i++) {
    if (guardPositions[i].stunnedTimer > 0) {
      guardPositions[i].stunnedTimer--;
    } else {
      guardPositions[i].stunned = false;
      levels[currLevel][guardPositions[i].xPos][
        guardPositions[i].yPos
      ].guardStunned = false;
    }
  }
};

export { MoveAvatar };
