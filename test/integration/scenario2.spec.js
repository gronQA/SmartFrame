import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Builder, until } = require("selenium-webdriver");
const assert = require("assert");
import { data } from "../fixtures/data.js";
import { selectors } from "../fixtures/selectors.js";
const driver = await new Builder().forBrowser("chrome").build();

describe("Test scenario 2", function () {
  it("Opens SmartFrame 2", async function () {
    await driver.get(data.path.smartFrame2);
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

  it("Checks if the share button is displayed correctly", async function () {
    const shareButton = await driver.findElement(selectors.shareButton);
    await driver.wait(until.elementIsVisible(shareButton), 20000);
    const actualText = await shareButton.getText();
    assert.strictEqual(actualText, data.expectedText.shareButton);
  });

  it("Clicks on the icon in the top-left-hand corner and expects to get redirected", async function () {
    await driver.findElement(selectors.seButton).click();
    const tabs = await driver.getAllWindowHandles();
    await driver.switchTo().window(tabs[1]);
    const actualUrl = await driver.getCurrentUrl();
    assert.strictEqual(actualUrl, data.expectedText.smartFrameUrl);
  });

  it("Closes browser", async function () {
    await driver.quit();
  });
});
