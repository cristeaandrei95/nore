# Nore plugins

Writing a simple plugin:

```js
// myplugin.js
export default options => async nore => {
	const api = {
		async send(to, message) {
			// le code
		},
	};

	nore.plug("email", api);
};
```

The above example adds the following functionality:

```js
// index.js
import Nore from "@nore/nore";
import myplugin from "./myplugin.js";

const nore = new Nore({ plugins: [myplugin] });

nore.onReady.then(async () => {
	// now the API is available on the nore instance
	await nore.email.send("office@company.com", "...");
});
```

