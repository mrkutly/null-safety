function ns(obj, string) {
	const arr = string.split(/\[|\]|\./);
	const cleaned = arr.filter(el => !!el.length);

	const mapped = cleaned.map(el => {
		if (el === '0') return 0;
		if (parseInt(el)) return parseInt(el);
		return el;
	});

	return mapped.reduce((acc, el, idx) => {
		let val;
		if (idx === mapped.length - 1) {
			val = idx === 0 ? obj[el] : acc[el];
			return val;
		}
		if (typeof mapped[idx + 1] === 'number') {
			val = idx === 0 ? obj[el] || [] : acc[el] || [];
		} else {
			val = idx === 0 ? obj[el] || {} : acc[el] || {};
		}
		return val;
	}, {});
}

module.exports = ns;
