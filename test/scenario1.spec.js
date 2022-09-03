const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const expectedText =
  "An image (from Latin: imago) is an artifact that depicts visual perception, such as a photograph or other two-dimensional picture, that resembles a subject—usually a physical object—and thus provides a depiction of it. In the context of signal processing, an image is a distributed amplitude of color(s). A pictorial script is a writing system that employs images as symbols for various semantic entities, rather than the abstract signs used by alphabets.";

describe("Test scenario 1", function () {
  it("Opens SmartFrame 1, hovers over the SmartFrame, checks if the caption is correctly displayed, clicks on the icon in the top-left-hand corner and expects the layer to open", async function () {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://smartitnow.blogspot.com/p/e.html");

    // Mouse over the SmartFrame
    const hoverable = driver.findElement(By.className("float-container"));

    const actions = driver.actions({
      async: true,
    });

    await actions
      .move({
        origin: hoverable,
      })
      .perform();

    await driver
      .switchTo()
      .frame(driver.findElement(By.className("smartframe-embed")));

    // Check if the caption is correctly displayed
    await driver.wait(() =>
      driver.findElement(By.className("caption-wrapper")).getText()
    );
    const actualText = await driver
      .findElement(By.className("caption-wrapper"))
      .getText();
    assert.strictEqual(actualText, expectedText);

    // Click on the icon in the top-left-hand corner of the SmartFrame
    await driver.findElement(By.className("action-buttons__caption")).click();

    // Check if the layer opens
    const layer = await driver.findElement(By.className("hide-copyright"));
    await driver.wait(() => layer.isDisplayed());
    assert.strictEqual(await layer.isDisplayed(), true);

    await driver.quit();
  });
});
