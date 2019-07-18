const ns = require('../src/index.js');

function makeButter() {
	return {
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
		info: {
			'date-churned': 'October 1st',
		},
	};
}

const butter = makeButter();

describe('ns', () => {
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
	// TODO: test ns.func()
	// ? ns.func(butter, 'price.printPrice');
	// ?ns.func(butter, 'info.sayHello', 'mark', 'naomi');
});
