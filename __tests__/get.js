const ns = require('../src/index.js');
const { makeButter } = require('../utils/testUtils.js');
const butter = makeButter();

describe('ns.get()', () => {
	it('is a function', () => {
		expect(typeof ns.get).toEqual('function');
	});

	it('does not throw an error when evaluating an undefined parent object', () => {
		expect(ns.get(undefined, 'some.value')).toBeUndefined();
	});

	it('does not throw an error when evaluating an undefined key', () => {
		expect(ns.get(butter, 'not.real.value')).toBeUndefined();
	});

	it('does not throw an error when evaluating an array indeces', () => {
		expect(ns.get(butter, '[0]')).toBeUndefined();
	});

	it('does not throw an error when evaluating multiple undefined array indeces', () => {
		expect(ns.get(butter, 'milk[0][0][100]')).toBeUndefined();
	});

	it('evaluates keys', () => {
		expect(ns.get(butter, 'milk')).toEqual('cow');
	});

	it('evaluates keys with "-"', () => {
		expect(ns.get(butter, 'info[date-churned]')).toEqual('October 1st');
	});

	it('evaluates nested keys', () => {
		expect(ns.get(butter, 'price.denomination')).toEqual('USD');
	});

	it('evaluates multiple nested keys', () => {
		expect(ns.get(butter, 'price.tax.state')).toEqual(10);
	});

	it('evaluates arrays nested inside objects', () => {
		expect(ns.get(butter, 'colors[0]')).toEqual(['yellow']);
	});

	it('evaluates nested arrays nested inside objects', () => {
		expect(ns.get(butter, 'colors[0][0]')).toEqual('yellow');
	});

	it('evaluates multiple nested arrays nested inside objects', () => {
		expect(ns.get(butter, 'colors[1][1][1]')).toEqual('marigold');
	});
});
