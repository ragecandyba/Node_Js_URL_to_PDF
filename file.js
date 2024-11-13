const puppeteer = require("puppeteer");
async function exportWebsiteAsPdf(websiteUrl, outputPath) {
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();

  await page.goto(websiteUrl, { waitUntil: "networkidle0" });

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType("screen");

  const PDF = await page.pdf({
    path: outputPath,
    printBackground: true,
    format: "A4",
  });

  await browser.close();

  return PDF;
}

exportWebsiteAsPdf(
  "https://wilmettepark.org/lakefront-gillson-park/picnic-areas/",
  "result.pdf"
)
  .then(() => {
    console.log("PDF created successfully.");
  })
  .catch((error) => {
    console.error("Error creating PDF:", error);
  });
