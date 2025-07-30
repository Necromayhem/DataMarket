import { ref, computed } from "vue";
import type { StockFilterInputs, Stock } from "./stocks.types";

export function useStocksFilters(store: { allStocks: Stock[] }) {
    const filterInputs = ref<StockFilterInputs>({
        supplier_article: "",
        tech_size: "",
        barcode: "",
        quantity: "",
        warehouse_name: "",
        nm_id: "",
        subject: "",
        category: "",
        brand: "",
        sc_code: "",
        price: "",
        discount: "",
    });

    const fetchParams = computed(() => ({
        page: 1,
        limit: 500,
    }));

    const formatNumber = (value: string | number) => {
        if (!value && value !== 0) return "";
        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(num)) return "";
        return num % 1 === 0 ? num.toString() : num.toFixed(2);
    };

    const nmIdModel = computed({
        get: () => filterInputs.value.nm_id ? Number(filterInputs.value.nm_id) : null,
        set: (value) => filterInputs.value.nm_id = value?.toString() ?? ''
    });

    const quantityModel = computed({
        get: () => {
            const value = filterInputs.value.quantity;
            return value ? Number(value) : null;
        },
        set: (value) => {
            filterInputs.value.quantity = value !== null ? formatNumber(value) : '';
        }
    });

    const scCodeModel = computed({
        get: () => {
            const value = filterInputs.value.sc_code;
            return value ? Number(value) : null;
        },
        set: (value) => {
            filterInputs.value.sc_code = value !== null ? formatNumber(value) : '';
        }
    });

    const priceModel = computed({
        get: () => {
            const value = filterInputs.value.price;
            return value ? Number(value) : null;
        },
        set: (value) => {
            filterInputs.value.price = value !== null ? formatNumber(value) : '';
        }
    });

    const discountModel = computed({
        get: () => {
            const value = filterInputs.value.discount;
            return value ? Number(value) : null;
        },
        set: (value) => {
            filterInputs.value.discount = value !== null ? formatNumber(value) : '';
        }
    });

    const filteredStocks = computed(() => {
        return store.allStocks.filter((stock) => {
            // Текстовые фильтры (частичное совпадение)
            if (filterInputs.value.supplier_article && !stock.supplier_article.toLowerCase().includes(filterInputs.value.supplier_article.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.warehouse_name && !stock.warehouse_name.toLowerCase().includes(filterInputs.value.warehouse_name.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.subject && !stock.subject.toLowerCase().includes(filterInputs.value.subject.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.category && !stock.category.toLowerCase().includes(filterInputs.value.category.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.brand && !stock.brand.toLowerCase().includes(filterInputs.value.brand.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.tech_size && !stock.tech_size.toLowerCase().includes(filterInputs.value.tech_size.toLowerCase())) {
                return false;
            }

            // Числовые фильтры (точное совпадение)
            if (filterInputs.value.nm_id && stock.nm_id !== Number(filterInputs.value.nm_id)) {
                return false;
            }
            if (filterInputs.value.barcode && stock.barcode !== Number(filterInputs.value.barcode)) {
                return false;
            }
            if (filterInputs.value.sc_code && stock.sc_code !== Number(filterInputs.value.sc_code)) {
                return false;
            }
            if (filterInputs.value.quantity && stock.quantity !== Number(filterInputs.value.quantity)) {
                return false;
            }
            if (filterInputs.value.price && Number(stock.price) !== Number(filterInputs.value.price)) {
                return false;
            }
            if (filterInputs.value.discount && Number(stock.discount) !== Number(filterInputs.value.discount)) {
                return false;
            }

            return true;
        });
    });

    return {
        filterInputs,
        fetchParams,
        filteredStocks,
        nmIdModel,
        quantityModel,
        scCodeModel,
        priceModel,
        discountModel,
        formatNumber
    };
}