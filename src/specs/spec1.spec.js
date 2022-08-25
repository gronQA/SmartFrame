const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const correctText =
  "An image (from Latin: imago) is an artifact that depicts visual perception, such as a photograph or other two-dimensional picture, that resembles a subject—usually a physical object—and thus provides a depiction of it. In the context of signal processing, an image is a distributed amplitude of color(s). A pictorial script is a writing system that employs images as symbols for various semantic entities, rather than the abstract signs used by alphabets.";

async function spec() {
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get("https://smartitnow.blogspot.com/p/e.html");

  const hoverable = driver.findElement(By.className("float-container"));
  const actions = driver.actions({ async: true });
  await actions.move({ origin: hoverable }).perform();

  await driver
    .switchTo()
    .frame(driver.findElement(By.className("smartframe-embed")));

  let captionText = await driver
    .findElement(By.className("caption-wrapper"))
    .getText()
    .then(function (value) {
      return value;
    });

  assert.strictEqual(captionText, correctText);

  await driver.findElement(By.className("action-buttons__caption")).click();

  let result = await driver
    .findElement(By.className("hide-copyright"))
    .isDisplayed();

  assert.strictEqual(result, true);

  await driver.quit();
}

spec();
