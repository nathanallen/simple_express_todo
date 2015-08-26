var express = require("express"),
    app = express();

var path = require("path"),
    views = path.join(process.cwd(), "views");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

app.get("/", function(req, res){
  var pathToHTML = path.join(views, "todo.html");
  res.sendFile( pathToHTML );
})

app.get("/todos", function index(req, res){
  res.send({
              data: [
                      {description: "example1" , completed: false},
                      {description: "example2" , completed: false},
                      {description: "example3" , completed: false}
                    ]
           });
})

app.get("/todos/:id", function show(req, res){
  res.send( { data: [{description: "example" , completed: false}]} )
})

app.post("/todos", function create(req, res){
  res.status(200);
  res.redirect("/");
})

app.put("/todos/:id", function update(req, res){
  res.status(200);
  res.redirect("/");
})

app.delete("/todos/:id", function destroy(req, res){
  res.status(200);
  res.redirect("/");
})

app.listen(3000, function(){
  console.log("Server running at localhost:3000/");
})
