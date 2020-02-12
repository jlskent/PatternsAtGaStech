# PatternsAtGaStech

### Tab

There are two tabs. One for car tracking visualization and one for transaction visualization. If you select car tracking tab, all transaction visualization will be hidden, and vice versa. 

Add `tracking-item` or `transaction-item` as a class to become a child of that tab.

### Usage

 `index.html` includes 4 js files directly.

* `d3.min.js`

* `main.js`: code for overall layout and drawing, like drawing the map, or control the tab switching.

  * It exports two variables `svg` and `projection`. If you are in other module want to append something to `svg` tag, you need to import `svg`

    * ```javascript
      import { svg } from './main.js';
      ```

* `transactions.js`: code for transactions data

* `tracking.js`: code for tracking car data



#### data module`loadData.js`

There is a `promise` called `dataPromise` in this file, it extract all data from `d3.load` asynchronously.

It exports an object, All keys in that object are functions that returns `promise`. 

To create a new data fetching function, ***important:*** you need to get that part of data from `dataPromise` and then return a `promise`:

```javascript
function yourFunction() {
	return dataPromise.then(data => {
		// process data
	}).catch(e => "no data fetched.")
}
```

If you want to export new function, just add it to the exported object, and import that object in other files.

```javascript
import dataAgent from './loadData.js';
const {yourFunction} = dataAgent;
```

