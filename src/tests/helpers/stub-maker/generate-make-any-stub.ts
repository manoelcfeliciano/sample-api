import { Jester } from '~/tests/helpers/jest-types';
import { IObject } from '~/utils/types';
import mockStub from './mock-stub';

const extractArgs = (args: any[]): [IObject, string[]] => {
	if (args.length === 0) {
		throw new Error(
			`Nothing was mocked. [makeAnyStub] expected either a partial implementation of the stub, or an array of keys to mock them`
		);
	}
	if (typeof args[0] === 'string') {
		return [{}, args];
	}
	const [objectArg = {}, ...keys] = args;
	return [objectArg, keys];
};

export default function (mockImplementation?: any) {
	return (...args: any[]): Jester.Mock.Stub<any> => {
		const [append, keys] = extractArgs(args);
		return mockStub(append, keys, mockImplementation);
	};
}
