export function Hero() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-40 right-40 w-32 h-32 bg-blue-500 rounded-full blur-[100px] opacity-50"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
            Техническое обеспечение мероприятий<br/>
            <span className="bg-gradient-primary bg-clip-text text-transparent"> любого масштаба</span>
          </h1>
          <p className="text-gray-300 lg:text-2xl mb-10 leading-relaxed max-w-3xl">
            Свет, звук, экраны, прямые трансляции и комплексные решения для ваших событий
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#equipment"
              className="px-8 py-4 bg-gradient-primary text-white lg:text-xl font-semibold rounded-2xl hover:opacity-90 transition-opacity"
            >
              Смотреть оборудование
            </a>
            <button
              onClick={() => {
                const event = new CustomEvent('openApplicationModal');
                window.dispatchEvent(event);
              }}
              className="px-8 py-4 border border-gray-300 text-gray-300 lg:text-xl font-semibold rounded-2xl hover:bg-white/10 transition-colors"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
