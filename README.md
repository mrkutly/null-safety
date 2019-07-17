# NullSafe

## A null safety utility for objects and nested arrays in Javascript

This package will allow you to safely access and set properties on nested objects and arrays with throwing everyone"s favorite error:
`"Cannot read property ___ of undefined"`

### To Install

1. install the package:
   `npm install null-check`

2. require it in your package:
   ```javascript
   const ns = require('@mrkutly/null-safe');
   ```

## To Use

**Note: in versions prior to 1.1.0, ns was just a getter function. In 1.1.0 and above, ns is an object with a get() function and a set() function.**

### Getting values

The ns.get() function takes in 2 arguments: the object you want to access and a string of accessors.

```javascript
ns.get(object, accessors);
```

For example:

```javascript
const butter = {
	milk: 'cow',
	colors: [['yellow'], 'white', 'cream'],
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

ns.get(butter, 'price.tax.state'); // = 1;
ns.get(butter, 'colors[0][0]'); // => "yellow";
ns.get(butter, 'some.null.value'); // => undefined;
```

The accessors you pass are just whatever accessors you would normally use in js assuming all of the values in the chain are not undefined or null.
If any of the values in the chain evaluate to undefined, ns.get() will return undefined rather than throwing an error.

If using a key with a "-", do not wrap it in quotes like you normally would. Instead just do this:

```javascript
ns.get(butter, 'info[date-churned]'); // => October 1st;
```

### Setting Values

The ns.get() function takes in 3 arguments: the object you want to access, a string of accessors, and the value you want to set the last accessor key to.

```javascript
const butter = {
	milk: 'cow',
	colors: [['yellow'], 'white', 'cream'],
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

ns.set(butter, 'price.tax.state', 'one billion dollars');
// => 'one billion dollars'
// butter.price.tax.state => "one billion dollars";
ns.set(butter, 'colors[0][0]', 'marigold');
// => "marigold";
// butter.colors[0][0] => "marigold";
ns.set(butter, 'some.null.value', 'something');
// => undefined
// => nothing happens;
```

The accessors you pass are just whatever accessors you would normally use in js assuming all of the values in the chain are not undefined or null.
If any of the values in the chain evaluate to undefined, ns.set() will return undefined and will not have a side effect on the object.

If using a key with a "-", do not wrap it in quotes like you normally would. Instead just do this:

```javascript
ns.set(butter, 'info[date-churned]', 'January 1st');
// => January 1st;
// butter.info["date-churned"] => "January 1st"
```
