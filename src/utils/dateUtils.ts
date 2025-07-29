export function formatDateForAPI(date: Date): string {
	return date.toISOString().split('T')[0]
}

export function parseDateFromAPI(dateString: string): Date {
	return new Date(dateString)
}
