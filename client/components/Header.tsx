import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handlePortfolioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const lightSection = document.getElementById('portfolio');
      if (lightSection) {
        lightSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#portfolio');
      setTimeout(() => {
        const lightSection = document.getElementById('portfolio');
        if (lightSection) {
          lightSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  const handleEquipmentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const lightSection = document.getElementById('light');
      if (lightSection) {
        lightSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#light');
      setTimeout(() => {
        const lightSection = document.getElementById('light');
        if (lightSection) {
          lightSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  const handleApplicationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const applicationSection = document.getElementById('application');
      if (applicationSection) {
        applicationSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const event = new CustomEvent('openApplicationModal');
      window.dispatchEvent(event);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-3xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent uppercase tracking-wider">
            PartyLight
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
          <a
              href="#portfolio"
              onClick={handlePortfolioClick}
              className="text-gray-400 hover:text-white transition-colors uppercase text-sm font-medium tracking-wider cursor-pointer"
            >
              Портфолио
            </a>
            <a
              href="#equipment"
              onClick={handleEquipmentClick}
              className="text-gray-400 hover:text-white transition-colors uppercase text-sm font-medium tracking-wider cursor-pointer"
            >
              Оборудование
            </a>
            <a
              href="#application"
              onClick={handleApplicationClick}
              className="text-gray-400 hover:text-white transition-colors uppercase text-sm font-medium tracking-wider cursor-pointer"
            >
              Оставить заявку
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#application"
              onClick={handleApplicationClick}
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-300 hover:bg-white/10 transition-colors uppercase text-sm font-medium tracking-wider cursor-pointer"
            >
              Связаться
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-4">
              <a
                href="#equipment"
                onClick={handleEquipmentClick}
                className="text-gray-400 hover:text-white transition-colors uppercase text-sm font-medium tracking-wider cursor-pointer"
              >
                Оборудование
              </a>
              <a
                href="#application"
                onClick={handleApplicationClick}
                className="text-gray-400 hover:text-white transition-colors uppercase text-sm font-medium tracking-wider cursor-pointer"
              >
                Оставить заявку
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
