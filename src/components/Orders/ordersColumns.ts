import type { DataTableColumn } from "./orders.types";

export const ordersColumns: DataTableColumn[] = [
    { field: "g_number", header: "Номер заказа" },
    { field: "date", header: "Дата заказа" },
    { field: "warehouse_name", header: "Склад" },
    { field: "oblast", header: "Область" },
    { field: "supplier_article", header: "Артикул" },
    { field: "tech_size", header: "Размер" },
    { field: "barcode", header: "Штрихкод" },
    { field: "total_price", header: "Общая цена" },
    { field: "discount_percent", header: "Скидка %" },
    { field: "income_id", header: "ID поставки" },
    { field: "odid", header: "ID заказа" },
    { field: "nm_id", header: "ID маркетплейса" },
    { field: "subject", header: "Предмет" },
    { field: "category", header: "Категория" },
    { field: "brand", header: "Бренд" },
    { field: "is_cancel", header: "Отменен" },
];