# Gaststätte Treffpunkt – Webseite

Statische Webseite (HTML, CSS und ein kleines JS-Skript, kein Build-Schritt) für die Gaststätte Treffpunkt, Talstr. 38, 40764 Langenfeld. Inhaber: Z. & M. Nožić. Sprache der Seite: Deutsch.

Live: https://treffpunkt-langenfeld.de

## Struktur

- `index.html` – Startseite: Türschild mit Live-Status, Öffnungszeiten, Besuch & Reservierung, Sonntagsfrühstück, Gerichte-Auswahl (ohne Preise)
- `oeffnungszeiten.js` – berechnet in Europe/Berlin-Zeit, ob geöffnet ist (Türschild), und hebt den heutigen Tag hervor. **Öffnungszeiten stehen doppelt:** in `HOURS` in dieser Datei und als Liste in `index.html` – bei Änderungen beide anpassen.
- `speisekarte.html` – Speisekarte als Seitenbilder (antippen = volle Größe), Sprungmarken zu den Abschnitten, PDF-Download
- `impressum.html`, `datenschutz.html` – Rechtstexte. Verantwortliche/Anbieterin ist **Jasmin Nožić**, Talstraße 38, 40764 Langenfeld – in beiden Texten nur dieser eine Name. Für künftige Platzhalter gibt es die gelbe Klasse `<mark class="placeholder">`.
- `netlify.toml` – Security-Header inkl. strenger Content-Security-Policy (nur `'self'`)
- `styles.css` – gemeinsames Stylesheet; Farben als Variablen in `:root`
- `fonts/` – Schriften lokal (Yellowtail für den Schriftzug, Bitter für Überschriften, Source Sans 3 für Text), bewusst nicht von Google Fonts (DSGVO)
- `bilder/` – Außenfoto (`kneipe_aussen.jpg`), Speisekarten-PDF (`speisekarte_102026.pdf`, Stand Oktober 2026, aus Canva, 8 Seiten) und `bilder/speisekarte/seite-1…8.jpg`
- Nicht Teil der Seite: `testfile.txt` (altes Testfile für die GitHub-Verbindung), `bilder/kneipe_aussen.png` (ungenutzte Variante des Fotos)

