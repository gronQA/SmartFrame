const { Builder } = require("selenium-webdriver");

async function test() {
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get("https://smartitnow.blogspot.com/p/e.html");
}

test();
