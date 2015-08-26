var express = require("express"),
    app = express();

var path = require("path"),
    views = path.join(process.cwd(), "views");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));


var todos = [
    {description: "Brush Teeth" , completed: false, id: 0},
    {description: "Take out Garbage" , completed: false, id: 1},
    {description: "Call Mom" , completed: false, id: 2}
];


app.get("/", function(req, res){
  var pathToHTML = path.join(views, "todo.html");
  res.sendFile( pathToHTML );
})

app.get("/todos", function index(req, res){
  res.send({ data: todos });
})

app.get("/todos/:id", function show(req, res){
  var id = req.params.id;
  var todo = todos[id];
  res.send({ data: [todo] });
})

app.post("/todos", function create(req, res){
  var new_todo = req.body;
  new_todo.id = todos.length; // TODO
  new_todo.completed = new_todo.completed || false;
  todos.push(new_todo); // TODO
  res.status(200);
  res.redirect("/");
})

app.put("/todos/:id", function update(req, res){
  var id = req.params.id;
  todos[id] = req.body; // TODO
  res.status(200);
  res.redirect("/");
})

app.delete("/todos/:id", function destroy(req, res){
  var id = req.params.id;
  todos.splice(id, 1); // TODO
  res.status(200);
  res.redirect("/");
})

app.listen(3000, function(){
  console.log("Server running at localhost:3000/");
})
