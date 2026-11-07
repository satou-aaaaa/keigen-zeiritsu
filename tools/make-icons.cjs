// アプリのアイコン（icon-192.png・icon-512.png・icon-512-maskable.png）を作る。maskable は絵を中心から0.75倍にして、丸く切られても欠けないようにする（安全な範囲は中心の直径80%）。紺の地に、黄色の値札と「%」。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
let pw; try { pw = require(path.join(__dirname, "..", "qa", "node_modules", "playwright")); } catch (e) { pw = require("playwright"); }
(async () => {
  const b = await pw.chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const [s, name, k] of [[192, "icon-192.png", 1], [512, "icon-512.png", 1], [512, "icon-512-maskable.png", 0.75]]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#151a2e"/><g transform="translate(50 50) scale(${k}) translate(-50 -50)">
      <path d="M20 30 L52 30 L84 62 L56 90 L20 54 Z" fill="#ffc857" stroke="#b8861d" stroke-width="3" stroke-linejoin="round"/>
            <circle cx="33" cy="43" r="5" fill="#151a2e"/><text x="54" y="72" font-family="sans-serif" font-size="28" font-weight="900" fill="#151a2e" text-anchor="middle">%</text></g></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", name), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
