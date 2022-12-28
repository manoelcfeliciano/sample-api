export * from './partial';

export type IObject = Record<PropertyKey, any>;

export type FunctionKeys<S extends IObject> = {
	[K in keyof S]: S[K] extends (...args: any) => any ? K : never;
}[keyof S];
