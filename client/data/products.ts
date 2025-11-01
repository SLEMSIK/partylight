import { Product } from '@shared/types';

const ASSET_BASE_URL = import.meta.env.VITE_ASSET_BASE_URL ?? '';
const withBase = (path: string) => `${ASSET_BASE_URL}${path}`;

export const PRODUCTS: Product[] = [
  // Light products (10 items)
  {
    id: 'wash19x15',
    name: 'LED Wash 19x15W',
    category: 'light',
    price: 1500,
    shortDescription: 'Вращающаяся голова заливающего света',
    longDescription: '· Роботизированный прожектор, который не просто светит, а "заливает" сцену или зону насыщенным, равномерным цветом. Он плавно меняет цвет и положение, создавая живое, дышащее световое поле.\n· Маркетинговый акцент: Ключевой инструмент для окрашивания пространства и создания нужной атмосферы — от нежных пастельных тонов для свадьбы до ярких, агрессивных цветов для рейва. Превращает сцену в холст для светодизайнера.',
    images: [withBase('/wash_19x15.png')],
    featured: true,
    powerConsumption: 285 // 19x15W = 285W
  },
  {
    id: 'wash19x15_circle',
    name: 'LED Wash 19x15W с кольцом',
    category: 'light',
    price: 1500,
    shortDescription: 'Вращающаяся голова заливающего света, дополнительно кольцо',
    longDescription: '· Роботизированный прожектор, который не просто светит, а "заливает" сцену или зону насыщенным, равномерным цветом. Он плавно меняет цвет и положение, создавая живое, дышащее световое поле.\n· Маркетинговый акцент: Ключевой инструмент для окрашивания пространства и создания нужной атмосферы — от нежных пастельных тонов для свадьбы до ярких, агрессивных цветов для рейва. Превращает сцену в холст для светодизайнера.',
    images: [withBase('/wash_19x15_circle.png')],
    powerConsumption: 285 // 19x15W + кольцо ~100W
  },
  {
    id: 'beam10r',
    name: 'LED Beam 10R',
    category: 'light',
    price: 2000,
    shortDescription: 'Вращающаяся голова типа Beam (узкий луч)',
    longDescription: '· Динамичный и мощный луч, который станет основой любого светового шоу. Он прорезает темноту ярким, сконцентрированным лучом света, создавая захватывающие геометрические фигуры в воздухе.\n· Маркетинговый акцент: Идеален для создания "вау-эффекта" на концертах, в ночных клубах и на корпоративных ивентах. Придает мероприятию современный, технологичный и энергичный характер.',
    images: [withBase('/beam_10r.png')],
    powerConsumption: 275
  },
  {
    id: 'lbeam_circle',
    name: 'LED Beam 300W с кольцом',
    category: 'light',
    price: 2000,
    shortDescription: 'Вращающаяся голова типа Beam (узкий луч), дополнительно кольцо',
    longDescription: '· Динамичный и мощный луч, который станет основой любого светового шоу. Он прорезает темноту ярким, сконцентрированным лучом света, создавая захватывающие геометрические фигуры в воздухе.\n· Маркетинговый акцент: Идеален для создания "вау-эффекта" на концертах, в ночных клубах и на корпоративных ивентах. Придает мероприятию современный, технологичный и энергичный характер.',
    images: [withBase('/beam_circle.png')],
    powerConsumption: 300
  },
  {
    id: 'spot210',
    name: 'LED Spot 210',
    category: 'light',
    price: 2000,
    shortDescription: 'Вращающаяся голова типа Spot (широкий луч)',
    longDescription: '· Сверхяркая вращающаяся голова типа "Спот". Создает не луч, а четко очерченный круг света, который может преследовать выступающих или выделять ключевые объекты.\n· Маркетинговый акцент: Инструмент для привлечения внимания. Идеально подходит для выделения ведущего, артиста или важного элемента церемонии (например, торта на свадьбе). Придает мероприятию профессиональный лоск.',
    images: [withBase('/spot_210.png')],
    powerConsumption: 210
  },
  {
    id: 'par',
    name: 'LED Par',
    category: 'light',
    price: 1000,
    shortDescription: 'Прибор за заливики',
    longDescription: '· Светодиодный прожектор с невероятно богатой палитрой, включая ультрафиолет. Обеспечивает насыщенный цвет и высокую яркость.\n· Маркетинговый акцент: Позволяет добиться любого, даже самого экзотического оттенка, включая "невидимые" УФ-лучи, которые заставляют светиться белые одежды и специальные краски. Максимальная гибкость в цветорешении.',
    images: [withBase('/ledpar.png')],
    powerConsumption: 200
  },
  {
    id: 'sunstripe',
    name: 'Stage Light Bar 3 in 1',
    category: 'light',
    price: 1000,
    shortDescription: 'Sunstripe',
    longDescription: '· Стилизованная под ретро световая трубка, которая создает теплое, уютное и модное освещение.\n· Маркетинговый акцент: Идеальное решение для тематических вечеринок (диско, 80-е), лаунж-зон, свадеб в стиле "винтаж" или "кантри". Добавляет мероприятию атмосферности и стиля.',
    images: [withBase('/sunstripe.png')],
    powerConsumption: 120
  },
  {
    id: 'portman',
    name: 'Portman',
    category: 'light',
    price: 1000,
    shortDescription: 'Световой прибор в ретро-стиле',
    longDescription: '· Еще один вариант ретро-освещения, имитирующий классический театральный прожектор. Создает мягкий, направленный световой поток.\n· Маркетинговый акцент: Создает камерную, почти кинематографическую атмосферу. Отлично подходит для подсветки фотозон, банкетных столов или зон отдыха, добавляя ноту голливудского шика.',
    images: [withBase('/portman.png')],
    powerConsumption: 100
  },
  {
    id: 'b_yey_740',
    name: 'B-EYE 7x40',
    category: 'light',
    price: 1500,
    shortDescription: 'Вращающаяся светодиодная голова, 7 светодиодов по 40 Вт',
    longDescription: '· Мощные и компактные прожекторы заливного света серии "Bee Eye". Различаются по мощности и количеству диодов, что позволяет точно подобрать прибор под размер площадки.\n· Маркетинговый акцент: Надежные и яркие "рабочие лошадки" для создания плотного, насыщенного цвета. Отлично подходят для средних и больших площадок, гарантируя, что ни один уголок не останется без внимания.',
    images: [withBase('/b_yey_740.png')],
    powerConsumption: 280 // 7x40W = 280W
  },
  {
    id: 'b_yey_18x20',
    name: 'B-EYE 18x20',
    category: 'light',
    price: 2000,
    shortDescription: 'Вращающаяся светодиодная голова, 18 светодиодов по 20 Вт',
    longDescription: '· Мощные и компактные прожекторы заливного света серии "Bee Eye". Различаются по мощности и количеству диодов, что позволяет точно подобрать прибор под размер площадки.\n· Маркетинговый акцент: Надежные и яркие "рабочие лошадки" для создания плотного, насыщенного цвета. Отлично подходят для средних и больших площадок, гарантируя, что ни один уголок не останется без внимания.',
    images: [withBase('/b_yey_k15.png')],
    powerConsumption: 360 // 18x20W = 360W
  },
  {
    id: 'ledbar',
    name: 'Led Bar',
    category: 'light',
    price: 1000,
    shortDescription: 'Линейный светильник заливающего типа',
    longDescription: '· Мощный и универсальный светодиодный прожектор. Отлично работает как для заливки стен цветом (аплайтинг), так и для ослепительных спецэффектов в такт музыке.\n· Маркетинговый акцент: Универсальный солдат вашего светового парка. С его помощью можно архитектурно преобразить помещение или ослепить публику на дискотеке. Надежность и яркость по отличной цене.',
    images: [withBase('/ledbar32.png')],
    powerConsumption: 100
  },
  {
    id: 'blinder',
    name: 'LED COB Bliner ',
    category: 'light',
    price: 1000,
    shortDescription: '2-глазный светодиодный COB-светильник с холодным/теплым белым цветом',
    longDescription: '· Эффектный прибор, предназначенный для ослепительных вспышек, которые на секунду "ослепляют" зал, и для плавной пульсации теплым белым светом.\n· Маркетинговый акцент: Создает мощные драматические акценты — кульминационные моменты выступления, ударные сбивки в треке. Дарит ощущение настоящего стадионного шоу даже в закрытом помещении.',
    images: [withBase('/blinder.png')],
    powerConsumption: 200
  },
  {
    id: 'heiser',
    name: 'Хейзер/Фейзер',
    category: 'light',
    price: 3000,
    shortDescription: 'Генератор тумана',
    longDescription: '· Машина, без которой не обходится ни одно профессиональное световое шоу. Создает легкую, равномерную дымку, которая делает лучи света видимыми и объемными.\n· Маркетинговый акцент: Превращает свет из абстрактного понятия в осязаемую материю. С ним любой луч лазера или прожектора превращается в плотный, видимый "световой меч", парящий в воздухе. Волшебство начинается здесь.',
    images: [withBase('/heiser.png')],
    powerConsumption: 660
  },

  // Sound products (5 items)
  {
    id: 'EKX15p',
    name: 'Активная акустика 15"',
    category: 'sound',
    price: 2500,
    shortDescription: 'Профессиональная активная колонка',
    longDescription: 'Мощная активная акустическая система 15" с встроенным усилителем 1500W. Отличное качество звука для концертов и мероприятий.',
    images: [withBase('/EKX15p.png')],
    featured: true,
    powerConsumption: 1600 // Усилитель 1500W + накладные расходы
  },
  {
    id: 'EKX18sp',
    name: 'Активный сабвуфер 18"',
    category: 'sound',
    price: 2500,
    shortDescription: 'Мощный активный сабвуфер',
    longDescription: 'Профессиональный сабвуфер 18" с усилителем 1300W. Глубокий и мощный бас для любых мероприятий.',
    images: [withBase('/EKX18sp.png')],
    powerConsumption: 1400 // Усилитель 1300W + накладные расходы
  },
  {
    id: 'Flow8',
    name: 'Цифровый микшерный пульт',
    category: 'sound',
    price: 3000,
    shortDescription: 'Цифровой микшерный пульт на 8 каналов',
    longDescription: 'Профессиональный цифровой микшерный пульт на 8 каналов с 4 xlr разъёмами, встроенными эффектами и удалённым управлением.',
    images: [withBase('/flow8.png')],
    powerConsumption: 50
  },
  {
    id: 'Wing',
    name: 'Цифровый микшерный пульт',
    category: 'sound',
    price: 5000,
    shortDescription: 'Цифровой микшерный пульт на 24 канала',
    longDescription: 'Цифровой микшерный пульт на 24 физических входных канала и 8 выходных. Большое колличество встроенных эффектов, удалённое управление, возможность записи',
    images: [withBase('/wing.png')],
    powerConsumption: 120
  },
  {
    id: 'RadioMic',
    name: 'Радиомикрофон',
    category: 'sound',
    price: 1000,
    shortDescription: 'Бееспроводная микрофонная система',
    longDescription: 'Беспроводной микрофон, стоимость указана за один микрофон',
    images: [withBase('/radiomic.png')],
    powerConsumption: 30 // Приёмник + зарядное устройство
  },
  {
    id: 'analogPult',
    name: 'Аналоговый микшерный пульт',
    category: 'sound',
    price: 1500,
    shortDescription: 'Аналоговый пульт на 14 каналов',
    longDescription: 'Аналоговый пульт на 14 каналов, встроенные эффекты',
    images: [withBase('/yamaxa.png')],
    powerConsumption: 80
  },
  {
    id: 'backline',
    name: 'Backline',
    category: 'sound',
    price: 25000,
    shortDescription: 'Барабаны, комбо усилители, микрофоны подозвучки под любые инструменты',
    longDescription: 'Набор музыкального оборудования, которое находится на сцене и используется музыкантами во время выступления. \nБэклайн нужен для первичной обработки звука и его качественного воспроизведения, а также для того, чтобы музыкант мог контролировать игру. ',
    images: [withBase('/backline.png')],
    powerConsumption: 0 // Комплект оборудования
  },



  // Screen products (1 item)
  {
    id: 'screen',
    name: 'LED экран P2.9',
    category: 'screens',
    price: 5000,
    shortDescription: 'Профессиональный LED видео экран',
    longDescription: 'Обратите внимание, цена указана за 1 кв. м.!\nМодульный LED экран высокого разрешения P2.9 для внутренних мероприятий. Яркость 1200 cd/m², возможность сборки любой конфигурации. Включает видео процессор, коммутацию и монтажные конструкции. Идеально подходит для концертов, конференций, презентаций и крупных мероприятий.',
    images: [withBase('/gloshine_segment.png')],
    featured: true,
    powerConsumption: 500 // На квадратный метр (приблизительно)
  },
  {
    id: 'tv55',
    name: 'Телевизор 55"',
    category: 'screens',
    price: 6000,
    shortDescription: 'Телевизор диагональю 55 дюймов',
    longDescription: 'Телевизор диагональю 55 дюймов, возможна установка на специальную стойку ',
    images: [withBase('/tv.png')],
    featured: true,
    powerConsumption: 150
  },
  {
    id: 'tv65',
    name: 'Телевизор 65"',
    category: 'screens',
    price: 8000,
    shortDescription: 'Телевизор диагональю 65 дюймов',
    longDescription: 'Телевизор диагональю 65 дюймов, возможна установка на специальную стойку ',
    images: [withBase('/tv.png')],
    featured: true,
    powerConsumption: 200
  },

  // Live streams products (5 items)
  {
    id: 'lumix',
    name: 'Lumix G7',
    category: 'live-streams',
    price: 2000,
    shortDescription: 'Камера для качественных трансляций',
    longDescription: 'Информация о приборе: Компактная системная камера Lumix G7 Full HD.\nКогда лучше использовать: Онлайн-трансляции, видеосъемка, стримы.\nЭффект: Профессиональное качество изображения, простота использования.',
    images: [withBase('/lumix_G7.png')],
    featured: true,
    powerConsumption: 30 // Камера с адаптером питания
  },
  {
    id: 'canon77d',
    name: 'Canon 77D',
    category: 'live-streams',
    price: 2000,
    shortDescription: 'Профессиональная камера Canon',
    longDescription: 'Информация о приборе: Зеркальная камера Canon 77D для профессиональной съемки.\nКогда лучше использовать: Трансляции, репортажная съемка, интервью.\nЭффект: Высокое качество картинки, надежность.',
    images: [withBase('/Canon77d.png')],
    powerConsumption: 30
  },
  {
    id: 'canon600d',
    name: 'Canon 600D',
    category: 'live-streams',
    price: 1500,
    shortDescription: 'Надежная камера для трансляций',
    longDescription: 'Информация о приборе: Проверенная временем зеркальная камера Canon 600D.\nКогда лучше использовать: Базовые трансляции, образовательные проекты.\nЭффект: Стабильное качество, простота настройки.',
    images: [withBase('/Canon600d.png')],
    powerConsumption: 30
  },
  {
    id: 'stab',
    name: 'Стабилизатор',
    category: 'live-streams',
    price: 2000,
    shortDescription: 'Система стабилизации камеры',
    longDescription: 'Информация о приборе: Профессиональный стабилизатор для плавной съемки.\nКогда лучше использовать: Динамичные трансляции, репортажи.\nЭффект: Плавное изображение без тряски.',
    images: [withBase('/stab.png')],
    powerConsumption: 0
  },
  {
    id: 'caster',
    name: 'RODE Caster Pro',
    category: 'live-streams',
    price: 2000,
    shortDescription: 'Микшер для качественного звука',
    longDescription: 'Информация о приборе: Компактный аудиомикшер для трансляций RODE Caster Pro.\nКогда лучше использовать: Подкасты, стримы, интервью.\nЭффект: Чистый профессиональный звук.',
    images: [withBase('/caster.png')],
    powerConsumption: 50
  },
  {
    id: 'ptz',
    name: 'PTZ Cam Full HD',
    category: 'live-streams',
    price: 1500,
    shortDescription: 'Камера с дистанционным управлением',
    longDescription: 'Информация о приборе: PTZ камера с 20x зумом и дистанционным управлением.\nКогда лучше использовать: Конференции, трансляции, наблюдение.\nЭффект: Гибкость управления, качественное изображение.',
    images: [withBase('/ptz.png')],
    powerConsumption: 50
  },


  // Kits products (5 items)
  {
    id: 'kit-1',
    name: 'Комплект "Вечеринка"',
    category: 'kits',
    price: 45000,
    shortDescription: 'Все для небольшой вечеринки',
    longDescription: 'Готовый комплект: 2 активные колонки, сабвуфер, 4 LED прожектора, стробоскоп, микшер и радиомикрофон.',
    images: ['https://api.builder.io/api/v1/image/assets/TEMP/8a917ca940855ac42eacd92ff501ea75422ea6e1?width=598'],
    featured: true
  },
  {
    id: 'kit-2',
    name: 'Комплект "Концерт"',
    category: 'kits',
    price: 85000,
    shortDescription: 'Профессиональный концертный комплект',
    longDescription: 'Полный комплект для концерта: линейный массив, сабвуферы, цифровой микшер, радиосистемы, световые приборы и ферменные конструкции.',
    images: ['https://api.builder.io/api/v1/image/assets/TEMP/bcda5cf255489a115cadaf863dce0e239c06b4dd?width=596']
  },
  {
    id: 'kit-3',
    name: 'Комплект "Презентация"',
    category: 'kits',
    price: 35000,
    shortDescription: 'Для презентаций и конференций',
    longDescription: 'Комплект для презентаций: проектор, экран, микрофоны, акустика, микшерный пульт.',
    images: ['https://api.builder.io/api/v1/image/assets/TEMP/3906edbf564d53fe076c80f52b90e347a7fb3c5c?width=596']
  },
  {
    id: 'kit-4',
    name: 'Комплект "DJ Set"',
    category: 'kits',
    price: 55000,
    shortDescription: 'Полный DJ комплект',
    longDescription: 'Профессиональный DJ комплект: DJ контроллер, активные мониторы, наушники, микрофон и световые эффекты.',
    images: ['https://api.builder.io/api/v1/image/assets/TEMP/77db50df47feb74c4c1e41a814a15d3de95a27a1?width=596']
  },
  {
    id: 'kit-5',
    name: 'Комплект "Свадьба"',
    category: 'kits',
    price: 65000,
    shortDescription: 'Идеально для свадебного торжества',
    longDescription: 'Специальный свадебный комплект: звук для банкета и танцпола, романтичный свет, радиомикрофоны для ведущего.',
    images: ['https://api.builder.io/api/v1/image/assets/TEMP/2450fbad3149640395fade6a3947b2027d1d6b86?width=596']
  },
  {
    id: 'scene',
    name: 'Сцена 5м*4м*3.5м',
    category: 'iron',
    price: 25000,
    shortDescription: 'Профессиональная сцена',
    longDescription: 'Информация о конструкции: Стандартная сцена 5 метров в длину, 4 метра в ширину и 3.5 метра в высоту.\nКогда лучше использовать: Концерты, выступления, публичные мероприятия.\nЭффект: Профессиональная площадка для выступлений.',
    images: [withBase('/scene.png')],
    powerConsumption: 0 // Конструкция без питания
  },
  {
    id: 'totem',
    name: 'Моно тотемы',
    category: 'iron',
    price: 1000,
    shortDescription: 'Декоративные тотемы 1-4 метра',
    longDescription: 'Информация о конструкции: Монолитные тотемы высотой от 1 до 4 метров.\nКогда лучше использовать: различные банкетные залы.',
    images: [withBase('/totem.png')],
    powerConsumption: 0
  },
  {
    id: 'ferma',
    name: 'Сценическая ферма',
    category: 'iron',
    price: 1000,
    shortDescription: 'Ферма для подвеса оборудования',
    longDescription: 'Информация о конструкции: Прочная сценическая ферма длиной 2 метра.\nКогда лучше использовать: когда необходим подвес светового, звукового оборудования.\nЭффект: Безопасное размещение оборудования.',
    images: [withBase('/ferma.png')],
    powerConsumption: 0
  },
];

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return PRODUCTS.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return PRODUCTS.filter(p => p.featured);
};
