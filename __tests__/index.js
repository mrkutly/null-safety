const ns = require('../src/index.js');

const butter = {
	milk: 'cow',
	colors: [['yellow'], ['white', ['off-white', 'marigold']], 'cream'],
	price: {
		denomination: 'USD',
		amount: 200,
		tax: {
			state: 10,
			federal: 20,
		},
	},
};

describe('ns', () => {
	it('is a function', () => {
		expect(typeof ns).toEqual('function');
	});

	it('does not throw an error when evaluating an undefined parent object', () => {
		expect(ns(undefined, 'some.value')).toBeUndefined();
	});

	it('does not throw an error when evaluating an undefined key', () => {
		expect(ns(butter, 'not.real.value')).toBeUndefined();
	});

	it('does not throw an error when evaluating an undefined array index', () => {
		expect(ns(butter, '[0]')).toBeUndefined();
	});

	it('evaluates keys', () => {
		expect(ns(butter, 'milk')).toEqual('cow');
	});

	it('evaluates nested keys', () => {
		expect(ns(butter, 'price.denomination')).toEqual('USD');
	});

	it('evaluates multiple nested keys', () => {
		expect(ns(butter, 'price.tax.state')).toEqual(10);
	});

	it('evaluates arrays nested inside objects', () => {
		expect(ns(butter, 'colors[0]')).toEqual(['yellow']);
	});

	it('evaluates nested arrays nested inside objects', () => {
		expect(ns(butter, 'colors[0][0]')).toEqual('yellow');
	});

	it('evaluates multiple nested arrays nested inside objects', () => {
		expect(ns(butter, 'colors[1][1][1]')).toEqual('marigold');
	});
});
