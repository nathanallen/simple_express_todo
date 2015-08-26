$(document).ready(function(){

  var $todo_list_container = $("#todo-list-container");

  var raw_todo_item_html = $("#todo-item-tmpl").html();
  var compileTodoItem = _.template(raw_todo_item_html);

  $.get("/todos", function renderTodos(response){
    response.data.forEach(function(todo){
      if ( !todo ) { return }; // todo is null
      var item_html = compileTodoItem(todo);
      $todo_list_container.append(item_html);
    })
  })

})
