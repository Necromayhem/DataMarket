import { ref, computed, watch } from "vue";
import { formatDateForAPI } from "@/utils/dateUtils";
import type { FilterInputs, Income } from "./incomes.types";

export function useIncomesFilters(store: { allIncomes: Income[] }) {
    const filterInputs = ref<FilterInputs>({
        income_id: "",
        number: "",
        dateFrom: "2024-01-01",
        dateTo: "2024-12-31",
        warehouse_name: "",
        nm_id: "",
        supplier_article: "",
        tech_size: "",
        barcode: "",
        quantity: "",
        total_price: "",
        date_close: "",
        last_change_date: "",
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

    const filteredIncomes = computed(() => {
        return store.allIncomes.filter((income) => {
            if (
                filterInputs.value.income_id &&
                !String(income.income_id).includes(filterInputs.value.income_id)
            ) {
                return false;
            }
            if (
                filterInputs.value.number &&
                !income.number.includes(filterInputs.value.number)
            ) {
                return false;
            }
            if (
                filterInputs.value.warehouse_name &&
                !income.warehouse_name
                    .toLowerCase()
                    .includes(filterInputs.value.warehouse_name.toLowerCase())
            ) {
                return false;
            }
            if (
                filterInputs.value.nm_id &&
                !String(income.nm_id).includes(filterInputs.value.nm_id)
            ) {
                return false;
            }
            if (
                filterInputs.value.supplier_article &&
                !income.supplier_article
                    .toLowerCase()
                    .includes(filterInputs.value.supplier_article.toLowerCase())
            ) {
                return false;
            }
            if (
                filterInputs.value.tech_size &&
                !income.tech_size
                    .toLowerCase()
                    .includes(filterInputs.value.tech_size.toLowerCase())
            ) {
                return false;
            }
            if (
                filterInputs.value.barcode &&
                !String(income.barcode).includes(filterInputs.value.barcode)
            ) {
                return false;
            }
            if (
                filterInputs.value.quantity &&
                income.quantity !== Number(filterInputs.value.quantity)
            ) {
                return false;
            }
            if (
                filterInputs.value.total_price &&
                !income.total_price.includes(filterInputs.value.total_price)
            ) {
                return false;
            }
            if (
                filterInputs.value.date_close &&
                !income.date_close.includes(filterInputs.value.date_close)
            ) {
                return false;
            }
            if (
                filterInputs.value.last_change_date &&
                !income.last_change_date.includes(filterInputs.value.last_change_date)
            ) {
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
        filteredIncomes
    };
}