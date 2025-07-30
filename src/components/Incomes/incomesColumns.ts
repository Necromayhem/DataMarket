import type { DataTableColumn } from "./incomes.types";

export const incomesColumns: DataTableColumn[] = [
    { field: "income_id", header: "ID" },
    { field: "date", header: "Дата" },
    { field: "warehouse_name", header: "Склад" },
    { field: "supplier_article", header: "Артикул" },
    { field: "tech_size", header: "Размер" },
    { field: "barcode", header: "Штрихкод" },
    { field: "quantity", header: "Количество" },
    { field: "total_price", header: "Цена" },
    { field: "date_close", header: "Дата закрытия" },
    { field: "last_change_date", header: "Последнее изменение" },
    { field: "nm_id", header: "ID маркетплейса" },
];