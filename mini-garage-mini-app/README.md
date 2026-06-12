# MINI Garage Mini App

A premium Telegram Mini App concept for MINI Cooper service and diagnostics. The app includes service booking, maintenance cost calculator, MINI model catalog, parts catalog and mobile-first automotive UX.

## Technologies

HTML, CSS, JavaScript, Telegram Web App SDK, Responsive Design, UI/UX.

## Features

- Eight complete screens
- Twelve realistic MINI services
- Maintenance cost calculator
- Nine-model MINI catalog
- Sixteen-part catalog with filtering and search
- Validated booking form and generated request summary
- Telegram Main Button, Back Button, haptics and theme support
- Works inside Telegram and in a regular browser

## Local preview

```bash
python3 -m http.server 4204
```

Open `http://127.0.0.1:4204`.

## Bot setup

1. Copy `.env.example` to `.env`.
2. Set `BOT_TOKEN` and the final HTTPS `WEB_APP_URL`.
3. Optionally set `ADMIN_CHAT_ID` to receive booking summaries.
4. Run:

```bash
npm install
npm start
```

The Mini App must be hosted on HTTPS before it can open inside Telegram. GitHub Pages is suitable and free.

## BotFather setup

- Set the menu button URL to the final `WEB_APP_URL`.
- Recommended commands:

```text
start - Open MINI Garage
app - Launch the Mini App
```

Portfolio concept by Almir Khialov.
