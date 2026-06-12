const tg = window.Telegram?.WebApp;

const services = [
  ["Computer Diagnostics", 3000, "40 min", "diagnostics", "⌁"], ["Oil Change", 8000, "60 min", "maintenance", "◉"],
  ["Brake Service", 12000, "90 min", "repair", "◫"], ["Suspension Repair", 15000, "2 hours", "repair", "⌇"],
  ["AC Service", 5000, "60 min", "maintenance", "❄"], ["Transmission Service", 18000, "3 hours", "repair", "⚙"],
  ["Engine Repair", 25000, "Custom", "repair", "◆"], ["Wheel Alignment", 4500, "45 min", "maintenance", "⇆"],
  ["Battery Replacement", 7000, "30 min", "maintenance", "▣"], ["MINI Coding", 6000, "60 min", "performance", "⌘"],
  ["Ceramic Coating", 35000, "1 day", "detailing", "✦"], ["Pre-Purchase Inspection", 7500, "90 min", "diagnostics", "◎"]
];

const modelNames = ["MINI Cooper 3 Door", "MINI Cooper 5 Door", "MINI Clubman", "MINI Countryman", "MINI Countryman S", "MINI Countryman JCW", "MINI Cabrio", "MINI Cooper SE", "MINI Aceman"];
const models = [
  ["MINI Cooper 3 Door", "The original urban icon with agile go-kart handling.", "Petrol", "156 hp", "FWD", "City driving", "hero-jcw.jpg"],
  ["MINI Cooper 5 Door", "Everyday practicality without losing MINI character.", "Petrol", "156 hp", "FWD", "Daily life", "hero-jcw.jpg"],
  ["MINI Countryman", "More room, intelligent technology and all-road confidence.", "Petrol", "170 hp", "ALL4", "Family trips", "countryman-final.jpg"],
  ["MINI Countryman S", "Confident performance with premium long-distance comfort.", "Petrol", "218 hp", "ALL4", "Road trips", "countryman-final.jpg"],
  ["MINI Countryman JCW", "High-performance SUV character tuned by John Cooper Works.", "Petrol", "300 hp", "ALL4", "Performance", "countryman-final.jpg"],
  ["MINI Clubman", "Distinctive split doors and refined grand-touring comfort.", "Petrol", "192 hp", "FWD", "Long distance", "clubman.jpg"],
  ["MINI Cabrio", "Open-air MINI driving with unmistakable personality.", "Petrol", "178 hp", "FWD", "Weekend fun", "hero-jcw.jpg"],
  ["MINI Cooper SE", "Instant electric torque and quiet urban progress.", "Electric", "184 hp", "FWD", "Electric city", "cooper-electric.jpg"],
  ["MINI Aceman", "A compact all-electric crossover for modern urban life.", "Electric", "218 hp", "FWD", "Connected life", "cooper-electric.jpg"]
];

const parts = [
  ["Front Brake Pads", "Brakes", 9500, "F56 / F55 / F57"], ["Rear Brake Pads", "Brakes", 7500, "F-series MINI"],
  ["Oil Filter", "Filters", 1800, "All petrol models"], ["Air Filter", "Filters", 2800, "F-series MINI"],
  ["Cabin Filter", "Filters", 3200, "All current models"], ["Spark Plugs", "Engine", 6500, "B38 / B48 engines"],
  ["Ignition Coil", "Electronics", 5800, "B-series engines"], ["Thermostat", "Cooling", 12500, "F-series MINI"],
  ["Coolant Pump", "Cooling", 19000, "Selected models"], ["Front Shock Absorber", "Suspension", 16500, "F56 / F55"],
  ["Control Arm", "Suspension", 14500, "F-series MINI"], ["Battery", "Electronics", 17500, "AGM start-stop"],
  ["Brake Sensor", "Brakes", 2600, "Front / rear"], ["JCW Exhaust Tip", "JCW Performance", 12000, "JCW models"],
  ["MINI Floor Mats", "Accessories", 8500, "Model specific"], ["LED Side Scuttles", "Accessories", 22000, "F56 / F55 / F57"]
];

