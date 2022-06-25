import { level1 } from "./levels.js/level1";

var stunned = false;
var stunnedTimer = 0;
const MoveAvatar = (entities, { events, dispatch }) => {
  let { dirtArray } = entities; //get the dirt entity

  //If the guard is stunned, move the timer down
  if (stunnedTimer > 0) {
    stunnedTimer--;
    //when the stunnedTimer gets to 1, the guard is no longer stunned.
    if (stunnedTimer == 1) {
      stunned = false;
    }
  }

  if (events.length) {
    events.forEach((e) => {
      let x = dirtArray.playerPosition[0];
      let y = dirtArray.playerPosition[1];
      //when the player reaches the winning square, dispatch a "winner" event to tell the game engine they won
      if (level1[x][y].win) {
        dispatch("winner");
      }
      //if the guard and player on on the same square, and the guard is not stunned.
      // I dispatch "caught" event so the game engine ends the game.
      if (
        !stunned &&
        x == dirtArray.guardPosition[0] &&
        y == dirtArray.guardPosition[1]
      ) {
        dispatch("caught");
      }

      switch (e) {
        case "move-down":
          //only update if the next square is not a rock
          if (canMove(x, y + 1)) {
            dirtArray.playerPosition[1] += 1;
          }
          moveGuard(dirtArray.playerPosition, dirtArray.guardPosition);
          return;
        case "move-up":
          if (canMove(x, y - 1)) {
            dirtArray.playerPosition[1] -= 1;
          }
          moveGuard(dirtArray.playerPosition, dirtArray.guardPosition);
          return;
        case "move-left":
          if (canMove(x - 1, y)) {
            dirtArray.playerPosition[0] -= 1;
          }
          moveGuard(dirtArray.playerPosition, dirtArray.guardPosition);
          return;
        case "move-right":
          if (canMove(x + 1, y)) {
            dirtArray.playerPosition[0] += 1;
          }
          moveGuard(dirtArray.playerPosition, dirtArray.guardPosition);
          return;
        case "break-rock-down":
          console.log("Break rock down");
          breakRock(
            dirtArray.playerPosition[0],
            dirtArray.playerPosition[1],
            0,
            1
          );
          moveGuard(dirtArray.playerPosition, dirtArray.guardPosition);
          return;
        case "break-rock-up":
          breakRock(
            dirtArray.playerPosition[0],
            dirtArray.playerPosition[1],
            0,
            -1
          );
          moveGuard(dirtArray.playerPosition, dirtArray.guardPosition);
          return;
        case "break-rock-left":
          breakRock(
            dirtArray.playerPosition[0],
            dirtArray.playerPosition[1],
            -1,
            0
          );
          moveGuard(dirtArray.playerPosition, dirtArray.guardPosition);
          return;
        case "break-rock-right":
          breakRock(
            dirtArray.playerPosition[0],
            dirtArray.playerPosition[1],
            1,
            0
          );
          moveGuard(dirtArray.playerPosition, dirtArray.guardPosition);
          return;
        case "throw-spoon-down":
          throwSpoon(dirtArray.playerPosition, dirtArray.guardPosition, 0, 1);
          return;
        case "throw-spoon-up":
          throwSpoon(dirtArray.playerPosition, dirtArray.guardPosition, 0, -1);
          return;
        case "throw-spoon-left":
          throwSpoon(dirtArray.playerPosition, dirtArray.guardPosition, -1, 0);
          return;
        case "throw-spoon-right":
          throwSpoon(dirtArray.playerPosition, dirtArray.guardPosition, 1, 0);
          return;
      }
    });
  }

  return { ...entities };
};

const moveGuard = (playerPosition, guardPosition) => {
  //when the guard is stunned, he can't move;
  if (stunned) {
    return;
  }
  let pX = playerPosition[0];
  let pY = playerPosition[1];
  let gX = guardPosition[0];
  let gY = guardPosition[1];
  //find the difference between where the guard is and where the player is.
  let diffX = pX - gX;
  let diffY = pY - gY;
  //player is to the right;
  if (diffX > 0 && canMove(gX + 1, gY) && level1[gX + 1][gY].visited) {
    guardPosition[0] += 1;
  }
  //player is below
  else if (diffY > 0 && canMove(gX, gY + 1) && level1[gX][gY + 1].visited) {
    guardPosition[1] += 1;
  }
  //move the guard left if the player is to the left, and the square to the left is not a rock
  else if (diffX < 0 && canMove(gX - 1, gY) && level1[gX - 1][gY].visited) {
    //move left
    guardPosition[0] -= 1;
  } else if (diffY < 0 && canMove(gX, gY - 1) && level1[gX][gY - 1].visited) {
    guardPosition[1] -= 1;
  }
};

//tries to throw a spoon in the specified direction
//returns true if the spoon hits a guard, false otherwise.
const throwSpoon = (playerPosition, guardPosition, xDir, yDir) => {
  let spoonPosX = playerPosition[0];
  let spoonPosY = playerPosition[1];

  while (canMove(spoonPosX, spoonPosY)) {
    spoonPosX += xDir;
    spoonPosY += yDir;
    //when the spoonPosition matches the guardPosition, the guard is hit;
    if (spoonPosX == guardPosition[0] && spoonPosY == guardPosition[1]) {
      //the guard is stunned until this timer hits 0.
      //
      stunned = true;
      stunnedTimer = 100;
      return;
    }
  }
};

const breakRock = (i, j, dirX, dirY) => {
  console.log("Break rock");
  //if the rock they want to break is inbounds, break it;
  if (
    i + dirX >= 0 &&
    i + dirX < level1.length &&
    j + dirY >= 0 &&
    j + dirY < level1[0].length
  ) {
    //set the status of rock to false to indicate that the rock has been broken/ removed
    level1[i + dirX][j + dirY].isRock = false;
    return;
  }
};

//takes coordinates and checks if the square is a valid place to move
const canMove = (i, j) => {
  return (
    i >= 0 &&
    i < level1.length &&
    j >= 0 &&
    j < level1[0].length &&
    !level1[i][j].isRock
  );
};

export { MoveAvatar };
