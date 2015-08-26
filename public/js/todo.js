function TodoView(selectors) {
  var that = this; // capture scope

  // selectors
  var $todo_list = $(selectors.todo_list);
  var $todo_create_btn = $(selectors.todo_create_btn);

  // underscore template
  var $todo_item_tmpl = $(selectors.todo_item_tmpl);
  var compileTodoItem = _.template( $todo_item_tmpl.html() )

  this.bindListeners = function bindListeners(){

      $todo_create_btn.on("click", function handleCreate(event){
          event.preventDefault();
          var $input = $(this);
          var $form = $input.parent();
          var form_params = $form.serialize();
          var action = $input.attr("formaction");

          $.post(action, form_params).
            success(function(response){
              $input[0].parentNode.reset(); // clear form fields
              that.render(response.data);
            }).
            error(function(){
              alert("Sorry, an error occured on create");
            });

      });

      $todo_list.on("click", ".update, .delete", function handleUpdateDestroy(event) {
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

  }

  this.render = function render(data) {
    var $todos = data.map(function buildTodo(todo) {
      if ( !todo ) { return }; // todo is null
      return compileTodoItem(todo);
    });
    $todo_list.append( $todos );
  }

}

$(document).ready(function(){

  var view = new TodoView({
    todo_list: "#todo-list-container",
    todo_create_btn: "form .create",
    todo_item_tmpl: "#todo-item-tmpl"
  })

  view.bindListeners();

  $.get("/todos", function handleResponse(response){
    view.render(response.data);
  })

});
