let canvasGame = document.getElementById("game");
let canvasStats = document.getElementById("stats");
let ctx = canvasGame.getContext("2d");
let ctxStats = canvasStats.getContext("2d");

let blockType = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []
];

let canvas = {
  clear: function() {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.rect(0, 0, canvasGame.width, canvasGame.height);
    ctx.stroke();
    ctx.fill();
  },
  clearStats: function() {
    ctxStats.beginPath();
    ctxStats.strokeStyle = "lightgrey";
    ctxStats.fillStyle = "lightgrey";
    ctxStats.rect(0, 0, canvasStats.width, canvasStats.height);
    ctxStats.stroke();
    ctxStats.fill();
  }
};

function areaVision(i, j) {
  ctx.beginPath();
  if (blockType[i][j] == "digged") {
    ctx.strokeStyle = "#2b1d0e";
    ctx.fillStyle = "#2b1d0e";
    ctx.rect(
      i * area.blockSize,
      j * area.blockSize,
      area.blockSize,
      area.blockSize
    );
  } else if (j == 0 && area.inUnderground == false) {
    ctx.strokeStyle = "green";
    ctx.fillStyle = "green";
    ctx.rect(
      i * area.blockSize,
      j * area.blockSize,
      area.blockSize,
      area.blockSize
    );
  } else if (blockType[i][j] == "coal") {
    ctx.strokeStyle = "#2e2e2e";
    ctx.fillStyle = "#2e2e2e";
    ctx.rect(
      i * area.blockSize,
      j * area.blockSize,
      area.blockSize,
      area.blockSize
    );
  } else if (blockType[i][j] == "diamond") {
    ctx.strokeStyle = "#0062ff";
    ctx.fillStyle = "#0062ff";
    ctx.rect(
      i * area.blockSize,
      j * area.blockSize,
      area.blockSize,
      area.blockSize
    );
  } else {
    ctx.strokeStyle = "#8B4513";
    ctx.fillStyle = "#8B4513";
    ctx.rect(
      i * area.blockSize,
      j * area.blockSize,
      area.blockSize,
      area.blockSize
    );
  }
  ctx.stroke();
  ctx.fill();
}

