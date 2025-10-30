import { Hero } from '@/components/Hero';
import { Portfolio } from '@/components/Portfolio';
import { ProductSection } from '@/components/ProductSection';
import { ApplicationForm } from '@/components/ApplicationForm';
import { getProductsByCategory } from '@/data/products';
import Seo from '@/components/Seo';

export default function Index() {
  const lightProducts = getProductsByCategory('light').slice(0, 5);
  const soundProducts = getProductsByCategory('sound').slice(0, 5);
  const screenProducts = getProductsByCategory('screens').slice(0, 5);
  const streamProducts = getProductsByCategory('live-streams').slice(0, 5);
  const ironProducts = getProductsByCategory('iron').slice(0,3);
  const kitProducts = getProductsByCategory('kits').slice(0, 5);

  return (
    <div className="min-h-screen">
      <Seo
        title="Главная"
        description="Аренда света, звука, экранов и трансляций. Полное техническое обеспечение мероприятий. Профессиональное оборудование и команда."
        canonicalPath="/"
      />
      <Hero />
      <div id="portfolio" />
      <Portfolio />

      <div id="equipment" className="py-8">
        <div id="light">
          <ProductSection
            title="Свет"
            category="light"
            products={lightProducts}
            columns={5}
          />
        </div>

        <ProductSection
          title="Звук"
          category="sound"
          products={soundProducts}
          columns={5}
        />

        <ProductSection
          title="Экраны"
          category="screens"
          products={screenProducts}
          columns={3}
        />

        <ProductSection
          title="Прямые трансляции"
          category="live-streams"
          products={streamProducts}
          columns={5}
        />
        
        <ProductSection
          title="Конструкционные решения"
          category="iron"
          products={ironProducts}
          columns={3}
        />

        
      </div>

      <div id="application">
        <ApplicationForm />
      </div>
    </div>
  );
}
