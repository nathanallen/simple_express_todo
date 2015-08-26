var view = {
  renderTodos: function renderTodos(data) {
    var $todos = data.map(function buildTodo(todo) {
      if ( !todo ) { return }; // todo is null
      return view.compileTodoItem(todo);
    });
    this.$todo_list.append( $todos );
  }
};

$(document).ready(function(){

  view.$todo_list = $("#todo-list-container");
  view.$todo_create_btn = $("form .create");
  view.compileTodoItem = _.template( $("#todo-item-tmpl").html() );

  $.get("/todos", function handleResponse(response){
    view.renderTodos(response.data);
  })

  view.$todo_create_btn.on("click", function handleCreate(event){
    event.preventDefault();
    var $input = $(this);
    var $form = $input.parent();
    var form_params = $form.serialize();
    var action = $input.attr("formaction");

    $.post(action, form_params).
      success(function(response){
        $input[0].parentNode.reset(); // clear form fields
        view.renderTodos(response.data);
      }).
      error(function(){
        alert("Sorry, an error occured on create");
      });

  })

  view.$todo_list.on("click", ".update, .delete", function handleUpdateDestroy(event) {
    event.preventDefault();
    var $input = $(this);
    var $form = $input.parent();
    var form_params = $form.serialize();
    var action = $input.attr("formaction");

    $.post(action, form_params).
      success(function(){
        if ( $input.hasClass("delete") ) {
          $form.remove();
        } else {
          // do nothing on update
        }
      }).
      error(function(){
        alert("Sorry, an error occured on update/delete");
      });

  });


});
