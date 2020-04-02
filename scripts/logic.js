

var todoFunctions = {


  generateId: (function () {
    var idCounter = 0;

    function incrementCounter() {
      return (idCounter += 1);
    }

    return incrementCounter;
  })(),


  cloneArrayOfObjects: function (todos) {
    return todos.map(function (todo) {
      return JSON.parse(JSON.stringify(todo));
    });
  },


  addTodo: function (todos, newTodo) {

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

    if (!todos) return [];
    return todos.filter(todoObj => todoObj.id !== idToDelete);
  },
  markTodo: function (todos, idToMark) {

    if (!todos)
      return [];

    return todoFunctions.cloneArrayOfObjects(todos).map((task) => {
        if(task.id === idToMark)
          task.done = !task.done;
        return task;
    });


  },
  sortTodos: function (todos, sortFunction) {

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
  },
  unshiftTodo: function (todos, newTodo) {

    if (!todos) {
      console.warn("an undefined todos-list was provided ");
      return [newTodo];
    }

    if (!newTodo)
      return todoFunctions.cloneArrayOfObjects(todos);

    return [newTodo].concat(todoFunctions.cloneArrayOfObjects(todos));

  },

};


if (typeof module !== 'undefined') {
  module.exports = todoFunctions;
}

