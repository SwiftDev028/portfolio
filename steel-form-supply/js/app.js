const categories = [
  ['Арматура','Для монолитных конструкций, фундаментов и перекрытий','18 позиций'],
  ['Трубы','Профильные, круглые, электросварные и бесшовные','42 позиции'],
  ['Листовой металл','Горячекатаный, холоднокатаный и оцинкованный','31 позиция'],
  ['Балки','Двутавровые балки для несущих металлоконструкций','16 позиций'],
  ['Швеллеры','Горячекатаные и гнутые профили разных типоразмеров','21 позиция'],
  ['Уголки','Равнополочные и неравнополочные стальные уголки','24 позиции'],
  ['Профнастил','Стеновой, кровельный и несущий профилированный лист','28 позиций'],
  ['Сетка','Кладочная, сварная и арматурная сетка','19 позиций'],
  ['Крепеж','Болты, анкеры, саморезы и метизы для монтажа','67 позиций'],
  ['Строительные смеси','Цемент, кладочные и ремонтные составы','35 позиций']
];

const products = [
  ['Арматура А500С 12 мм','Арматура','А500С · 12 мм','тонна'],['Арматура А500С 16 мм','Арматура','А500С · 16 мм','тонна'],['Арматура А500С 20 мм','Арматура','А500С · 20 мм','тонна'],['Арматура А240 8 мм','Арматура','А240 · 8 мм','тонна'],
  ['Труба профильная 40×20×2','Трубы','Ст3 · прямоугольная','метр'],['Труба профильная 60×40×3','Трубы','Ст3 · прямоугольная','метр'],['Труба профильная 80×80×4','Трубы','Ст3 · квадратная','метр'],['Труба электросварная 108×4','Трубы','ГОСТ 10704','метр'],
  ['Лист горячекатаный 4 мм','Листовой металл','Ст3 · 4 мм','м²'],['Лист холоднокатаный 2 мм','Листовой металл','08пс · 2 мм','м²'],['Лист оцинкованный 0,7 мм','Листовой металл','Zn · 0,7 мм','м²'],['Лист рифленый 5 мм','Листовой металл','Чечевица · 5 мм','м²'],
  ['Балка двутавровая 20Б1','Балки','20Б1 · ГОСТ Р 57837','метр'],['Балка двутавровая 25Б1','Балки','25Б1 · ГОСТ Р 57837','метр'],['Балка двутавровая 30Ш1','Балки','30Ш1 · широкополочная','метр'],
  ['Швеллер 12П','Швеллеры','12П · горячекатаный','метр'],['Швеллер 16П','Швеллеры','16П · горячекатаный','метр'],['Швеллер гнутый 100×50×3','Швеллеры','Ст3 · гнутый','метр'],
  ['Уголок 50×50×5','Уголки','Равнополочный · Ст3','метр'],['Уголок 75×75×6','Уголки','Равнополочный · Ст3','метр'],['Уголок 100×63×8','Уголки','Неравнополочный','метр'],
  ['Профнастил С21','Профнастил','Стеновой · 0,5 мм','м²'],['Профнастил НС35','Профнастил','Кровельный · 0,7 мм','м²'],['Профнастил Н75','Профнастил','Несущий · 0,8 мм','м²'],
  ['Сетка кладочная 50×50','Сетка','3 мм · карта 2×1 м','штука'],['Сетка сварная 100×100','Сетка','4 мм · карта 2×3 м','штука'],['Сетка арматурная 200×200','Сетка','8 мм · карта','штука'],
  ['Анкерный болт М12×120','Крепеж','Оцинкованный','штука'],['Болт высокопрочный М20','Крепеж','Класс 10.9','штука'],['Саморез кровельный 5,5×19','Крепеж','EPDM · оцинкованный','штука'],
  ['Цемент М500','Строительные смеси','ЦЕМ I 42,5Н · 50 кг','штука'],['Смесь кладочная М150','Строительные смеси','Сухая · 25 кг','штука'],['Пескобетон М300','Строительные смеси','Сухой · 40 кг','штука'],['Ремонтный состав R4','Строительные смеси','Безусадочный · 25 кг','штука'],
  ['Полоса стальная 40×4','Листовой металл','Ст3 · горячекатаная','метр'],['Круг стальной 20 мм','Арматура','Ст20 · калиброванный','метр']
].map((p,i)=>({id:i+1,name:p[0],category:p[1],type:p[2],unit:p[3],stock:i%7===0?'Под заказ':'В наличии',application:i%3===0?'Строительство':i%3===1?'Производство':'Универсальное',client:i%2?'Подрядчик':'Юридическое лицо',description:'Сертифицированный материал для строительных и производственных задач.'}));

