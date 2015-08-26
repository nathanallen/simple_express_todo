var express = require("express"),
    app = express();

var path = require("path"),
    views = path.join(process.cwd(), "views");

// allow forms to use PUT & DELETE -- requires query parameter: ?_method=DELETE
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

// parse the body of POST requests / forms
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

// DATA
var todos = [
    {description: "Brush Teeth" , completed: false, id: 0},
    {description: "Take out Garbage" , completed: false, id: 1},
    {description: "Call Mom" , completed: false, id: 2}
];

// HELPER
var PARAM_WHITE_LIST = ["description", "completed", "id"];

function safeParams(obj){
  var output = {};
  for( key in obj ){
    if ( PARAM_WHITE_LIST.indexOf(key) !== -1 ) {
      output[key] = obj[key];
    }
  }
  return output;
}

// ROUTES & CONTROLLERS

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
  var todo = safeParams(req.body);
  todo.id = todos.length;
  todo.completed = !!todo.completed;
  todos.push(todo);
  if (req.xhr) {
    res.send({ data: [todo] });
  } else {
    res.redirect("/");
  }
})

app.put("/todos/:id", function update(req, res){
  var id = req.params.id;
  var todo = todos[id]
  var updated = safeParams(req.body);
  for( key in updated  ){
    todo[key] = updated[key];
  }
  if (req.xhr) {
    res.send(todo);
  } else {
    res.redirect("/");
  }
})

app.delete("/todos/:id", function destroy(req, res){
  var id = req.params.id;
  todos[id] = null;
  if (req.xhr) {
    res.sendStatus(200);
  } else {
    res.redirect("/");
  }
})

app.listen(3000, function(){
  console.log("Server running at localhost:3000/");
})
