var $todo_list

var view = {};

$(document).ready(function(){

  $todo_list = $("#todo-list-container");

  var raw_item_html = $("#todo-item-tmpl").html();
  view.compileTodoItem = _.template(raw_item_html);

  $.get("/todos", function handleResponse(response){
    renderTodos(response.data);
  })

  $("form .create").on("click", function(event){
    event.preventDefault();
    var input = this;
    var $input = $(this);
    var $form = $input.parent();
    var form_params = $form.serialize();
    var action = $input.attr("formaction");
    $.post(action, form_params, function(){
      $input[0].parentNode.reset()
      newTodoFromForm(form_params); // MISSING ID, NEED SERVER RESPONSE
    });
  })

  $todo_list.on("click", ".update, .delete", function handleClick(event) {
    event.preventDefault();
    var $input = $(this);
    var $form = $input.parent();
    var form_params = $form.serialize();
    var action = $input.attr("formaction");

    $.post(action, form_params)
     .success(function(){
        if ( $input.hasClass("delete") ) {
          $form.remove();
        }
     })

  })


})


function newTodoFromForm(params) {
  var data = paramsToObject( params );
  data.completed = !!data.completed;
  data.id = null; // BAD THING
  renderTodos([data]);
}

function buildTodo(todo) {
  if ( !todo ) { return }; // todo is null
  return view.compileTodoItem(todo);
}

function renderTodos(data) {
  var $todos = data.map(buildTodo);
  $todo_list.append( $todos );
}

function paramsToObject(params_str) {
  var output = {};
  params_str.split("&").forEach(function(pair){
    var key_val = pair.split("=");
    var key = key_val[0]
    var val = key_val[1]
    output[key] = val;
  })
  return output;
}
