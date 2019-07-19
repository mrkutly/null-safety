const ns = require('../src/index.js');
const { makeButter } = require('../utils/testUtils.js');
const butter = makeButter();

describe('ns.set()', () => {
	it('is a function', () => {
		expect(typeof ns.set).toEqual('function');
	});

	it('does not throw an error and returns undefined when attempting to set an undefined parent object', () => {
		expect(ns.set(undefined, 'some.value', 1)).toBeUndefined();
	});

	it('does not throw an error and returns undefined when attempting to set an undefined key', () => {
		expect(ns.set(butter, 'not.real.value', 1)).toBeUndefined();
	});

	it('does not throw an error and returns undefined when attempting to set an undefined array indeces', () => {
		expect(ns.set(butter, '[0]', 1)).toBeUndefined();
	});

	it('does not throw an error and returns undefined when attempting to set multiple undefined array indeces', () => {
		expect(ns.set(butter, 'milk[0][0][100]', 1)).toBeUndefined();
	});

	it('does not have a side effect when attempting to set an undefined key', () => {
		const newButter = makeButter();
		ns.set(newButter, 'milk.nil', 'oops!');
		expect(newButter).toMatchObject(makeButter());
	});

	it('does not have a side effect when attempting to set an undefined array indeces', () => {
		const newButter = makeButter();
		expect(ns.set(butter, '[0]', 1)).toBeUndefined();
		expect(newButter).toMatchObject(makeButter());
	});

	it('does not have a side effect when attempting to set multiple undefined array indeces', () => {
		const newButter = makeButter();
		expect(ns.set(butter, 'milk[0][0][100]', 1)).toBeUndefined();
		expect(newButter).toMatchObject(makeButter());
	});

	it('sets keys', () => {
		ns.set(butter, 'milk', 'goat');
		expect(butter.milk).toEqual('goat');
	});

	it('sets nested keys', () => {
		ns.set(butter, 'price.denomination', 'canada bucks');
		expect(butter.price.denomination).toEqual('canada bucks');
	});

	it('sets multiple nested keys', () => {
		ns.set(butter, 'price.tax.state', 'a billion');
		expect(butter.price.tax.state).toEqual('a billion');
	});

	it('sets arrays nested inside objects', () => {
		ns.set(butter, 'colors[0]', ['not yellow']);
		expect(butter.colors[0]).toEqual(['not yellow']);
	});

	it('sets nested arrays nested inside objects', () => {
		ns.set(butter, 'colors[0][0]', ['definitely not yellow']);
		expect(butter.colors[0][0]).toEqual(['definitely not yellow']);
	});

	it('sets multiple nested arrays nested inside objects', () => {
		ns.set(butter, 'colors[1][1][1]', 'fuchsia');
		expect(butter.colors[1][1][1]).toEqual('fuchsia');
	});
});
