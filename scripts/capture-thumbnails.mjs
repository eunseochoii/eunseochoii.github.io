import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const pages = [
  {
    url: 'https://oecd.ai/en/ai-toolkit/get-started',
    file: 'ai-policy-toolkit.png',
  },
  {
    url: 'https://oecd.ai/en/transparency/overview',
    file: 'hiroshima-framework.png',
  },
  {
    url: 'https://oecd.ai/en/dashboards/overview',
    file: 'policy-navigator.png',
  },
  {
    url: 'https://oecd.ai/en/action-summit-thresholds',
    file: 'threshold-panel.png',
  },
  {
    url: 'https://oecd.ai/en/site/ai-futures/discussions/risk-thresholds-consultation',
    file: 'threshold-consultation.png',
  },
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
});

for (const { url, file } of pages) {
  console.log(`Capturing ${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(3000);
  await page.screenshot({
    path: path.join(root, 'data/projects', file),
    clip: { x: 0, y: 0, width: 1280, height: 720 },
  });
}

await browser.close();
console.log('Done.');
