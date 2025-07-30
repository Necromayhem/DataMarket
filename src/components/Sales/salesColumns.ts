import type { DataTableColumn } from "./sales.types";

export const salesColumns: DataTableColumn[] = [
    { field: "g_number", header: "Номер заказа" },
    { field: "date", header: "Дата продажи" },
    { field: "warehouse_name", header: "Склад" },
    { field: "country_name", header: "Страна" },
    { field: "region_name", header: "Регион" },
    { field: "supplier_article", header: "Артикул" },
    { field: "tech_size", header: "Размер" },
    { field: "barcode", header: "Штрихкод" },
    { field: "total_price", header: "Общая цена" },
    { field: "discount_percent", header: "Скидка %" },
    { field: "spp", header: "СПП" },
    { field: "for_pay", header: "К оплате" },
    { field: "finished_price", header: "Финальная цена" },
    { field: "price_with_disc", header: "Цена со скидкой" },
    { field: "nm_id", header: "ID маркетплейса" },
    { field: "subject", header: "Предмет" },
    { field: "category", header: "Категория" },
    { field: "brand", header: "Бренд" },
];