**Gemeinsame Bausteine:** Alle vier Seiten haben dieselbe Kopfleiste, Navigation (`Start | Speisekarte`) und denselben Footer, jeweils direkt im HTML. Änderungen daran in **allen vier** HTML-Dateien machen. Der Footer enthält: Reservierungstelefon, E-Mail für allgemeine Anfragen, Links zu Impressum und Datenschutz, und ganz klein „Keine Cookies, kein Tracking.“ sowie den Credit „Mrozek IT-Solutions“ (https://mrozek-it-solutions.com) – der Credit soll bewusst unauffällig bleiben.

## Kontakt-Regeln

- Reservierungen **nur telefonisch** (02173 - 17718). Nirgends zur Reservierung per E-Mail auffordern.
- E-Mail `info@treffpunkt-langenfeld.de` nur für allgemeine Anfragen. Sie wird nicht täglich gelesen; auf der Seite steht deshalb freundlich, dass Antworten einige Tage dauern können (nicht „wird selten abgefragt“). Im Impressum steht kein solcher Hinweis – die Impressums-Adresse muss eine zügige Kontaktaufnahme ermöglichen.

## Datenschutz-Regeln

- Keine externen Ressourcen einbinden (keine CDNs, Google Fonts, Maps-Iframes, YouTube, Social-Plugins) und keine Cookies/kein Tracking – darauf beruht die Datenschutzerklärung, und deshalb gibt es keinen Cookie-Banner.
- Keine Inline-Styles, Inline-Skripte oder `onclick`-Attribute: die CSP in `netlify.toml` blockiert sie.
- Externe Links mit `rel="noopener noreferrer"`. Derzeit gibt es nur zwei: „Route planen“ (Google Maps) und den Credit.
- Wird doch etwas Externes nötig: CSP erweitern **und** `datenschutz.html` anpassen.

## Design

Farben vom Haus abgeleitet: Flaschengrün vom Biergarten-Banner, Klinkerrot der Fassade, Gold/Messing aus der Speisekarte. Der Schriftzug „Treffpunkt“ in Schreibschrift erinnert an das Leuchtschild über der Tür. Erkennungsmerkmal ist das hängende Türschild im Kopfbereich (schwingt beim Laden, außer bei „Bewegung reduzieren“). Ohne JavaScript zeigt es einen neutralen Text.

## Neue Speisekarte einspielen

1. Neues PDF nach `bilder/` legen, den Download-Link in `speisekarte.html` anpassen und das alte PDF mit `git rm` entfernen (damit alte Preise nicht abrufbar bleiben).
2. Seitenbilder neu erzeugen (überschreibt `seite-1…8.jpg`):
   `pdftoppm -jpeg -jpegopt quality=78,progressive=y -scale-to-x 1100 -scale-to-y -1 bilder/<datei>.pdf bilder/speisekarte/seite`
   Hat die neue Karte weniger Seiten, überzählige alte Bilder löschen.
3. Reihenfolge, Sprungmarken und Alt-Texte in `speisekarte.html` prüfen (Seite 1 = Deckblatt wird nicht gezeigt, Seite 2 = Allergene steht am Ende).
4. Deckblatt (Seite 1) mit der Webseite abgleichen: Haben sich Öffnungszeiten, Adresse oder Telefon geändert, `index.html`, `oeffnungszeiten.js` und die Footer anpassen.
5. Schneller Vergleich alt/neu: `diff <(pdftotext -layout alt.pdf -) <(pdftotext -layout neu.pdf -)`

## Prüfen vor dem Push

- Screenshots mit Headless-Chrome: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot=… --window-size=…`
- Achtung: Headless-Chrome rendert mindestens 500 px breit. Für die Handy-Ansicht eine Hilfsseite mit `<iframe style="width:390px">` verwenden (danach wieder löschen, nicht committen).
- Nach dem Push: Netlify braucht etwa 10–30 Sekunden. Live mit `curl` prüfen (Statuscodes, Header), bei Bedarf Live-Seite per Headless-Chrome rendern, um CSP-Probleme auszuschließen.

## Hosting und Deployment

- **Repo:** https://github.com/mjmrozek/treffpunkt (öffentlich), Branch `main`
- **Hosting:** Netlify, Projekt `treffpunkt-langenfeld` (https://treffpunkt-langenfeld.netlify.app). Ein Push auf `main` ist sofort live – nur pushen, wenn der Nutzer es freigibt.
- **Domain:** `treffpunkt-langenfeld.de` ist bei Netlify als primäre Custom Domain eingetragen; `www` leitet auf die Domain ohne `www` um.
- Netlify liefert `foo.html` auch unter `/foo` aus und schreibt die Links in den Seiten automatisch auf diese Form um.

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
- Commit-Nachrichten auf Englisch, kurze Betreffzeile plus Stichpunkte.

## Verlauf

**15.10.2026**
- Repo von GitHub in diesen Ordner geholt.
- `.gitignore` angelegt, eingecheckte `.DS_Store` aus der Repo entfernt.
- Umzug der Domain von einer IONOS-Weiterleitung (302 auf `…netlify.app`) zu Netlify als Custom Domain mit Netlify DNS; die IONOS-Maileinträge in Netlify DNS übernommen.
- Unterseite `speisekarte.html` mit dem PDF und Navigation angelegt; Titel der Startseite von „Speisekarte - …“ auf „Gaststätte Treffpunkt“ geändert.

**16.10.2026**
- Komplettes Redesign (Farben, Schriften, Türschild mit Live-Öffnungsstatus); Speisekarte als Bilder statt eingebettetem PDF; Schriften lokal.
- Credit „Mrozek IT-Solutions“ klein im Footer.
- Impressum, Datenschutzerklärung, Footer-Links und Security-Header (`netlify.toml`) ergänzt; Footer-Hinweis „Keine Speicherung von Nutzerdaten“ durch „Keine Cookies, kein Tracking“ ersetzt (Netlify speichert Server-Logs).
- Neue Speisekarte (Stand 10/2026, `speisekarte_102026.pdf`) eingespielt, alte Karte von 01/2025 entfernt. Neu darin u. a. „Selbstgemachte Frikadelle“, fast alle Preise erhöht.
- Kontakt präzisiert: Reservierung nur telefonisch, E-Mail nur für allgemeine Anfragen (Startseite, Speisekarte, Footer, Datenschutz).
- Rechtstexte ausgefüllt: Jasmin Nožić als einzige Verantwortliche, Netlify- und IONOS-Angaben (DPF-Zertifizierung, AVV als Teil der AGB/Nutzungsbedingungen, IONOS-Server in DE/EU), Bildnachweis; „Vertreten durch“ und Aufsichtsbehörde entfernt.

## Offen

**Rechtstexte:**
- Impressum: USt-IdNr. eintragen (steht derzeit „wird ergänzt“).
- Bildnachweis prüfen: steht als „Fotos: Matthäus Mrozek, Sanjin Nožić“, weil unklar ist, wer das Außenfoto gemacht hat – bei Klarheit auf eine Person kürzen.

**Beim Wirt:**
- Tippfehler „SCHNITCHENTELLER“ (richtig: „Schnittchenteller“) in der Canva-Speisekarte – Wirt ist informiert; bei korrigierter Karte neu einspielen.
- E-Mail-Postfach trotzdem regelmäßig abrufen (etwa wöchentlich), da die Adresse im Impressum steht.

**Ideen:**
- PDF unter einem festen Namen ablegen (z. B. `speisekarte.pdf`), damit Links auf das PDF bei einer neuen Karte gleich bleiben.
- Speisekarte zusätzlich als HTML-Text anbieten (besser für Handy und Suchmaschinen).
- Biergarten erwähnen (auf dem Foto sichtbar, bisher nicht im Text).
- `testfile.txt` und `bilder/kneipe_aussen.png` entfernen.
