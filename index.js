'use strict';

/**
 * identity: Designed to return a given parameter, unchanged.
 * @param {Value} a: The value to return
 * 
 * Return value: anything
 */
 const identity = a => a;
 module.exports.identity = identity;
 
 /**
  * typeOf: Designed to return the type of a given value as a String,
  * differentiating between Object, Array, and null.
  * @param {Value} value: The value whose type is returned.
  * 
  * Return value: String
  */
const typeOf = value => {
    if (typeof value === "object") {
        return value instanceof Array ? "array" : value === null ? "null" : "object";
    } else {
        return typeof value;
    }
};
module.exports.typeOf = typeOf;

/**
 * first: Returns a new Array contining a given number of elements of an Array, 
 * starting from index 0.
 * 
 * Syntax: first(array[, number])
 * 
 * @param {Array} array: The array from which elements are taken.
 * @param {Number} num: Must be integer. The number of elements to be taken.
 * If num is less than 1 or array is not an Array, returns an empty array. 
 * If num not given or not a number, returns the first element of array. 
 * If num is greater than the length of the array, returns the entire array. 
 * 
 * Return value: new Array
 */
const first = (array, number) => typeOf(array) !== "array" || number < 1 ? []
    : number === undefined || typeof number !== "number" ? array[0]
    : array.slice(0, number);
module.exports.first = first;
 
/**
 * last: Returns a new Array containing a given number of elements of an Array,
 * taken from the end.
 * 
 * Syntax: last(array[, number])
 * 
 * @param {Array} array: The array from which elements are taken.
 * @param {Number} num: Must be integer. The number of elements to be taken.
 * If num is less than 1 or array is not an Array, returns an empty array.
 * If num not given or not a number, returns the last element of array.
 * If num is greater than the length of the array, returns the entire array.
 * 
 * Return value: new Array
 */
const last = (array, number) => typeOf(array) !== "array" || number < 1 ? []
    : number === undefined || typeof number !== "number" ? array[array.length - 1]
    : number > array.length ? array
    : array.slice(array.length - number);
module.exports.last = last;

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection, with params (element[, index[, collection]])
 *      @param {Value} element: The element of collection being worked on.
 *      @param {Number} index: The index of the element in the collection
 *      being worked on, if collection is an Array, or key if collection is
 *      Object.
 *      @param {collection} collection: The collection passed into each().
 * 
 * Return value: undefined
 */
const each = (collection, action) => {
    if (typeOf(collection) === "array") {
        for (let i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (const key in collection) {
            action(collection[key], key, collection);
        }
    }
};
module.exports.each = each;

/**
 * indexOf: Returns the first index of a given value in an Array, else -1.
 * When value is found in Array, short circuits and returns the index.
 * 
 * Syntax: indexOf(array, value)
 * @param {Array} array: The Array being searched.
 * @param {Value} value: The value being searched for.
 * 
 * Return value: Number
 */
const indexOf = (array, value) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
};
module.exports.indexOf = indexOf;

/**
 * filter: Returns a new Array containing each element of a given Array that
 * passes a given test.
 * 
 * Syntax: filter(array, test(element[, index[, array]]))
 * @param {Array} array: The Array whose elements are being tested.
 * @param {Function} test: The Function to be applied to each element of array,
 * returning a bool.
 *      @param {Value} element: The element of array being worked on.
 *      @param {Number} index: The index of the element being worked on.
 *      @param {Array} array: The array passed into filter()
 * 
 * Return value: a new Array
 */
 
const filter = (array, test) => {
    const result = [];
    each(array, (element, index) => {
        if (test(element, index, array)) {
            result.push(element);
        }
    });
    return result;
};
module.exports.filter = filter;

/**
 * reject: Returns a new Array containing each element of a given Array that
 * does NOT pass a given test. Logical inverse of filter.
 * 
 * Syntax: reject(array, test(element[, index[, array]]))
 * @param {Array} array: The Array whose elements are being tested.
 * @param {Function} test: The Function to be applied to each element of array,
 * returning a bool.
 *      @param {Value} element: The element of array being worked on.
 *      @param {Number} index: The index of the element being worked on.
 *      @param {Array} array: The array passed into reject()
 * 
 * Return value: a new Array
 */
 
const reject = (array, test) => {
    return filter(array, (element, index, array) => !test(element, index, array));
};
module.exports.reject = reject;

/**
 * partition: Returns a new Array containing two Arrays: each element of the
 * given Array that passes a given test, and each element of the given Array
 * that does NOT pass a given test. Combination of filter and reject.
 * 
 * Syntax: partition(array, test(element[, index[, array]])
 * @param {Array} array: The Array whose elements are being tested.
 * @param {Function} test: The Function to be applied to each element of array,
 * returning a bool.
 *      @param {Value} element: The element of array being worked on.
 *      @param {Number} index: The index of the element being worked on.
 *      @param {Array} array: The array passed into reject()
 * 
 * Return value: a new Array
 */
 
 const partition = (array, test) => [filter(array, test), reject(array, test)];
 module.exports.partition = partition;
 
/**
 * unique: Takes an Array and returns a new Array with any duplicate entries
 * from the original Array removed.
 * 
 * Syntax: unique(array)
 * @param {Array} array: The Array whose duplicate entries are being filtered
 * out.
 * 
 * Return value: new Array
 */
  
