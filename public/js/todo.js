$(document).ready(function(){

  $.get("/todos", function renderTodos(response){
    response.data.forEach(function(todo){
      // render todo
    })
  })

})
