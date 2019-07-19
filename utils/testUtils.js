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

function sayPhrase(exclamation = '', extra = '') {
	return this.phrase + exclamation + extra;
}

function makePerson() {
	return {
		name: 'mark',
		sayHello() {
			return 'hello';
		},
		sayHelloWithName(name) {
			return 'hello ' + name;
		},
		sayHelloWithThis() {
			return "hi i'm " + this.name;
		},
		birthplace: {
			city: 'Dallas',
			state: 'Texas',
			introduce() {
				return `My name is mark and I was born in ${this.city}, ${this.state}.`;
			},
		},
		favoritePhrases: [
			{
				phrase: 'I love dogs',
				sayPhrase,
				variations: [
					{
						phrase: 'I love doggos',
						sayPhrase,
					},
				],
			},
			{
				phrase: 'Pizza is great',
				sayPhrase,
				variations: [
					{
						phrase: 'L&B is the best',
						sayPhrase,
					},
				],
			},
			{
				phrase: 'Sick!',
				sayPhrase,
				variations: [
					{
						phrase: "That's so sick",
						sayPhrase,
					},
				],
			},
		],
	};
}

function makeExpectedPerson() {
	return {
		name: 'mark',
		sayHello: expect.any(Function),
		sayHelloWithName: expect.any(Function),
		sayHelloWithThis: expect.any(Function),
		birthplace: {
			city: 'Dallas',
			state: 'Texas',
			introduce: expect.any(Function),
		},
		favoritePhrases: [
			{
				phrase: 'I love dogs',
				sayPhrase: expect.any(Function),
				variations: [
					{
						phrase: 'I love doggos',
						sayPhrase: expect.any(Function),
					},
				],
			},
			{
				phrase: 'Pizza is great',
				sayPhrase: expect.any(Function),
				variations: [
					{
						phrase: 'L&B is the best',
						sayPhrase: expect.any(Function),
					},
				],
			},
			{
				phrase: 'Sick!',
				sayPhrase: expect.any(Function),
				variations: [
					{
						phrase: "That's so sick",
						sayPhrase: expect.any(Function),
					},
				],
			},
		],
	};
}

module.exports = {
	makeButter,
	makePerson,
	makeExpectedPerson,
};
