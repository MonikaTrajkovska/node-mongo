const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://dev:DEV123!@cluster0-r2fa9.mongodb.net/costumer?retryWrites=true&w=majority",
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
const Costumer = mongoose.model(
  "costumer",
  new mongoose.Schema(
    {
      first_name: String,
      surname: String,
      country: String,
      city: String,
      email: String,
      profession: String,
      cars: [
        {
          model: String,
          year: Number,
          price: Number
        },
        {
          model: String,
          year: Number,
          price: Number
        }
      ],
      bought: Date
    },
    {
      collection: "costumers"
    }
  )
);
var c = new Costumer({
  first_name: "Steve",
  surname: "Jones",
  country: "France",
  city: "Paris",
  email: "steve@yahoo.com",
  profession: "banking",
  cars: [
    {
      model: "Bentley",
      year: 1973,
      price: 1000000
    },
    {
      model: "Reneo",
      year: 1955,
      price: 25000
    }
  ],
  bought: new Date("1998-11-11T20:00:00Z")
});
//   c.save(err => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("save successfully");
//   });
var co = new Costumer({
  first_name: "Paul",
  surname: "Kill",
  country: "Macedonia",
  city: "Skopje",
  email: "paulkill@yahoo.com",
  profession: "finance",
  cars: [
    {
      model: "Seat Leon",
      year: 1999,
      price: 10000
    },
    {
      model: "Opel Corsa",
      year: 1990,
      price: 1500
    }
  ],
  bought: new Date("2011-11-11T20:00:00Z")
});
// co.save(err => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("save successfully");
// });
Costumer.find({ city: "Skopje", "cars.model": "Seat Leon" }, (err, data) => {
  if (err) {
    console.log("could not read data");
    return;
  }

  data.forEach((c, i) => {
    console.log(c.first_name, " ", c.surname, " ", c.email);
  });
});
