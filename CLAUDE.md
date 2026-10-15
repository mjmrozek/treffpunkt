# Gaststätte Treffpunkt – Webseite

Statische Webseite (reines HTML/CSS, kein Build-Schritt) für die Gaststätte Treffpunkt, Talstr. 38, 40764 Langenfeld. Inhaber: Z. & M. Nožić. Sprache der Seite: Deutsch.

## Struktur

- `index.html` – Startseite: Adresse, Öffnungszeiten, Frühstück, Außenbild
- `speisekarte.html` – Unterseite mit eingebettetem Speisekarten-PDF plus Button zum Öffnen (für Handys, die eingebettete PDFs nicht anzeigen)
- `styles.css` – gemeinsames Stylesheet für alle Seiten
- `bilder/` – Bilder und das Speisekarten-PDF (`202501_speisekarte.pdf`, aus Canva exportiert, 8 Seiten)
- `testfile.txt` – altes Testfile für die GitHub-Verbindung, gehört nicht zur Seite

Alle Seiten teilen Header, Navigation (`Start | Speisekarte`) und Footer. Ein neuer Menüpunkt muss deshalb in jeder HTML-Datei eingetragen werden.

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

## Offene Ideen

- PDF unter einem festen Namen ablegen (z. B. `speisekarte.pdf`), damit bei einer neuen Karte nur die Datei getauscht werden muss.
- PDF komprimieren (aktuell 3,6 MB, langsam auf dem Handy).
- Speisekarte zusätzlich als HTML-Text anbieten (besser für Handy und Suchmaschinen).
- Impressum und Datenschutzerklärung fehlen – für eine geschäftliche Webseite in Deutschland Pflicht.
