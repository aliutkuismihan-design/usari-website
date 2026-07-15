/* Usari sitesi denetim betiği — jsdom ile 6 sayfayı boot eder.
   Kontroller: konsol hataları, boş data-i18n, undefined metin, nav/footer,
   EN geçişi, sayfa içi ankraj hedefleri, dosya içi link hedefleri. */
const { JSDOM, VirtualConsole } = require("jsdom");
const fs = require("fs");
const path = require("path");

const SITE = "C:/Users/UTKU/usari-website";
const PAGES = ["index.html", "hizmetler.html", "grande-ai.html", "hakkinda.html", "iletisim.html", "404.html"];

function boot(page, lang) {
  return new Promise((resolve) => {
    const html = fs.readFileSync(path.join(SITE, page), "utf8");
    const errors = [];
    const vc = new VirtualConsole();
    vc.on("jsdomError", (e) => errors.push("jsdomError: " + String(e.message || e).slice(0, 120)));
    vc.on("error", (...a) => errors.push("console.error: " + a.join(" ").slice(0, 120)));
    const dom = new JSDOM(html, {
      url: "http://127.0.0.1:8098/" + page,
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true,
      virtualConsole: vc,
    });
    const win = dom.window;
    if (lang) {
      try { win.localStorage.setItem("usari_lang", lang); } catch (e) {}
    }
    setTimeout(() => {
      const doc = win.document;
      const out = { page, lang: lang || "tr", errors };
      out.emptyI18n = [...doc.querySelectorAll("[data-i18n]")]
        .filter((e) => !(e.textContent || "").trim())
        .map((e) => e.getAttribute("data-i18n"));
      out.undefinedText = (doc.body.textContent.match(/undefined|\[object/g) || []).length;
      out.h1 = doc.querySelectorAll("h1").length;
      out.navLinks = doc.querySelectorAll("#site-header a").length;
      out.footerLinks = doc.querySelectorAll("#site-footer a").length;
      // sayfa içi ankraj hedefleri var mı?
      out.badAnchors = [...doc.querySelectorAll('a[href*="#"]')]
        .map((a) => a.getAttribute("href"))
        .filter((h) => h && !h.startsWith("mailto"))
        .map((h) => {
          const [file, anchor] = h.split("#");
          if (!anchor) return null;
          const targetFile = file || page;
          try {
            const targetHtml = targetFile === page ? doc.documentElement.outerHTML : fs.readFileSync(path.join(SITE, targetFile), "utf8");
            // id doğrudan HTML'de ya da JS render'ında olabilir; render edilen sayfada kontrol yalnız aynı-dosya için kesin
            if (targetFile === page) return doc.getElementById(anchor) ? null : h;
            return targetHtml.includes('id="' + anchor + '"') ? null : h + " (statik-HTML'de yok — JS render olabilir)";
          } catch (e) { return h + " (dosya yok!)"; }
        })
        .filter(Boolean);
      // html lang
      out.htmlLang = doc.documentElement.getAttribute("lang");
      // örnek metin (EN doğrulama için)
      const t = doc.querySelector("h1");
      out.h1Text = t ? t.textContent.slice(0, 60) : "";
      resolve(out);
      win.close();
    }, 1200);
  });
}

(async () => {
  const results = [];
  for (const p of PAGES) results.push(await boot(p));
  // EN geçişi: localStorage ile 2 örnek sayfa
  results.push(await boot("index.html", "en"));
  results.push(await boot("hizmetler.html", "en"));
  for (const r of results) {
    const flag = r.errors.length || r.emptyI18n.length || r.undefinedText || r.badAnchors.length ? "SORUN" : "OK";
    console.log(`[${flag}] ${r.page} (${r.lang}) h1:${r.h1} lang:${r.htmlLang} nav:${r.navLinks} footer:${r.footerLinks}`);
    if (r.h1Text) console.log(`   h1: "${r.h1Text}"`);
    if (r.errors.length) console.log("   HATALAR:", r.errors.slice(0, 5));
    if (r.emptyI18n.length) console.log("   BOŞ i18n:", r.emptyI18n.slice(0, 10));
    if (r.undefinedText) console.log("   undefined metin adedi:", r.undefinedText);
    if (r.badAnchors.length) console.log("   ANKRAJ:", r.badAnchors);
  }
})();
