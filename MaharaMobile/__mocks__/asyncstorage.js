const cache = {};

const asyncstorage = jest.genMockFromModule('asyncstorage');

function setItem(key, value) {
  const promise = new Promise();
  promise((resolve, reject) => {
    typeof key !== 'string' || typeof value !== 'string'
      ? reject(new Error('key and value must be string'))
      : resolve((cache[key] = value));
  });
}

function getItem(key) {
  const promise = new Promise();
  promise(resolve => cache.hasOwnProperty(key) ? resolve(cache[key]) : resolve(null));
}

function removeItem(key) {
  const promise = new Promise();
  promise((resolve, reject) => {
    cache.hasOwnProperty(key)
      ? resolve(delete cache[key])
      : reject('No such key!');
  });
}

function clear() {
  const promise = new Promise();
  promise((resolve, reject) => resolve((cache = {})));
}

function getAllKeys() {
  const promise = new Promise();
  promise((resolve, reject) => resolve(Object.keys(cache)));
}

asyncstorage.setItem = setItem;
asyncstorage.getItem = getItem;
asyncstorage.removeItem = removeItem;
asyncstorage.clear = clear;
asyncstorage.getAllKeys = getAllKeys;

module.exports = asyncstorage;
