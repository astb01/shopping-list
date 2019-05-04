# React Notes

To run server and client code together:

```javascript
npm i concurrently
```

To set up npm scripts to run from a folder:

```javascript
npm start --prefix client
```

Redux

Acronym: *C.A.R.S*

```text
Component -> Actions -> Reducer -> Store

i.e.
1. Hit click to add something
2. Pass something to the action
3. Pass the payload from the actions to the reducer
4. Retain it in the store.
```

```text
# react-redux: binds react to redux
# middleware: thunk (gives a way of dipatching asynchronously)
npm i redux react-redux redux-thunk
```

* Store set up: __store.js__.
* __Provider__ in App.js allows application to share state.