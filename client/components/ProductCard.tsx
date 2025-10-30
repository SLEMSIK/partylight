import { Link } from 'react-router-dom';
import { Product } from '@shared/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group h-full">
      <div className="relative overflow-hidden rounded-xl bg-gradient-card border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 h-full flex flex-col">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="font-semibold text-white text-base leading-6 line-clamp-2">{product.name}</h3>
            <p className="text-white font-medium text-base whitespace-nowrap">
              {product.price.toLocaleString('ru-RU')} ₽
            </p>
          </div>
          <div className="h-px bg-gray-600 mb-2"></div>
          <div className="flex-1">
            <p className="text-gray-400 text-sm line-clamp-2">{product.shortDescription}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
