# Usari — Kurumsal Site

Usari'nin resmi tanitim sitesi. Statik, framework'suz: HTML + tek CSS + vanilla JS.
Sirket: **Usari** (uygulama yazilimi, web sitesi, kisisel telefon sekreteri) ·
Amiral gemisi proje: **Grande AI** (gelistirme asamasinda).

Canli: https://usari-website-production.up.railway.app/

## Yerel calistirma

```bash
python dev-server.py 8099
```

> `python -m http.server` KULLANMA: Range istegi desteklemedigi icin anasayfadaki
> scroll-video takilir. `dev-server.py` 206 Partial Content dondurur.

## Icerik guncelleme akisi

1. Metinler tek kaynaktan: `data/content.js` (her alan `{ tr, en }`).
2. Degisiklikten sonra prerender'i tazele (SEO icin icerik statik HTML'e gomulur):
   ```bash
   python dev-server.py 8098   # ayri terminalde acik kalsin
   node tools/bake.js
   ```
3. Denetim: `node tools/audit.js` (6 sayfa x TR/EN, konsol/i18n/ankraj kontrolu).

## Yapi

- `index.html` — scroll-scrub sinematik hero (yesil tilki videosu `assets/scroll-fox.mp4`,
  kaydirdikca `currentTime` ilerler; reduced-motion/dokunmatikte poster fallback)
- `hizmetler.html` · `grande-ai.html` · `hakkinda.html` · `iletisim.html` · `404.html`
- `css/style.css` — koyu premium dijital-yesil tema (token tabanli)
- `js/site.js` — nav/footer enjeksiyonu, TR/EN i18n, render, scrub, gecisler
- `tools/` — bake (prerender) + audit betikleri

## Yayin

GitHub Pages: `main` / root. Ozel alan adina gecince canonical/OG/sitemap URL'lerini
yeni adrese cevir (tek yer-degistirme) ve yeniden yayinla.
