export const checkWindowBoundary = (
  position: { x: number; y: number },
  elementWidth: number,
  elementHeight: number
) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  let elementX = position.x - elementWidth / 2;
  let elementY = position.y + elementHeight;

  // Check if the element goes out of the right edge of the window
  if (elementX + elementWidth > windowWidth) {
    elementX = windowWidth - elementWidth;
  }

  // Check if the element goes out of the left edge of the window
  if (elementX < 0) {
    elementX = 0;
  }

  // Check if the element goes out of the bottom edge of the window
  if (elementY + elementHeight > windowHeight) {
    elementY = windowHeight - elementHeight;
  }

  return { x: elementX, y: elementY };
};
