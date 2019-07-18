const ns = {
	parseAccessors(string) {
		const accessors = string.split(/\[|\]|\./).filter(el => !!el.length);

		return accessors.map(el =>
			parseInt(el) || el === '0' ? parseInt(el) : el
		);
	},

	get(obj, string) {
		obj = obj || {};

		const accessors = this.parseAccessors(string);

		return accessors.reduce((acc, el, idx) => {
			let val;

			if (idx === accessors.length - 1) {
				val = idx === 0 ? obj[el] : acc[el];
				return val;
			}

			val = idx === 0 ? obj[el] || {} : acc[el] || {};
			return val;
		}, {});
	},

	set(obj, string, val) {
		obj = obj || {};

		const accessors = this.parseAccessors(string);

		return accessors.reduce((acc, el, idx) => {
			acc = acc || {};
			if (acc[el] && idx !== accessors.length - 1) {
				return acc[el];
			} else if (idx === accessors.length - 1 && acc[el]) {
				acc[el] = val;
			}
		}, obj);
	},

	func(obj, string, ...theArgs) {
		obj = obj || {};

		const accessors = this.parseAccessors(string);

		accessors.reduce((acc, el, idx) => {
			acc = acc || {};
			if (acc[el] && idx !== accessors.length - 1) {
				return acc[el];
			} else if (idx === accessors.length - 1 && acc[el]) {
				if (typeof acc[el] === 'function') {
					acc[el](...theArgs);
				}
			}
		}, obj);
	},
};

module.exports = ns;
