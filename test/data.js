import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { By } = require("selenium-webdriver");

export const data = {
  path: {
    smartFrame1: "https://smartitnow.blogspot.com/p/e.html",
    smartFrame2: "https://smartitnow.blogspot.com/p/w.html",
  },
  expectedText: {
    caption:
      "An image (from Latin: imago) is an artifact that depicts visual perception, such as a photograph or other two-dimensional picture, that resembles a subject—usually a physical object—and thus provides a depiction of it. In the context of signal processing, an image is a distributed amplitude of color(s). A pictorial script is a writing system that employs images as symbols for various semantic entities, rather than the abstract signs used by alphabets.",
    shareButton: "SHARE",
    smartFrameUrl: "https://smartframe.io/",
  },
  selectors: {
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
  },
};
