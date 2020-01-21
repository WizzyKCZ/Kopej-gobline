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
  } else if (blockType[i][j] == "gold") {
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "yellow";
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
  } else if (blockType[i][j] == "emerald") {
    ctx.strokeStyle = "lightgreen";
    ctx.fillStyle = "lightgreen";
    ctx.rect(
      i * area.blockSize,
      j * area.blockSize,
      area.blockSize,
      area.blockSize
    );
  } else if (blockType[i][j] == "ruby") {
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
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
  areaWidth: 42, //42
  areaHeight: 27, //27
  coalPer: 3,
  goldPer: 1,
  diamondPer: 0.2,
  emeraldPer: 0.05,
  rubyPer: 0.01,
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
        } else if (Math.random() * 100 < this.goldPer) {
          blockType[i][j] = "gold";
        } else if (Math.random() * 100 < this.diamondPer) {
          blockType[i][j] = "diamond";
        } else if (Math.random() * 100 < this.emeraldPer) {
          blockType[i][j] = "emerald";
        } else if (Math.random() * 100 < this.rubyPer) {
          blockType[i][j] = "ruby";
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
  movingSpeed: 250,
  movingLevel: 1,
  drillingSpeed: 500,
  drillingLevel: 1,
  level: 1,
  coal: 0,
  gold: 0,
  diamond: 0,
  emerald: 0,
  ruby: 0,
  x: 21,
  y: 0,
  pressed: 0,
  money: 0,
  coalPrice: 50,
  goldPrice: 120,
  diamondPrice: 300,
  emeraldPrice: 700,
  rubyPrice: 1500,
  levelPrice: 750,
  backpackLevel: 1,
  backpack: [],
  upgradePrice: 750,
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
              }, player.movingSpeed - (player.movingLevel - 1) * 50);
              console.log("hore");
            } else if (player.pressed == 0) {
              player.imageSrc = "pic/goblin/up/anim1.png";
              player.pressed++;
              setTimeout(function() {
                player.y--;
                console.log("hore");
                player.pressed--;
              }, player.drillingSpeed - (player.drillingLevel - 1) * 100);
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
              }, player.movingSpeed - (player.movingLevel - 1) * 50);
              console.log("dole");
            } else if (player.pressed == 0) {
              player.imageSrc = "pic/goblin/down/anim1.png";
              player.pressed++;
              setTimeout(function() {
                player.y++;
                console.log("dole");
                player.pressed--;
              }, player.drillingSpeed - (player.drillingLevel - 1) * 100);
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
              }, player.movingSpeed - (player.movingLevel - 1) * 50);
              console.log("vlevo");
            } else if (player.pressed == 0) {
              player.imageSrc = "pic/goblin/left/anim1.png";
              player.pressed++;
              setTimeout(function() {
                player.x--;
                console.log("vlevo");
                player.pressed--;
              }, player.drillingSpeed - (player.drillingLevel - 1) * 100);
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
              }, player.movingSpeed - (player.movingLevel - 1) * 50);
              console.log("pravo");
            } else if (player.pressed == 0) {
              player.imageSrc = "pic/goblin/right/anim1.png";
              player.pressed++;
              setTimeout(function() {
                player.x++;
                console.log("pravo");
                player.pressed--;
              }, player.drillingSpeed - (player.drillingLevel - 1) * 100);
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
            area.coalPer += 2;
            area.diamondPer += 0.3;
          } else {
          }
          break;
        case "KeyX":
          player.level = 1;
          area.inUnderground = false;
          player.y = 0;
          player.x = 21;
          area.coalPer = 5;
          area.diamondPer = 0.2;
          player.money /= 2;
          player.backpack = [];
          player.coal = 0;
          player.gold = 0;
          player.diamond = 0;
          player.emerald = 0;
          player.ruby = 0;
          player.backpack = [];
          area.generate();
          break;
        case "KeyF":
          if (player.y == 0) {
            for (let i = 0; i <= player.backpackLevel * 5; i++) {
              if (player.backpack[i] == "coal") {
                player.money += player.coalPrice;
              } else if (player.backpack[i] == "gold") {
                player.money += player.goldPrice;
              } else if (player.backpack[i] == "diamond") {
                player.money += player.diamondPrice;
              } else if (player.backpack[i] == "emerald") {
                player.money += player.emeraldPrice;
              } else if (player.backpack[i] == "ruby") {
                player.money += player.rubyPrice;
              }
            }
            player.backpack = [];
            player.coal = 0;
            player.gold = 0;
            player.diamond = 0;
            player.emerald = 0;
            player.ruby = 0;
          }
          break;
        case "Digit1":
          if (
            player.money > player.drillingLevel * player.upgradePrice &&
            player.drillingLevel < 5
          ) {
            player.money -= player.drillingLevel * player.upgradePrice;
            player.drillingLevel += 1;
          }
          break;
        case "Digit2":
          if (
            player.money > player.movingLevel * player.upgradePrice &&
            player.movingLevel < 5
          ) {
            player.money -= player.movingLevel * player.upgradePrice;
            player.movingLevel += 1;
          }
          break;
        case "Digit3":
          if (player.money > player.backpackLevel * player.upgradePrice) {
            player.money -= player.backpackLevel * player.upgradePrice;
            player.backpackLevel += 1;
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
      if (player.backpack.length < player.backpackLevel * 5) {
        this.coal++;
        player.backpack.push("coal");
      }
      console.log("digged coal");
    } else if (blockType[this.x][this.y] == "gold") {
      blockType[this.x][this.y] = "digged";
      if (player.backpack.length < player.backpackLevel * 5) {
        this.gold++;
        player.backpack.push("gold");
      }
      console.log("digged gold");
    } else if (blockType[this.x][this.y] == "diamond") {
      blockType[this.x][this.y] = "digged";
      if (player.backpack.length < player.backpackLevel * 5) {
        this.diamond++;
        player.backpack.push("diamond");
      }
      console.log("digged diamond");
    } else if (blockType[this.x][this.y] == "emerald") {
      blockType[this.x][this.y] = "digged";
      if (player.backpack.length < player.backpackLevel * 5) {
        this.emerald++;
        player.backpack.push("emerald");
      }
      console.log("digged emerald");
    } else if (blockType[this.x][this.y] == "ruby") {
      blockType[this.x][this.y] = "digged";
      if (player.backpack.length < player.backpackLevel * 5) {
        this.ruby++;
        player.backpack.push("ruby");
      }
      console.log("digged ruby");
    }
  }
};

