import { RequestHandler } from "express";
import { z } from "zod";

const SmeethItemSchema = z.object({
  category: z.enum(['sound', 'light', 'screens', 'live-streams']),
  productId: z.string().min(1, "ID продукта обязателен"),
  productName: z.string().min(1, "Наименование продукта обязательно"),
  unitPrice: z.number().nonnegative("Цена за единицу должна быть неотрицательной"),
  quantity: z.number().int().positive().optional(),
  total: z.number().nonnegative("Стоимость позиции должна быть неотрицательной").optional(),
}).refine(
  (data) => data.productId && data.productName && data.unitPrice !== undefined,
  {
    message: "Для оборудования должны быть указаны ID, наименование и цена",
  }
);

const WorkItemSchema = z.object({
  type: z.enum(['mounting', 'technician', 'delivery']),
  label: z.enum(['Монтажники', 'Техники', 'Доставка']).optional(),
  price: z.number().nonnegative("Цена должна быть неотрицательной"),
  quantity: z.number().int().positive("Количество должно быть положительным"),
  total: z.number().nonnegative("Стоимость позиции должна быть неотрицательной").optional(),
});

const OtherItemSchema = z.object({
  name: z.string().min(1, "Наименование обязательно"),
  price: z.number().nonnegative("Цена должна быть неотрицательной"),
  quantity: z.number().int().positive("Количество должно быть положительным"),
  total: z.number().nonnegative("Стоимость позиции должна быть неотрицательной").optional(),
});

const SmeethSchema = z.object({
  items: z.array(SmeethItemSchema),
  workItems: z.array(WorkItemSchema).optional(),
  otherItems: z.array(OtherItemSchema).optional(),
  subtotal: z.number().nonnegative("Промежуточная сумма должна быть неотрицательной"),
  discountPercent: z.number().min(0).max(100, "Скидка не может превышать 100%"),
  taxPercent: z.number().min(0, "Налог не может быть отрицательным"),
  totalAmount: z.number().nonnegative("Общая стоимость должна быть неотрицательной"),
  comment: z.string().optional(),
}).refine(
  (data) => (data.items && data.items.length > 0) || 
            (data.workItems && data.workItems.length > 0) || 
            (data.otherItems && data.otherItems.length > 0),
  {
    message: "Необходимо добавить хотя бы одну позицию (оборудование, работа или другое)",
  }
);

export const handleNewSmeeth: RequestHandler = async (req, res) => {
  try {
    const validatedData = SmeethSchema.parse(req.body);

    const timestamp = new Date().toISOString();
    console.log("New smeeth received:", {
      ...validatedData,
      timestamp,
    });

    // Формируем CSV для скачивания
    const lines: string[] = [];
    const sep = ";";
    const safe = (v: unknown) =>
      String(v ?? "").replace(/"/g, '""');

    lines.push("Раздел;Наименование;Тип;Цена за единицу;Кол-во;Сумма");
    // Оборудование
    for (const it of validatedData.items || []) {
      lines.push([
        "Оборудование",
        safe((it as any).productName ?? ""),
        safe(it.category),
        safe((it as any).unitPrice ?? 0),
        safe(it.quantity ?? 1),
        safe(it.total ?? 0),
      ].join(sep));
    }
    // Работа
    for (const w of validatedData.workItems || []) {
      const label = (w as any).label ?? (w.type === 'mounting' ? 'Монтажники' : w.type === 'technician' ? 'Техники' : 'Доставка');
      lines.push([
        "Работа",
        safe(label),
        safe(w.type),
        safe(w.price),
        safe(w.quantity),
        safe(w.total ?? (w.price * w.quantity)),
      ].join(sep));
    }
    // Другое
    for (const o of validatedData.otherItems || []) {
      lines.push([
        "Другое",
        safe(o.name),
        "",
        safe(o.price),
        safe(o.quantity),
        safe(o.total ?? (o.price * o.quantity)),
      ].join(sep));
    }

    lines.push("");
    lines.push(["Итого без скидки и налога", safe(validatedData.subtotal)].join(sep));
    lines.push(["Скидка (%)", safe(validatedData.discountPercent)].join(sep));
    lines.push(["Налог (%)", safe(validatedData.taxPercent)].join(sep));
    lines.push(["Итого к оплате", safe(validatedData.totalAmount)].join(sep));

    const csvContent = "\uFEFF" + lines.join("\n");
    const filename = `smeta-${timestamp.replace(/[:.]/g, '-')}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.status(200).send(csvContent);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response = {
        success: false,
        message: error.errors[0].message,
      };
      res.status(400).json(response);
    } else {
      const response = {
        success: false,
        message: "Произошла ошибка при обработке сметы",
      };
      res.status(500).json(response);
    }
  }
};

