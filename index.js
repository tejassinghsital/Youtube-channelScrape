const puppeteer = require("puppeteer");
const fs = require("fs");

// const scrollInfinite = async (page) => {
//   while (true) {
//     const previousHeight = await page.evaluate("document.body.scrollHeight");
//     await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
//     await page.waitForFunction(
//       `document.body.scrollHeight > ${previousHeight}`
//     );
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // or we an use to wait for certain selector see screenshot of 1131 1132 1133 but in this case since we don't have any selector at last of channels page we are using timeout to scroll after reload i.e after 1 sec
//   }
// };

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  await page.goto("https://www.youtube.com/c/theodd1sout/channels"); // scroll working in here https://intoli.com/blog/scrape-infinite-scroll/demo.html

  await scrollInfinite(page);

  const allChannels = await page.evaluate(() => {
    const items = document.querySelectorAll(
      "#items ytd-grid-channel-renderer div a"
    );

    let links = [];
    items.forEach((element) => {
      links.push(element.href);
    });

    return links;
  });

  console.log(allChannels);
  //   await browser.close();
})();
