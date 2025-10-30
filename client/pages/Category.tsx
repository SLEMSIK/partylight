import { useParams, Navigate } from 'react-router-dom';
import { getProductsByCategory } from '@/data/products';
import { CATEGORY_LABELS, Category } from '@shared/types';
import { ProductCard } from '@/components/ProductCard';
import { ScreenCard } from '@/components/ScreenCard';
import Seo from '@/components/Seo';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();

  if (!category || !(category in CATEGORY_LABELS)) {
    return <Navigate to="/" replace />;
  }

  const products = getProductsByCategory(category);
  const title = CATEGORY_LABELS[category as Category];

  return (
    <div className="min-h-screen py-16">
      <Seo
        title={title}
        description={`Категория: ${title}. Аренда оборудования для мероприятий. Доступно позиций: ${products.length}.`}
        canonicalPath={`/category/${category}`}
      />
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-6xl font-medium text-white mb-4">{title}</h1>
          <p className="text-gray-400 text-xl">
            {products.length} {products.length === 1 ? 'товар' : products.length < 5 ? 'товара' : 'товаров'}
          </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-2xl">Товары скоро появятся</p>
          </div>
        )}
      </div>
    </div>
  );
}
