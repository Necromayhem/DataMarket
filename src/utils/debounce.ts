export function debounce<T extends (...args: any[]) => any>(
	fn: T,
	delay: number
): T {
	let timeoutId: ReturnType<typeof setTimeout>
	return function (this: any, ...args: any[]) {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => fn.apply(this, args), delay)
	} as T
}
