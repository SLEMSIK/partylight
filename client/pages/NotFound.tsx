import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Seo
        title="Страница не найдена"
        description="Ошибка 404: страница не найдена"
        canonicalPath={location.pathname}
      />
      <div className="text-center">
        <h1 className="text-9xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-white mb-4">Страница не найдена</h2>
        <p className="text-xl text-gray-400 mb-8">К сожалению, запрашиваемая страница не существует</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          <Home className="w-5 h-5" />
          Соснуть хуйца
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