let area = {
  blockSize: 25,
  areaWidth: 42,
  areaHeight: 27,
  coalPer: 5,
  diamondPer: 0.2,
  inUnderground: false,
  diamondGenerated: 0,
  coalGenerated: 0,
  generate: function() {
    for (let i = 0; i < this.areaWidth; i++) {
      for (let j = 0; j < this.areaHeight; j++) {
        ctx.beginPath();
        if (j == 0 && this.inUnderground == false) {
          blockType[i][j] = "dirt";
        } else if (Math.random() * 100 < this.coalPer) {
          blockType[i][j] = "coal";
        } else if (Math.random() * 100 < this.diamondPer) {
          blockType[i][j] = "diamond";
        } else {
          blockType[i][j] = "dirt";
        }
        ctx.stroke();
        ctx.fill();
      }
    }
  },
  repaint: function() {
    for (let i = 0; i < this.areaWidth; i++) {
      for (let j = 0; j < this.areaHeight; j++) {
        if (i == player.x && j == player.y) {
          areaVision(i, j);
        } else if (j == 0 && area.inUnderground == false) {
          areaVision(i, j);
        } else if (i == 0 && j == 0) {
          if (
            blockType[i + 1][j] == "digged" ||
            blockType[i][j + 1] == "digged" ||
            blockType[i + 1][j + 1] == "digged"
          ) {
            areaVision(i, j);
          } else {
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.rect(
              i * area.blockSize,
              j * area.blockSize,
              area.blockSize,
              area.blockSize
            );
            ctx.stroke();
            ctx.fill();
          }
        } else if (i == 0 && j == area.areaHeight) {
          if (
            blockType[i + 1][j] == "digged" ||
            blockType[i][j - 1] == "digged" ||
            blockType[i + 1][j - 1] == "digged"
          ) {
            areaVision(i, j);
          }
        } else if (j == 0 && i == area.areaWidth) {
          if (
            blockType[i - 1][j] == "digged" ||
            blockType[i][j + 1] == "digged" ||
            blockType[i - 1][j + 1] == "digged"
          ) {
            areaVision(i, j);
          } else {
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.rect(
              i * area.blockSize,
              j * area.blockSize,
              area.blockSize,
              area.blockSize
            );
            ctx.stroke();
            ctx.fill();
          }
        } else if (i == area.areaWidth && j == area.areaHeight) {
          if (
            blockType[i - 1][j] == "digged" ||
            blockType[i][j - 1] == "digged" ||
            blockType[i - 1][j - 1] == "digged"
          ) {
            areaVision(i, j);
          }
        } else if (j == 0) {
          if (
            blockType[i + 1][j] == "digged" ||
            blockType[i - 1][j] == "digged" ||
            blockType[i][j + 1] == "digged" ||
            blockType[i + 1][j + 1] == "digged" ||
            blockType[i - 1][j + 1] == "digged"
          ) {
            areaVision(i, j);
          } else {
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.rect(
              i * area.blockSize,
              j * area.blockSize,
              area.blockSize,
              area.blockSize
            );
            ctx.stroke();
            ctx.fill();
          }
        } else if (i == 0) {
          if (
            blockType[i + 1][j] == "digged" ||
            blockType[i][j + 1] == "digged" ||
            blockType[i][j - 1] == "digged" ||
            blockType[i + 1][j + 1] == "digged" ||
            blockType[i + 1][j - 1] == "digged"
          ) {
            areaVision(i, j);
          } else {
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.rect(
              i * area.blockSize,
              j * area.blockSize,
              area.blockSize,
              area.blockSize
            );
            ctx.stroke();
            ctx.fill();
          }
        } else if (i == area.areaWidth) {
          if (
            blockType[i - 1][j] == "digged" ||
            blockType[i][j + 1] == "digged" ||
            blockType[i][j - 1] == "digged" ||
            blockType[i - 1][j + 1] == "digged" ||
            blockType[i - 1][j - 1] == "digged"
          ) {
            areaVision(i, j);
          }
        } else if (j == area.areaHeight) {
          if (
            blockType[i + 1][j] == "digged" ||
            blockType[i - 1][j] == "digged" ||
            blockType[i][j - 1] == "digged" ||
            blockType[i + 1][j - 1] == "digged" ||
            blockType[i - 1][j - 1] == "digged"
          ) {
            areaVision(i, j);
          }
        } else {
          if (
            blockType[i + 1][j] == "digged" ||
            blockType[i - 1][j] == "digged" ||
            blockType[i][j + 1] == "digged" ||
            blockType[i][j - 1] == "digged" ||
            blockType[i + 1][j + 1] == "digged" ||
            blockType[i + 1][j - 1] == "digged" ||
            blockType[i - 1][j + 1] == "digged" ||
            blockType[i - 1][j - 1] == "digged"
          ) {
            areaVision(i, j);
          } else {
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.rect(
              i * area.blockSize,
              j * area.blockSize,
              area.blockSize,
              area.blockSize
            );
            ctx.stroke();
            ctx.fill();
          }
        }
        /*areaVision(i, j);*/
      }
    }
  }
  /*nextLevel: function() {
    if (
      area.diamondGenerated == player.diamond &&
      area.coalGenerated == player.coal
    ) {
      area.generate();
      player.y = 0;
      area.inUnderground = true;
    }
  }*/
};

