import { Required } from './required';

export * from './optional';
export * from './partial';

type FullReq<S extends Record<string, any>> = Required<{ [K in keyof S]: Exclude<S[K], null | undefined> }>;

/**
 * Turns object-type into a structure that accepts any object where AT LEAST one of the properties of the source object is set
 *
 * @example AnyOfProperties<{ a: string, b: number }> = { a: string, b?: number } | { a?: string, b: number }
 */
export type AtLeastOneProperty<Src extends Record<PropertyKey, any>> = {
	[K in Required.Keys<Src>]: FullReq<Pick<Src, K>> & Partial<Src>;
}[Required.Keys<Src>];

export type OneOf<Src extends Record<PropertyKey, any>> = { [K in keyof Src]: Pick<Src, K> }[keyof Src];

export type IObject = Record<PropertyKey, any>;

export type FunctionKeys<S extends IObject> = {
	[K in keyof S]: S[K] extends (...args: any) => any ? K : never;
}[keyof S];

/**
 * Weekday number
 *
 * 0 - Sunday
 * 1 - Monday
 * 2 - Tuesday
 * 3 - Wednesday
 * 4 - Thursday
 * 5 - Friday
 * 6 - Saturday
 */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Awaited<R> = R extends Promise<infer V> ? Awaited<V> : R;

export type Writable<T> = { -readonly [P in keyof T]: T[P] };
