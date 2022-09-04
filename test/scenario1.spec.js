import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
import { data } from "./data.js";

describe("Test scenario 1", function () {
  it("Opens SmartFrame 1, hovers over the SmartFrame, checks if the caption is correctly displayed, clicks on the icon in the top-left-hand corner and expects the layer to open", async function () {
    const driver = await new Builder().forBrowser("chrome").build();

    await driver.get(data.path.smartFrame1);

    // Mouse over the SmartFrame
    const hoverable = await driver.findElement(data.selectors.hoverable);

    await driver.wait(until.elementIsVisible(hoverable), 20000);

    const actions = driver.actions({
      async: true,
    });

    await actions
      .move({
        origin: hoverable,
      })
      .perform();

    await driver.switchTo().frame(driver.findElement(data.selectors.frame));

    // Check if the caption is correctly displayed
    const caption = await driver.findElement(data.selectors.caption);

    await driver.wait(until.elementIsVisible(caption), 20000);

    const actualText = await caption.getText();

    assert.strictEqual(actualText, data.expectedText.caption);

    // Click on the icon in the top-left-hand corner of the SmartFrame
    await driver.findElement(data.selectors.embedButton).click();

    // Check if the layer opens
    const layer = await driver.findElement(data.selectors.layer);

    await driver.wait(until.elementIsVisible(layer), 20000);
    assert.strictEqual(await layer.isDisplayed(), true);

    await driver.quit();
  });
});
