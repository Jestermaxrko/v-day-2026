const drawGiftBox = (color, sizeInPx) => {
  const box = document.createElement('div');
  box.style.width = `${sizeInPx}px`;
  box.style.height = `${sizeInPx}px`;
  box.style.backgroundColor = color;
  box.style.position = 'relative';

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

const redGiftBox = drawGiftBox('red', 200);
const container = document.querySelector('.container');
container.appendChild(redGiftBox);