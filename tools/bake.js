/* Usari prerender/bake — her sayfayı jsdom'da boot edip render edilmiş DOM'u
   statik HTML olarak geri yazar (progressive enhancement: JS runtime'da yeniden basar).
   Çalıştırmadan önce dev-server (8098) ayakta olmalı. İdempotenttir. */
const { JSDOM, VirtualConsole } = require("jsdom");
const fs = require("fs");
const path = require("path");

const SITE = "C:/Users/UTKU/usari-website";
const PAGES = ["index.html", "hizmetler.html", "grande-ai.html", "hakkinda.html", "iletisim.html", "404.html"];

function bake(page) {
  return new Promise((resolve, reject) => {
    const html = fs.readFileSync(path.join(SITE, page), "utf8");
    const vc = new VirtualConsole(); // jsdom medya uyarılarını sustur
    vc.on("jsdomError", () => {});
    const dom = new JSDOM(html, {
      url: "http://127.0.0.1:8098/" + page,
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true,
      virtualConsole: vc,
    });
    setTimeout(() => {
      try {
        const doc = dom.window.document;
        // Runtime-only izleri temizle: no-JS tarayıcı baked çıktıda içerik + görünürlük almalı
        doc.documentElement.classList.remove("js", "no-content");
        if (!doc.documentElement.className) doc.documentElement.removeAttribute("class");
        doc.body.classList.remove("is-ready", "page-exit");
        if (!doc.body.className) doc.body.removeAttribute("class");
        doc.body.style.removeProperty("opacity");
        doc.body.style.removeProperty("overflow");
        if (!doc.body.getAttribute("style")) doc.body.removeAttribute("style");
        // reveal'lar baked halde görünür sınıfla kalsın (no-JS'te içerik görünür);
        // runtime'da html.js scope'u zaten yeniden yönetiyor — dokunma.
        // scroll-hint inline opacity temizle
        const hint = doc.getElementById("scroll-hint");
        if (hint) hint.style.removeProperty("opacity");
        if (hint && !hint.getAttribute("style")) hint.removeAttribute("style");
        const out = dom.serialize();
        fs.writeFileSync(path.join(SITE, page), out, "utf8");
        const kb = Math.round(out.length / 1024);
        console.log(`baked: ${page} (${kb} KB)`);
        resolve();
      } catch (e) { reject(e); }
      finally { dom.window.close(); }
    }, 1600);
  });
}

(async () => {
  for (const p of PAGES) await bake(p);
  console.log("TAMAM");
})();
