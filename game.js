window.onload = () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const box = 20;
  let snake = [{x: 200, y: 200}];
  let food = randomPos();
  let dir = "RIGHT";
  let score = 0;

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && dir !== "RIGHT") dir = "LEFT";
    if (e.key === "ArrowUp" && dir !== "DOWN") dir = "UP";
    if (e.key === "ArrowRight" && dir !== "LEFT") dir = "RIGHT";
    if (e.key === "ArrowDown" && dir !== "UP") dir = "DOWN";
  });

  function randomPos() {
    return {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
  }

  function draw() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Snake
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i === 0 ? "lime" : "green";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Move
    let head = {...snake[0]};
    if (dir === "LEFT") head.x -= box;
    if (dir === "RIGHT") head.x += box;
    if (dir === "UP") head.y -= box;
    if (dir === "DOWN") head.y += box;

    // Collision
    if (
      head.x < 0 || head.x >= canvas.width ||
      head.y < 0 || head.y >= canvas.height ||
      snake.some(s => s.x === head.x && s.y === head.y)
    ) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      food = randomPos();
      score++;
    } else {
      snake.pop();
    }
  }

  setInterval(draw, 150);
};
