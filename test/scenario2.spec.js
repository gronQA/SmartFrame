const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");

describe("Test scenario 2", function () {
  it("Opens SmartFrame 2, hovers over the SmartFrame, checks if the share button is displayed correctly, clicks on the icon in the top-left-hand corner and expects to get redirected", async function () {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://smartitnow.blogspot.com/p/w.html");

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

    // Check if the Share button is displayed correctly
    await driver.wait(
      () =>
        driver
          .findElement(
            By.xpath(
              "//*[@id='post-body-4144740677389794309']/smart-frame/div[1]/div[4]/div[2]/div[2]/a[1]/span"
            )
          )
          .getText(),
      10000
    );
    const actualText = await driver
      .findElement(
        By.xpath(
          "//*[@id='post-body-4144740677389794309']/smart-frame/div[1]/div[4]/div[2]/div[2]/a[1]/span"
        )
      )
      .getText();

    const expectedText = "SHARE";
    assert.strictEqual(actualText, expectedText);

    // Click on the icon in the top-left-hand corner of the SmartFrame
    await driver
      .findElement(
        By.xpath(
          "//*[@id='post-body-4144740677389794309']/smart-frame/div[1]/div[4]/div[2]/div[1]/a"
        )
      )
      .click();

    // Check if the redirect works
    const tabs = await driver.getAllWindowHandles();

    await driver.switchTo().window(tabs[1]);

    actualUrl = await driver.getCurrentUrl();

    const expectedUrl = "https://smartframe.io/";
    assert.strictEqual(actualUrl, expectedUrl);

    await driver.quit();
  });
});
