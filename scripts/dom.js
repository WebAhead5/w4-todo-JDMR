// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function () {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');

  let state = [
     { id: -3, description: 'drag me down there ↓↓↓↓↓', done: false },
     { id: -2, description: 'press ctrl + z', done: false },
    // { id: -1, description: 'third todo', done: false },
  ]; // this is our initial todoList


  // This function takes a todo, it returns the DOM node representing that todo
  let createTodoNode = function (todo) {


    //initiate li element--------------------------------------------------------
    let todoNode = document.createElement('li');
    todoNode.setAttribute("data-task-id", todo.id);
    todoNode.classList.add("listItem");
    
    //add drag and drop events---------------------------------------------------
    enableDragAndDrop(todo, todoNode);


    // add markTodo button-------------------------------------------------------
    function createCheckBoxElement(todo) {
      let markedCheckboxField = document.createElement("input");
      markedCheckboxField.type = "checkbox";
      markedCheckboxField.classList.add("listItemCheckBoxField");
      markedCheckboxField.classList.add("icon");
      markedCheckboxField.checked = todo.done;
      markedCheckboxField.setAttribute('aria-label', "the task's checkbox"); //for accessibility

      markedCheckboxField.onchange = () => {
        let newState = todoFunctions.markTodo(state, todo.id);
        newState = sortMe(newState);
        update(newState);
      };

      return markedCheckboxField;
    }
    todoNode.appendChild(createCheckBoxElement(todo));



    // add  description----------------------------------------------------------
    function createTextFieldElement(todo) {
      let descTextField = document.createElement("input");
      descTextField.type = "text";
      descTextField.classList.add("listItemTextField");
      descTextField.value = todo.description;
      descTextField.setAttribute('aria-label', "the task's description");//for accessibility


      descTextField.onchange = () => {
        let newState = todoFunctions.editTask(state, todo.id, obj => {
          obj.description = descTextField.value;
        });
        disableUndo = false;
        update(newState);
      };


      descTextField.onkeydown = (event) => {
        disableUndo = todo.description !== descTextField.value;
        if (event.keyCode === 8 && descTextField.value === "") {
          descTextField.onchange = null;
          let newState = todoFunctions.deleteTodo(state, todo.id);
          update(newState);
        }

      };


      return descTextField;
    }
    todoNode.appendChild(createTextFieldElement(todo));




    // this adds the delete button------------------------------------------------
    function CreateDeleteButton(todo) {
      let deleteButtonNode = document.createElement('button');
      deleteButtonNode.setAttribute('aria-label', "delete todo item button")
      deleteButtonNode.classList.add("listItemDeleteButton");
      deleteButtonNode.classList.add("icon");


      deleteButtonNode.addEventListener('click', function (event) {
        let newState = todoFunctions.deleteTodo(state, todo.id);
        update(newState);
      });
      return deleteButtonNode;
    }
    todoNode.appendChild(CreateDeleteButton(todo));



    //----------------------------------------------------------------------------

    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function (event) {

      event.preventDefault();
      let newTodo = {};
      newTodo.id = todoFunctions.generateId();
      newTodo.description = document.querySelector('[name="description"]').value;
      newTodo.done = false;
      document.querySelector('[name="description"]').value = "";

      let newState = todoFunctions.unshiftTodo(state, newTodo);

      update(newState);
    });
  }

  // you should not need to change this function
  let update = function (newState) {

    state = newState;

    arrayOfStates.push(state);

    renderState(state);
  };

  // you do not need to change this function
  let renderState = function (state) {

    updateEmptyStateElement(state);
    updateUndoButton();

    var todoListNode = document.createElement('ul');

    state.forEach(function (todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    container.replaceChild(todoListNode, container.firstChild);
  };


  //---------------------------------------------------------------------------------
  //////////////////////////////////////DRAG /////////////////////////////////////
  function enableDragAndDrop(todo, todoNode) {
    todoNode.draggable = true;


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

      newState = sortMe(newState);
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

  //////////////////////////////////////SORT /////////////////////////////////////
  let sortbyCheckedFunc = ( (a,b) =>{
    if (a.done === false && b.done === true) return -1;
    return 1;
  });
  function sortMe(state){
    console.log("state: ", state);
    return todoFunctions.sortTodos(state, sortbyCheckedFunc);
    //update(newState);

  }

  //////////////////////////////////////UNDO /////////////////////////////////////
  let arrayOfStates = [state];
  var disableUndo = false;

  function undoLastStep(){
    if(arrayOfStates.length === 1 || disableUndo)
      return;

    //remove last state
    arrayOfStates.pop();


    //load state
    state = arrayOfStates[arrayOfStates.length - 1];

    updateEmptyStateElement(state);


    renderState(state)
  }
  function onKeyDownCallback(event){
    if (event.keyCode === 90)
      undoLastStep();
  };

  window.addEventListener("keydown",onKeyDownCallback) ;

  //undo button-----------------------------------------------------------
  let undoElement = document.querySelector('input[name="undo"]');
  function AddGrayScaleToUndoButton() {
    if(!undoElement.classList.contains("grayscale"))
      undoElement.classList.add("grayscale");
  }
  function removeGrayScaleFromUndoButton() {
    if(undoElement.classList.contains("grayscale"))
      undoElement.classList.remove("grayscale");
  }
  undoElement.addEventListener("click",undoLastStep);
  function updateUndoButton(){
    if(arrayOfStates.length === 1)
      AddGrayScaleToUndoButton();
    else removeGrayScaleFromUndoButton()
  }

  //////////////////////////////////////EMPTY LIST COMMENT///////////////////////
  let emptyListElement = document.getElementById("emptyTodo");
  function hideEmptyListElement() {
    if(!emptyListElement.classList.contains("hidden"))
      emptyListElement.classList.add("hidden");
  }
  function showEmptyListElement() {
    if(emptyListElement.classList.contains("hidden"))
      emptyListElement.classList.remove("hidden");
  }
  function updateEmptyStateElement(state) {
    if(state.length === 0)
      showEmptyListElement();
    else hideEmptyListElement();
  }

  //////////////////////////////////////CLEAR CHECKED/////////////////////////////
   let settings = document.getElementById("settings");
  settings.onchange = ()=>{
      switch (settings.value) {
        case "clearChecked":
          OnClearDonSelected();
          break;

        default:
          return
      }

    settings.value = "default";
  }

  function OnClearDonSelected(){
    if(!state.some(task=>task.done))
      return;
    let newState = state;
    state.forEach(task=> {
      if(task.done)
        newState = todoFunctions.deleteTodo(newState,task.id);
    })
    update(newState);
  }


  //---------------------------------------------------------------------------------
  if (container) renderState(state);

})();

