import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { By } = require("selenium-webdriver");

export const selectors = {
  hoverable: By.className("float-container"),
  shareButton: By.xpath(
    "//*[@id='post-body-4144740677389794309']/smart-frame/div[1]/div[4]/div[2]/div[2]/a[1]/span"
  ),
  caption: By.className("caption-wrapper"),
  embedButton: By.className("action-buttons__caption"),
  seButton: By.xpath(
    "//*[@id='post-body-4144740677389794309']/smart-frame/div[1]/div[4]/div[2]/div[1]/a"
  ),
  layer: By.className("hide-copyright"),
  frame: By.className("smartframe-embed"),
};
