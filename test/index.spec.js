var 
    expect = require('chai').expect,
    sinon = require('sinon'),
    lodown = require('../index'),
    customers = require('./fixtures/customers.json');

describe('lodown', function() {
    describe('identity', function() {
        it('should return any value given', function() {
            expect(lodown.identity(customers)).to.eql(customers);
            expect(lodown.identity(null)).to.be.null;
        });
    });
    describe('typeOf', function() {
        it('should return the type of the value', function() {
            expect(lodown.typeOf(135)).to.equal("number");
            expect(lodown.typeOf("hello")).to.equal("string");
            expect(lodown.typeOf()).to.equal('undefined');
            expect(lodown.typeOf(function() {})).to.equal("function");
        });
        it('should differentiate between array, object, and null', function() {
            expect(lodown.typeOf([])).to.equal("array");
            expect(lodown.typeOf({})).to.equal("object");
            expect(lodown.typeOf(null)).to.equal("null");
        });
    });
    describe('first', function() {
        it('should return a specified number of elements from an array, from the beginning', function() {
            expect(lodown.first(customers, 5)).to.eql(customers.slice(0, 5));
        });
        it('should return an empty array if array parameter is not Array', function() {
            expect(lodown.first('hello', 3)).to.eql([]);
        });
        it('should return an empty array if num parameter is less than 1', function() {
            expect(lodown.first(customers, -4)).to.eql([]);
        });
        it('should return the first element of the array if num not given', function() {
            expect(lodown.first(customers)).to.eql(customers[0]);
        });
        it('should return the first element of the array if num not Number', function() {
            expect(lodown.first(customers, 'hi')).to.eql(customers[0]);
        });
        it('should return the entire array if number is greater than length of array', function() {
            expect(lodown.first(customers, 5709831497)).to.eql(customers);
        });
    });
    describe('last', function() {
        it('should return a specified number of elements from an array, from the end', function() {
            expect(lodown.last(customers, 2)).to.eql(customers.slice(customers.length - 2));
        });
        it('should return an empty array if array parameter is not Array', function() {
            expect(lodown.last('hello', 3)).to.eql([]);
        });
        it('should return an empty array if num parameter is less than 1', function() {
            expect(lodown.last(customers, -4)).to.eql([]);
        });
        it('should return the last element of the array if num not given', function() {
            expect(lodown.last(customers)).to.eql(customers[customers.length - 1]);
        });
        it('should return the last element of the array if num not Number', function() {
            expect(lodown.last(customers, 'hi')).to.eql(customers[customers.length - 1]);
        });
        it('should return the entire array if number is greater than length of array', function() {
            expect(lodown.last(customers, 5709831497)).to.eql(customers);
        });
    });
    describe('each', function() {
        it('should iterate an Array, applying action to each element, index of the element, and the collection', function() {
            var action = sinon.spy();
            lodown.each(customers, action);
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index){
               expect(action.calledWith(customer, index, customers)).to.be.true;
            });
        });
   
        it('should iterate an Object, applying action for each value, key of value, and Object', function() {
            var action = sinon.spy();
            var customer = customers[0];
            lodown.each(customer, action);
            expect(action.callCount).to.equal(Object.keys(customer).length);
            for(var key in customer) {
              expect(action.calledWith(customer[key], key, customer)).to.be.true;
            }
        });
    });
    describe('indexOf', function() {
        it('should return the lowest index of a given value in an array', function() {
            expect(lodown.indexOf([3, 5, 1, 7, 2, 7, 654, 7, "hello"], 7)).to.equal(3);
        });
        it('should return -1 if value not in array', function() {
            expect(lodown.indexOf(customers, "I am a string")).to.equal(-1);
        });
    });
    describe('filter', function() {
        it('should return a new array containing only values that pass a test', function() {
            expect(lodown.filter(customers, customer => customer.gender === "female")).to.eql(customers.slice(0, 4));
        });
        it('should not produce side effects', function() {
            let newCustomers = customers.slice();
            lodown.filter(customers, c => c.gender === "male");
            expect(customers).to.eql(newCustomers);
        });
        it('should return an empty array if no values pass', function() {
            expect(lodown.filter(customers, customer => customer.index === 50402)).to.eql([]);
        });
    });
    describe('reject', function() {
        it('should return a new array containing only values that fail a test', function() {
            expect(lodown.reject(customers, customer => customer.gender === "male")).to.eql(customers.slice(0, 4).concat(customers[customers.length - 1]));
        });
        it('should not produce side effects', function() {
            let newCustomers = customers.slice();
            lodown.reject(customers, c => c.gender === "male");
            expect(customers).to.eql(newCustomers);
        });
        it('should return an empty array if all values pass', function() {
            expect(lodown.reject(customers, customer => customer.name !== 45)).to.eql([]);
        });
    });
    describe('partition', function() {
        it('should return an array of exactly two elements', function() {
            expect(lodown.partition(customers, customer => customer.index > 4).length).to.eql(2);
        });
        it('should return an array whose first element consists of values that pass a test', function() {
            expect(lodown.partition(customers, c => c.index > 4)[0]).to.eql(customers.slice(5));
        });
        it('should return an array whose second element consists of values that fail a test', function() {
            expect(lodown.partition(customers, c => c.index > 4)[1]).to.eql(customers.slice(0, 5));
        });
        it('should return an array whose contents encompass the entire input array', function() {
            let partitionResult = lodown.partition(customers, c => c.index > 4);
            expect(partitionResult[0].concat(partitionResult[1])).to.include.all.members(customers);
        });
        it('should not produce side effects', function() {
            let newCustomers = customers.slice();
            lodown.partition(customers, c => c.gender === "male");
            expect(customers).to.eql(newCustomers);
        });
    });
    describe('unique', function() {
        it('should return a new array that is a shallow copy of its input array with duplicate entries removed', function() {
            expect(lodown.unique([1, 1, 2, 2, 1, 2, 3, 3, 4, 3, 4, 4, 2, 3, 1, 5])).to.eql([1, 2, 3, 4, 5]);
        });
        it('should not result in side effects', function() {
            let array = [1, 3, 4, 4, 2, 3, 1, 5];
            lodown.unique(array);
            expect(array).to.eql([1, 3, 4, 4, 2, 3, 1, 5]);
        });
    });
    describe('map', function() {
        it('should return a new array consisting of the returns of a function called on each element of input array', function() {
            expect(lodown.map([1, 2, 3, 4], n => n + 1)).to.eql([2, 3, 4, 5]);
        });
        it('should call a function exactly once for each element of the array', function() {
            let action = sinon.spy();
            lodown.map(customers, action);
            expect(action.callCount).to.equal(customers.length);
        });
        it('should not result in side effects', function() {
            let newCustomers = customers.slice();
            lodown.map(customers, c => c.name = "Terry");
            expect(customers).to.eql(newCustomers);
        });
    });
    describe('pluck', function() {
        it('should return an array of every value associated with a given key in an array of objects', function() {
            expect(lodown.pluck(customers, 'index')).to.eql([0, 1, 2, 3, 4, 5, 6, 7]);
        });
        it('should not result in side effects', function() {
            let newCustomers = customers.slice();
            lodown.pluck(customers, 'name');
            expect(customers).to.eql(newCustomers);
        });
    });
    describe('contains', function() {
        it('should return true if the given value is in the array', function() {
            expect(lodown.contains([1, 2, 3, 4], 4)).to.be.true;
        });
        it('should return false if the given value is not in the array', function() {
            expect(lodown.contains([1, 2, 3, 4], 5)).to.be.false;
        });
    });
    describe('every', function() {
        it('should return true if every value passes test', function() {
            expect(lodown.every(customers, c => c.hasOwnProperty('name'))).to.be.true;
        });
        it('should return false if any value fails test', function() {
            expect(lodown.every([1, 2, 3, 'hi'], x => typeof x === "number")).to.be.false;
        });
        it('should short-circuit on the first failing test', function() {
            let test = sinon.spy(n => n > 3);
            lodown.every([5, 6, 7, 2, 5, 4], test);
            expect(test.callCount).to.equal(4);
        });
    });
    describe('some', function() {
        it('should return true if any value passes test', function() {
            expect(lodown.some(customers, c => c.index === 3)).to.be.true;
        });
        it('should return false if every value fails test', function() {
            expect(lodown.some(customers, c => c.name === 48)).to.be.false;
        });
        it('should short-circuit on the first passing test', function() {
            let test = sinon.spy(c => c.index > 3);
            lodown.some(customers, test);
            expect(test.callCount).to.equal(5);
        });
    });
    // TODO tests for lodown.reduce
    // describe('reduce', function() {
    //     it('should set seed to array[0] if seed is undefined', function() {
    //        
    //     });
    // });
    describe('extend', function() {
        it('should copy every property of each object after the first to the first', function() {
            let
                obj1 = {a: 'b', c: 'd'},
                obj2 = {b: 'c', d: 'e'},
                obj3 = {c: 'd', e: 'f'};
            expect(lodown.extend(obj1, obj2, obj3)).to.eql({a: 'b', b: 'c', c: 'd', d: 'e', e: 'f'});
        });
        it('should alter the first parameter given in place', function() {
            let
                obj1 = {a: 'b', c: 'd'},
                obj2 = {b: 'c', d: 'e'},
                obj3 = {c: 'd', e: 'f'};
            let newObj = lodown.extend(obj1, obj2, obj3);
            expect(newObj).to.eql(obj1);
        });
    });
});