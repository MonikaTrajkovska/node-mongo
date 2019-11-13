const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://dev:DEV123!@cluster0-r2fa9.mongodb.net/school?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(res => {
    // console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
const Student = mongoose.model(
  "student",
  new mongoose.Schema(
    {
      first_name: String,
      last_name: String,
      average_grade: Number,
      email: String,
      courses: [String],
      birthday: Date
    },
    {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
      collection: "students"
    }
  )
);
var s = new Student({
  first_name: "Monika",
  last_name: "Trajkovska",
  average_grade: 4.5,
  email: "monika@trajkovska.mk",
  courses: ["kibernetika", "science"],
  birthday: new Date("1990-11-11T20:00:00Z")
});
s.save(err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("save successfully");
});
