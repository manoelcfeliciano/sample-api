import { Jester } from '~/utils/tests/helpers/jest-types';
import { FunctionKeys, IObject } from '~/utils/types';
import generateMakeAnyStub from './generate-make-any-stub';
export interface IMakeAnyStubCommonFn {
	/**
	 * Creates a stub version of the interface
	 *
	 * @param {Partial<Stub>} append properties to append to the stub after it's mocked
	 * @param {...FunctionKeys<S>[]} keys list of keys that maps to functions to automatically mock
	 *
	 * @returns {Jester.Mock.Stub}
	 */
	<S extends IObject>(append?: Partial<S>, ...keys: FunctionKeys<S>[]): Jester.Mock.Stub<S>;

	/**
	 * Creates a stub version of the interface
	 *
	 * @param {...FunctionKeys<S>[]} keys list of keys that maps to functions to automatically mock
	 *
	 * @returns {Jester.Mock.Stub}
	 */
	<S extends IObject>(...keys: FunctionKeys<S>[]): Jester.Mock.Stub<S>;
}
export interface IMakeAnyStubFn extends IMakeAnyStubCommonFn {
	/**
	 * Same as the default behaviour, but all function implementations returns nothing, instead of a Promise
	 */
	sync: IMakeAnyStubCommonFn;

	/**
	 * Same as the default behaviour, but all function implementations returns a Promise that rejects to an empty error
	 */
	block: IMakeAnyStubCommonFn;
	/**
	 * Same as the default block behaviour, but all function implementations throws an error
	 */
	syncBlock: IMakeAnyStubCommonFn;
}

const additionalProperties = {
	sync: generateMakeAnyStub(),
	syncBlock: generateMakeAnyStub(() => {
		throw new Error('mocked-error');
	}),
	block: generateMakeAnyStub(async () => {
		throw new Error('mocked-error');
	}),
};

export const makeAnyStub: IMakeAnyStubFn = Object.assign(
	generateMakeAnyStub(() => Promise.resolve(null)),
	additionalProperties
);
