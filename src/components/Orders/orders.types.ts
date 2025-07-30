export interface Order {
    g_number: string;
    date: string;
    last_change_date: string;
    supplier_article: string;
    tech_size: string;
    barcode: number;
    total_price: string;
    discount_percent: number;
    warehouse_name: string;
    oblast: string;
    income_id: number;
    odid: string;
    nm_id: number;
    subject: string;
    category: string;
    brand: string;
    is_cancel: boolean;
    cancel_dt: string | null;
}

export interface OrderApiResponse {
    data: Order[];
    total?: number;
    page?: number;
    limit?: number;
}

export interface OrderFetchParams {
    page: number;
    limit: number;
    dateFrom?: string;
    dateTo?: string;
}

export interface FilterInputs {
    g_number: string;
    dateFrom: string;
    dateTo: string;
    supplier_article: string;
    tech_size: string;
    barcode: string;
    total_price: string;
    discount_percent: string;
    warehouse_name: string;
    oblast: string;
    income_id: string;
    odid: string;
    nm_id: string;
    subject: string;
    category: string;
    brand: string;
    is_cancel: string;
}

export interface DataTableColumn {
    field: string;
    header: string;
    sortable?: boolean;
}