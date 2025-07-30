import { ref, computed, watch } from "vue";
import { formatDateForAPI } from "@/utils/dateUtils";
import type { FilterInputs, Sale } from "./sales.types";

export function useSalesFilters(store: { allSales: Sale[] }) {
    const filterInputs = ref<FilterInputs>({
        g_number: "",
        dateFrom: "2024-01-01",
        dateTo: "2024-12-31",
        supplier_article: "",
        tech_size: "",
        barcode: "",
        total_price: "",
        discount_percent: "",
        warehouse_name: "",
        country_name: "",
        region_name: "",
        income_id: "",
        sale_id: "",
        spp: "",
        for_pay: "",
        finished_price: "",
        price_with_disc: "",
        nm_id: "",
        subject: "",
        category: "",
        brand: "",
    });

    const dateFromModel = ref<Date>(new Date(filterInputs.value.dateFrom));
    const dateToModel = ref<Date>(new Date(filterInputs.value.dateTo));

    watch([dateFromModel, dateToModel], ([newFrom, newTo]) => {
        if (newFrom) filterInputs.value.dateFrom = formatDateForAPI(newFrom);
        if (newTo) filterInputs.value.dateTo = formatDateForAPI(newTo);
    });

    const fetchParams = computed(() => ({
        page: 1,
        limit: 500,
        dateFrom: filterInputs.value.dateFrom,
        dateTo: filterInputs.value.dateTo,
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

    const totalPriceModel = computed({
        get: () => {
            const value = filterInputs.value.total_price;
            return value ? Number(value) : null;
        },
        set: (value) => {
            filterInputs.value.total_price = value !== null ? formatNumber(value) : '';
        }
    });

    const priceWithDiscModel = computed({
        get: () => {
            const value = filterInputs.value.price_with_disc;
            return value ? Number(value) : null;
        },
        set: (value) => {
            filterInputs.value.price_with_disc = value !== null ? formatNumber(value) : '';
        }
    });

    const discountPercentModel = computed({
        get: () => {
            const value = filterInputs.value.discount_percent;
            return value ? Number(value) : null;
        },
        set: (value) => {
            filterInputs.value.discount_percent = value !== null ? formatNumber(value) : '';
        }
    });

    const filteredSales = computed(() => {
        return store.allSales.filter((sale) => {
            if (filterInputs.value.g_number && !sale.g_number.toLowerCase().includes(filterInputs.value.g_number.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.supplier_article && !sale.supplier_article.toLowerCase().includes(filterInputs.value.supplier_article.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.warehouse_name && !sale.warehouse_name.toLowerCase().includes(filterInputs.value.warehouse_name.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.country_name && !sale.country_name.toLowerCase().includes(filterInputs.value.country_name.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.region_name && !sale.region_name.toLowerCase().includes(filterInputs.value.region_name.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.sale_id && !sale.sale_id.toLowerCase().includes(filterInputs.value.sale_id.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.subject && !sale.subject.toLowerCase().includes(filterInputs.value.subject.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.category && !sale.category.toLowerCase().includes(filterInputs.value.category.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.brand && !sale.brand.toLowerCase().includes(filterInputs.value.brand.toLowerCase())) {
                return false;
            }

            if (filterInputs.value.nm_id && !String(sale.nm_id).includes(filterInputs.value.nm_id)) {
                return false;
            }
            if (filterInputs.value.tech_size && !sale.tech_size.toLowerCase().includes(filterInputs.value.tech_size.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.barcode && !String(sale.barcode).includes(filterInputs.value.barcode)) {
                return false;
            }
            if (filterInputs.value.income_id && !String(sale.income_id).includes(filterInputs.value.income_id)) {
                return false;
            }
            
            // Фильтрация по числовым полям (точное соответствие)
        if (filterInputs.value.total_price) {
            const filterValue = filterInputs.value.total_price;
            if (!Number(sale.total_price).toFixed(2).includes(filterValue)) {
                return false;
            }
        }
        if (filterInputs.value.for_pay) {
            const filterValue = filterInputs.value.for_pay;
            if (!Number(sale.for_pay).toFixed(2).includes(filterValue)) {
                return false;
            }
        }
        if (filterInputs.value.finished_price) {
            const filterValue = filterInputs.value.finished_price;
            if (!Number(sale.finished_price).toFixed(2).includes(filterValue)) {
                return false;
            }
        }
        if (filterInputs.value.price_with_disc) {
            const filterValue = filterInputs.value.price_with_disc;
            if (!Number(sale.price_with_disc).toFixed(2).includes(filterValue)) {
                return false;
            }
        }
        if (filterInputs.value.discount_percent) {
            const filterValue = filterInputs.value.discount_percent;
            const saleDiscount = sale.discount_percent;
            
            // Точное сравнение для скидки
            if (saleDiscount !== filterValue) {
                return false;
            }
        }
        if (filterInputs.value.spp && !sale.spp.includes(filterInputs.value.spp)) {
            return false;
        }

        return true;
    });
    });

    return {
        filterInputs,
        dateFromModel,
        dateToModel,
        fetchParams,
        filteredSales,
        nmIdModel,
        totalPriceModel,
        priceWithDiscModel,
        discountPercentModel,
        formatNumber
    };
}