let player = {
  movingSpeed: 200,
  drillingSpeed: 500,
  level: 1,
  coal: 0,
  diamond: 0,
  x: 21,
  y: 0,
  pressed: 0,
  money: 0,
  coalPrice: 25,
  diamondPrice: 100,
  levelPrice: 500,
  movement: function() {
    document.addEventListener("keydown", function move(ev) {
      console.log(ev.code);
      switch (ev.code) {
        case "ArrowUp":
          if (player.y != 0) {
            if (
              blockType[player.x][player.y - 1] == "digged" &&
              player.pressed == 0
            ) {
              player.imageSrc = "pic/goblin/up/anim1.png";
              player.pressed++;
              setTimeout(function() {
                player.y--;
                console.log("hore");
                player.pressed--;
              }, player.movingSpeed);
              console.log("hore");
            } else if (player.pressed == 0) {
              player.imageSrc = "pic/goblin/up/anim1.png";
              player.pressed++;
              setTimeout(function() {
                player.y--;
                console.log("hore");
                player.pressed--;
              }, player.drillingSpeed);
            }
          }
          break;
        case "ArrowDown":
          if (player.y != area.areaHeight - 1) {
            if (
              blockType[player.x][player.y + 1] == "digged" &&
              player.pressed == 0
            ) {
              player.imageSrc = "pic/goblin/down/anim1.png";
              player.pressed++;
              setTimeout(function() {
                player.y++;
                console.log("dole");
                player.pressed--;
              }, player.movingSpeed);
              console.log("dole");
            } else if (player.pressed == 0) {
              player.imageSrc = "pic/goblin/down/anim1.png";
              player.pressed++;
              setTimeout(function() {
                player.y++;
                console.log("dole");
                player.pressed--;
              }, player.drillingSpeed);
            }
          }

          break;
        case "ArrowLeft":
          if (player.x != 0) {
            if (
              blockType[player.x - 1][player.y] == "digged" &&
              player.pressed == 0
            ) {
              player.imageSrc = "pic/goblin/left/anim1.png";
              player.pressed++;
              setTimeout(function() {
                player.x--;
                console.log("vlevo");
                player.pressed--;
              }, player.movingSpeed);
              console.log("vlevo");
            } else if (player.pressed == 0) {
              player.imageSrc = "pic/goblin/left/anim1.png";
              player.pressed++;
              setTimeout(function() {
                player.x--;
                console.log("vlevo");
                player.pressed--;
              }, player.drillingSpeed);
            }
          }
          break;
        case "ArrowRight":
          if (player.x != area.areaWidth - 1) {
            if (
              blockType[player.x + 1][player.y] == "digged" &&
              player.pressed == 0
            ) {
              player.imageSrc = "pic/goblin/right/anim1.png";
              player.pressed++;
              setTimeout(function() {
                player.x++;
                console.log("pravo");
                player.pressed--;
              }, player.movingSpeed);
              console.log("pravo");
            } else if (player.pressed == 0) {
              player.imageSrc = "pic/goblin/right/anim1.png";
              player.pressed++;
              setTimeout(function() {
                player.x++;
                console.log("pravo");
                player.pressed--;
              }, player.drillingSpeed);
            }
          }
          break;
        case "KeyN":
          if (
            player.levelPrice * player.level <= player.money &&
            player.y == area.areaHeight - 1
          ) {
            console.log("New level !!!");
            player.y = 0;
            area.generate();
            area.inUnderground = true;
            player.money = player.money - player.level * player.levelPrice;
            player.level++;
          } else {
          }
          break;
      }
    });
  },
  image: new Image(),
  imageSrc: "pic/goblin/right/anim1.png",
  paint: function() {
    ctx.fillStyle = "transparent";
    ctx.fillRect(
      player.x * area.blockSize,
      player.y * area.blockSize,
      area.blockSize,
      area.blockSize
    );
    player.image.src = player.imageSrc;
    player.image.onload = () => {
      ctx.drawImage(
        player.image,
        player.x * area.blockSize,
        player.y * area.blockSize,
        area.blockSize,
        area.blockSize
      );
    };
    ctx.drawImage(
      player.image,
      player.x * area.blockSize,
      player.y * area.blockSize,
      area.blockSize,
      area.blockSize
    );
  },
  checkBlock: function() {
    if (blockType[this.x][this.y] == "dirt") {
      blockType[this.x][this.y] = "digged";
      console.log("digged dirt");
    } else if (blockType[this.x][this.y] == "coal") {
      blockType[this.x][this.y] = "digged";
      this.coal++;
      this.money += this.coalPrice;
      console.log("digged coal");
    } else if (blockType[this.x][this.y] == "diamond") {
      blockType[this.x][this.y] = "digged";
      this.diamond++;
      this.money += this.diamondPrice;
      console.log("digged diamond");
    }
  }
};

