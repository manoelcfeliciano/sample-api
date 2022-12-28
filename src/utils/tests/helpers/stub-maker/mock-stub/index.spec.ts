import sut from '.';

describe('Stub Maker - Generate Make Any Stub', () => {
	test('should set function name', () => {
		const stub = sut({}, ['foo'], () => {});

		expect(stub.foo.getMockName()).toBe('foo');

		expect(jest.spyOn(stub, 'foo').getMockName()).toBe('foo');
	});
});
