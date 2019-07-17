function get(obj, string) {
	obj = obj || {};
	const accessors = string.split(/\[|\]|\./).filter(el => !!el.length);

	const typed = accessors.map(el =>
		parseInt(el) || el === '0' ? parseInt(el) : el
	);

	return typed.reduce((acc, el, idx) => {
		let val;

		if (idx === typed.length - 1) {
			val = idx === 0 ? obj[el] : acc[el];
			return val;
		}

		val = idx === 0 ? obj[el] || {} : acc[el] || {};
		return val;
	}, {});
}

function set(obj, string, val) {
	obj = obj || {};
	const accessors = string.split(/\[|\]|\./).filter(el => !!el.length);

	const typed = accessors.map(el =>
		parseInt(el) || el === '0' ? parseInt(el) : el
	);

	return typed.reduce((acc, el, idx) => {
		acc = acc || {};
		if (acc[el] && idx !== typed.length - 1) {
			return acc[el];
		} else if (idx === typed.length - 1 && acc[el]) {
			acc[el] = val;
		}
	}, obj);
}

module.exports = { get, set };
