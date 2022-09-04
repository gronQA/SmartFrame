import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Builder, until } = require("selenium-webdriver");
const assert = require("assert");
import { data } from "../fixtures/data.js";
import { selectors } from "../fixtures/selectors.js";

describe("Test scenario 2", function () {
  it("Opens SmartFrame 2, hovers over the SmartFrame, checks if the share button is displayed correctly, clicks on the icon in the top-left-hand corner and expects to get redirected", async function () {
    const driver = await new Builder().forBrowser("chrome").build();

    await driver.get(data.path.smartFrame2);

    // Mouse over the SmartFrame
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

    // Check if the Share button is displayed correctly
    const shareButton = await driver.findElement(selectors.shareButton);

    await driver.wait(until.elementIsVisible(shareButton), 20000);

    const actualText = await shareButton.getText();
    assert.strictEqual(actualText, data.expectedText.shareButton);

    // Click on the icon in the top-left-hand corner of the SmartFrame
    await driver.findElement(selectors.seButton).click();

    // Check if the redirect works
    const tabs = await driver.getAllWindowHandles();

    await driver.switchTo().window(tabs[1]);

    const actualUrl = await driver.getCurrentUrl();
    assert.strictEqual(actualUrl, data.expectedText.smartFrameUrl);

    await driver.quit();
  });
});
