const { execFileSync } = require("child_process");
const { copyFileSync } = require("fs");
const path = require("path");

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const input = `file://${path.join(__dirname, "index.html")}`;
const root = path.join(__dirname, "..");
const output = path.join(root, "almir-khialov-website-offer.pdf");
const aliases = [
  path.join(root, "almir-khialov-new-website-offer.pdf"),
  path.join(root, "presentation.pdf"),
];

execFileSync(
  chrome,
  [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${output}`,
    input,
  ],
  { stdio: "inherit" }
);

for (const alias of aliases) {
  copyFileSync(output, alias);
}

console.log(`PDF ready: ${output}`);
