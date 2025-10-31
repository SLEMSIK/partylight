import { useState } from 'react';
import { PRODUCTS, getProductsByCategory } from '@/data/products';
import { SmeethItem, SmeethFormData, WorkItem, OtherItem } from '@shared/types';
import { SmeethResponse } from '@shared/api';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Seo from '@/components/Seo';
const ASSET_BASE_URL = import.meta.env.VITE_ASSET_BASE_URL ?? '';
const withBase = (path: string) => `${ASSET_BASE_URL}${path}`;
const CATEGORY_OPTIONS: Array<{ value: 'sound' | 'light' | 'screens' | 'live-streams'; label: string }> = [
  { value: 'sound', label: 'Звук' },
  { value: 'light', label: 'Свет' },
  { value: 'screens', label: 'Экраны' },
  { value: 'live-streams', label: 'Трансляции' },
];

const WORK_TYPE_OPTIONS: Array<{ value: 'mounting' | 'technician' | 'delivery'; label: string }> = [
  { value: 'mounting', label: 'Монтажники' },
  { value: 'technician', label: 'Техники' },
  { value: 'delivery', label: 'Доставка' },
];

const WORK_LABEL_BY_VALUE: Record<'mounting' | 'technician' | 'delivery', 'Монтажники' | 'Техники' | 'Доставка'> = {
  mounting: 'Монтажники',
  technician: 'Техники',
  delivery: 'Доставка',
};