const estimates = {
  "Diagnostics": [3000, 5000, "40–60 min", "Start with computer diagnostics before replacing parts."],
  "Oil service": [8000, 14000, "60–90 min", "Recommended every 8,000–10,000 km for urban driving."],
  "Brake service": [12000, 35000, "1.5–3 hours", "Final cost depends on disc wear and sensor condition."],
  "Suspension": [15000, 60000, "2–5 hours", "A road test and lift inspection are recommended first."],
  "AC service": [5000, 12000, "60–90 min", "The system should be checked for leaks before refill."],
  "Full inspection": [7500, 15000, "90–150 min", "Best before purchase, a long trip or seasonal maintenance."]
};

const featureData = [["✓", "Certified MINI Specialists", "Model-specific experience"], ["⌁", "Computer Diagnostics", "Dealer-level equipment"], ["◆", "Original Parts", "Verified compatibility"], ["JCW", "JCW Performance", "Power and chassis upgrades"], ["✦", "Detailing", "Protection and finish"], ["◎", "Pre-Purchase Inspection", "Buy with confidence"]];

const state = { screen: "home", history: [], serviceFilter: "all", partsFilter: "All" };
const $ = (selector, root = document) => root.querySelector(selector);
const money = (value) => new Intl.NumberFormat("ru-RU").format(value) + " ₽";

function haptic(type = "light") { tg?.HapticFeedback?.impactOccurred(type); }
function toast(message) { const node = $("#toast"); node.textContent = message; node.classList.add("show"); clearTimeout(toast.timer); toast.timer = setTimeout(() => node.classList.remove("show"), 2300); }

function showScreen(name, push = true) {
  if (name === state.screen) return;
  if (push) state.history.push(state.screen);
  state.screen = name;
  document.querySelectorAll(".screen").forEach((screen) => screen.classList.toggle("active", screen.dataset.view === name));
  document.querySelectorAll(".bottom-nav button").forEach((button) => button.classList.toggle("active", button.dataset.screen === name));
  $(".back-trigger").hidden = name === "home";
  window.scrollTo({ top: 0, behavior: "smooth" });
  tg?.BackButton?.[name === "home" ? "hide" : "show"]();
  syncMainButton();
  haptic();
}

function goBack() { const previous = state.history.pop() || "home"; showScreen(previous, false); }
function syncMainButton() {
  if (!tg?.MainButton) return;
  if (state.screen === "booking") { tg.MainButton.setText("CREATE SERVICE REQUEST"); tg.MainButton.show(); }
  else { tg.MainButton.hide(); }
}

function renderFeatures() { $("#feature-grid").innerHTML = featureData.map(([icon, title, copy]) => `<article class="feature-card"><i>${icon}</i><b>${title}</b><small>${copy}</small></article>`).join(""); }
function renderServices() {
  const filters = [["all", "All"], ["diagnostics", "Diagnostics"], ["maintenance", "Maintenance"], ["repair", "Repair"], ["performance", "Performance"], ["detailing", "Detailing"]];
  $("#service-filters").innerHTML = filters.map(([key, label]) => `<button class="chip ${state.serviceFilter === key ? "active" : ""}" data-service-filter="${key}">${label}</button>`).join("");
  const visible = services.filter((item) => state.serviceFilter === "all" || item[3] === state.serviceFilter);
  $("#services-list").innerHTML = visible.map(([name, price, duration,, icon]) => `<button class="service-card" type="button" data-book-service="${name}"><span class="service-icon">${icon}</span><span><h3>${name}</h3><p>Specialist MINI service</p></span><span class="service-price"><b>from ${money(price)}</b><small>${duration}</small></span></button>`).join("");
}
function renderModels() { $("#models-list").innerHTML = models.map(([name, copy, engine, power, drive, best, image]) => `<article class="model-card"><img src="assets/images/${image}" alt="${name}" loading="lazy"><div class="model-body"><div class="model-top"><h2>${name}</h2><span>MINI FAMILY</span></div><p>${copy}</p><div class="spec-grid"><span><small>ENGINE</small><b>${engine}</b></span><span><small>POWER</small><b>${power}</b></span><span><small>DRIVE</small><b>${drive}</b></span></div><p><b>Best for:</b> ${best}<br><b>Common services:</b> diagnostics, oil, brakes, coding</p></div></article>`).join(""); }
function renderParts() {
  const categories = ["All", ...new Set(parts.map((part) => part[1]))];
  $("#parts-filters").innerHTML = categories.map((category) => `<button class="chip ${state.partsFilter === category ? "active" : ""}" data-parts-filter="${category}">${category}</button>`).join("");
  const query = $("#parts-search").value.trim().toLowerCase();
  const visible = parts.filter(([name, category]) => (state.partsFilter === "All" || category === state.partsFilter) && name.toLowerCase().includes(query));
  $("#parts-list").innerHTML = visible.map(([name, category, price, compatibility]) => `<article class="part-card"><span class="part-art">${category === "Brakes" ? "◫" : category === "Filters" ? "▤" : category === "Electronics" ? "⌁" : "◆"}</span><h3>${name}</h3><p>${compatibility}</p><div class="part-footer"><b>from ${money(price)}</b><span class="availability">In stock</span></div></article>`).join("") || `<p class="empty-state">No matching parts found.</p>`;
}

