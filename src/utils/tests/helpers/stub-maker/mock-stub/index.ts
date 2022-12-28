import { Jester } from '~/utils/tests/helpers/jest-types';
import { IObject } from '~/utils/types';

const skipSafetyCheckProps: Array<string | RegExp> = [
	'$$typeof',
	'assymetricMatch',
	'toString',
	'nodeType',
	'tagName',
	'hasAttribute',
	/@@__.+__@@/,
];

function shouldThrowOnKeyNotSet(key: PropertyKey) {
	if (typeof key !== 'string') return true;

	return skipSafetyCheckProps.some((matcher) => {
		if (matcher instanceof RegExp) {
			return matcher.test(key as string);
		}
		return matcher === key;
	});
}

function safetyCheck(stub: Jester.Mock.Stub<any>): Jester.Mock.Stub<any> {
	const knownKeys = Object.keys({ ...stub });

	return new Proxy(stub, {
		get(target, key: any) {
			if (key in stub) return target[key];
			if (typeof key === 'symbol') return target[key as any];
			if (shouldThrowOnKeyNotSet(key)) return target[key];
			console.error(
				`Àttempting to access property [ ${key} ] of stub, but stub has only [ ${knownKeys.join(
					', '
				)} ] defined.
				If you think this is an error, you might want to add [ ${key} ] to the list of exception keys.`
			);
			throw new Error(`${key} is not a valid stub`);
		},
	});
}

function wrapJestFnOnAppendFunctions(append: IObject) {
	const keys = Object.keys(append);
	const out = { ...append };
	keys.forEach((key) => {
		const value = append[key];
		if (typeof value === 'function') {
			out[key] = jest.fn(value);
		}
	});
	return out;
}

export default (
	append: IObject,
	keys: string[] | undefined,
	mockImplementation: any
): Jester.Mock.Stub<any> => {
	const stub: any = Object.assign({}, wrapJestFnOnAppendFunctions(append));
	keys?.forEach((key) => {
		const func = jest.fn(mockImplementation);
		func.mockName(key);
		stub[key] = func;
	});
	return safetyCheck(stub);
};
