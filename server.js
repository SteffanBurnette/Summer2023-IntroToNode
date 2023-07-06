const shapes=[{
    id:1,
    shape:"Square",
    color:"Red",
    angle:25

},{
    id:2,
    shape:"Rectangle",
    color:"Blue",
    angle:45

},{
    id:3,
    shape:"Circle",
    color:"Yellow",
    angle:90

},{
    id:4,
    shape:"Triangle",
    color:"Green",
    angle:180

},

]

//Lets us set up an express app
//This is an express object
const express = require("express");

//Allows us to use express features
const app = express();
const port = 7000;

app.use(express.json()) // this allows us to send JSON formatted bodies in our requests

//Sets the id since im not using a database yet
function getNextIdFromCollection(collection) {
    if(collection.length === 0) return 1; 
    const lastRecord = collection[collection.length - 1];
    return lastRecord.id + 1;
  }

//The main page on the api server
app.get("/", (req, res) => {
    res.send("Welcome to the 'shapes' api.")

})

//The CRUD
// List all shapes objects
//
app.get("/shapes",(req, res) => {
    // This will eventually return a list of all shapes
    //Displays the shapes element on the server
    res.send(shapes);
});


// Create a new shape
app.post("/shapes", (req, res) => {
    // This will eventually create a new job
   const newShape = {
    ...req.body,
    id: getNextIdFromCollection(shapes)
  };
  console.log("newShape", newShape);
  shapes.push(newShape);
  //Returns the 201 status code when the job is created
  res.status(201).send(newShape);

});


// Get a specific shape by using a params variable
app.get("/shapes/:id", (req, res) => {
    // This will eventually return a specific job
    //Sets shapeId to the specified job on teh page
    //Note that this is a request
    const shapeId = parseInt(req.params.id, 10);
    //Gets the shape with the id that match shapeId which is the shape the user choose
    const getshape = shapes.find((shape) => shape.id === shapeId);
    //Displays the specified shape on the page
    //Note that this is a response
    //If the request is not found the staus code will trigger
    if (getshape) {
        res.send(getshape);
      } else {
        res.status(404).send({ message: "Shape not found" });
      }
});



// Update a specific shape
app.patch("/shapes/:id", (req, res) => {
    // This will eventually update a specific shape
    const shapeId = parseInt(req.params.id, 10); //Gets the id from the url
  const shapeUpdates = req.body; //Gets the body
  const shapeIndex = shapes.findIndex(shape => shape.id === shapeId); //Find the index of the shape by locating its id
  if (shapeIndex !== -1) {

    //Set the value of the shape to be updated
  const originalShape=shapes[shapeIndex];
  //Updates the shape
  const updatedShape = { ...originalShape, ...shapeUpdates };
  shapes[shapeIndex] = updatedShape;
  console.log("updatedShape", updatedShape);
  res.send(updatedShape);
}
 else {
    res.status(404).send({ message: "Shape not found" });
  }
});


// Delete a specific job
app.delete("/shapes/:id", (req, res) => {
    // This will eventually delete a specific job
    const shapeId = parseInt(req.params.id, 10);
  const shapeIndex = shapes.findIndex(shape => shape.id === shapeId); //Finds the index of the specified shape
  if (shapeIndex !== -1) {
    shapes.splice(shapeIndex, 1); //Deletes the specified shape
    res.status(204).send();
  } else {
    res.status(404).send({ message: "Shape not found" });
  }
});



//Outputs in the console the server that 'app' is running on.
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})