import { Link } from 'react-router-dom';
import { Phone, Send, User, Users } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contacts" className="bg-background border-t border-white/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-2xl lg:text-4xl font-medium text-white mb-3">О нас</h3>
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed">
              PartyLight - Техническое обеспечение мероприятий любого масштаба. Работаем с 2020 года.
            </p>
          </div>

          <div>
            <h3 className="text-2xl lg:text-4xl font-medium text-white mb-3">Услуги</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/category/light" className="text-gray-400 hover:text-white transition-colors text-base lg:text-xl">
                  Световое оборудование
                </Link>
              </li>
              <li>
                <Link to="/category/sound" className="text-gray-400 hover:text-white transition-colors text-base lg:text-xl">
                  Звуковое оборудование
                </Link>
              </li>
              <li>
                <Link to="/category/screens" className="text-gray-400 hover:text-white transition-colors text-base lg:text-xl">
                  LED экраны
                </Link>
              </li>
              <li>
                <Link to="/category/live-streams" className="text-gray-400 hover:text-white transition-colors text-base lg:text-xl">
                  Прямые трансляции
                </Link>
              </li>
              <li>
                <Link to="/category/kits" className="text-gray-400 hover:text-white transition-colors text-base lg:text-xl">
                  Готовые комплекты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl lg:text-4xl font-medium text-white mb-3">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 text-base lg:text-xl">
                <Phone className="w-5 h-5" />
                <a href="tel:+79040322775" className="hover:text-white transition-colors">
                  +7 904 032 2775
                </a>
              </li>
              <li className="text-gray-500 text-base lg:text-lg pl-8">
              <a href="https://t.me/DenSedoff" className="hover:text-white transition-colors">
              @DenSedoff
                </a>
                </li>
              <li className="flex items-center gap-3 text-gray-400 text-base lg:text-xl">
                <Phone className="w-5 h-5" />
                <a href="tel:+79308315851" className="hover:text-white transition-colors">
                  +7 930 831 5851
                </a>
              </li>
              <li className="text-gray-500 text-base lg:text-lg pl-8">
              <a href="https://t.me/tk_party_light" className="hover:text-white transition-colors">
                @tk_party_light
                </a>
                </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl lg:text-4xl font-medium text-white mb-3">Соцсети</h3>
            <div className="flex gap-4">
              <a
                href="https://vk.com/pyl33"
                className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Users className="w-6 h-6 text-gray-400" />
              </a>
              <a
                href="https://t.me/partylight33"
                className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Send className="w-6 h-6 text-gray-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <p className="text-gray-500 text-base lg:text-xl text-center">
            © {new Date().getFullYear()} PartyLight. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
