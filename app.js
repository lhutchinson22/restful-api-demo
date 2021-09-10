const Joi = require("joi");
const express = require("express");
const app = express();
//middleware
app.use(express.json());

const courses = [
  { id: 1, name: "Spanish" },
  { id: 2, name: "Economics" },
  { id: 3, name: "Accounting" }
];

// ROUTES - path, and a callbac function
app.get("/", (req, res) => {
  res.send("Hello World");
});

// get all courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// create a course
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/course/:id", (req, res) => {
  //Look up the course
  // if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course with given ID was not found");

  // Validate
  // if invalid return 400 - bad request
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  //Update course
  //return updated course
  course.name = req.body.name;
  res.send(course);
});

const validateCourse = course => {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
};

//get one course
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course with given ID was not found");
  res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
