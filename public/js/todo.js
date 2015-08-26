$(document).ready(function(){

  var $todo_list = $("#todo-list-container");

  var raw_item_html = $("#todo-item-tmpl").html();
  var compileTodoItem = _.template(raw_item_html);

  $.get("/todos", function renderTodos(response){
    var todos = response.data.map(function(todo){
      if ( !todo ) { return }; // todo is null
      return compileTodoItem(todo);
    });
    $todo_list.append( todos.join("") );
  })

})