export default function SmeethGenerator() {
  const [items, setItems] = useState<SmeethItem[]>([
    { category: 'sound', productId: '', quantity: 1 } as SmeethItem
  ]);
  const [workItems, setWorkItems] = useState<WorkItem[]>([
    { type: 'mounting', price: 0, quantity: 1 }
  ]);
  const [otherItems, setOtherItems] = useState<OtherItem[]>([
    { name: '', price: 0, quantity: 1 }
  ]);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [taxPercent, setTaxPercent] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const addItem = () => {
    setItems([...items, { category: 'sound', productId: '', quantity: 1 } as SmeethItem]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof SmeethItem, value: string | number) => {
    const newItems = [...items];
    if (field === 'quantity') {
      newItems[index] = { ...newItems[index], quantity: Number(value) || 1 };
    } else if (field === 'category') {
      newItems[index] = { ...newItems[index], category: value as SmeethItem['category'], productId: '' };
    } else {
      newItems[index] = { ...newItems[index], productId: value as string };
    }
    setItems(newItems);
  };

  const getProductsForCategory = (category: 'sound' | 'light' | 'screens' | 'live-streams') => {
    return getProductsByCategory(category);
  };

  const getSelectedProduct = (productId: string) => {
    return PRODUCTS.find(p => p.id === productId);
  };

  const addWorkItem = () => {
    setWorkItems([...workItems, { type: 'mounting', price: 0, quantity: 1 }]);
  };

  const removeWorkItem = (index: number) => {
    if (workItems.length > 1) {
      setWorkItems(workItems.filter((_, i) => i !== index));
    }
  };

  const updateWorkItem = (index: number, field: keyof WorkItem, value: string | number) => {
    const newItems = [...workItems];
    if (field === 'type') {
      newItems[index] = { ...newItems[index], type: value as WorkItem['type'] };
    } else if (field === 'price') {
      newItems[index] = { ...newItems[index], price: Number(value) || 0 };
    } else {
      newItems[index] = { ...newItems[index], quantity: Number(value) || 1 };
    }
    setWorkItems(newItems);
  };

  const addOtherItem = () => {
    setOtherItems([...otherItems, { name: '', price: 0, quantity: 1 }]);
  };

  const removeOtherItem = (index: number) => {
    if (otherItems.length > 1) {
      setOtherItems(otherItems.filter((_, i) => i !== index));
    }
  };

  const updateOtherItem = (index: number, field: keyof OtherItem, value: string | number) => {
    const newItems = [...otherItems];
    if (field === 'name') {
      newItems[index] = { ...newItems[index], name: value as string };
    } else if (field === 'price') {
      newItems[index] = { ...newItems[index], price: Number(value) || 0 };
    } else {
      newItems[index] = { ...newItems[index], quantity: Number(value) || 1 };
    }
    setOtherItems(newItems);
  };

  const calculateSubtotal = () => {
    const equipmentTotal = items.reduce((total, item) => {
      if (!item.productId) return total;
      const product = getSelectedProduct(item.productId);
      if (!product) return total;
      return total + (product.price * (item.quantity || 1));
    }, 0);

    const workTotal = workItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    const otherTotal = otherItems.reduce((total, item) => {
      if (!item.name) return total;
      return total + (item.price * item.quantity);
    }, 0);

    return equipmentTotal + workTotal + otherTotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // Применяем скидку
    const afterDiscount = subtotal * (1 - discountPercent / 100);
    
    // Применяем налог по формуле: сумма / (100 - налог%) * 100
    if (taxPercent > 0 && taxPercent < 100) {
      const totalWithTax = afterDiscount * 100 / (100 - taxPercent);
      return Math.ceil(totalWithTax); // Округление в большую сторону
    }
    
    return Math.ceil(afterDiscount); // Если налог не указан, просто округляем вверх
  };

  const calculateTaxAmount = () => {
    const subtotal = calculateSubtotal();
    const afterDiscount = subtotal * (1 - discountPercent / 100);
    
    if (taxPercent > 0 && taxPercent < 100) {
      const totalWithTax = afterDiscount * 100 / (100 - taxPercent);
      return Math.ceil(totalWithTax) - Math.ceil(afterDiscount);
    }
    
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const validItems = items.filter(item => item.productId);
    const validWorkItems = workItems.filter(item => item.price > 0 && item.quantity > 0);
    const validOtherItems = otherItems.filter(item => item.name.trim() && item.price > 0 && item.quantity > 0);

    if (validItems.length === 0 && validWorkItems.length === 0 && validOtherItems.length === 0) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните хотя бы одну позицию",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Вычисляем стоимость для каждой позиции оборудования с полным наименованием и ценой
      const itemsWithTotal = validItems.map(item => {
        const product = getSelectedProduct(item.productId);
        if (!product) {
          return {
            ...item,
            productName: '',
            unitPrice: 0,
            total: 0,
          };
        }
        const total = product.price * (item.quantity || 1);
        return {
          ...item,
          productName: product.name,
          unitPrice: product.price,
          total,
        };
      });

      // Вычисляем стоимость для каждой позиции работы и добавляем русскую метку
      const workItemsWithTotal = validWorkItems.map(item => ({
        ...item,
        label: WORK_LABEL_BY_VALUE[item.type],
        total: item.price * item.quantity,
      }));

      // Вычисляем стоимость для каждой позиции "Другое"
      const otherItemsWithTotal = validOtherItems.map(item => ({
        ...item,
        total: item.price * item.quantity,
      }));

      // Вычисляем суммы
      const subtotal = calculateSubtotal();
      const totalAmount = calculateTotal();

      const formData: SmeethFormData = {
        items: itemsWithTotal.length > 0 ? itemsWithTotal : [],
        workItems: workItemsWithTotal.length > 0 ? workItemsWithTotal : undefined,
        otherItems: otherItemsWithTotal.length > 0 ? otherItemsWithTotal : undefined,
        subtotal,
        discountPercent,
        taxPercent,
        totalAmount,
        comment: comment || undefined,
      };

      const response = await fetch(withBase('/api/newSmeeth'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Если сервер вернул файл (attachment), инициируем скачивание
      const disposition = response.headers.get('content-disposition');
      if (response.ok && disposition && disposition.toLowerCase().includes('attachment')) {
        const blob = await response.blob();
        let filename = 'smeta.csv';
        const match = /filename=\"?([^\";]+)\"?/i.exec(disposition);
        if (match && match[1]) filename = match[1];
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        toast({
          title: "Смета сформирована",
          description: "Файл сметы скачан",
        });

        // Reset form
        setItems([{ category: 'sound', productId: '', quantity: 1 } as SmeethItem]);
        setWorkItems([{ type: 'mounting', price: 0, quantity: 1 }]);
        setOtherItems([{ name: '', price: 0, quantity: 1 }]);
        setDiscountPercent(0);
        setTaxPercent(0);
        setComment('');
      } else {
        // Иначе пробуем прочитать JSON и показать сообщение об ошибке/успехе
        const data: SmeethResponse = await response.json();
        if (response.ok && (data as any)?.success) {
          toast({ title: 'Успешно', description: data.message });
        } else {
          toast({ title: 'Ошибка', description: data?.message || 'Не удалось сформировать смету', variant: 'destructive' });
        }
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить смету. Попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <Seo
        title="Генератор сметы"
        description="Создайте смету для вашего мероприятия, выбрав необходимое оборудование"
        canonicalPath="/smeeth-generator"
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Генератор сметы</h1>
          <p className="text-gray-300">Выберите оборудование для расчета стоимости</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Оборудование</CardTitle>
              <CardDescription className="text-gray-400">
                Добавьте необходимое оборудование из каждой категории
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">Позиция {index + 1}</h3>
                    {items.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`category-${index}`} className="text-gray-300">
                        Категория
                      </Label>
                      <Select
                        value={item.category}
                        onValueChange={(value) => updateItem(index, 'category', value)}
                      >
                        <SelectTrigger id={`category-${index}`} className="bg-gray-900/50 border-gray-700 text-white">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          {CATEGORY_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-white hover:bg-gray-800 focus:bg-gray-800"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`product-${index}`} className="text-gray-300">
                        Оборудование
                      </Label>
                      <Select
                        value={item.productId}
                        onValueChange={(value) => updateItem(index, 'productId', value)}
                      >
                        <SelectTrigger id={`product-${index}`} className="bg-gray-900/50 border-gray-700 text-white">
                          <SelectValue placeholder="Выберите оборудование" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          {getProductsForCategory(item.category).map((product) => (
                            <SelectItem
                              key={product.id}
                              value={product.id}
                              className="text-white hover:bg-gray-800 focus:bg-gray-800"
                            >
                              {product.name} - {product.price.toLocaleString('ru-RU')} ₽
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${index}`} className="text-gray-300">
                        Количество
                      </Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  {item.productId && (
                    <div className="mt-2 text-sm text-gray-400">
                      {(() => {
                        const product = getSelectedProduct(item.productId);
                        if (!product) return null;
                        const total = product.price * (item.quantity || 1);
                        return (
                          <span>
                            {product.name} × {item.quantity || 1} = {total.toLocaleString('ru-RU')} ₽
                          </span>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addItem}
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Добавить оборудование
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Работа</CardTitle>
              <CardDescription className="text-gray-400">
                Добавьте услуги по монтажу, техническому обслуживанию и доставке
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {workItems.map((workItem, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">Позиция {index + 1}</h3>
                    {workItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeWorkItem(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`work-type-${index}`} className="text-gray-300">
                        Тип работы
                      </Label>
                      <Select
                        value={workItem.type}
                        onValueChange={(value) => updateWorkItem(index, 'type', value)}
                      >
                        <SelectTrigger id={`work-type-${index}`} className="bg-gray-900/50 border-gray-700 text-white">
                          <SelectValue placeholder="Выберите тип работы" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          {WORK_TYPE_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-white hover:bg-gray-800 focus:bg-gray-800"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`work-price-${index}`} className="text-gray-300">
                        Цена за единицу (₽)
                      </Label>
                      <Input
                        id={`work-price-${index}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={workItem.price || ''}
                        onChange={(e) => updateWorkItem(index, 'price', parseFloat(e.target.value) || 0)}
                        className="bg-gray-900/50 border-gray-700 text-white"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`work-quantity-${index}`} className="text-gray-300">
                        Количество
                      </Label>
                      <Input
                        id={`work-quantity-${index}`}
                        type="number"
                        min="1"
                        value={workItem.quantity || 1}
                        onChange={(e) => updateWorkItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  {workItem.price > 0 && (
                    <div className="mt-2 text-sm text-gray-400">
                      <span>
                        {WORK_TYPE_OPTIONS.find(opt => opt.value === workItem.type)?.label} × {workItem.quantity} = {(workItem.price * workItem.quantity).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addWorkItem}
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Добавить работу
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Другое</CardTitle>
              <CardDescription className="text-gray-400">
                Добавьте дополнительные услуги и позиции
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {otherItems.map((otherItem, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">Позиция {index + 1}</h3>
                    {otherItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOtherItem(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`other-name-${index}`} className="text-gray-300">
                        Наименование
                      </Label>
                      <Input
                        id={`other-name-${index}`}
                        type="text"
                        value={otherItem.name}
                        onChange={(e) => updateOtherItem(index, 'name', e.target.value)}
                        className="bg-gray-900/50 border-gray-700 text-white"
                        placeholder="Введите наименование"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`other-price-${index}`} className="text-gray-300">
                        Цена за единицу (₽)
                      </Label>
                      <Input
                        id={`other-price-${index}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={otherItem.price || ''}
                        onChange={(e) => updateOtherItem(index, 'price', parseFloat(e.target.value) || 0)}
                        className="bg-gray-900/50 border-gray-700 text-white"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`other-quantity-${index}`} className="text-gray-300">
                        Количество
                      </Label>
                      <Input
                        id={`other-quantity-${index}`}
                        type="number"
                        min="1"
                        value={otherItem.quantity || 1}
                        onChange={(e) => updateOtherItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  {otherItem.name && otherItem.price > 0 && (
                    <div className="mt-2 text-sm text-gray-400">
                      <span>
                        {otherItem.name} × {otherItem.quantity} = {(otherItem.price * otherItem.quantity).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addOtherItem}
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Добавить позицию
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Скидка и налог</CardTitle>
              <CardDescription className="text-gray-400">
                Укажите скидку и налог в процентах
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount" className="text-gray-300">
                    Скидка (%)
                  </Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={discountPercent || ''}
                    onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                    className="bg-gray-900/50 border-gray-700 text-white"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax" className="text-gray-300">
                    Налог (%)
                  </Label>
                  <Input
                    id="tax"
                    type="number"
                    min="0"
                    step="0.01"
                    value={taxPercent || ''}
                    onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
                    className="bg-gray-900/50 border-gray-700 text-white"
                    placeholder="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Комментарий</CardTitle>
              <CardDescription className="text-gray-400">
                Дополнительная информация о вашем мероприятии
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Дата мероприятия, особенности установки, дополнительные требования..."
                className="bg-gray-900/50 border-gray-700 text-white min-h-[100px]"
              />
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-6">
            <CardContent className="pt-6 space-y-3">
              <div className="flex justify-between items-center text-gray-300">
                <span>Промежуточная сумма:</span>
                <span>{calculateSubtotal().toLocaleString('ru-RU')} ₽</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between items-center text-gray-300">
                  <span>Скидка ({discountPercent}%):</span>
                  <span className="text-green-400">
                    -{(calculateSubtotal() * discountPercent / 100).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              )}
              {taxPercent > 0 && (
                <div className="flex justify-between items-center text-gray-300">
                  <span>Налог ({taxPercent}%):</span>
                  <span className="text-orange-400">
                    +{calculateTaxAmount().toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              )}
              <div className="h-px bg-gray-700 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-white">Итого:</span>
                <span className="text-3xl font-bold text-purple-400">
                  {calculateTotal().toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6"
            size="lg"
          >
            {isSubmitting ? 'Отправка...' : 'Отправить смету'}
          </Button>
        </form>
      </div>
    </div>
  );
}

