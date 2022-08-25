const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const expectedText = "SHARE";
const expectedUrl = "https://smartframe.io/";

async function spec() {
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get("https://smartitnow.blogspot.com/p/w.html");

  const hoverable = driver.findElement(By.className("float-container"));
  const actions = driver.actions({ async: true });
  await actions.move({ origin: hoverable }).perform();

  const actualText = await driver
    .findElement(
      By.xpath(
        "//*[@id='post-body-4144740677389794309']/smart-frame/div[1]/div[4]/div[2]/div[2]/a[1]/span"
      )
    )
    .getText()
    .then(function (value) {
      return value;
    });

  assert.strictEqual(actualText, expectedText);

  await driver
    .findElement(
      By.xpath(
        "//*[@id='post-body-4144740677389794309']/smart-frame/div[1]/div[4]/div[2]/div[1]/a"
      )
    )
    .click();

  let tabs = await driver.getAllWindowHandles();

  let url = await driver.switchTo().window(tabs[1]);

  actualUrl = await driver.getCurrentUrl();

  assert.strictEqual(actualUrl, expectedUrl);

  await driver.quit();
}

spec();
