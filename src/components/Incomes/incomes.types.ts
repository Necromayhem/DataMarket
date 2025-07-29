export interface Income {
	income_id: number
	number: string
	date: string
	last_change_date: string
	supplier_article: string
	tech_size: string
	barcode: number
	quantity: number
	total_price: string
	date_close: string
	warehouse_name: string
	nm_id: number
}


export interface IncomeApiResponse {
	data: Income[]
	total?: number
	page?: number
	limit?: number
}

export interface IncomeFetchParams {
	page: number
	limit: number
	dateFrom?: string
	dateTo?: string
}

export interface FilterInputs  {
	income_id: string
	number: string
	dateFrom: string
	dateTo: string
	warehouse_name: string
	supplier_article: string
	tech_size: string
	barcode: string
	quantity: string
	total_price: string
	date_close: string
	last_change_date: string
	nm_id: string
}
