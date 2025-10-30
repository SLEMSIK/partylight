const ASSET_BASE_URL = import.meta.env.VITE_ASSET_BASE_URL ?? '';
const withBase = (path: string) => `${ASSET_BASE_URL}${path}`;

const portfolioItems = [
  {
    id: 1,
    image: withBase('/wedding.jpg'),
    title: 'Свадебное торжество',
    description: 'Световое и звуковое сопровождение торжества'
  },
  {
    id: 2,
    image: withBase('/wedding2.jpg'),
    title: 'Свадебное торжество',
    description: 'Свет, звук и LED экран для торжества '
  },
  {
    id: 3,
    image: withBase('/askona1.jpg'),
    title: 'Конференция',
    description: 'Звуковое сопровождение. работа с экраном, работа с суфлёрами и удалённым спикером'
  },
  {
    id: 4,
    image: withBase('/askona2.jpg'),
    title: 'Корпоративное мероприятие',
    description: 'Свет, звук и LED экран для мепроприятия'
  },
  {
    id: 5,
    image: withBase('/port1.jpg'),
    title: 'Концерт',
    description: 'Профессиональное световое сопровождение концерта'
  },
  {
    id: 5,
    image: withBase('/koncert1.jpg'),
    title: 'Праздничное мероприятие',
    description: 'Звуковое и световое сопровождение мероприятия'
  },
  {
    id: 5,
    image: withBase('/koncert2.jpg'),
    title: 'Корпоратив',
    description: 'Световое и звуковое сопровождение корпоратива'
  },
  {
    id: 5,
    image: withBase('/koncert3.jpg'),
    title: 'Конкурс',
    description: 'Световое сопровождение концерта красоты'
  },
];

export function Portfolio() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-medium text-white mb-12 text-center">Наши работы</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-video overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-8">
                <h3 className="text-white text-2xl font-semibold mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-white text-lg text-center">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
