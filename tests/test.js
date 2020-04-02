var test = require('tape');
var logic = require('../scripts/logic');

function getTasks(){
  let task0 ={
    id: 0,
    description: 'some task to do 1',
    done: true,
  };
  let task1 ={
    id: 1,
    description: 'some task to do 2',
    done: true,
  };
  let task2 ={
    id: 2,
    description: 'some task to do 3',
    done: true,
  };

  return{task0,task1,task2}
}


test('Example test', function(t) {
  t.pass();
  t.end();
});

//add----------------------------------------------------------------------------
test('add a task to todo list []', function(t) {
  let {task0} = getTasks();

  let expected = [task0];
  let actual = logic.addTodo([],task0);

  t.equal(expected[0],actual[0], "task[0] is equal to task[0]");
  t.end();
});
test('add a task to the todo list [task0]',function(t){
  let {task0,task1} = getTasks();

  let expected = [task0, task1];
  let actual=logic.addTodo([task0],task1);

  t.equal(expected[1],actual[1], "task[1] is equal to task[1]");
  t.end();
});
test('add two task to todo list []',function(t){
  let {task0,task1} = getTasks();

  let expected = [task0, task1];
  let actual= logic.addTodo(logic.addTodo([],task0),task1);

  t.equal(expected.length,actual.length, "tasks is equal to tasks");
  t.end();
});
test('add two task to todo list [task0]',function(t){

  let {task0,task1,task2} = getTasks();

  let expected = [task0, task1,task2];
  let actual= logic.addTodo(logic.addTodo([task0],task1),task2);

  t.equal(expected.length,actual.length, "tasks is equal to tasks");
  t.end();
});
test('add NULL to the todo list []',function(t){
  let expected = [];
  let actual= logic.addTodo([],null);

  t.equal(expected.length,actual.length, "tasks is equal to tasks");
  t.end();
});
test('add task to the todo list NULL',function(t){
  let expected = [];
  let actual= logic.addTodo([],null);

  t.equal(expected.length,actual.length, "tasks is equal to tasks");
  t.end();
});

//delete-------------------------------------------------------------------------
test('delete task0 from todo list of 1 [task0]',function(t){
  let {task0} = getTasks();

  let initialArr = [task0];

  let actual = logic.deleteTodo(initialArr, 0);

  t.equal(initialArr.length-1, actual.length, 'deleting task0 returns an empty array')
  t.end();
});

test('delete task0 from todo list of 2 [task0,task1]',function(t){
  let {task0,task1} = getTasks();

  let initialArr = [task0, task1]

  let actual = logic.deleteTodo(initialArr, 1)

  t.equal(initialArr[0], actual[0], 'deleting task1 returns an array with only task0')
  t.end();
});
test('delete task0 from todo list [task0,task1]',function(t){
  let {task0,task1} = getTasks();

  let initialArr = [task0, task1]

  let actual = logic.deleteTodo(initialArr, 0)

  t.equal(initialArr[1], actual[0], 'deleting task1 returns an array with only task0')
  t.end();
});
test('delete task0 from todo list [task2]',function(t){

  let { task2 : task2} = getTasks();

  let initialArr = [task2];

  let actual = logic.deleteTodo(initialArr, 0)

  t.equal(JSON.stringify(initialArr), JSON.stringify(actual), 'deleting non-existant task has no effect')
  t.end();

});
test('delete NULL from todo list [task0,task1]',function(t){

  let { task0 , task1} = getTasks();

  let initialArr = [task0, task1]

  let actual = logic.deleteTodo(initialArr, null)

  t.equal(JSON.stringify(initialArr), JSON.stringify(actual), "delete NULL from the todo list has no effect")
  t.end();
});
test('delete task0 from todo list NULL',function(t){

  let result = logic.deleteTodo(null,0);

  t.deepEqual([], result, "removing an object from null should return null")
  t.end();
});

