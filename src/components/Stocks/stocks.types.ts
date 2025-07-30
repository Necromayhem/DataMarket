export interface Stock {
    date: string;
    last_change_date: string | null;
    supplier_article: string;
    tech_size: string;
    barcode: number;
    quantity: number;
    is_supply: boolean | null;
    is_realization: boolean | null;
    quantity_full: number | null;
    warehouse_name: string;
    in_way_to_client: number | null;
    in_way_from_client: number | null;
    nm_id: number;
    subject: string;
    category: string;
    brand: string;
    sc_code: number;
    price: string;
    discount: string;
}

export interface StockApiResponse {
    data: Stock[];
    total?: number;
    page?: number;
    limit?: number;
}

export interface StockFetchParams {
    page: number;
    limit: number;
}

export interface StockFilterInputs {
    supplier_article: string;
    tech_size: string;
    barcode: string;
    quantity: string;
    warehouse_name: string;
    nm_id: string;
    subject: string;
    category: string;
    brand: string;
    sc_code: string;
    price: string;
    discount: string;
}

export interface DataTableColumn {
    field: string;
    header: string;
    sortable?: boolean;
}