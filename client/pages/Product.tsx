import { useParams, Navigate, Link } from 'react-router-dom';
import { getProductById } from '@/data/products';
import { CATEGORY_LABELS } from '@shared/types';
import { ArrowLeft, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Seo from '@/components/Seo';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
const navigate = useNavigate()
  useEffect(() => {
    if (id) {
      const cart = localStorage.getItem('partylight_cart');
      const cartItems = cart ? JSON.parse(cart) : [];
      setIsInCart(cartItems.includes(id));
    }
  }, [id]);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (id) {
        const cart = localStorage.getItem('partylight_cart');
        const cartItems = cart ? JSON.parse(cart) : [];
        setIsInCart(cartItems.includes(id));
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [id]);

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-medium text-white mb-4">Товар не найден</h1>
          <Link to="/" className="text-purple-400 hover:text-purple-300 transition-colors">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const handleToggleCart = () => {
    const cart = localStorage.getItem('partylight_cart');
    let cartItems: string[] = cart ? JSON.parse(cart) : [];

    if (isInCart) {
      cartItems = cartItems.filter(item => item !== id);
    } else {
      cartItems.push(id);
    }

    localStorage.setItem('partylight_cart', JSON.stringify(cartItems));
    setIsInCart(!isInCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleApplicationClick = () => {
    const event = new CustomEvent('openApplicationModal');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen py-16">
      <Seo
        title={product.name}
        description={product.shortDescription}
        image={product.images?.[0]}
        type="product"
        canonicalPath={`/product/${product.id}`}
      />
      <div className="container mx-auto px-4">
        <Link
          to={`/category/${product.category}`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад к {CATEGORY_LABELS[product.category]}
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gradient-card border border-white/10">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index
                        ? 'border-purple-500'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-lg bg-gradient-primary text-white text-sm font-medium mb-4">
                {CATEGORY_LABELS[product.category]}
              </span>
              <h1 className="text-2xl lg:text-5xl font-semibold text-white mb-4">{product.name}</h1>
              <p className="text-gray-300 text-base lg:text-xl mb-6">{product.shortDescription}</p>
            </div>

            <div className="mb-8 pb-8 border-b border-white/10">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl lg:text-5xl font-bold text-white">{product.price.toLocaleString('ru-RU')} ₽</span>
                <span className="text-gray-400 text-lg">/ сутки</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <a
                href="https://t.me/densedoff"
                className="block w-full text-center py-4 px-6 border border-gray-300 text-gray-300 text-base lg:text-lg font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Задать вопрос
              </a>
            </div>

            <div className="bg-gradient-card border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-base lg:text-xl font-semibold text-white mb-4">Важная информация</h3>
              <ul className="space-y-3 text-sm lg:text-base text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Минимальный срок аренды - 1 сутки</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Доставка и монтаж обсуждаются отдельно</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Техническая поддержка на мероприятии</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Гибкая система скидок при долгосрочной аренде</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-card border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-base lg:text-3xl font-semibold text-white mb-6">Подробное описание</h2>
          <p className="text-gray-300 text-sm lg:text-lg leading-relaxed whitespace-pre-line">{product.longDescription}</p>
        </div>
      </div>
    </div>
  );
}

/*<button
                onClick={handleToggleCart}
                className={`block w-full py-4 px-6 text-white text-lg font-semibold rounded-xl transition-all ${
                  isInCart
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gradient-primary hover:opacity-90'
                }`}
              > 
                {isInCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" />
                    Выбрано
                  </span>
                ) : (
                  'Выбрать товар'
                )}
              </button> */