let stats = {
  display: function() {
    ctxStats.beginPath();
    ctxStats.font = "20px Arial";
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "black";
    ctxStats.fillText("Your level:" + player.level, 175, 20);

    ctxStats.font = "25px Arial";
    ctxStats.fillText("Coal: ", 10, 50);
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "blaxk";
    ctxStats.fillText(player.coal + " pcs", 150, 50);
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "black";
    ctxStats.fillText("Diamonds: ", 10, 75);
    ctxStats.strokeStyle = "#0062ff";
    ctxStats.fillStyle = "#0062ff";
    ctxStats.fillText(player.diamond + " pcs", 150, 75);
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "black";
    ctxStats.fillText("Money: ", 10, 100);
    ctxStats.strokeStyle = "yellow";
    ctxStats.fillStyle = "yellow";
    ctxStats.fillText(player.money + " $", 150, 100);
    ctxStats.stroke();
    ctxStats.fill();
  },
  nextLevelDisplay: function() {
    ctxStats.beginPath();
    ctxStats.font = "25px Arial";
    if (
      player.levelPrice * player.level <= player.money &&
      player.y == area.areaHeight - 1
    ) {
      ctxStats.strokeStyle = "black";
      ctxStats.fillStyle = "black";
    } else if (player.levelPrice * player.level <= player.money) {
      ctxStats.font = "10px Arial";
      ctxStats.strokeStyle = "red";
      ctxStats.fillStyle = "red";
      ctxStats.fillText("You must be at the bottom of the area !", 10, 610);
      ctxStats.strokeStyle = "grey";
      ctxStats.fillStyle = "grey";
      ctxStats.font = "25px Arial";
    } else {
      ctxStats.font = "10px Arial";
      ctxStats.strokeStyle = "red";
      ctxStats.fillStyle = "red";
      ctxStats.fillText("You dont have enought money !", 10, 610);
      ctxStats.strokeStyle = "grey";
      ctxStats.fillStyle = "grey";
      ctxStats.font = "25px Arial";
    }
    ctxStats.fillText('Press "N" for', 10, 640);
    ctxStats.fillText(
      "buy next level (" + player.level * player.levelPrice + " $)",
      10,
      665
    );
    ctxStats.fill();
  },
  levelRestartOption: function() {
    if (
      area.coalGenerated == player.coal &&
      area.diamondGenerated == player.diamond &&
      player.money < player.level * player.levelPrice
    ) {
      if (player.coal != 0 || player.diamond != 0) {
        ctx.beginPath();
        ctx.font = "25px Arial";
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.rect(775, 550, 250, 100);
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.fillText("Nothink to dig :(", 790, 575);
        ctx.fillText('Press "X" for', 790, 600);
        ctx.fillText("restart from begining", 790, 625);
        ctx.stroke();
      }
    }
  }
};

player.movement();

function play() {
  area.generate();
  setInterval(function playGame() {
    canvas.clear();
    area.repaint();
    player.paint();
    stats.levelRestartOption();
    player.checkBlock();
  }, 20);
}

function playStats() {
  setInterval(function playStats1() {
    canvas.clearStats();
    stats.display();
    stats.nextLevelDisplay();
  }, 20);
}

play();
playStats();
console.log(blockType);
