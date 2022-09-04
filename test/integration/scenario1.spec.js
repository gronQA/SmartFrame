import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Builder, until } = require("selenium-webdriver");
const assert = require("assert");
import { data } from "../fixtures/data.js";
import { selectors } from "../fixtures/selectors.js";
const driver = await new Builder().forBrowser("chrome").build();

describe("Test scenario 1", function () {
  it("Opens SmartFrame 1", async function () {
    await driver.get(data.path.smartFrame1);
  });

  it("Hovers over the SmartFrame", async function () {
    const hoverable = await driver.findElement(selectors.hoverable);
    await driver.wait(until.elementIsVisible(hoverable), 20000);
    const actions = driver.actions({
      async: true,
    });
    await actions
      .move({
        origin: hoverable,
      })
      .perform();
  });

  it("Checks if the caption is displayed correctly", async function () {
    await driver.switchTo().frame(driver.findElement(selectors.frame));
    const caption = await driver.findElement(selectors.caption);
    await driver.wait(until.elementIsVisible(caption), 20000);
    const actualText = await caption.getText();
    assert.strictEqual(actualText, data.expectedText.caption);
  });

  it("Clicks on the icon in the top-left-hand corner and expects the layer to open", async function () {
    await driver.findElement(selectors.embedButton).click();
    const layer = await driver.findElement(selectors.layer);
    await driver.wait(until.elementIsVisible(layer), 20000);
    assert.strictEqual(await layer.isDisplayed(), true);
  });

  it("Closes browser", async function () {
    await driver.quit();
  });
});
