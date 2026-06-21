export type City = {code: string; name: string; lat: number; lon: number; detail: string};

export const cities: City[] = [
  {code: 'CDG', name: 'Paris', lat: 48.8566, lon: 2.3522, detail: '48.8566° N'},
  {code: 'IST', name: 'Istanbul', lat: 41.0082, lon: 28.9784, detail: 'Route selected'},
  {code: 'TBS', name: 'Tbilisi', lat: 41.7151, lon: 44.8271, detail: '41.7151° N'},
  {code: 'HND', name: 'Tokyo', lat: 35.6762, lon: 139.6503, detail: '35.6762° N'},
];

export const routeStops = [
  {time: '01 / 08:30', name: 'Galata', note: 'Утро над Босфором'},
  {time: '02 / 11:10', name: 'Karaköy', note: 'Кофе и мастерские'},
  {time: '03 / 18:40', name: 'Kadıköy', note: 'Ужин в Азии'},
];
