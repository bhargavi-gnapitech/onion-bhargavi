  const { expect } = require('@playwright/test');

  module.exports.performCanvasOperationAndSelectDate = async function(page, xPercentage = 0.3, yPercentage = 0.4) {
  const canvasLocator = await page.locator('#map_canvas');
  await expect(canvasLocator).toBeVisible({ timeout: 6000 });

  const canvasBoundingBox = await canvasLocator.boundingBox();
  if (!canvasBoundingBox) {
    console.error('Could not get bounding box for the canvas element');
    return;
  }

  console.log(`Canvas Bounding Box: x=${canvasBoundingBox.x}, y=${canvasBoundingBox.y}, width=${canvasBoundingBox.width}, height=${canvasBoundingBox.height}`);

  const xPosition = canvasBoundingBox.x + canvasBoundingBox.width * xPercentage;
  const yPosition = canvasBoundingBox.y + canvasBoundingBox.height * yPercentage;

  const oppositeX = (canvasBoundingBox.x + canvasBoundingBox.width) - (xPosition - canvasBoundingBox.x);

  console.log(`Placing cabinet at 30% width and 40% height: x=${xPosition}, y=${yPosition}`);
  console.log(`Placing cabinet at the opposite side: x=${oppositeX}, y=${yPosition}`);

  await page.mouse.click(oppositeX, yPosition);

};