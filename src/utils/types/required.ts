export namespace Required {
	/**
	 * Same as Required<T> but goes deeper and makes Required<T> all its properties and sub-properties.
	 */
	export type Deep<T> = {
		[P in keyof T]?:
			| (T[P] extends Date
					? Date
					: T[P] extends Array<infer U>
					? Array<Deep<U>>
					: T[P] extends ReadonlyArray<infer U>
					? ReadonlyArray<Deep<U>>
					: Deep<T[P]>)
			| T[P];
	};

	/**
	 * Make some properties in {S} type partial
	 */
	export type Some<S, K extends keyof S> = Omit<S, K> & Required<Pick<S, K>>;

	export type Keys<T> = {
		[K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
	}[keyof T];
}
