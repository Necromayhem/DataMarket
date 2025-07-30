import { ref, computed, watch } from "vue";
import { formatDateForAPI } from "@/utils/dateUtils";
import type { FilterInputs, Order } from "./orders.types";
import { cancelOptions } from "./orders.constants";

export function useOrdersFilters(store: { allOrders: Order[] }) {
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
        oblast: "",
        income_id: "",
        odid: "",
        nm_id: "",
        subject: "",
        category: "",
        brand: "",
        is_cancel: "",
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
            return value ? parseFloat(value) : null;
        },
        set: (value) => {
            filterInputs.value.total_price = value !== null ? value.toString() : '';
        }
    });

    const discountPercentModel = computed({
        get: () => {
            const value = filterInputs.value.discount_percent;
            return value ? parseInt(value) : null;
        },
        set: (value) => {
            filterInputs.value.discount_percent = value !== null ? value.toString() : '';
        }
    });

    const filteredOrders = computed(() => {
        return store.allOrders.filter((order) => {
            if (filterInputs.value.g_number && !order.g_number.toLowerCase().includes(filterInputs.value.g_number.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.supplier_article && !order.supplier_article.toLowerCase().includes(filterInputs.value.supplier_article.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.warehouse_name && !order.warehouse_name.toLowerCase().includes(filterInputs.value.warehouse_name.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.oblast && !order.oblast.toLowerCase().includes(filterInputs.value.oblast.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.subject && !order.subject.toLowerCase().includes(filterInputs.value.subject.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.category && !order.category.toLowerCase().includes(filterInputs.value.category.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.brand && !order.brand.toLowerCase().includes(filterInputs.value.brand.toLowerCase())) {
                return false;
            }

            if (filterInputs.value.nm_id && !String(order.nm_id).includes(filterInputs.value.nm_id)) {
                return false;
            }
            if (filterInputs.value.tech_size && !order.tech_size.toLowerCase().includes(filterInputs.value.tech_size.toLowerCase())) {
                return false;
            }
            if (filterInputs.value.barcode && !String(order.barcode).includes(filterInputs.value.barcode)) {
                return false;
            }
            if (filterInputs.value.income_id && !String(order.income_id).includes(filterInputs.value.income_id)) {
                return false;
            }
            if (filterInputs.value.odid && !order.odid.includes(filterInputs.value.odid)) {
                return false;
            }
            
            if (filterInputs.value.total_price) {
                const filterValue = parseFloat(filterInputs.value.total_price);
                if (isNaN(filterValue)) return false;
                const orderPrice = parseFloat(order.total_price);
                if (Math.floor(orderPrice) !== Math.floor(filterValue)) {
                    return false;
                }
            }
            
            if (filterInputs.value.discount_percent) {
                const filterValue = parseFloat(filterInputs.value.discount_percent);
                if (isNaN(filterValue)) return false;
                if (order.discount_percent !== filterValue) {
                    return false;
                }
            }
            
            if (filterInputs.value.is_cancel !== "") {
                const filterValue = filterInputs.value.is_cancel === "true";
                if (order.is_cancel !== filterValue) {
                    return false;
                }
            }

            return true;
        });
    });

    return {
        filterInputs,
        dateFromModel,
        dateToModel,
        fetchParams,
        filteredOrders,
        nmIdModel,
        totalPriceModel,
        discountPercentModel,
        formatNumber,
        cancelOptions
    };
}