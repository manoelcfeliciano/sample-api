type Callback = (...args: any) => any;

export namespace Jester {
	export type Mock<F extends Callback> = jest.Mock<ReturnType<F>, Parameters<F>>;

	export type Spy<F extends Callback> = jest.SpyInstance<ReturnType<F>, Parameters<F>>;

	export type Watchable<F extends Callback> = Mock<F>;

	export const asMock = <F extends Callback>(fn: F): Mock<F> => fn as any;

	export interface LifeCycles {
		beforeAll: jest.Lifecycle;
		beforeEach: jest.Lifecycle;
		afterAll: jest.Lifecycle;
		afterEach: jest.Lifecycle;
	}
}

export namespace Jester.Mock {
	export type Stub<S> = { [K in keyof S]: S[K] extends Callback ? Jester.Mock<S[K]> : S[K] };
}