const projects = [
  ['Жилой комплекс «Северный»','Санкт-Петербург','Жилое строительство','Арматура и металлопрокат','1 450 тонн','7 месяцев','Комплексная поставка поэтапно синхронизирована с графиком монолитных работ.'],
  ['Логистический терминал «Восток»','Московская область','Логистика','Металлоконструкции и профильные трубы','820 тонн','5 месяцев','Комплектация каркаса и инженерных зон без остановки строительства.'],
  ['Производственный цех «Альфа»','Казань','Производство','Листовой металл и балки','610 тонн','4 месяца','Поставка партиями под изготовление и монтаж технологических конструкций.'],
  ['Торговый центр «Гранит»','Ростов-на-Дону','Коммерческие объекты','Профнастил, крепеж и смеси','390 тонн','3 месяца','Единая заявка на материалы для фасада, кровли и общестроительных работ.'],
  ['Складской комплекс «Нева»','Ленинградская область','Логистика','Арматура, сетка и швеллеры','740 тонн','5 месяцев','Регулярные поставки с резервированием объема на складе.'],
  ['Заводская модернизация','Екатеринбург','Промышленность','Трубы, листы и уголки','520 тонн','6 месяцев','Подбор аналогов и срочная доставка для работ в условиях действующего производства.']
];

const nav = [['Главная','index.html','home'],['Каталог','catalog.html','catalog'],['Услуги','services.html','services'],['Логистика','logistics.html','logistics'],['Проекты','projects.html','projects'],['О компании','about.html','about'],['Контакты','contact.html','contact']];

const cart = JSON.parse(localStorage.getItem('steelform-request') || '[]');

function header(){const page=document.body.dataset.page;return `<header class="site-header"><div class="container nav"><a class="logo" href="index.html"><i class="logo-mark"></i>STEELFORM <span>SUPPLY</span></a><nav class="desktop-nav">${nav.map(([name,url,key])=>key==='catalog'?`<div class="has-mega"><button class="menu-trigger ${page==='catalog'?'active':''}">Каталог</button><div class="mega"><div class="container mega-grid"><div><div class="eyebrow">Каталог продукции</div><h3>Металл и материалы под задачи проекта</h3><p>Подберем позиции по спецификации, проверим наличие и организуем доставку на объект.</p><a class="text-link" href="catalog.html">Открыть весь каталог →</a></div><div class="mega-links">${categories.slice(0,5).map(x=>`<a href="catalog.html?category=${encodeURIComponent(x[0])}">${x[0]}</a>`).join('')}</div><div class="mega-links">${categories.slice(5).map(x=>`<a href="catalog.html?category=${encodeURIComponent(x[0])}">${x[0]}</a>`).join('')}</div></div></div></div>`:`<a class="${page===key?'active':''}" href="${url}">${name}</a>`).join('')}</nav><div class="header-actions"><button class="request-button" data-open-cart>Заявка <b data-cart-count>${cart.length}</b></button><a class="btn btn-primary" href="contact.html">Запросить расчет</a><button class="burger" aria-label="Открыть меню"></button></div></div></header><div class="mobile-menu">${nav.map(([name,url])=>`<a href="${url}">${name}</a>`).join('')}<a href="#" data-open-cart>Заявка (<span data-cart-count>${cart.length}</span>)</a></div>`}

function footer(){return `<footer class="site-footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><a class="logo" href="index.html"><i class="logo-mark"></i>STEELFORM <span>SUPPLY</span></a><p>Металлопрокат и строительные материалы для бизнеса с расчетом, комплектацией и доставкой по России.</p></div><div class="footer-col"><h4>Каталог</h4><a href="catalog.html">Арматура</a><a href="catalog.html">Трубы</a><a href="catalog.html">Листовой металл</a></div><div class="footer-col"><h4>Услуги</h4><a href="services.html">Комплектация</a><a href="logistics.html">Доставка</a><a href="services.html">Регулярные поставки</a></div><div class="footer-col"><h4>Проекты</h4><a href="projects.html">Строительство</a><a href="projects.html">Производство</a><a href="projects.html">Логистика</a></div><div class="footer-col"><h4>Компания</h4><a href="about.html">О компании</a><a href="contact.html">Контакты</a><a href="mailto:almirkhialov@outlook.com">Написать нам</a></div></div><div class="footer-bottom"><span>© 2026 STEELFORM SUPPLY</span><span>Концепция портфолио: Almir Khialov</span></div></div></footer><a class="bottom-cta" href="contact.html">Запросить расчет</a>`}

function drawer(){return `<div class="drawer-backdrop"><aside class="request-drawer"><div class="drawer-head"><div><div class="eyebrow">Корзина заявки</div><h3>Товары для расчета</h3></div><button class="close-drawer" aria-label="Закрыть">×</button></div><div class="request-items"></div><form class="drawer-form"><div class="form-grid"><div class="field full"><label>Имя</label><input required placeholder="Как к вам обращаться"></div><div class="field"><label>Телефон</label><input required type="tel" placeholder="+7 999 000-00-00"></div><div class="field"><label>Компания</label><input placeholder="Название компании"></div><div class="field full"><label>Комментарий</label><textarea placeholder="Объем, город и желаемый срок"></textarea></div></div><button class="btn btn-primary" type="submit">Отправить заявку</button></form></aside></div><div class="toast"></div>`}

