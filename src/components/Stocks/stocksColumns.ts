import type { DataTableColumn } from "./stocks.types";

export const stocksColumns: DataTableColumn[] = [
    { field: "date", header: "Дата" },
    { field: "warehouse_name", header: "Склад" },
    { field: "supplier_article", header: "Артикул поставщика" },
    { field: "tech_size", header: "Размер" },
    { field: "barcode", header: "Штрихкод" },
    { field: "quantity", header: "Количество" },
    { field: "nm_id", header: "ID товара" },
    { field: "subject", header: "Предмет" },
    { field: "category", header: "Категория" },
    { field: "brand", header: "Бренд" },
    { field: "sc_code", header: "Код поставщика" },
    { field: "price", header: "Цена" },
    { field: "discount", header: "Скидка" },
];