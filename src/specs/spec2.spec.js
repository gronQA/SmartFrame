const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const expectedText = "SHARE";

async function spec() {
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get("https://smartitnow.blogspot.com/p/w.html");

  await driver.quit();
}

spec();