function productCard(p){return `<article class="card product-card" data-id="${p.id}" data-category="${p.category}"><span class="tag">${p.category}</span><h3>${p.name}</h3><p>${p.type}<br>${p.description}</p><div class="stock">${p.stock}</div><div class="product-bottom"><small>за ${p.unit}<br><b>Цена по запросу</b></small><button class="add-btn ${cart.includes(p.id)?'added':''}" data-add="${p.id}">${cart.includes(p.id)?'В заявке':'В расчет'}</button></div></article>`}
function projectCard(p,i){return `<article class="card project-card" data-project="${p[2]}"><div class="project-image"><img src="assets/images/${i%2?'logistics-site.jpg':'hero-warehouse.jpg'}" alt="${p[0]}" loading="lazy"></div><div class="project-body"><div class="project-meta"><span>${p[1]}</span><span>${p[2]}</span></div><h3>${p[0]}</h3><p><b>${p[3]}</b><br>${p[6]}</p><div class="project-result"><span>${p[5]}</span><span>${p[4]}</span></div></div></article>`}
function categoryCards(){return categories.map((x,i)=>`<article class="card category-card"><span class="category-icon">${String(i+1).padStart(2,'0')}</span><h3>${x[0]}</h3><p>${x[1]}</p><footer><span>${x[2]}</span><a href="catalog.html?category=${encodeURIComponent(x[0])}">Смотреть →</a></footer></article>`).join('')}

function saveCart(){localStorage.setItem('steelform-request',JSON.stringify(cart));document.querySelectorAll('[data-cart-count]').forEach(x=>x.textContent=cart.length);renderCart()}
function addToCart(id){if(!cart.includes(id))cart.push(id);saveCart();document.querySelectorAll(`[data-add="${id}"]`).forEach(b=>{b.classList.add('added');b.textContent='В заявке'});showToast('Товар добавлен в заявку на расчет.')}
function removeFromCart(id){const index=cart.indexOf(id);if(index>-1)cart.splice(index,1);saveCart();document.querySelectorAll(`[data-add="${id}"]`).forEach(b=>{b.classList.remove('added');b.textContent='В расчет'})}
function renderCart(){const box=document.querySelector('.request-items');if(!box)return;const items=cart.map(id=>products.find(p=>p.id===id)).filter(Boolean);box.innerHTML=items.length?items.map(p=>`<div class="request-item"><p>${p.name}</p><small>${p.unit} · количество уточнит менеджер</small><button data-remove="${p.id}" aria-label="Удалить">×</button></div>`).join(''):'<div class="drawer-empty">Добавьте товары из каталога — они появятся здесь.</div>'}
function showToast(text){const toast=document.querySelector('.toast');toast.textContent=text;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),3200)}
function openCart(){document.querySelector('.drawer-backdrop').classList.add('open');document.body.classList.add('locked')}
function closeCart(){document.querySelector('.drawer-backdrop').classList.remove('open');document.body.classList.remove('locked')}

document.addEventListener('DOMContentLoaded',()=>{
  document.body.insertAdjacentHTML('afterbegin',header());document.body.insertAdjacentHTML('beforeend',footer()+drawer());renderCart();
  const menu=document.querySelector('.mobile-menu');document.querySelector('.burger').onclick=()=>{menu.classList.toggle('open');document.body.classList.toggle('locked')};
  document.addEventListener('click',e=>{const add=e.target.closest('[data-add]'),remove=e.target.closest('[data-remove]'),open=e.target.closest('[data-open-cart]');if(add)addToCart(+add.dataset.add);if(remove)removeFromCart(+remove.dataset.remove);if(open){e.preventDefault();openCart()}if(e.target.matches('.close-drawer')||e.target.matches('.drawer-backdrop'))closeCart();const faq=e.target.closest('.faq button');if(faq)faq.parentElement.classList.toggle('open')});
  document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();return}if(form.classList.contains('drawer-form')){cart.splice(0);saveCart();closeCart();showToast('Заявка сформирована. Менеджер свяжется с вами для расчета стоимости.')}else{form.reset();showToast('Спасибо! Заявка принята. Мы свяжемся с вами в рабочее время.')}}));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&entry.target.classList.add('visible')),{threshold:.1});document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
  document.querySelectorAll('[data-counter]').forEach(el=>{const target=+el.dataset.counter;let done=false;new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!done){done=true;let value=0;const timer=setInterval(()=>{value+=Math.ceil(target/35);if(value>=target){value=target;clearInterval(timer)}el.textContent=value+(el.dataset.suffix||'')},35)}}).observe(el)});
});

window.Steelform={categories,products,projects,productCard,projectCard,categoryCards,showToast};
