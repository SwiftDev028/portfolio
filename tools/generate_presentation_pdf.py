from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "presentation.pdf"
FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

W, H = landscape(A4)
M = 44

INK = colors.HexColor("#111111")
MUTED = colors.HexColor("#60605C")
SOFT = colors.HexColor("#F4F2EC")
LINE = colors.HexColor("#DEDBD2")
ACCENT = colors.HexColor("#FF9F0A")
DARK = colors.HexColor("#171715")
WHITE = colors.white


pdfmetrics.registerFont(TTFont("ArialRU", FONT))
pdfmetrics.registerFont(TTFont("ArialRUBold", FONT_BOLD))


def wrap(text, font, size, max_width):
    words = text.split()
    lines = []
    line = ""
    for word in words:
        test = f"{line} {word}".strip()
        if pdfmetrics.stringWidth(test, font, size) <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def draw_text(c, text, x, y, max_width, size=15, font="ArialRU", color=MUTED, leading=None):
    c.setFillColor(color)
    c.setFont(font, size)
    leading = leading or size * 1.35
    for line in wrap(text, font, size, max_width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_bullets(c, items, x, y, max_width, size=13, color=MUTED, bullet_color=ACCENT):
    c.setFont("ArialRU", size)
    leading = size * 1.35
    for item in items:
        c.setFillColor(bullet_color)
        c.circle(x + 4, y + 4, 3, stroke=0, fill=1)
        c.setFillColor(color)
        lines = wrap(item, "ArialRU", size, max_width - 24)
        line_y = y
        for line in lines:
            c.drawString(x + 20, line_y, line)
            line_y -= leading
        y = line_y - 8
    return y


def title(c, eyebrow, heading, sub=None, dark=False):
    c.setFillColor(ACCENT)
    c.setFont("ArialRUBold", 10)
    c.drawString(M, H - 68, eyebrow.upper())
    c.setFillColor(WHITE if dark else INK)
    c.setFont("ArialRUBold", 38)
    y = H - 112
    for line in wrap(heading, "ArialRUBold", 38, W - M * 2):
        c.drawString(M, y, line)
        y -= 44
    if sub:
        draw_text(c, sub, M, y - 8, W - M * 2 - 140, 15, color=colors.HexColor("#C8C8C4") if dark else MUTED)
    return y


def pill(c, x, y, text, bg=SOFT, fg=INK, w=None):
    c.setFont("ArialRUBold", 10)
    width = w or pdfmetrics.stringWidth(text, "ArialRUBold", 10) + 22
    c.setFillColor(bg)
    c.roundRect(x, y - 18, width, 28, 14, stroke=0, fill=1)
    c.setFillColor(fg)
    c.drawString(x + 11, y - 7, text)
    return x + width + 8


def card(c, x, y, w, h, heading, body, number=None, dark=False):
    c.setFillColor(DARK if dark else WHITE)
    c.setStrokeColor(colors.HexColor("#2A2925") if dark else LINE)
    c.roundRect(x, y, w, h, 18, stroke=1, fill=1)
    if number:
        c.setFillColor(ACCENT)
        c.setFont("ArialRUBold", 10)
        c.drawString(x + 18, y + h - 28, number)
    c.setFillColor(WHITE if dark else INK)
    c.setFont("ArialRUBold", 18)
    text_y = y + h - 62
    for line in wrap(heading, "ArialRUBold", 18, w - 36):
        c.drawString(x + 18, text_y, line)
        text_y -= 22
    draw_text(c, body, x + 18, text_y - 6, w - 36, 11.5, color=colors.HexColor("#D7D7D0") if dark else MUTED)


def image_card(c, x, y, w, h, image_path, label, heading, body):
    c.setFillColor(WHITE)
    c.setStrokeColor(LINE)
    c.roundRect(x, y, w, h, 16, stroke=1, fill=1)
    img_h = h * 0.48
    try:
        img = ImageReader(str(ROOT / image_path))
        c.drawImage(img, x, y + h - img_h, width=w, height=img_h, preserveAspectRatio=False, mask="auto")
        c.setFillColor(colors.Color(0, 0, 0, alpha=0.14))
        c.rect(x, y + h - img_h, w, img_h, stroke=0, fill=1)
    except Exception:
        c.setFillColor(SOFT)
        c.rect(x, y + h - img_h, w, img_h, stroke=0, fill=1)
    c.setFillColor(ACCENT)
    c.setFont("ArialRUBold", 8)
    c.drawString(x + 16, y + h - img_h - 22, label.upper())
    c.setFillColor(INK)
    c.setFont("ArialRUBold", 15)
    c.drawString(x + 16, y + h - img_h - 44, heading)
    draw_text(c, body, x + 16, y + h - img_h - 66, w - 32, 9.6, color=MUTED)


def footer(c, page):
    c.setFillColor(colors.HexColor("#9A9A94"))
    c.setFont("ArialRU", 8)
    c.drawString(M, 26, "almirkhialov.ru")
    c.drawRightString(W - M, 26, f"{page:02d}")


def page_bg(c, dark=False):
    c.setFillColor(DARK if dark else colors.HexColor("#FBFAF7"))
    c.rect(0, 0, W, H, stroke=0, fill=1)
    if not dark:
        c.setFillColor(colors.HexColor("#F0EEE7"))
        c.circle(W - 80, H - 30, 170, stroke=0, fill=1)
    else:
        c.setFillColor(colors.HexColor("#2A241B"))
        c.circle(W - 90, H - 40, 190, stroke=0, fill=1)


def build():
    c = canvas.Canvas(str(OUT), pagesize=landscape(A4))

    # 1 Cover
    page_bg(c, dark=True)
    c.setFillColor(ACCENT)
    c.setFont("ArialRUBold", 11)
    c.drawString(M, H - 70, "ПРЕЗЕНТАЦИЯ ДЛЯ ВЛАДЕЛЬЦЕВ БИЗНЕСА")
    c.setFillColor(WHITE)
    c.setFont("ArialRUBold", 48)
    y = H - 138
    for line in ["Almir Khialov", "цифровые решения", "для бизнеса"]:
        c.drawString(M, y, line)
        y -= 54
    draw_text(c, "Создаю сайты, Telegram-боты и AI-автоматизации, которые помогают бизнесу выглядеть сильнее, принимать заявки и экономить время.", M, y - 16, 520, 16, color=colors.HexColor("#D8D8D2"))
    x = M
    for text in ["Сайты", "Telegram-боты", "AI / n8n", "Автоматизации"]:
        x = pill(c, x, 90, text, bg=colors.HexColor("#2B2A26"), fg=WHITE)
    c.setFillColor(WHITE)
    c.setFont("ArialRUBold", 13)
    c.drawRightString(W - M, 92, "Telegram: @almirkhialov")
    footer(c, 1)
    c.showPage()

    # 2 What I do
    page_bg(c)
    title(c, "01 / Что я делаю", "Простые digital-инструменты, которые помогают получать заявки", "Без сложных слов: сайт объясняет услуги, бот отвечает клиентам, автоматизация убирает повторяющуюся работу.")
    cols = 4
    gap = 14
    cw = (W - M * 2 - gap * (cols - 1)) / cols
    y0 = 122
    items = [
        ("Сайты для бизнеса", "Лендинги, сайты услуг, корпоративные сайты, каталоги и страницы для заявок."),
        ("Telegram-боты", "Принимают заявки, задают вопросы, отправляют данные владельцу или менеджеру."),
        ("AI-автоматизации", "Помогают отвечать, сортировать заявки, вести таблицы и экономить время команды."),
        ("Дизайн и упаковка", "Структура, тексты, визуальный стиль и понятная подача для доверия клиента."),
    ]
    for i, (h, b) in enumerate(items):
        card(c, M + i * (cw + gap), y0, cw, 230, h, b, f"0{i+1}")
    footer(c, 2)
    c.showPage()

    # 3 Problems
    page_bg(c)
    title(c, "02 / Какие проблемы решаем", "Когда сайт есть, но он не помогает бизнесу")
    left = ["Сайт выглядит устаревшим", "Клиент не понимает, куда нажать", "Заявки теряются в мессенджерах", "Нет доверия с первого экрана", "Менеджеры отвечают вручную на одно и то же"]
    right = ["Обновляем дизайн", "Делаем понятную структуру", "Добавляем формы и Telegram", "Показываем кейсы, цифры и услуги", "Подключаем бота или автоматизацию"]
    c.setFillColor(WHITE)
    c.setStrokeColor(LINE)
    c.roundRect(M, 82, 360, 330, 18, stroke=1, fill=1)
    c.setFillColor(INK)
    c.setFont("ArialRUBold", 20)
    c.drawString(M + 24, 362, "Что мешает")
    draw_bullets(c, left, M + 24, 324, 305, 12.5)

    c.setFillColor(DARK)
    c.setStrokeColor(colors.HexColor("#2A2925"))
    c.roundRect(M + 390, 82, 360, 330, 18, stroke=1, fill=1)
    c.setFillColor(WHITE)
    c.setFont("ArialRUBold", 20)
    c.drawString(M + 414, 362, "Что делаем")
    draw_bullets(c, right, M + 414, 324, 305, 12.5, color=colors.HexColor("#D7D7D0"))
    footer(c, 3)
    c.showPage()

    # 4 Portfolio
    page_bg(c)
    title(c, "03 / Портфолио", "Примеры проектов, которые можно показать клиенту")
    projects = [
        ("medicore-clinic/assets/images/clinic-interior.jpg", "Клиника", "MEDICORE", "Запись, врачи, услуги и анализы."),
        ("azure-resort/assets/images/hero.jpg", "Отель", "AZURE RESORT", "Номера, SPA, ресторан и бронирование."),
        ("skyline-realty/assets/images/dubai.jpg", "Недвижимость", "SKYLINE", "Каталог объектов и заявки."),
        ("prime-build/assets/images/hero.jpg", "Строительство", "PRIME BUILD", "Услуги, кейсы и калькулятор."),
        ("nordcore-engineering/assets/images/hero-industrial.jpg", "Промышленность", "NORDCORE", "B2B-сайт инженерной компании."),
        ("steel-form-supply/assets/images/hero-warehouse.jpg", "B2B", "STEELFORM", "Каталог, фильтры и корзина заявки."),
    ]
    w = (W - M * 2 - 28) / 3
    h = 160
    for i, p in enumerate(projects):
        row = i // 3
        col = i % 3
        image_card(c, M + col * (w + 14), 70 + (1 - row) * 182, w, h, *p)
    footer(c, 4)
    c.showPage()

    # 5 Process
    page_bg(c)
    title(c, "04 / Как проходит работа", "Понятный процесс без лишней бюрократии")
    steps = [
        ("01", "Разбор задачи", "Понимаем, что продаем, кому и какой результат нужен."),
        ("02", "Структура", "Собираем блоки, страницы, сценарии и путь клиента."),
        ("03", "Дизайн", "Делаем современную визуальную упаковку и понятные тексты."),
        ("04", "Разработка", "Собираем сайт, бота или автоматизацию и тестируем."),
        ("05", "Запуск", "Публикуем, подключаем домен, Telegram и формы заявок."),
    ]
    sw = (W - M * 2 - 40) / 5
    for i, (n, h1, b) in enumerate(steps):
        card(c, M + i * (sw + 10), 122, sw, 260, h1, b, n)
    footer(c, 5)
    c.showPage()

    # 6 Pricing
    page_bg(c)
    title(c, "05 / Стоимость", "Сколько стоят мои услуги", "Это ориентиры, чтобы быстро понять порядок бюджета. Точная цена зависит от объема, сроков и интеграций.")
    prices = [
        ("Start", "от 15 000 руб.", "Одностраничный сайт", "Для услуги, эксперта или небольшой компании. Быстрый старт, адаптив и форма заявки."),
        ("Business", "от 35 000 руб.", "Сайт компании", "Несколько страниц, сильная упаковка, базовое SEO, кейсы, заявки и Telegram."),
        ("Automation", "от 50 000 руб.", "Сайт + бот + AI", "Бот, AI-ассистент или n8n-автоматизация для заявок, ответов, таблиц и CRM."),
    ]
    pw = (W - M * 2 - 28) / 3
    for i, (name, price, h1, b) in enumerate(prices):
        x = M + i * (pw + 14)
        dark = i == 1
        card(c, x, 98, pw, 290, h1, b, name, dark=dark)
        c.setFillColor(ACCENT if dark else INK)
        c.setFont("ArialRUBold", 25)
        c.drawString(x + 18, 188, price)
    footer(c, 6)
    c.showPage()

    # 7 Result
    page_bg(c)
    title(c, "06 / Что получает клиент", "Не просто красивую страницу, а рабочий инструмент")
    results = ["Современный сайт", "Адаптив под телефон", "Понятная структура", "Форма заявки", "Telegram-кнопки", "Базовое SEO", "Быстрая загрузка", "Презентабельный вид", "Возможность развивать проект дальше"]
    x, y = M, 340
    for text in results:
        x = pill(c, x, y, text, bg=WHITE)
        if x > W - 240:
            x = M
            y -= 54
    draw_text(c, "Моя задача - сделать так, чтобы клиент быстро понял ваше предложение, доверился вам и оставил заявку без лишних шагов.", M, 112, W - M * 2, 17, color=MUTED)
    footer(c, 7)
    c.showPage()

    # 8 Contact
    page_bg(c, dark=True)
    title(c, "07 / Следующий шаг", "Хотите улучшить сайт или запустить новый digital-продукт?", "Напишите мне в Telegram. Я посмотрю задачу и предложу понятный вариант запуска.", dark=True)
    c.setFillColor(WHITE)
    c.setFont("ArialRUBold", 20)
    c.drawString(M, 198, "Telegram: @almirkhialov")
    c.drawString(M, 160, "Email: almirkhialov@outlook.com")
    c.drawString(M, 122, "Site: almirkhialov.ru")
    pill(c, M, 78, "Написать и обсудить проект", bg=ACCENT, fg=INK, w=230)
    footer(c, 8)

    c.save()


if __name__ == "__main__":
    build()
    print(OUT)
