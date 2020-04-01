// Part 1. Fill in any missing parts of the todoFunction object!
// you can access these on todo.todoFunctions
// For part one we expect you to use tdd

var todoFunctions = {
  // todoFunctions.generateId() will give you a unique id
  // You do not need to understand the implementation of this function.
  generateId: (function () {
    var idCounter = 0;

    function incrementCounter() {
      return (idCounter += 1);
    }

    return incrementCounter;
  })(),


  //cloneArrayOfObjects will create a copy of the todos array 
  //changes to the new array don't affect the original
  cloneArrayOfObjects: function (todos) {
    return todos.map(function (todo) {
      return JSON.parse(JSON.stringify(todo));
    });
    // return [...todos];
  },


  addTodo: function (todos, newTodo) {
    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    // returns a new array, it should contain todos with the newTodo added to the end.
    // add an id to the newTodo. You can use the generateId function to create an id.
    // hint: array.concat
    if (!todos) {
      console.warn("an undefined todos-list was provided ");
      return [newTodo];
    }

    if (!newTodo)
      return todoFunctions.cloneArrayOfObjects(todos);

    return todoFunctions.cloneArrayOfObjects(todos).concat([newTodo]);
    // return [...todos,newTodo]

  },
  deleteTodo: function (todos, idToDelete) {
    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    // return a new array, this should not contain any todo with an id of idToDelete
    // hint: array.filter
    if (!todos) return [];
    return todos.filter(todoObj => todoObj.id !== idToDelete);
  },

  markTodo: function (todos, idToMark) {

    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    // in the new todo array, all elements will remain unchanged except the one with id: idToMark
    // this element will have its done value toggled
    // hint: array.map
    if (!todos)
      return [];

    return todos.map((x) => {
      let retVal = x;
      if (retVal.id === idToMark) {
        retVal = {...x};
        retVal.done = !retVal.done;
      }
      return retVal;
    });

    // let clonedArr = todoFunctions.cloneArrayOfObjects(todos);
    // let index = clonedArr.findIndex(e=>e.id === idToMark);
    // if(index !== -1)
    //   clonedArr[index].done = !clonedArr[index].done;
    //
    // return clonedArr;

  },

  sortTodos: function (todos, sortFunction) {
    // stretch goal! Do this last
    // should leave the input arguement todos unchanged (you can use cloneArrayOfObjects)
    // sortFunction will have same signature as the sort function in array.sort
    // hint: array.slice, array.sort
    if (!todos)
      return [];

    if (!sortFunction)
      return todoFunctions.cloneArrayOfObjects(todos);


    let cloneTodo = todoFunctions.cloneArrayOfObjects(todos);
    cloneTodo.sort(sortFunction);
    return cloneTodo;
  },


  editTask: function (todos, id, funcToApply) {

    let arrClone;

    if (!todos)
      arrClone = [];

    else arrClone = todoFunctions.cloneArrayOfObjects(todos);


    if (funcToApply && arrClone.some(x => x.id === id)) {
      let index = arrClone.findIndex(x => x.id === id);
      funcToApply(arrClone[index]);
    }


    return arrClone;
  },

  swapTasks: function (todos, id1, id2) {
    if (!todos)
      return [];

    let newArr = todoFunctions.cloneArrayOfObjects(todos);
    let index1 = todos.findIndex(t => t.id === id1);
    let index2 = todos.findIndex(t => t.id === id2);

    if (index1 !== -1 && index2 !== -1 || index1 !== index2) {
      let temp = newArr[index1];
      newArr[index1] = newArr[index2];
      newArr[index2] = temp;
    }

    return newArr;
  }
};


// Why is this if statement necessary?
// The answer has something to do with needing to run code both in the browser and in Node.js
// See this article for more details: 
// http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== 'undefined') {
  module.exports = todoFunctions;
}

