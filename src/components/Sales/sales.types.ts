export interface Sale {
    g_number: string;
    date: string;
    last_change_date: string;
    supplier_article: string;
    tech_size: string;
    barcode: number;
    total_price: string;
    discount_percent: string;
    is_supply: boolean;
    is_realization: boolean;
    promo_code_discount: string | null;
    warehouse_name: string;
    country_name: string;
    oblast_okrug_name: string;
    region_name: string;
    income_id: number;
    sale_id: string;
    odid: string | null;
    spp: string;
    for_pay: string;
    finished_price: string;
    price_with_disc: string;
    nm_id: number;
    subject: string;
    category: string;
    brand: string;
    is_storno: boolean | null;
}

export interface SaleApiResponse {
    data: Sale[];
    total?: number;
    page?: number;
    limit?: number;
}

export interface SaleFetchParams {
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
    country_name: string;
    region_name: string;
    income_id: string;
    sale_id: string;
    spp: string;
    for_pay: string;
    finished_price: string;
    price_with_disc: string;
    nm_id: string;
    subject: string;
    category: string;
    brand: string;
}

export interface DataTableColumn {
    field: string;
    header: string;
    sortable?: boolean;
}