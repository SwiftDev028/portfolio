require("dotenv").config();
const { Markup, Telegraf } = require("telegraf");

const { BOT_TOKEN, WEB_APP_URL, ADMIN_CHAT_ID } = process.env;
if (!BOT_TOKEN) throw new Error("BOT_TOKEN is required");
if (!WEB_APP_URL) throw new Error("WEB_APP_URL is required");

const bot = new Telegraf(BOT_TOKEN);
const appButton = () => Markup.inlineKeyboard([[Markup.button.webApp("Open MINI Garage", WEB_APP_URL)]]);

bot.start((ctx) => ctx.reply(
  `Welcome to MINI Garage.\n\nBook specialist MINI service, calculate maintenance cost, explore MINI models and browse original parts — directly inside Telegram.`,
  appButton()
));

bot.command("app", (ctx) => ctx.reply("MINI Garage is ready.", appButton()));

bot.on("web_app_data", async (ctx) => {
  let request;
  try { request = JSON.parse(ctx.message.web_app_data.data); } catch { return ctx.reply("Request received."); }
  await ctx.reply("Your service request has been created. MINI Garage specialist will contact you shortly.");
  if (!ADMIN_CHAT_ID) return;
  const summary = ["New MINI Garage request", "", `Name: ${request.name}`, `Phone: ${request.phone}`, `Telegram: ${request.telegram || "—"}`, `Model: ${request.model}`, `Year: ${request.year}`, `Mileage: ${request.mileage} km`, `Service: ${request.service}`, `Date: ${request.date}`, `Comment: ${request.comment || "—"}`, `User ID: ${ctx.from.id}`].join("\n");
  await ctx.telegram.sendMessage(ADMIN_CHAT_ID, summary);
});

bot.launch().then(() => console.log("MINI Garage bot is running"));
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
