import { useState, FormEvent, useEffect } from 'react';
import { X } from 'lucide-react';

interface ApplicationFormData {
  name: string;
  phone: string;
  contact: string;
  startDate: string;
  endDate: string;
  comment: string;
  selectedProducts?: string[];
}

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const cartItems = localStorage.getItem('partylight_cart');
      const selectedProducts = cartItems ? JSON.parse(cartItems) : [];

      const response = await fetch('/api/newApplication', {
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
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Ошибка при отправке заявки' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка при отправке заявки. Попробуйте позже.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#1F1D2B] border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-4xl font-medium text-white mb-4">Оставить заявку</h2>
        <p className="text-gray-400 text-lg mb-8">
          Заполните форму и мы свяжемся с вами для обсуждения деталей
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="modal-name" className="block text-white mb-2 font-medium">
                Имя *
              </label>
              <input
                type="text"
                id="modal-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Ваше имя"
              />
            </div>

            <div>
              <label htmlFor="modal-phone" className="block text-white mb-2 font-medium">
                Телефон *
              </label>
              <input
                type="tel"
                id="modal-phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="+7 (___) ___-__-__"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="modal-contact" className="block text-white mb-2 font-medium">
              Контакт для связи (ВКонтакте / Telegram / WhatsApp)
            </label>
            <input
              type="text"
              id="modal-contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Укажите ваш контакт (например, @username или ссылку)"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="modal-startDate" className="block text-white mb-2 font-medium">
                Дата начала *
              </label>
              <input
                type="date"
                id="modal-startDate"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="modal-endDate" className="block text-white mb-2 font-medium">
                Дата окончания *
              </label>
              <input
                type="date"
                id="modal-endDate"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="modal-comment" className="block text-white mb-2 font-medium">
              Комментарий
            </label>
            <textarea
              id="modal-comment"
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
    </div>
  );
}