const unique = array => 
    filter(array, (element, index) => 
    indexOf(array, element) === index);
module.exports.unique = unique;

/**
 * map: Performs a given function on each element of an Array.
 * 
 * Syntax: map(array, func(element[, index[, array]]))
 * @param {Array} array: The Array being worked on
 * @param {Function} func: The function performed on each element of array
 *      @param {Value} element: The element of array func is working on
 *      @param {Number} index: The index in array func is working on
 *      @param {Array} array: the Array passed into map.
 * 
 * Return value: new Array
 */
 
const map = (array, func) => {
    const result = [];
    each(array, (element, index) =>
        result.push(func(element, index, array)));
    return result;
};
module.exports.map = map;

/**
 * pluck: Designed to return an Array of every value associated with a given key
 * in an Array of Objects.
 * 
 * Syntax: pluck(array, prop)
 * @param {Array} array: an Array of Objects
 * @param {String} prop: a key present in each Object in array.
 * 
 * Return value: new Array
 */

const pluck = (array, prop) => map(array, (element) => element[prop]);
module.exports.pluck = pluck;

/**
 * contains: Tells us whether or not a given value is in an Array.
 * 
 * Syntax: contains(array, value)
 * @param {Array} array: Any Array
 * @param {Value} value: The value to check for in array.
 * 
 * Return value: bool
 */
 
const contains = (array, value) => indexOf(array, value) === -1 ? false : true;
module.exports.contains = contains;

/**
 * every: Tells us whether each value in a collection passes the given test.
 * Short circuits on first false value.
 * 
 * Syntax: every(collection[, test(element[, index[, collection]])])
 * @param {Array or Object} collection: Array or Object to be iterated through
 * @param {Function} test: Function that tests each element of collection and 
 * returns a truthy or falsy value. If no function given, default coerces
 * each value in collection to a bool.
 *      @param {Value} element: The element of collection being worked on
 *      @param {Number or String} index: If collection is Array, the index
 *      being worked on. If collection is Object, the key being worked on
 *      @param {Array or Object} collection: The collection passed into every
 * 
 * Return value: bool
 */
 
const every = (collection, test = element => !!element) => {
    if (typeOf(collection) === "array") {
        for (let i = 0; i < collection.length; i++) {
            if (!test(collection[i], i)) {
                return false;
            }
        }
    } else {
        for (const key of collection) {
            if (!test(collection[key], key)) {
                return false;
            }
        }
    }
    return true;
};
module.exports.every = every;

/**
 * some: Determines if any element in a given collection passes a given test.
 * On finding one element that passes, short-circuits.
 * 
 * Syntax: some(collection, [test(element[, index[, collection]])])
 * @param {Array or Object} collection: The Array or Object to be iterated
 * @param {Function} test: The function to be performed on each element in
 * collection, resulting in a truthy or falsy value. If no function provided,
 * default coerces each value in collection to a bool.
 *      @param {Value} element: The value in collection being worked on
 *      @param {Number or String} index: if collection is Array, the index
 *      being worked on. If collection is Object, the key being worked on.
 *      @param {Array or Object} collection: The collection passed into some
 * 
 * Return value: bool
 */
 
const some = (collection, test = element => !!element) => {
    if (typeOf(collection) === "array") {
        for (let i = 0; i < collection.length; i++) {
            if (test(collection[i], i)) {
                return true;
            }
        }
    } else {
        for (const key in collection) {
            if (test(collection[key], key)) {
                return true;
            }
        }
    }
    return false;
};
module.exports.some = some;

/**
 * reduce: Returns the cumulative result of a function called on both each
 * element of an Array and the result of the previous function call. The first
 * previous result is either the first element of the Array or a given "seed"
 * value.
 * 
 * Syntax: reduce(array, func(previousValue, element[, index])[, seed])
 * @param {Array} array: An Array to be acted on
 * @param {Function} func: A function working on each element in array
 *      @param {Value} previousValue: The result of the previous call of func,
 *      or "seed" if first time func is called, or array[0] if no seed given
 *      @param {Value} element: The element in array being worked on
 *      @param {Number} index: The index in array being worked on
 * @param {Value} seed: An initial "previousValue" for the first call of func.
 * If no seed is given, seed is set to array[0] and the first iteration of func
 * is skipped.
 * 
 * Return value: any value
 */
 
const reduce = (array, func, seed) => {
    let result;
    each(array, (element, index) => {
        if (seed === undefined) {
            seed = array[0];
            return;
        } else if(result === undefined) {
            result = func(seed, element, index);
        } else {
            result = func(result, element, index);
        }
    });
    return result;
};
module.exports.reduce = reduce;

/**
 * extend: Takes any number of Objects and copies each of their properties to
 * the first.
 * 
 * Syntax: extend(object1, [object2 ...objectN])
 * @param {Object} object1: An Object to which properties of the other Object
 * arguments are copied
 * @param {Object} ...objectN: Other Objects whose properties are copied to 
 * object1
 * 
 * Return value: Updated object1
 */
 
const extend = (object1, ...objectN) => {
    each(objectN, obj => {
        each(obj, (value, key) => {
            object1[key] = value;
        });
    });
    return object1;
};
module.exports.extend = extend;
