// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function () {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');

  let state = [
    { id: -3, description: 'first todo', done: false },
    { id: -2, description: 'second todo', done: false },
    { id: -1, description: 'third todo', done: false },
  ]; // this is our initial todoList

  let arrayOfStates = [state];

  window.onkeydown = (event) => {
    if (event.keyCode === 90){
      undoLastStep()
    }

  };

  var disableUndo = false;

  let undoLastStep = function(){
      if(arrayOfStates.length === 1 || disableUndo) return;
      
      arrayOfStates.pop()
      state = arrayOfStates[arrayOfStates.length - 1]
      renderState(state)
  }

  // This function takes a todo, it returns the DOM node representing that todo
  let createTodoNode = function (todo) {


    //----------------------------------------------------------------------------
    let todoNode = document.createElement('li');
    todoNode.classList.add("listItem");
    enableDragAndDrop(todo, todoNode);
    // you will need to use addEventListener
    // add classes for css


    // add markTodo button-------------------------------------------------------
    let markedCheckboxField = document.createElement("input");
    markedCheckboxField.type = "checkbox";
    markedCheckboxField.classList.add("listItemCheckBoxField");
    markedCheckboxField.checked = todo.done;
    markedCheckboxField.onchange = () => {
      let newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    };

    todoNode.appendChild(markedCheckboxField);
    //todo add onClock behaviour


    // add  description-----------------------------------------------
    let descTextField = document.createElement("input");
    descTextField.type = "text";
    descTextField.classList.add("listItemTextField");
    descTextField.value = todo.description;

    descTextField.onchange = () => {
      let newState = todoFunctions.editTask(state, todo.id, obj => {
        obj.description = descTextField.value;
      });
      disableUndo = false;
      update(newState);
    }



    descTextField.onkeydown = (event) => {
      
      disableUndo = todo.description !== descTextField.value ;

      if (event.keyCode === 8 && descTextField.value === "") {

        descTextField.onchange = null;
        var newState = todoFunctions.deleteTodo(state, todo.id);
        update(newState);
      }
    };
    todoNode.appendChild(descTextField);


    // this adds the delete button------------------------------------------------
    let deleteButtonNode = document.createElement('button');

    deleteButtonNode.addEventListener('click', function (event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });

    deleteButtonNode.classList.add("listItemDeleteButton");
    todoNode.appendChild(deleteButtonNode);


    //----------------------------------------------------------------------------

    return todoNode;
  };


  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function (event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?
      event.preventDefault();
      let newTodo = {};
      newTodo.id = todoFunctions.generateId();
      newTodo.description = document.querySelector('[name="description"]').value;
      newTodo.done = false;
      document.querySelector('[name="description"]').value = "";

      let newState = todoFunctions.addTodo(state, newTodo)
      // hint: todoFunctions.addTodo
      update(newState);
    });
  }

  // you should not need to change this function
  let update = function (newState) {
    console.log("newState = ", newState)
    state = newState;
    arrayOfStates.push(state)
    console.log("jd array now: ", arrayOfStates)
    renderState(state);
  };

  // you do not need to change this function
  let renderState = function (state) {
    var todoListNode = document.createElement('ul');

    state.forEach(function (todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);

  //------------------------------------------------------
  function enableDragAndDrop(todo, todoNode) {
    todoNode.draggable = true;
    todoNode.setAttribute("data-task-id", todo.id);


    todoNode.ondragstart = (event) => {
      //store the dragged element id
      container.setAttribute("data-draggedItem", todo.id);
      console.log("drag start");

      //add a class to all the list items - to apply "pointer-events: none" for all the children
      Array.from(document.querySelectorAll(".listItem"))
        .forEach(e => {
          if (!e.classList.contains("allListItemsWhileDragging"))
            e.classList.add("allListItemsWhileDragging")
        });
    };

    todoNode.ondragover = (event) => {
      event.preventDefault();

      //add the class "over" to the elements underneath the dragged item
      with (event.target)
      if (container.hasAttribute("data-draggedItem") && hasAttribute("data-task-id"))
        if (container.getAttribute("data-draggedItem") !== getAttribute("data-task-id"))
          if (!classList.contains("draggedOver"))
            classList.add("draggedOver")
    };

    todoNode.ondragleave = (event) => {

      //remove the "draggedOver" class from all the elements that are no longer underneath the dragged item
      with (event.target.classList)
      if (contains("draggedOver"))
        remove("draggedOver")
    };
    todoNode.ondrop = (event) => {
      //remove the "draggedOver" class from dropped on element
      event.target.classList.remove("draggedOver");
      console.log("dropped");


      let id1 = parseInt(container.getAttribute("data-draggedItem"));
      let id2 = parseInt(event.target.getAttribute("data-task-id"));
      let newState = todoFunctions.swapTasks(state, id1, id2);
      update(newState);
    };

    todoNode.ondragend = (event) => {
      event.preventDefault();
      console.log("drag end");

      //remove the stored dragged element id
      container.removeAttribute("data-draggedItem");

      //remove a class from all the list items - that applies "pointer-events: none" for all their children
      Array.from(document.querySelectorAll(".listItem"))
        .forEach(e => e.classList.remove("allListItemsWhileDragging"));
    };

  }
  //------------------------------------------------------

})();

