const ns = require('../src/index.js');
const { makeExpectedPerson, makePerson } = require('../utils/testUtils.js');

describe('call', () => {
	it('is a function', () => {
		expect(typeof ns.call).toEqual('function');
	});

	it('calls a function', () => {
		const person = makePerson();
		expect(ns.call(person, 'sayHello')).toEqual('hello');
	});

	it('calls a function with arguments', () => {
		const person = makePerson();
		expect(ns.call(person, 'sayHelloWithName', 'naomi')).toEqual('hello naomi');
	});

	it("calls a function with the correct 'this'", () => {
		const person = makePerson();
		expect(ns.call(person, 'sayHelloWithThis')).toEqual("hi i'm mark");
	});

	it("calls a nested function with the correct 'this'", () => {
		const person = makePerson();
		expect(ns.call(person, 'birthplace.introduce')).toEqual(
			'My name is mark and I was born in Dallas, Texas.'
		);
	});

	it("calls a function nested inside of an object within an array with the correct 'this'", () => {
		const person = makePerson();
		expect(ns.call(person, 'favoritePhrases[0].sayPhrase')).toEqual(
			'I love dogs'
		);
		expect(ns.call(person, 'favoritePhrases[1].sayPhrase')).toEqual(
			'Pizza is great'
		);
		expect(ns.call(person, 'favoritePhrases[2].sayPhrase')).toEqual('Sick!');
	});

	it("calls a function nested inside of an nested object within an array with the correct 'this'", () => {
		const person = makePerson();
		expect(
			ns.call(person, 'favoritePhrases[0].variations[0].sayPhrase')
		).toEqual('I love doggos');
		expect(
			ns.call(person, 'favoritePhrases[1].variations[0].sayPhrase')
		).toEqual('L&B is the best');
		expect(
			ns.call(person, 'favoritePhrases[2].variations[0].sayPhrase')
		).toEqual("That's so sick");
	});

	it("calls a function nested inside of an object within an array with the correct 'this' and arguments", () => {
		const person = makePerson();
		expect(ns.call(person, 'favoritePhrases[0].sayPhrase', '!')).toEqual(
			'I love dogs!'
		);
		expect(ns.call(person, 'favoritePhrases[1].sayPhrase', '!')).toEqual(
			'Pizza is great!'
		);
		expect(ns.call(person, 'favoritePhrases[2].sayPhrase', '!')).toEqual(
			'Sick!!'
		);
	});

	it("calls a function nested inside of an nested object within an array with the correct 'this' and arguments", () => {
		const person = makePerson();
		expect(
			ns.call(person, 'favoritePhrases[0].variations[0].sayPhrase', '!!!')
		).toEqual('I love doggos!!!');
		expect(
			ns.call(person, 'favoritePhrases[1].variations[0].sayPhrase', '!!!')
		).toEqual('L&B is the best!!!');
		expect(
			ns.call(person, 'favoritePhrases[2].variations[0].sayPhrase', '!!!')
		).toEqual("That's so sick!!!");
	});

	it("calls a function nested inside of an object within an array with the correct 'this' and multiple arguments", () => {
		const person = makePerson();
		expect(ns.call(person, 'favoritePhrases[0].sayPhrase', '!', '?')).toEqual(
			'I love dogs!?'
		);
		expect(ns.call(person, 'favoritePhrases[1].sayPhrase', '!', '?')).toEqual(
			'Pizza is great!?'
		);
		expect(ns.call(person, 'favoritePhrases[2].sayPhrase', '!', '?')).toEqual(
			'Sick!!?'
		);
	});

	it("calls a function nested inside of an nested object within an array with the correct 'this' and multiple arguments", () => {
		const person = makePerson();
		expect(
			ns.call(
				person,
				'favoritePhrases[0].variations[0].sayPhrase',
				'!!!',
				'???'
			)
		).toEqual('I love doggos!!!???');
		expect(
			ns.call(
				person,
				'favoritePhrases[1].variations[0].sayPhrase',
				'!!!',
				'???'
			)
		).toEqual('L&B is the best!!!???');
		expect(
			ns.call(
				person,
				'favoritePhrases[2].variations[0].sayPhrase',
				'!!!',
				'???'
			)
		).toEqual("That's so sick!!!???");
	});

	it('does not throw an error and returns undefined when attempting to call a function on an undefined parent object', () => {
		expect(ns.call(undefined, 'some.value', 1)).toBeUndefined();
	});

	it('does not throw an error or have a side effect and returns undefined when attempting call a function on an undefined key', () => {
		const person = makePerson();
		expect(ns.call(person, 'not.real.value', 1)).toBeUndefined();
		expect(person).toEqual(makeExpectedPerson());
	});

	it('does not throw an error or have a side effect and returns undefined when attempting to call a function on an undefined array indeces', () => {
		const person = makePerson();
		expect(ns.call(person, '[0]', 1)).toBeUndefined();
		expect(person).toEqual(makeExpectedPerson());
	});

	it('does not throw an error or have a side effect and returns undefined when attempting call a function on multiple undefined array indeces', () => {
		const person = makePerson();
		expect(ns.call(person, 'favoritePhrases[0][0][100]', 1)).toBeUndefined();
		expect(person).toEqual(makeExpectedPerson());
	});
});
