// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');

  let state = [
    { id: -3, description: 'first todo' ,done: false},
    { id: -2, description: 'second todo', done: false},
    { id: -1, description: 'third todo',done: false },
  ]; // this is our initial todoList

  // This function takes a to do, it returns the DOM node representing that todo
  let createTodoNode = function(todo) {


    //----------------------------------------------------------------------------
    let todoNode = document.createElement('li');
    todoNode.classList.add("listItem");
    todoNode.setAttribute("draggable", "true");
    // you will need to use addEventListener
    // add classes for css


    // add markTodo button-------------------------------------------------------
    let markedCheckboxField = document.createElement("input");
    markedCheckboxField.type ="checkbox";
    markedCheckboxField.classList.add("listItemCheckBoxField");
    markedCheckboxField.checked = todo.done;
    markedCheckboxField.onchange = ()=>     {
      let newState = todoFunctions.editTask(state,todo.id,obj=>{
        obj.done = !obj.done;
      });
      update(newState);

    };

    todoNode.appendChild(markedCheckboxField);
    //todo add onClock behaviour


    // add  description-----------------------------------------------
    let descTextField = document.createElement("input");
    descTextField.type ="text";
    descTextField.classList.add("listItemTextField");
    descTextField.value = todo.description;
    descTextField.onchange = ()=>
    {
      let newState = todoFunctions.editTask(state,todo.id,obj=>{
        obj.description = descTextField.value;
      });
      update(newState);

    };
    todoNode.appendChild(descTextField);


    // this adds the delete button------------------------------------------------
    let deleteButtonNode = document.createElement('button');
    deleteButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    deleteButtonNode.classList.add("listItemDeleteButton");
    todoNode.appendChild(deleteButtonNode);


    //----------------------------------------------------------------------------

    return todoNode;
  };



  // bind create to do form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function(event) {
      event.preventDefault();

      let desTextFormElement = document.getElementsByName("description")[0];
      let newObj = {id: todoFunctions.generateId(), description: desTextFormElement.value, done:false};
      let newState = todoFunctions.addTodo(state,newObj);
      update(newState);

    });
  }

  // you should not need to change this function
  let update = function(newState) {
    state = newState;
    console.log(state);
    renderState(state);
  };

  // you do not need to change this function
  let renderState = function(state) {
    var todoListNode = document.createElement('ul');

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);

  //------------------------------------------------------
 /* let addTodoNode = function (){
      let form = document.createElement("form");

      let TextField = document.createElement("input");
      TextField.placeholder ="Add task...";
      TextField.classList.add("listItemTextField");
      TextField.oninput = ()=>
      {

      };
    var todoListNode = document.createElement('ul');
    todoListNode.appendChild(descTextField);

  }*/
  //------------------------------------------------------

})();

