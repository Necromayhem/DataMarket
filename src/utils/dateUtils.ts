export const formatDateForAPI = (date: Date | null): string => {
	if (!date) return ''
	return date.toISOString().split('T')[0]
}

export const parseDateFromAPI = (dateStr: string): Date => {
	return new Date(dateStr)
}
