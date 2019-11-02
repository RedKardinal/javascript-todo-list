// console.log('js is ready');

$( document ).ready( onReady );

function onReady() {
    // console.log('jQ is go!');
    // getTasks and addButton
    getTasks(); 
    $( '#addButton' ).on('click', newTaskObject );
}

// --------- SET TASK ---------- //

function newTaskObject() {
    // console.log('addTaskListeners click!');
    // make sure input fields are entered.
    if ( document.getElementById( 'taskIn').value == '') {
      alert('Please enter all fields')
      return false;
    }
    else {
    //create object 
    let taskToSend = {
      task: $( '#taskIn' ).val(),
      note: $( '#notesIn' ).val(),
    };
    // send and empty
    addTask(taskToSend);
    $( '#taskIn' ).val('');
    $( '#notesIn' ).val('');
  }
}; // end addTaskListeners

// --------- DISPLAY DOM ---------- //

function displayDOM(tasks) {
  $('#taskDisplay').empty();
  // empty DOM and loop
  for (let i = 0; i < tasks.length; i += 1) {
    let task = tasks[i];
    // For each task, append a new row.
    if ( task.completed === false ) {
      let $be = $('<tr></tr>');
      $be.data('task', task);
      $be.append(`<td>${task.task}</td>`);
      $be.append(`<td>${task.completed}</td>`);
      $be.append(`<td><button class="update" data-id="${task.id}">Cross Off</button></td>`);
      $be.append(`<td><button class="deleteThis" data-id="${task.id}">Delete</button></td>`);
      $('#taskDisplay').append($be);
    } // end if
    else {
      let $be = $('<tr class="td"></tr>');
      $be.data('task', task);
      $be.append(`<td>${task.task}</td>`);
      $be.append(`<td>${task.completed}</td>`);
      $be.append(`<td><button class="update" data-id="${task.id}">Cross Off</button></td>`);
      $be.append(`<td><button class="deleteThis" data-id="${task.id}">Delete</button></td>`);
      $('#taskDisplay').append($be);  
    } // end else
  } // end forLoop
  $( '.deleteThis' ).on( 'click', deleteTask );
  $( '.update' ).on( 'click', updateTask );
} // displayDOM

// --------- GET --------- //

function getTasks(){
    // console.log( 'get Tasks - client' );
    // ajax call to server to get Tasks
    $.ajax({
      type: 'GET',
      url: '/toDoList'
    }).then(function (response){
    //   append Tasks
      displayDOM(response);
    }).catch(function(error){
      console.log('Error in GET client', error);
    })
}; // end getTasks

// --------- POST --------- //

function addTask( newTask ){
    // console.log( 'addTask client', newTask );
    // ajax POST to server to get Tasks
    $.ajax({
      type: 'POST',
      url: '/toDoList',
      data: newTask
    }).then( function (response) {
      getTasks();
    }).catch( function (error) {
      console.log('Error on the addTasks.client', error);
    })
}; // end addTask

// -------- PUT ---------- //

function updateTask() {
  // console.log('Update clicked!');
  let id = $(this).data('id')
  $( this ).parent().parent().addClass( 'td' );
  $.ajax({
    type: 'PUT',
    url: `/toDoList/${id}`,
  }).then(function (response) { 
    // console.log(response);
    getTasks();
    }).catch( function (error) {
    console.log('Error on PUT.clent', error);
  })
} // end PUT

// -------- DELETE --------- //

function deleteTask() {
  // console.log('deleted Task');
  let r = confirm('Are you sure you want to delete this task?')
  if (r == false) {
    return false;
  } else {
  let id = $(this).data('id');
  $.ajax({
    type: 'DELETE',
    url: `/toDoList/${id}`
  }).then(function (response) {
    // console.log('Delete response client.js', response);
    getTasks()
  }).catch( function (response) {
    console.log('Error on the delete.client', error)
  })
  }
}; // end DELETE