function fillSelect(select, values, placeholder) { select.innerHTML = `<option value="">${placeholder}</option>` + values.map((value) => `<option value="${value}">${value}</option>`).join(""); }
function initForms() {
  fillSelect($("#calc-model"), modelNames, "Choose model"); fillSelect($("#booking-model"), modelNames, "Choose model");
  fillSelect($("#calc-year"), Array.from({ length: 26 }, (_, index) => 2026 - index), "Choose year");
  fillSelect($("#calc-service"), Object.keys(estimates), "Choose service"); fillSelect($("#booking-service"), services.map((item) => item[0]), "Choose service");
  $("input[name='date']").min = new Date().toISOString().split("T")[0];
  const user = tg?.initDataUnsafe?.user; if (user) { $("input[name='name']").value = [user.first_name, user.last_name].filter(Boolean).join(" "); $("input[name='telegram']").value = user.username ? `@${user.username}` : ""; }
}

function createRequest(form) {
  const data = Object.fromEntries(new FormData(form));
  return { data, text: `MINI Garage Service Request\n\nName: ${data.name}\nPhone: ${data.phone}\nTelegram: ${data.telegram || "—"}\nModel: ${data.model}\nYear: ${data.year}\nMileage: ${data.mileage} km\nService: ${data.service}\nDate: ${data.date}\nComment: ${data.comment || "—"}` };
}

document.addEventListener("click", (event) => {
  const screenButton = event.target.closest("[data-screen]"); if (screenButton) return showScreen(screenButton.dataset.screen);
  const serviceFilter = event.target.closest("[data-service-filter]"); if (serviceFilter) { state.serviceFilter = serviceFilter.dataset.serviceFilter; haptic(); return renderServices(); }
  const partsFilter = event.target.closest("[data-parts-filter]"); if (partsFilter) { state.partsFilter = partsFilter.dataset.partsFilter; haptic(); return renderParts(); }
  const booking = event.target.closest("[data-book-service]"); if (booking) { $("#booking-service").value = booking.dataset.bookService; showScreen("booking"); }
});
$(".back-trigger").addEventListener("click", goBack);
$("#parts-search").addEventListener("input", renderParts);

$("#calculator-form").addEventListener("submit", (event) => {
  event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); const [low, high, time, advice] = estimates[data.service];
  const age = 2026 - Number(data.year); const mileage = Number(data.mileage); const factor = age > 10 || mileage > 150000 ? 1.12 : age > 6 || mileage > 90000 ? 1.06 : 1;
  $("#estimate-price").textContent = `${money(Math.round(low * factor / 500) * 500)} – ${money(Math.round(high * factor / 500) * 500)}`; $("#estimate-time").textContent = time; $("#estimate-advice").textContent = advice; $("#estimate-result").hidden = false; $("#booking-model").value = data.model; haptic("medium"); toast("Estimate calculated");
});

$("#booking-form").addEventListener("submit", (event) => {
  event.preventDefault(); if (!event.currentTarget.reportValidity()) return;
  const request = createRequest(event.currentTarget); $("#request-text").textContent = request.text; $("#request-summary").hidden = false; $("#request-summary").scrollIntoView({ behavior: "smooth" });
  if (tg?.initData) tg.sendData(JSON.stringify({ type: "service_request", ...request.data }));
  tg?.HapticFeedback?.notificationOccurred("success"); toast("Service request created");
});
$("#copy-request").addEventListener("click", async () => { await navigator.clipboard.writeText($("#request-text").textContent); haptic(); toast("Request copied"); });

if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor("#0b0c0f"); tg.setBackgroundColor("#0b0c0f"); tg.BackButton.onClick(goBack); tg.MainButton.onClick(() => $("#booking-form").requestSubmit()); }
renderFeatures(); renderServices(); renderModels(); renderParts(); initForms(); syncMainButton();