//mark---------------------------------------------------------------------------
test('mark task0 in todo list [task0]',function(t){
  let {task0} = getTasks();

  let todos = [task0];
  let idToMark = 0;
  // initially they were true

  let result = logic.markTodo(todos, idToMark);

  t.equals(todos[idToMark].done, !result[idToMark].done, "done should return true if it was false" )
  t.end();
});
test('mark task1 in todo list [task0,task1]',function(t){
  let {task0,task1} = getTasks();

  let todos = [task0,task1];
  let idToMark = 1;
  // initially they were true

  let result = logic.markTodo(todos, idToMark);

  t.equals(todos[idToMark].done, !result[idToMark].done, "done should return true if it was false" )
  t.end();
});
test('mark task0 in todo list [task2]',function(t){
  let {task2: task2} = getTasks();

  let todos = [task2];
  let idToMark = 0;
  // initially they were true

  let result = logic.markTodo(todos, idToMark);

  t.equals(todos[0].done, result[0].done, "done should return true if it was false" )
  t.end();
});
test('mark NULL in todo list [task0]',function(t){
  let {task0} = getTasks();

  let todos = [task0];
  let idToMark;
  // initially they were true

  let result = logic.markTodo(todos, idToMark);

  t.equals(todos[0].done, result[0].done, "done should return true if it was false" )
  t.end();
});
test('mark id 0 in todo list NULL',function(t){

  let todos;
  let idToMark = 0;

  let result = logic.markTodo(todos, idToMark);

  t.equals(0, result.length, "done should return true if it was false" )
  t.end();
});

//sort----------------------------------------------------------------------------
test('sort todo list by id',function(t){
  let {task0,task1} = getTasks();

  let before = [task1, task0];
  let passedBefore=before.map(x=>x);
 let expected = [task0, task1];

 let sortFunc = (a,b)=> a.id - b.id;
 let actual = logic.sortTodos(passedBefore,sortFunc);


  t.deepEqual(expected,actual, "expected equals after");
  t.deepEqual(before,passedBefore,"the original array wasn't modified");


  t.end();
});
test('sort todo list by description',function(t){


  let {task0,task1} = getTasks();

  let before = [task1, task0];
  let passedBefore=before.map(x=>x);
  let expected = [task0, task1];

  let sortFunc = (a,b)=>
      a.description.toLowerCase() < b.description.toLowerCase() ? -1 : 1 ;

  let actual = logic.sortTodos(passedBefore,sortFunc);

  t.deepEqual(expected,actual, "expected equals after");
  t.deepEqual(before,passedBefore,"the original array wasn't modified");

  t.end();

});
test('sort NULL-todo list',function(t){


  let sortFunc = (a,b)=>
      a.description.toLowerCase() < b.description.toLowerCase() ? -1 : 1 ;

  let expected = [];
  let actual = logic.sortTodos([],sortFunc);

  t.deepEqual(expected,actual, "expected equals after");

  t.end();
});
test('sort todo list by NULL',function(t){
  let {task0,task1} = getTasks();

  let before = [task1, task0];
  let passedBefore= before.map(x=>x);
  let expected = [task1, task0];

  let sortFunc;

  let actual = logic.sortTodos(passedBefore,sortFunc);

  t.deepEqual(expected,actual, "expected equals after");
  t.deepEqual(before,passedBefore,"the original array wasn't modified");

  t.end();
});


//////////////////////////////////////////////////SWAP////////////////////////////////////


test('Does swap function exist?', function(t) {

  t.deepEqual('function',typeof logic.swapTasks,"Does the swap function exist?");
  t.end();
})

test('What if the state is not an array of objects?', function(t) {

  let result = logic.swapTasks("here's a string", 1, 2)
  let errorMessage = "expecting object but got other. Can't swapTasks"
  
  t.deepEqual(errorMessage,result,'What if the state is not an array of objects?');
  t.end();
})

test('What if integers are not provided as arguments 2 and 3?', function(t) {
  let {task0,task1,task3} = getTasks();
  let state = [task0,task1,task3];

  let result = logic.swapTasks(state, "string1", "string2")
  let errorMessage = "expecting integers but got other. Can't swapTasks"
  
  t.deepEqual(errorMessage,result,'What if integers are not provided as arguments 2 and 3?');
  t.end();
})

test('Swap item[0] with item[1]', function(t) {

  let {task0,task1,task3} = getTasks();
  let state = [task0,task1,task3];

  let result = logic.swapTasks(state, -3, -2)
  console.log(result)

  t.deepEqual(state[0],result[1],'Swap item[0] with item[1]');
  t.end();
})

test('Swap an item that does not exist', function(t) {
  let result;
  let errorMessage;
  let state = [...getTasks()];


    result = logic.swapTasks(state, -3, -4)
    errorMessage = "one of the ids provided does not exist in state";

    t.deepEqual(state,result,'Swap an item that does not exist');
    t.end();
})
















