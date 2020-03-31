var test = require('tape');
var logic = require('../scripts/logic');

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


test('Example test', function(t) {
  t.pass();
  t.end();
});

//add----------------------------------------------------------------------------
test('add a task to todo list []', function(t) {

  let expected = [task0];
  let actual = logic.addTodo([],task0);

  t.equal(expected[0],actual[0], "task[0] is equal to task[0]");
  t.end();
});
test('add a task to the todo list [task0]',function(t){

  let expected = [task0, task1];
  let actual=logic.addTodo([task0],task1);

  t.equal(expected[1],actual[1], "task[1] is equal to task[1]");
  t.end();
});
test('add two task to todo list []',function(t){
  let expected = [task0, task1];
  let actual= logic.addTodo(logic.addTodo([],task0),task1);

  t.equal(expected.length,actual.length, "tasks is equal to tasks");
  t.end();
});
test('add two task to todo list [task0]',function(t){
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
test('delete task0 from todo list [task0]',function(t){

  t.end();
});
test('delete task0 from todo list [task0,task1]',function(t){

  t.end();
});
test('delete task1 from todo list [task0,task1]',function(t){

  t.end();
});
test('delete task0 from todo list [task2]',function(t){

  t.end();
});
test('delete NULL from todo list [task0,task1]',function(t){

  t.end();
});
test('delete task0 from todo list NULL',function(t){

  t.end();
});

//mark---------------------------------------------------------------------------
test('mark task0 in todo list [task0]',function(t){

  t.end();
});
test('mark task0 in todo list [task0,task1]',function(t){

  t.end();
});
test('mark task0 in todo list [task2]',function(t){

  t.end();
});
test('mark NULL in todo list [task0,task1]',function(t){

  t.end();
});
test('mark task0 in todo list NULL',function(t){

  t.end();
});

//sort----------------------------------------------------------------------------
test('sort todo list by id',function(t){
 let before = [task1, task0];
 let after = [task0, task1];

 let sortFunc = (a,b)=> a.id - b.id;
 let actual = logic.sortTodos(before,sortFunc);

  t.deepEqual(before[0],task1);
  t.deepEqual(before[1],task0);

  t.deepEqual(after[0],actual[0]);
  t.deepEqual(after[1],actual[1]);


  t.end();
});
test('sort todo list by description',function(t){
  let before = [task1, task0];
  let after = [task0, task1];

  let sortFunc = (a,b)=>
      a.description.toLowerCase() < b.description.toLowerCase() ? -1 : 1 ;

  let actual = logic.sortTodos(before,sortFunc);

  t.deepEqual(before[0],task1);
  t.deepEqual(before[1],task0);

  t.deepEqual(after[0],actual[0]);
  t.deepEqual(after[1],actual[1]);

  t.end();
});
test('sort NULL todo list',function(t){
  let before;
  let after = [];

  let sortFunc = (a,b)=> a.id - b.id;

  let actual = logic.sortTodos(before,sortFunc);

  t.looseEqual(before,null);
  t.deepEqual(actual.length,after.length);

  t.end();
});
test('sort todo list by NULL',function(t){
  let before = [task0, task1];
  let after = [task0, task1];

  let sortFunc = null;
  let actual = logic.sortTodos(before,sortFunc);

  t.deepEqual(before[0],task1);
  t.deepEqual(before[1],task0);

  t.deepEqual(after[0],actual[0]);
  t.deepEqual(after[1],actual[1]);

  t.end();
});


