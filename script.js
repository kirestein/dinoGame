const dino = document.querySelector('.dino');
const bg = document.querySelector('.bg');
let isJumping = false;
let position = 0;

const handleKeyUp = e => {
  if (e.keyCode === 32 || e.keyCode === 38) {
    if (!isJumping) {
      jump();
    }
    console.log('pressionou  espaço ou seta para cima');
  }
}

const jump = () => {
  
  isJumping = true
  let upInterval = setInterval(_ => {
    if (position >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(_ => {
        if  (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20
          dino.style.bottom = `${position}px`;

        }
      }, 30)
    } else {
      position += 20;
      dino.style.bottom = `${position}px`;
  
    }
  }, 20);
}

const createCactus = _ => {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.floor(Math.random() * 6000);

  cactus.classList.add('cactus');
  cactus.style.left = `${cactusPosition}px`
  bg.appendChild(cactus);

  let leftInterval = setInterval(_ => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      bg.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60  && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = `<h1>Game Over</h1>`
    } else {
      cactusPosition -= 10;
      cactus.style.left = `${cactusPosition}px`

    }
  }, 20);
  setTimeout(createCactus, randomTime);
};

createCactus();
document.addEventListener('keyup', handleKeyUp)