export type Optional<S> = { [K in keyof S]?: S[K] | null };

export namespace Optional {
	type NotOptional = Date | number | string | boolean | undefined | null;

	/**
	 * Same as Partial<T> but goes deeper and makes Partial<T> all its properties and sub-properties.
	 */
	export type Deep<T> = T extends NotOptional
		? T
		: {
				[P in keyof T]?:
					| null
					| (T[P] extends NotOptional
							? T[P]
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
	export type Some<S, K extends keyof S> = Omit<S, K> & Optional<Pick<S, K>>;

	export type MakeCustom<Src, K extends keyof Src> = Omit<Src, K> & { [Key in K]: Src[Key] | null };

	export type Keys<T> = {
		[K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never;
	}[keyof T];
}
