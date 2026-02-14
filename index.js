const drawGiftBox = (color, sizeInPx) => {
  const box = document.createElement('div');
  box.style.width = `${sizeInPx}px`;
  box.style.height = `${sizeInPx}px`;
  box.style.backgroundColor = color;
  box.style.position = 'relative';
  box.style.border = `1px solid ${color}`;

  const horizontalRibbon = document.createElement('div');
  horizontalRibbon.style.width = '100%';
  horizontalRibbon.style.height = '20%';
  horizontalRibbon.style.backgroundColor = 'white';
  horizontalRibbon.style.position = 'absolute';
  horizontalRibbon.style.top = '40%';
  horizontalRibbon.style.left = '0';

  const verticalRibbon = document.createElement('div');
  verticalRibbon.style.width = '20%';
  verticalRibbon.style.height = '100%';
  verticalRibbon.style.backgroundColor = 'white';
  verticalRibbon.style.position = 'absolute';
  verticalRibbon.style.top = '0';
  verticalRibbon.style.left = '40%';

  box.appendChild(horizontalRibbon);
  box.appendChild(verticalRibbon);
  return box;
}


const gifts = [
  {
    color: 'red',
    size: 200,
    hint: 'Цей ключ захований у череві крихкого лицаря',
    hintPenaltyText: 'Ця підказка коштувала 1 поцілунок',
  },

  {
    color: 'blue',
    size: 150,
    hint: 'Цей ключ забрав житель норки з смішною частиною тіла',
    hintPenaltyText: 'За цю підказку доведеться віддати обнімашку',
  },
  {
    color: 'green',
    hint: 'Цей ключ загубився у лісі з зеленим тропічним монстром',
    hintPenaltyText: 'За цю підказку потрібно буде почистити 1 мандаринку',
    size: 100
  },
  {
    color: 'yellow',
    size: 120,
    hint: 'Цей ключ захований у жовтому кошику з квітами',
    hintPenaltyText: 'За цю підказку потрібно зробити 1 комплімент',
  },
]

let currentGiftIndex = 0;

const hintGiftIndexes = [];

const showGift = (gift) => {
  const giftContainer = document.querySelector('#gift-container');
  giftContainer.innerHTML = '';
  const giftBox = drawGiftBox(gift.color, gift.size);
  giftContainer.appendChild(giftBox);

  //render title
  const title = document.querySelector('#gift-title');
  title.textContent = `Ключ ${currentGiftIndex + 1}`;

  //show hint button if hint exists and not shown before
  const hintButton = document.querySelector('#hint-button');
  if (gift.hint && !hintGiftIndexes.includes(currentGiftIndex)) {
    hintButton.style.display = 'block';
  } else {
    hintButton.style.display = 'none';
  }

  //show hint text if hint shown before
  if (hintGiftIndexes.includes(currentGiftIndex)) {
    const hintContainer = document.querySelector('#hint-container');
    hintContainer.textContent = gift.hint;
  } else {
    const hintContainer = document.querySelector('#hint-container');
    hintContainer.textContent = '';
  }

  //show hint penalty text if hint shown before
  const hintPenaltyContainer = document.querySelector('#hint-penalty');
  if (hintGiftIndexes.includes(currentGiftIndex) && gift.hintPenaltyText) {
    hintPenaltyContainer.textContent = gift.hintPenaltyText;
  } else {
    hintPenaltyContainer.textContent = '';
  }
}

const adjustNavButtons = () => {
  const prevButton = document.querySelector('#prev-button');
  const nextButton = document.querySelector('#next-button');

  prevButton.disabled = currentGiftIndex === 0;
  nextButton.disabled = currentGiftIndex === gifts.length - 1;
}

const addButtonListeners = () => {
  const prevButton = document.querySelector('#prev-button');
  const nextButton = document.querySelector('#next-button');

  prevButton.addEventListener('click', () => {
    if (currentGiftIndex > 0) {
      currentGiftIndex--;
      showGift(gifts[currentGiftIndex]);
      adjustNavButtons();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentGiftIndex < gifts.length - 1) {
      currentGiftIndex++;
      showGift(gifts[currentGiftIndex]);
      adjustNavButtons();
    }
  });
}

const addHintButtonListener = () => {
  const hintButton = document.querySelector('#hint-button');
  hintButton.addEventListener('click', () => {
    const currentGift = gifts[currentGiftIndex];

    //show hint text
    const hintContainer = document.querySelector('#hint-container');
    hintContainer.textContent = currentGift.hint;
    hintGiftIndexes.push(currentGiftIndex);

    //show hint penalty text if exists
    const hintPenaltyContainer = document.querySelector('#hint-penalty');
    hintPenaltyContainer.textContent = currentGift.hintPenaltyText;

    //set display none to hint button
    hintButton.style.display = 'none';
  });
}

const addStartButtonListener = () => {
  const startButton = document.querySelector('#start-button');
  startButton.addEventListener('click', () => {
    const welcomeScreen = document.querySelector('#welcome-screen');
    welcomeScreen.style.display = 'none';
    startGame();
  });
};

const startGame = () => {
  const gameContainer = document.querySelector('#game-container');
  gameContainer.style.display = 'flex';
  showGift(gifts[currentGiftIndex]);
  addButtonListeners();
  adjustNavButtons();
  addHintButtonListener();
}

addStartButtonListener();