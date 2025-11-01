import { useState } from 'react';
import { PRODUCTS, getProductById } from '@/data/products';
import { SmeethItem } from '@shared/types';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Calculator } from 'lucide-react';
import Seo from '@/components/Seo';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CATEGORY_OPTIONS: Array<{ value: 'sound' | 'light' | 'screens' | 'live-streams'; label: string }> = [
  { value: 'sound', label: 'Звук' },
  { value: 'light', label: 'Свет' },
  { value: 'screens', label: 'Экраны' },
  { value: 'live-streams', label: 'Трансляции' },
];

interface EquipmentItem {
  productId: string;
  quantity: number;
  powerPerUnit: number;
  totalPower: number;
}

interface PhaseDistribution {
  phase: number;
  items: Array<{ productId: string; quantity: number; powerPerUnit: number; totalPower: number }>;
  totalPower: number;
}

export default function PowerCalculator() {
  const [items, setItems] = useState<SmeethItem[]>([
    { category: 'sound', productId: '', quantity: 1 } as SmeethItem
  ]);
  const [calculationResult, setCalculationResult] = useState<{
    totalPowerWatts: number;
    totalPowerKilowatts: number;
    phases: PhaseDistribution[];
    equipment: EquipmentItem[];
  } | null>(null);

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
    return PRODUCTS.filter(p => p.category === category && p.powerConsumption !== undefined);
  };

  const calculatePower = () => {
    const equipment: EquipmentItem[] = [];
    
    // Собираем все оборудование с энергопотреблением
    items.forEach(item => {
      if (!item.productId) return;
      const product = getProductById(item.productId);
      if (!product || !product.powerConsumption) return;
      
      const quantity = item.quantity || 1;
      const powerPerUnit = product.powerConsumption;
      const totalPower = powerPerUnit * quantity;
      
      equipment.push({
        productId: product.id,
        quantity,
        powerPerUnit,
        totalPower
      });
    });

    if (equipment.length === 0) {
      alert('Пожалуйста, выберите оборудование для расчёта');
      return;
    }

    // Рассчитываем общее энергопотребление
    const totalPowerWatts = equipment.reduce((sum, item) => sum + item.totalPower, 0);
    const totalPowerKilowatts = totalPowerWatts / 1000;

    // Распределяем нагрузку между фазами
    // Сортируем оборудование по мощности (от большего к меньшему)
    const sortedEquipment = [...equipment].sort((a, b) => b.powerPerUnit - a.powerPerUnit);
    
    // Инициализируем фазы
    const phases: PhaseDistribution[] = [
      { phase: 1, items: [], totalPower: 0 },
      { phase: 2, items: [], totalPower: 0 },
      { phase: 3, items: [], totalPower: 0 },
    ];

    // Распределяем каждую единицу оборудования на фазу с наименьшей нагрузкой
    sortedEquipment.forEach(eq => {
      // Для каждого экземпляра оборудования
      for (let i = 0; i < eq.quantity; i++) {
        // Находим фазу с наименьшей нагрузкой
        const phaseWithMinLoad = phases.reduce((min, phase) => 
          phase.totalPower < min.totalPower ? phase : min
        );

        // Проверяем, есть ли уже такое оборудование на этой фазе
        const existingItem = phaseWithMinLoad.items.find(item => item.productId === eq.productId);
        
        if (existingItem) {
          existingItem.quantity++;
          existingItem.totalPower += eq.powerPerUnit;
        } else {
          phaseWithMinLoad.items.push({
            productId: eq.productId,
            quantity: 1,
            powerPerUnit: eq.powerPerUnit,
            totalPower: eq.powerPerUnit
          });
        }

        phaseWithMinLoad.totalPower += eq.powerPerUnit;
      }
    });

    // Удаляем пустые фазы
    const activePhases = phases.filter(phase => phase.totalPower > 0);

    setCalculationResult({
      totalPowerWatts,
      totalPowerKilowatts,
      phases: activePhases,
      equipment
    });
  };

  return (
    <div className="min-h-screen from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <Seo
        title="Расчёт энергопотребления"
        description="Расчёт энергопотребления оборудования и распределение нагрузки по фазам"
        canonicalPath="/power-calculator"
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Расчёт энергопотребления</h1>
          <p className="text-gray-300">Выберите оборудование для расчёта энергопотребления и распределения нагрузки по фазам</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Оборудование</CardTitle>
            <CardDescription className="text-gray-400">
              Добавьте оборудование для расчёта энергопотребления
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
                            {product.name} {product.powerConsumption ? `(${product.powerConsumption} Вт)` : ''}
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

                {item.productId && (() => {
                  const product = getProductById(item.productId);
                  if (!product || !product.powerConsumption) return null;
                  const total = product.powerConsumption * (item.quantity || 1);
                  return (
                    <div className="mt-2 text-sm text-gray-400">
                      <span>
                        {product.name} × {item.quantity || 1} = {total.toLocaleString('ru-RU')} Вт ({total / 1000} кВт)
                      </span>
                    </div>
                  );
                })()}
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

        <Button
          type="button"
          onClick={calculatePower}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 mb-6"
          size="lg"
        >
          <Calculator className="h-5 w-5 mr-2" />
          Рассчитать энергопотребление
        </Button>

        {calculationResult && (
          <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Общее энергопотребление</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold text-purple-400">
                  {calculationResult.totalPowerKilowatts.toFixed(2)} кВт
                </div>
                <div className="text-lg text-gray-300">
                  {calculationResult.totalPowerWatts.toLocaleString('ru-RU')} Вт
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Распределение нагрузки по фазам</CardTitle>
                <CardDescription className="text-gray-400">
                  Нагрузка распределена максимально равномерно между фазами
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {calculationResult.phases.map((phase) => (
                    <div key={phase.phase} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h3 className="text-white font-semibold mb-2">Фаза {phase.phase}</h3>
                      <div className="text-2xl font-bold text-purple-400 mb-1">
                        {(phase.totalPower / 1000).toFixed(2)} кВт
                      </div>
                      <div className="text-sm text-gray-400 mb-4">
                        {phase.totalPower.toLocaleString('ru-RU')} Вт
                      </div>
                      <div className="text-xs text-gray-500">
                        {phase.items.length} {phase.items.length === 1 ? 'позиция' : phase.items.length < 5 ? 'позиции' : 'позиций'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {calculationResult.phases.map((phase) => (
                    <div key={phase.phase} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-semibold mb-3">
                        Фаза {phase.phase} - {(phase.totalPower / 1000).toFixed(2)} кВт
                      </h4>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-700">
                            <TableHead className="text-gray-300">Оборудование</TableHead>
                            <TableHead className="text-gray-300">Количество</TableHead>
                            <TableHead className="text-gray-300">Мощность (Вт)</TableHead>
                            <TableHead className="text-gray-300">Итого (Вт)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {phase.items.map((item) => {
                            const product = getProductById(item.productId);
                            return (
                              <TableRow key={item.productId} className="border-gray-700">
                                <TableCell className="text-gray-300">
                                  {product?.name || item.productId}
                                </TableCell>
                                <TableCell className="text-gray-300">{item.quantity}</TableCell>
                                <TableCell className="text-gray-300">{item.powerPerUnit}</TableCell>
                                <TableCell className="text-gray-300 font-semibold">
                                  {item.totalPower}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                          <TableRow className="border-gray-700 bg-gray-900/50">
                            <TableCell colSpan={3} className="text-white font-semibold">
                              Итого по фазе:
                            </TableCell>
                            <TableCell className="text-purple-400 font-bold">
                              {phase.totalPower.toLocaleString('ru-RU')} Вт ({(phase.totalPower / 1000).toFixed(2)} кВт)
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Сводка по оборудованию</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Оборудование</TableHead>
                      <TableHead className="text-gray-300">Количество</TableHead>
                      <TableHead className="text-gray-300">Мощность за единицу (Вт)</TableHead>
                      <TableHead className="text-gray-300">Общая мощность (Вт)</TableHead>
                      <TableHead className="text-gray-300">Общая мощность (кВт)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculationResult.equipment.map((item) => {
                      const product = getProductById(item.productId);
                      return (
                        <TableRow key={item.productId} className="border-gray-700">
                          <TableCell className="text-gray-300">
                            {product?.name || item.productId}
                          </TableCell>
                          <TableCell className="text-gray-300">{item.quantity}</TableCell>
                          <TableCell className="text-gray-300">{item.powerPerUnit}</TableCell>
                          <TableCell className="text-gray-300">{item.totalPower.toLocaleString('ru-RU')}</TableCell>
                          <TableCell className="text-gray-300">{(item.totalPower / 1000).toFixed(2)}</TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow className="border-gray-700 bg-gray-900/50">
                      <TableCell colSpan={3} className="text-white font-semibold">
                        ИТОГО:
                      </TableCell>
                      <TableCell className="text-purple-400 font-bold">
                        {calculationResult.totalPowerWatts.toLocaleString('ru-RU')} Вт
                      </TableCell>
                      <TableCell className="text-purple-400 font-bold">
                        {calculationResult.totalPowerKilowatts.toFixed(2)} кВт
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

