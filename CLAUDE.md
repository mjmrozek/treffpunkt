# Gaststätte Treffpunkt – Webseite

Statische Webseite (reines HTML/CSS, kein Build-Schritt) für die Gaststätte Treffpunkt, Talstr. 38, 40764 Langenfeld. Inhaber: Z. & M. Nožić. Sprache der Seite: Deutsch.

## Struktur

- `index.html` – Startseite: Türschild mit Live-Status, Öffnungszeiten, Besuch & Reservierung, Sonntagsfrühstück, Gerichte-Auswahl
- `oeffnungszeiten.js` – berechnet in Europe/Berlin-Zeit, ob geöffnet ist (Türschild) und hebt den heutigen Tag hervor. **Öffnungszeiten stehen doppelt:** in `HOURS` in dieser Datei und als Liste in `index.html` – bei Änderungen beide anpassen.
- `impressum.html`, `datenschutz.html` – Rechtstexte; gelb markierte `<mark class="placeholder">`-Stellen müssen noch ausgefüllt/geprüft werden
- `netlify.toml` – Security-Header inkl. strenger Content-Security-Policy (nur `'self'`)
- `speisekarte.html` – Speisekarte als Seitenbilder (antippen = volle Größe) plus PDF-Download
- `styles.css` – gemeinsames Stylesheet; Farben als Variablen in `:root`
- `fonts/` – Schriften lokal (Yellowtail für den Schriftzug, Bitter für Überschriften, Source Sans 3 für Text). Bewusst nicht von Google Fonts geladen (DSGVO).
- `bilder/` – Außenfoto, Speisekarten-PDF (`speisekarte_102026.pdf`, Stand Oktober 2026, aus Canva, 8 Seiten) und `bilder/speisekarte/seite-1…8.jpg`
- `testfile.txt` – altes Testfile für die GitHub-Verbindung, gehört nicht zur Seite

Alle Seiten teilen Kopfleiste, Navigation (`Start | Speisekarte`) und Footer. Ein neuer Menüpunkt muss in jeder HTML-Datei eingetragen werden. Im Footer steht klein der Credit „Mrozek IT-Solutions“ (https://mrozek-it-solutions.com) – bewusst unauffällig halten.

## Datenschutz-Regeln

- Keine externen Ressourcen einbinden (keine CDNs, Google Fonts, Maps-Iframes, YouTube, Social-Plugins) und keine Cookies/kein Tracking – darauf beruht die Datenschutzerklärung, und deshalb gibt es keinen Cookie-Banner.
- Keine Inline-Styles, Inline-Skripte oder `onclick`-Attribute: die CSP in `netlify.toml` blockiert sie.
- Externe Links mit `rel="noopener noreferrer"`.
- Wird doch etwas Externes nötig: CSP erweitern **und** `datenschutz.html` anpassen.

## Design

Farben vom Haus abgeleitet: Flaschengrün vom Biergarten-Banner, Klinkerrot der Fassade, Gold/Messing aus der Speisekarte. Der Schriftzug „Treffpunkt“ in Schreibschrift erinnert an das Leuchtschild über der Tür. Erkennungsmerkmal ist das hängende Türschild im Kopfbereich (schwingt beim Laden, außer bei „Bewegung reduzieren“).

## Neue Speisekarte einspielen

1. Neues PDF nach `bilder/` legen und den Download-Link in `speisekarte.html` anpassen.
2. Seitenbilder neu erzeugen: `pdftoppm -jpeg -jpegopt quality=78,progressive=y -scale-to-x 1100 -scale-to-y -1 bilder/<datei>.pdf bilder/speisekarte/seite`
3. Reihenfolge, Sprungmarken und Alt-Texte in `speisekarte.html` prüfen (Seite 1 = Deckblatt wird nicht gezeigt, Seite 2 = Allergene steht am Ende).

## Hosting und Deployment

- **Repo:** https://github.com/mjmrozek/treffpunkt (öffentlich), Branch `main`
- **Hosting:** Netlify, Projekt `treffpunkt-langenfeld` (https://treffpunkt-langenfeld.netlify.app). Ein Push auf `main` ist sofort live – also nur pushen, wenn die Änderung veröffentlicht werden soll.
- **Domain:** `treffpunkt-langenfeld.de` ist bei Netlify als primäre Custom Domain eingetragen; `www` leitet auf die Domain ohne `www` um.
- Netlify liefert `speisekarte.html` auch unter `/speisekarte` aus.

## DNS und E-Mail

- Die Domain ist bei IONOS registriert, die DNS-Verwaltung läuft aber über **Netlify DNS** (Nameserver `dns1–4.p07.nsone.net`). Die DNS-Einstellungen bei IONOS sind wirkungslos.
- E-Mail (`info@treffpunkt-langenfeld.de`) läuft weiter über IONOS. Diese Einträge müssen in Netlify DNS bestehen bleiben:
  - MX `@` → `mx00.ionos.de` und `mx01.ionos.de` (Priorität 10)
  - TXT `@` → `v=spf1 include:_spf-eu.ionos.com ~all`
  - CNAME `autodiscover` → `adsredir.ionos.info`
  - CNAME `s1-ionos._domainkey` → `s1.dkim.ionos.com`, `s2-ionos._domainkey` → `s2.dkim.ionos.com`
  - CNAME `_dmarc` → `dmarc.ionos.de`

## Git

- `.gitignore` schließt `.waylog/` (lokale Chatprotokolle der WayLog-Erweiterung – dürfen nicht in die öffentliche Repo) und `.DS_Store` aus.

## Verlauf

**15.10.2026**
- Repo von GitHub in diesen Ordner geholt.
- `.gitignore` angelegt, eingecheckte `.DS_Store` aus der Repo entfernt.
- Umzug der Domain von einer IONOS-Weiterleitung (302 auf `…netlify.app`) zu Netlify als Custom Domain mit Netlify DNS; die IONOS-Maileinträge in Netlify DNS übernommen.
- Unterseite `speisekarte.html` mit dem PDF und Navigation auf beiden Seiten angelegt; Titel der Startseite von „Speisekarte - …“ auf „Gaststätte Treffpunkt“ geändert.

**16.10.2026**
- Komplettes Redesign beider Seiten (Farben, Schriften, Türschild mit Live-Öffnungsstatus).
- Speisekarte als Bilder statt eingebettetem PDF.
- Credit „Mrozek IT-Solutions“ klein im Footer.

- Impressum, Datenschutzerklärung, Footer-Links und Security-Header (`netlify.toml`) ergänzt; Footer-Hinweis auf „Keine Cookies, kein Tracking“ geändert.
- Neue Speisekarte (Stand 10/2026, `speisekarte_102026.pdf`) eingespielt, alte Karte von 01/2025 entfernt.

## Offene Ideen

- PDF unter einem festen Namen ablegen (z. B. `speisekarte.pdf`), damit bei einer neuen Karte nur die Datei getauscht werden muss.
- Speisekarte zusätzlich als HTML-Text anbieten (besser für Handy und Suchmaschinen).
- Platzhalter in Impressum und Datenschutzerklärung ausfüllen.
