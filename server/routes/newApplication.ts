import { RequestHandler } from "express";
import { z } from "zod";

const ApplicationSchema = z.object({
  name: z.string().min(1, "Имя обязательно"),
  phone: z.string().min(1, "Телефон обязателен"),
  contact: z.string().optional(),
  startDate: z.string().min(1, "Дата начала обязательна"),
  endDate: z.string().min(1, "Дата окончания обязательна"),
  comment: z.string().optional(),
  selectedProducts: z.array(z.string()).optional(),
});

export const handleNewApplication: RequestHandler = async (req, res) => {
  try {
    const validatedData = ApplicationSchema.parse(req.body);

    console.log("New application received:", {
      ...validatedData,
      timestamp: new Date().toISOString(),
    });

    const response = {
      success: true,
      message: "Заявка успешно получена! Мы свяжемся с вами в ближайшее время.",
    };

    res.status(200).json(response);
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
        message: "Произошла ошибка при обработке заявки",
      };
      res.status(500).json(response);
    }
  }
};
