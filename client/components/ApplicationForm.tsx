import { useState, FormEvent } from 'react';

interface ApplicationFormData {
  name: string;
  phone: string;
  contact: string;
  startDate: string;
  endDate: string;
  comment: string;
  selectedProducts?: string[];
}

export function ApplicationForm() {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    phone: '',
    contact: '',
    startDate: '',
    endDate: '',
    comment: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const cartItems = localStorage.getItem('partylight_cart');
      const selectedProducts = cartItems ? JSON.parse(cartItems) : [];

      const response = await fetch('https://cdn.partylight33.ru/api/newApplication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          selectedProducts,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.' });
        setFormData({
          name: '',
          phone: '',
          contact: '',
          startDate: '',
          endDate: '',
          comment: '',
        });
        localStorage.removeItem('partylight_cart');
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        setMessage({ type: 'error', text: data.message || 'Ошибка при отправке заявки' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка при отправке заявки. Попробуйте позже.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl lg:text-5xl font-medium text-white mb-4 text-center">Оставить заявку</h2>
        <p className="text-gray-400 text-base lg:text-xl text-center mb-12">
          Заполните форму и мы свяжемся с вами для обсуждения деталей
        </p>

        <form onSubmit={handleSubmit} className="bg-gradient-card border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-white mb-2 font-medium">
                Имя *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Ваше имя"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-white mb-2 font-medium">
                Телефон *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="+7 (___) ___-__-__"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="contact" className="block text-white mb-2 font-medium">
              Контакт для связи (ВКонтакте / Telegram / WhatsApp)
            </label>
            <input
              type="text"
              id="contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Укажите ваш контакт (например, @username или ссылку)"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="startDate" className="block text-white mb-2 font-medium">
                Дата начала *
              </label>
              <input
                type="date"
                id="startDate"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-white mb-2 font-medium">
                Дата окончания *
              </label>
              <input
                type="date"
                id="endDate"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="comment" className="block text-white mb-2 font-medium">
              Комментарий
            </label>
            <textarea
              id="comment"
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              placeholder="Расскажите о вашем мероприятии..."
            ></textarea>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-500/20 border border-green-500/50 text-green-200'
                  : 'bg-red-500/20 border border-red-500/50 text-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-gradient-primary text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Отправка...' : 'Оставить заявку'}
          </button>
        </form>
      </div>
    </section>
  );
}
