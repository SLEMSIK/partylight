import { Product } from '@shared/types';

export const PRODUCTS: Product[] = [
  // Light products (10 items)
  {
    id: 'wash19x15',
    name: 'LED Wash 19x15W',
    category: 'light',
    price: 1500,
    shortDescription: 'Вращающаяся голова заливающего света',
    longDescription: 'Голова',
    images: ['../client/components/images/wash_19x15.png'],
    featured: true
  },
  {
    id: 'wash19x15_circle',
    name: 'LED Wash 19x15W с кольцом',
    category: 'light',
    price: 1500,
    shortDescription: 'Вращающаяся голова заливающего света, дополнительно кольцо',
    longDescription: 'Профессиональный движущийся прожектор с функциями spot и beam. Множество гобо, призмы, диммирование и стробос��оп. DMX-512 управление.',
    images: ['../client/components/images/wash_19x15_circle.png']
  },
  {
    id: 'beam10r',
    name: 'LED Beam 10R',
    category: 'light',
    price: 2000,
    shortDescription: 'Вращающаяся голова типа Beam (узкий луч)',
    longDescription: 'Яркий LED стробоскоп с регулировкой частоты вспышек. Отлично подходит для создания динамичных световых эффектов на танцполе.',
    images: ['../client/components/images/beam_10r.png']
  },
  {
    id: 'lbeam_circle',
    name: 'LED Beam 300W с кольцом',
    category: 'light',
    price: 2000,
    shortDescription: 'Вращающаяся голова типа Beam (узкий луч), дополнительно кольцо',
    longDescription: 'Универсальная LED панель с 12 светодиодами по 10W каждый. RGBW смешение, DMX управление, встроенные программы.',
    images: ['../client/components/images/beam_circle.png']
  },
  {
    id: 'spot210',
    name: 'LED Spot 210',
    category: 'light',
    price: 2000,
    shortDescription: 'Вращающаяся голова типа Spot (широкий луч)',
    longDescription: 'Профессиональный RGB лазерный проектор. Множество паттернов и эффектов, DMX и автоматический режимы работы.',
    images: ['/client/components/images/spot_210.png']
  },
  {
    id: 'par',
    name: 'LED Par',
    category: 'light',
    price: 1000,
    shortDescription: 'Прибор за заливики',
    longDescription: 'Профессиональный RGB лазерный проектор. Множество паттернов и эффектов, DMX и автоматический режимы работы.',
    images: ['/client/components/images/ledpar.png']
  },
  {
    id: 'sunstripe',
    name: 'Stage Light Bar 3 in 1',
    category: 'light',
    price: 1000,
    shortDescription: 'Sunstripe',
    longDescription: 'Профессиональный RGB лазерный проектор. Множество паттернов и эффектов, DMX и автоматический режимы работы.',
    images: ['/client/components/images/sunstripe.png']
  },
  {
    id: 'portman',
    name: 'Portman',
    category: 'light',
    price: 1000,
    shortDescription: 'Световой прибор в ретро-стиле',
    longDescription: 'Профессиональный RGB лазерный проектор. Множество паттернов и эффектов, DMX и автоматический режимы работы.',
    images: ['/client/components/images/portman.png']
  },
  {
    id: 'b_yey_740',
    name: 'B-EYE 7x40',
    category: 'light',
    price: 1500,
    shortDescription: 'Вращающаяся светодиодная голова, 7 светодиодов по 40 Вт',
    longDescription: 'Профессиональный RGB лазерный проектор. Множество паттернов и эффектов, DMX и автоматический режимы работы.',
    images: ['/client/components/images/b_yey_740.png']
  },
  {
    id: 'b_yey_18x20',
    name: 'B-EYE 18x20',
    category: 'light',
    price: 2000,
    shortDescription: 'Вращающаяся светодиодная голова, 18 светодиодов по 20 Вт',
    longDescription: 'Профессиональный RGB лазерный проектор. Множество паттернов и эффектов, DMX и автоматический режимы работы.',
    images: ['/client/components/images/b_yey_k15.png']
  },
  {
    id: 'ledbar',
    name: 'Led Bar',
    category: 'light',
    price: 1000,
    shortDescription: 'Линейный светильник заливающего типа',
    longDescription: 'Профессиональный RGB лазерный проектор. Множество паттернов и эффектов, DMX и автоматический режимы работы.',
    images: ['/client/components/images/ledbar32.png']
  },
  {
    id: 'blinder',
    name: 'LED COB Bliner ',
    category: 'light',
    price: 1000,
    shortDescription: '2-глазный светодиодный COB-светильник с холодным/теплым белым цветом',
    longDescription: 'Профессиональный RGB лазерный проектор. Множество паттернов и эффектов, DMX и автоматический режимы работы.',
    images: ['/client/components/images/blinder.png']
  },
  {
    id: 'heiser',
    name: 'Хейзер/Фейзер',
    category: 'light',
    price: 3000,
    shortDescription: 'Генератор тумана',
    longDescription: 'Профессиональный RGB лазерный проектор. Множество паттернов и эффектов, DMX и автоматический режимы работы.',
    images: ['/client/components/images/heiser.png']
  },

  // Sound products (5 items)
  {
    id: 'EKX15p',
    name: 'Активная акустика 15"',
    category: 'sound',
    price: 2500,
    shortDescription: 'Профессиональная активная колонка',
    longDescription: 'Мощная активная акустическая система 15" с встроенным усилителем 800W. Отличное качество звука для концертов и мероприятий.',
    images: ['/client/components/images/EKX15p.png'],
    featured: true
  },
  {
    id: 'EKX18sp',
    name: 'Активный сабвуфер 18"',
    category: 'sound',
    price: 2500,
    shortDescription: 'Мощный активный сабвуфер',
    longDescription: 'Профессиональный сабвуфер 18" с усилителем 1200W. Глубокий и мощный бас для любых мероприятий.',
    images: ['/client/components/images/EKX18sp.png']
  },
  {
    id: 'Flow8',
    name: 'Цифровый микшерный пульт',
    category: 'sound',
    price: 3000,
    shortDescription: 'Цифровой микшерный пульт на 8 каналов',
    longDescription: 'Профессиональный цифровой микшерный пульт на 16 каналов с DSP процессором, встроенными эффектами и USB записью.',
    images: ['/client/components/images/flow8.png']
  },
  {
    id: 'Wing',
    name: 'Цифровый микшерный пульт',
    category: 'sound',
    price: 5000,
    shortDescription: 'ифровой микшерный пульт на 32 канала',
    longDescription: 'Надежная UHF радиосистема с двумя ручными микрофонами. Стабильная работа, чистый звук без помех.',
    images: ['/client/components/images/wing.png']
  },
  {
    id: 'RadioMic',
    name: 'Радиомикрофон',
    category: 'sound',
    price: 1000,
    shortDescription: 'Бееспроводная микрофонная система',
    longDescription: 'Современный DJ контроллер с 4 деками, джог-колесами, пэдами и встроенной звуковой картой. Совместим с популярными DJ программами.',
    images: ['/client/components/images/radiomic.png']
  },
  {
    id: 'analogPult',
    name: 'Аналоговый микшерный пульт',
    category: 'sound',
    price: 1500,
    shortDescription: 'Аналоговый пульт на 12 каналов',
    longDescription: 'Современный DJ контроллер с 4 деками, джог-колесами, пэдами и встроенной звуковой картой. Совместим с популярными DJ программами.',
    images: ['/client/components/images/yamaxa.png']
  },
  {
    id: 'backline',
    name: 'Backline',
    category: 'sound',
    price: 25000,
    shortDescription: 'Барабаны, комбо усилители, микрофоны подозучки под любые инструменты',
    longDescription: 'Современный DJ контроллер с 4 деками, джог-колесами, пэдами и встроенной звуковой картой. Совместим с популярными DJ программами.',
    images: ['/client/components/images/backline.png']
  },



  // Screen products (1 item)
  {
    id: 'screen',
    name: 'LED экран P2.9',
    category: 'screens',
    price: 5000,
    shortDescription: 'Профессиональный LED видео экран',
    longDescription: 'Модульный LED экран высокого разрешения P2.9 для внутренних мероприятий. Размер от 3x2 метров, яркость 1200 cd/m², возможность сборки любой конфигурации. Включает видео процессор, коммутацию и монтажные конструкции. Идеально подходит для концертов, конференций, презентаций и крупных мероприятий.',
    images: ['/client/components/images/gloshine_segment.png'],
    featured: true
  },
  {
    id: 'tv55',
    name: 'Телевизор 55"',
    category: 'screens',
    price: 6000,
    shortDescription: 'Профессиональный LED видео экран',
    longDescription: 'Модульный LED экран высокого разрешения P3.91 для внутренних мероприятий. Размер от 3x2 метров, яркость 1200 cd/m², возможность сборки любой конфигурации. Включает видео процессор, коммутацию и монтажные конструкции. Идеально подходит для концертов, конференций, презентаций и крупных мероприятий.',
    images: ['/client/components/images/tv.png'],
    featured: true
  },
  {
    id: 'tv65',
    name: 'Телевизор 65"',
    category: 'screens',
    price: 8000,
    shortDescription: 'Профессиональный LED видео экран',
    longDescription: 'Модульный LED экран высокого разрешения P3.91 для внутренних мероприятий. Размер от 3x2 метров, яркость 1200 cd/m², возможность сборки любой конфигурации. Включает видео процессор, коммутацию и монтажные конструкции. Идеально подходит для концертов, конференций, презентаций и крупных мероприятий.',
    images: ['/client/components/images/tv.png'],
    featured: true
  },

  // Live streams products (5 items)
  {
    id: 'lumix',
    name: 'Lumix G7',
    category: 'live-streams',
    price: 2000,
    shortDescription: 'Камера Lumix G7',
    longDescription: 'Полный комплект для организации онлайн-трансляций: камера Full HD, микшер ATEM Mini, микрофон, свет и ноутбук.',
    images: ['/client/components/images/lumix_G7.png'],
    featured: true
  },
  {
    id: 'canon77d',
    name: 'Canon 77D',
    category: 'live-streams',
    price: 2000,
    shortDescription: 'Камера Canon 77D',
    longDescription: 'Профессиональная PTZ камера с Full HD разрешением, 20x оптическим зумом и дистанционным управлением поворотом.',
    images: ['/client/components/images/canon77d.png']
  },
  {
    id: 'canon600d',
    name: 'Canon 600D',
    category: 'live-streams',
    price: 1500,
    shortDescription: 'Камера Canon 600D',
    longDescription: 'Профессиональная PTZ камера с Full HD разрешением, 20x оптическим зумом и дистанционным управлением поворотом.',
    images: ['/client/components/images/canon600d.png']
  },
  {
    id: 'stab',
    name: 'Стабилизатор',
    category: 'live-streams',
    price: 2000,
    shortDescription: 'Система стибилизации камеры',
    longDescription: 'Компактный беспроводной петличный микрофон для интервью и презентаций. Чистый звук, надежная связь.',
    images: ['/client/components/images/stab.png']
  },
  {
    id: 'caster',
    name: 'RODE Caster Pro',
    category: 'live-streams',
    price: 2000,
    shortDescription: 'Микшерный пульт для эфира',
    longDescription: 'Регулируемая LED панель с диммером и настройкой температуры света. Идеальное освещение для стримов и видео.',
    images: ['/client/components/images/caster.png']
  },
  {
    id: 'ptz',
    name: 'PTZ Cam Full HD',
    category: 'live-streams',
    price: 1500,
    shortDescription: 'Камера с PTZ управлением',
    longDescription: 'Регулируемая LED панель с диммером и настройкой температуры света. Идеальное освещение для стримов и видео.',
    images: ['/client/components/images/ptz.png']
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
    shortDescription: 'Сцена 5м*4м*3.5м',
    longDescription: 'Специальный свадебный комплект: звук для банкета и танцпола, романтичный свет, радиомикрофоны для ведущего.',
    images: ['/client/components/images/scene.png']
  },
  {
    id: 'totem',
    name: 'Моно тотемы',
    category: 'iron',
    price: 1000,
    shortDescription: 'Моно тотем высотой от 1 до 4х метров',
    longDescription: 'Специальный свадебный комплект: звук для банкета и танцпола, романтичный свет, радиомикрофоны для ведущего.',
    images: ['/client/components/images/totem.png']
  },
  {
    id: 'ferma',
    name: 'Сценическая ферма',
    category: 'iron',
    price: 1000,
    shortDescription: 'Сценическая ферма длинной 2м',
    longDescription: 'Специальный свадебный комплект: звук для банкета и танцпола, романтичный свет, радиомикрофоны для ведущего.',
    images: ['/client/components/images/ferma.png']
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
