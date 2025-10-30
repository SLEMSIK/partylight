import { Link } from 'react-router-dom';
import { Product } from '@shared/types';

interface ScreenCardProps {
  product: Product;
}

export function ScreenCard({ product }: ScreenCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="relative overflow-hidden rounded-xl bg-gradient-card border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20">
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="aspect-video md:aspect-auto overflow-hidden rounded-lg">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-semibold text-white text-3xl mb-4">{product.name}</h3>
            <p className="text-gray-300 text-lg mb-4">{product.shortDescription}</p>
            <p className="text-gray-400 mb-6 leading-relaxed">{product.longDescription}</p>
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-2xl">
                {product.price.toLocaleString('ru-RU')} ₽
              </p>
              <button className="px-6 py-3 rounded-lg border border-gray-300 text-gray-300 hover:bg-white/10 transition-colors">
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
