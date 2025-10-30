import { Link } from 'react-router-dom';
import { Product, CATEGORY_LABELS, Category } from '@shared/types';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

interface ProductSectionProps {
  title: string;
  category: Category;
  products: Product[];
  columns?: number;
}

export function ProductSection({ title, category, products, columns = 5 }: ProductSectionProps) {
  const gridCols = {
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5';

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl lg:text-5xl font-medium text-white">{title}</h2>
          <Link
            to={`/category/${category}`}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs lg:text-xl font-semibold"
          >
            Все товары
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
        <div className={`grid ${gridCols} gap-6`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
