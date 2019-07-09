# NullSafe

## A null safety utility for objects and nested arrays in Javascript

This package will allow you to safely access nested objects and arrays with throwing everyone's favorite error:
`"Cannot read property ___ of undefined"`

### To Install

1. install the package:
   `npm install @mrkutly/null-safe`

2. require it in your package:
   ```javascript
   const ns = require("@mrkutly/null-safe");
   ```

## To Use

The ns function takes in 2 arguments: the object you want to access and a string of accessors:

```javascript
ns(object, accessors);
```

For example:

```javascript
const butter = {
	milk: "cow",
	colors: [["yellow"], "white", "cream"],
	price: {
		denomination: "USD",
		amount: "200",
		tax: {
			state: "10",
			federal: "20",
		},
	},
};

ns(butter, "price.tax.state"); // => 10;
ns(butter, "colors[0][0]"); // => 'yellow';
ns(butter, "colors[0].not.real.value"); // => undefined;
```

The accessors you pass are just whatever accessors you would normally use in js assuming all of the values in the chain are not undefined or null.
If any of the values in the chain evaluate to undefined, ns will return undefined rather than throwing an error.
