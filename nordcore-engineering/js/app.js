const services = [
  ['Промышленное строительство', 'Производственные комплексы, склады и технически сложные промышленные объекты.', 'Производство · Энергетика · Логистика'],
  ['Коммерческое строительство', 'Корпоративные офисы, кампусы, торговые и многофункциональные пространства.', 'Недвижимость · Технологии · Здравоохранение'],
  ['Инфраструктурные проекты', 'Транспортные, коммунальные и общественные системы с высоким ресурсом надежности.', 'Государственный сектор · Транспорт · Энергетика'],
  ['Инженерное проектирование', 'Комплексная координация конструктивных, гражданских, инженерных и цифровых решений.', 'Все отрасли'],
  ['Управление проектами', 'Контроль сроков, бюджета, закупок и качества от концепции до ввода в эксплуатацию.', 'Все отрасли'],
  ['EPC-контракты', 'Единая ответственность за проектирование, закупки и строительство.', 'Промышленность · Энергетика · Инфраструктура'],
  ['Технический консалтинг', 'Технико-экономическое обоснование, аудит, оптимизация стоимости и оценка рисков.', 'Инвесторы · Девелоперы · Операторы'],
  ['Модернизация объектов', 'Обновление действующих площадок для роста мощности, эффективности и соответствия нормам.', 'Производство · Логистика · Здравоохранение']
];

const projects = [
  {name:'Северный логистический хаб',type:'Промышленный комплекс',filter:'industrial',location:'Роттердам, Нидерланды',budget:'€186 млн',timeline:'28 месяцев',area:'164 000 м²',image:'assets/images/logistics-hub.jpg',desc:'Автоматизированный распределительный кампус с интегрированной железнодорожной и автомобильной логистикой.'},
  {name:'Бизнес-центр Skyline',type:'Коммерческая недвижимость',filter:'commercial',location:'Франкфурт, Германия',budget:'€94 млн',timeline:'24 месяца',area:'72 000 м²',image:'assets/images/project-detail.jpg',desc:'Энергоэффективный деловой кампус с гибкими офисными пространствами.'},
  {name:'Прибрежный энергетический комплекс',type:'Инфраструктурный проект',filter:'energy',location:'Абердин, Великобритания',budget:'€248 млн',timeline:'34 месяца',area:'118 000 м²',image:'assets/images/energy-facility.jpg',desc:'Надежная прибрежная инженерная инфраструктура, реализованная в условиях действующего производства.'},
  {name:'Расширение метрополитена',type:'Общественная инфраструктура',filter:'infrastructure',location:'Варшава, Польша',budget:'€312 млн',timeline:'42 месяца',area:'Коридор 18 км',image:'assets/images/hero-industrial.jpg',desc:'Расширение транспортной сети: станции, инженерные системы и благоустройство общественных пространств.'},
  {name:'Арктический производственный завод',type:'Промышленное строительство',filter:'industrial',location:'Оулу, Финляндия',budget:'€172 млн',timeline:'30 месяцев',area:'96 000 м²',image:'assets/images/hero-industrial.jpg',desc:'Устойчивый к суровому климату производственный комплекс с модульными цехами.'},
  {name:'Энергоцентр Green Power',type:'Энергетика',filter:'energy',location:'Орхус, Дания',budget:'€221 млн',timeline:'32 месяца',area:'83 000 м²',image:'assets/images/energy-facility.jpg',desc:'Низкоуглеродный энергетический кампус с цифровым мониторингом активов и резервом для развития.'},
  {name:'Инновационный технологический кампус',type:'Коммерческий проект',filter:'commercial',location:'Дублин, Ирландия',budget:'€128 млн',timeline:'26 месяцев',area:'88 000 м²',image:'assets/images/project-detail.jpg',desc:'Исследовательский, офисный и лабораторный кампус для совместной работы технологических команд.'},
  {name:'Глобальный распределительный центр',type:'Логистическая инфраструктура',filter:'infrastructure',location:'Антверпен, Бельгия',budget:'€154 млн',timeline:'25 месяцев',area:'142 000 м²',image:'assets/images/logistics-hub.jpg',desc:'Мультимодальный распределительный центр с автоматизированным хранением и энергоэффективной эксплуатацией.'}
];

const nav = [
  ['Главная', 'index.html', 'home'],
  ['Услуги', 'services.html', 'services'],
  ['Проекты', 'projects.html', 'projects'],
  ['Отрасли', 'industries.html', 'industries'],
  ['О компании', 'about.html', 'about'],
  ['Карьера', 'careers.html', 'careers'],
  ['Контакты', 'contact.html', 'contact']
];