let stats = {
  display: function() {
    ctxStats.beginPath();
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "black";
    ctxStats.lineWidth = 5;
    ctxStats.font = "30px Arial";
    ctxStats.fillText("Your stats:", 75, 27);
    ctxStats.font = "15px Arial";
    ctxStats.fillText("Press \"F\" on the", 185, 100);
    ctxStats.fillText("top of the screen ", 185, 115);
    ctxStats.fillText("for sell items", 185, 130);
    ctxStats.font = "25px Arial";
    ctxStats.fillText(
      "Backpack: " + player.backpack.length + " / " + player.backpackLevel * 5,
      10,
      60
    );
    ctxStats.font = "15px Arial";
    ctxStats.fillText("Coal: ", 25, 75);
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "blaxk";
    ctxStats.fillText(player.coal + " pcs", 135, 75);
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "black";
    ctxStats.fillText("Golds: ", 25, 90);
    ctxStats.strokeStyle = "yellow";
    ctxStats.fillStyle = "yellow";
    ctxStats.fillText(player.gold + " pcs", 135, 90);
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "black";
    ctxStats.fillText("Diamonds: ", 25, 105);
    ctxStats.strokeStyle = "#0062ff";
    ctxStats.fillStyle = "#0062ff";
    ctxStats.fillText(player.diamond + " pcs", 135, 105);
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "black";
    ctxStats.fillText("Emeralds: ", 25, 120);
    ctxStats.strokeStyle = "lightgreen";
    ctxStats.fillStyle = "lightgreen";
    ctxStats.fillText(player.emerald + " pcs", 135, 120);
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "black";
    ctxStats.fillText("Rubies: ", 25, 135);
    ctxStats.strokeStyle = "red";
    ctxStats.fillStyle = "red";
    ctxStats.fillText(player.ruby + " pcs", 135, 135);
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "black";
    ctxStats.font = "25px Arial";
    ctxStats.fillText("Money: ", 10, 160);
    ctxStats.strokeStyle = "yellow";
    ctxStats.fillStyle = "yellow";
    ctxStats.fillText(player.money + " $", 135, 160);
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
      ctxStats.font = "13px Arial";
      ctxStats.strokeStyle = "red";
      ctxStats.fillStyle = "red";
      ctxStats.fillText("You must be at the bottom of the area !", 10, 535);
      ctxStats.strokeStyle = "grey";
      ctxStats.fillStyle = "grey";
      ctxStats.font = "25px Arial";
    } else {
      ctxStats.font = "13px Arial";
      ctxStats.strokeStyle = "red";
      ctxStats.fillStyle = "red";
      ctxStats.fillText("You dont have enought money !", 10, 535);
      ctxStats.strokeStyle = "grey";
      ctxStats.fillStyle = "grey";
      ctxStats.font = "25px Arial";
    }
    ctxStats.fillText('Press "N" for', 10, 560);
    ctxStats.fillText(
      "buy next level (" + player.level * player.levelPrice + " $)",
      10,
      585
    );
    ctxStats.fill();
  },
  levelRestartOption: function() {
    ctxStats.beginPath();
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "black";
    ctxStats.moveTo(0, 592);
    ctxStats.lineTo(300, 592);
    ctxStats.font = "25px Arial";
    ctxStats.fill();
    ctxStats.fillText("Nothink to dig ??", 10, 615);
    ctxStats.fillText('Press "X" for', 10, 640);
    ctxStats.fillText("restart from begining", 10, 665);
    ctxStats.font = "13px Arial";
    //ctxStats.strokeStyle = "red";
    ctxStats.fillStyle = "red";
    ctxStats.fillText("You are going to lose", 155, 632);
    ctxStats.fillText("a half of your money!", 155, 645);
    ctxStats.stroke();
  },
  levelCounter: function() {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Level: " + player.level, 5, 20);
  },
  upgrades: function() {
    ctxStats.beginPath();
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "black";
    ctxStats.font = "25px Arial";
    ctxStats.fillText("Upgrades:", 10, 200);
    ctxStats.font = "15px Arial";
    ctxStats.fillText("Press \"Digit1\",", 150, 190);
    ctxStats.fillText("\"Digit2\" or \"Digit3\"", 150, 205);
    ctxStats.moveTo(0, 35);
    ctxStats.lineTo(300, 35);
    ctxStats.moveTo(0, 167);
    ctxStats.lineTo(300, 167);
    ctxStats.font = "30px Arial";
    ctxStats.rect(0, 0, 300, 675);
    ctxStats.rect(0, 215, 300, 80);
    ctxStats.rect(0, 295, 300, 80);
    ctxStats.rect(0, 375, 300, 80);
    ctxStats.fillText("Drilling speed", 10, 250);
    ctxStats.fillText("lvl.: " + player.drillingLevel, 10, 280);
    ctxStats.fillText("Moving speed", 10, 330);
    ctxStats.fillText("lvl.: " + player.movingLevel, 10, 360);
    ctxStats.fillText("Backpack", 10, 410);
    ctxStats.fillText("lvl.: " + player.backpackLevel, 10, 440);
    ctxStats.stroke();
    ctxStats.beginPath();
    if (player.money < player.drillingLevel * player.upgradePrice) {
      ctxStats.lineWidth = 2;
      ctxStats.strokeStyle = "grey";
      ctxStats.fillStyle = "grey";
    } else {
      ctxStats.lineWidth = 4;
      ctxStats.strokeStyle = "black";
      ctxStats.fillStyle = "black";
    }
    ctxStats.arc(250, 255, 25, 0, 2 * Math.PI);
    ctxStats.stroke();
    ctxStats.beginPath();
    if (player.money < player.movingLevel * player.upgradePrice) {
      ctxStats.lineWidth = 2;
      ctxStats.strokeStyle = "grey";
      ctxStats.fillStyle = "grey";
    } else {
      ctxStats.lineWidth = 4;
      ctxStats.strokeStyle = "black";
      ctxStats.fillStyle = "black";
    }
    ctxStats.arc(250, 335, 25, 0, 2 * Math.PI);
    ctxStats.stroke();
    ctxStats.beginPath();
    if (player.money < player.backpackLevel * player.upgradePrice) {
      ctxStats.lineWidth = 2;
      ctxStats.strokeStyle = "grey";
      ctxStats.fillStyle = "grey";
    } else {
      ctxStats.lineWidth = 4;
      ctxStats.strokeStyle = "black";
      ctxStats.fillStyle = "black";
    }
    ctxStats.arc(250, 415, 25, 0, 2 * Math.PI);
    ctxStats.stroke();
    ctxStats.beginPath();
    ctxStats.font = "17px Arial";
    ctxStats.strokeStyle = "black";
    ctxStats.fillStyle = "black";
    if (player.drillingLevel != 5) {
      ctxStats.fillText(player.upgradePrice * player.drillingLevel, 230, 260);
    } else {
      ctxStats.fillText("MAX", 230, 260);
    }
    if (player.movingLevel != 5) {
      ctxStats.fillText(player.upgradePrice * player.movingLevel, 230, 340);
    } else {
      ctxStats.fillText("MAX", 230, 340);
    }
    ctxStats.fillText(player.upgradePrice * player.backpackLevel, 230, 420);

    ctxStats.stroke();
  }
};

player.movement();

function play() {
  area.generate();
  setInterval(function playGame() {
    canvas.clear();
    area.repaint();
    player.checkBlock();
    stats.levelCounter();
    player.paint();
  }, 20);
}

function playStats() {
  setInterval(function playStats1() {
    canvas.clearStats();
    stats.nextLevelDisplay();
    stats.levelRestartOption();
    stats.upgrades();
    stats.display();
  }, 20);
}

play();
playStats();
console.log(blockType);