function header() {
  const page = document.body.dataset.page;
  return `<header class="site-header ${page === 'home' ? '' : 'inner'}"><div class="container nav"><a class="logo" href="index.html"><i class="logo-mark"></i>NORDCORE</a><nav class="desktop-nav">${nav.map(([name, url, key]) => key === 'services' ? `<div class="has-mega"><button class="menu-trigger ${page === 'services' ? 'active' : ''}">Услуги</button><div class="mega-menu"><div class="container mega-grid"><div><span class="eyebrow">Инженерная экспертиза</span><h3>Для сложных проектов</h3><p>Комплексные услуги: от оценки и проектирования до строительства, пусконаладки и модернизации.</p></div><div class="mega-links">${services.slice(0, 4).map(service => `<a href="services.html">${service[0]}</a>`).join('')}</div><div class="mega-links">${services.slice(4).map(service => `<a href="services.html">${service[0]}</a>`).join('')}</div></div></div></div>` : `<a class="${page === key ? 'active' : ''}" href="${url}">${name}</a>`).join('')}</nav><a class="btn btn-primary header-cta" href="contact.html">Запросить консультацию</a><button class="burger" aria-label="Открыть меню"><span></span></button></div></header><div class="mobile-menu">${nav.map(([name, url]) => `<a href="${url}">${name}</a>`).join('')}<a href="contact.html">Запросить консультацию ↗</a></div>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><a class="logo" href="index.html"><i class="logo-mark"></i>NORDCORE</a><p>Промышленное строительство и инженерные решения для сложных объектов в Европе и на международных рынках.</p></div><div class="footer-col"><h4>Услуги</h4><a href="services.html">Промышленное строительство</a><a href="services.html">Инженерное проектирование</a><a href="services.html">EPC-контракты</a></div><div class="footer-col"><h4>Проекты</h4><a href="projects.html">Промышленные</a><a href="projects.html">Инфраструктурные</a><a href="projects.html">Коммерческие</a></div><div class="footer-col"><h4>Отрасли</h4><a href="industries.html">Энергетика</a><a href="industries.html">Производство</a><a href="industries.html">Логистика</a></div><div class="footer-col"><h4>Компания</h4><a href="about.html">О компании</a><a href="careers.html">Карьера</a><a href="contact.html">Контакты</a></div></div><div class="footer-bottom">© 2026 NORDCORE ENGINEERING <span>Концепция портфолио: Almir Khialov</span></div></div></footer>`;
}

function serviceCards(count = 8) {
  return services.slice(0, count).map((service, index) => `<article class="card service-card reveal"><span class="service-number">${String(index + 1).padStart(2, '0')}</span><i class="service-icon">${['▰', '⌂', '≋', '⌁', '✓', 'EPC', '△', '↻'][index]}</i><h3>${service[0]}</h3><p>${service[1]}</p><small>${service[2]}</small></article>`).join('');
}

function projectCards(list = projects) {
  return list.map((project, index) => `<article class="card project-card reveal" data-filter="${project.filter}"><div class="project-media"><img src="${project.image}" alt="${project.name}" loading="lazy"></div><div class="project-info"><div class="project-meta"><span>${project.type}</span><span>${String(index + 1).padStart(2, '0')}</span></div><h3>${project.name}</h3><p>${project.desc}</p><div class="project-facts"><span><b>${project.location}</b>Локация</span><span><b>${project.budget}</b>Бюджет</span><span><b>${project.area}</b>Площадь</span></div><a class="arrow-link" href="project-detail.html">Смотреть кейс</a></div></article>`).join('');
}

Object.assign(window, {
  homeServices: document.querySelector('#home-services'),
  serviceDetails: document.querySelector('#service-details'),
  projectsGrid: document.querySelector('#projects-grid'),
  industryCards: document.querySelector('#industry-cards'),
  industryTable: document.querySelector('#industry-table'),
  jobs: document.querySelector('#jobs')
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', header());
  document.body.insertAdjacentHTML('beforeend', footer());
  const head = document.querySelector('.site-header');
  const burger = document.querySelector('.burger');
  const mobile = document.querySelector('.mobile-menu');
  addEventListener('scroll', () => head.classList.toggle('scrolled', scrollY > 30));
  burger.onclick = () => {
    mobile.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  };
  const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), {threshold: .12});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  document.querySelectorAll('[data-counter]').forEach(element => {
    const max = +element.dataset.counter;
    let done = false;
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !done) {
        done = true;
        let value = 0;
        const timer = setInterval(() => {
          value += Math.ceil(max / 45);
          if (value >= max) {
            value = max;
            clearInterval(timer);
          }
          element.textContent = value + (element.dataset.suffix || '');
        }, 28);
      }
    }).observe(element);
  });
  document.querySelectorAll('.filter').forEach(button => button.onclick = () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => card.classList.toggle('hidden', button.dataset.filter !== 'all' && card.dataset.filter !== button.dataset.filter));
  });
  document.querySelectorAll('.form').forEach(form => form.onsubmit = event => {
    event.preventDefault();
    form.querySelector('.form-status').classList.add('show');
    form.reset();
  });
});

document.addEventListener('click', event => {
  const job = event.target.closest('.job');
  if (job) job.classList.toggle('open');
});
