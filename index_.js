const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://dev:DEV123!@cluster0-r2fa9.mongodb.net/videoteka?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

// const Filmovi = mongoose.model(
//   "filmovi",
//   new mongoose.Schema(
//     {
//       ime: String,
//       godina: Date,
//       zanr: [String],
//       rezija: String,
//       oscar: Boolean,
//       akteri: [String]
//     },
//     {
//       collection: "filmovi"
//     }
//   )
// );
// var f = new Filmovi({
//   ime: "AAA",
//   godina: new Date("2019-11-11T19:30:00Z"),
//   zanr: ["bb"],
//   rezija: "Test test",
//   oscar: false,
//   akteri: ["AA BB"]
// });

// f.save(err => {
//   if (err) {
//     console.log("could not save record");
//   }
// });
// Filmovi.find({}, (err, data) => {
//   if (err) {
//     console.log("ERROR!");
//   }
//   console.log(data);
// });
// console.log("end!");
const Klient = mongoose.model(
  //modelot e funckija sto prima dva parametri shemata i kolekcijata imeto na modelot e vo ednina
  "klient",
  new mongoose.Schema( //ovde se krearira shemata odnosno kako sakame da izgleda shemata
    {
      ime: String,
      prezime: String,
      telefon: String,
      email: String,
      lozinka: String,
      lozinka: {
        ulica: String,
        broj: String,
        stan: String,
        grad: String,
        drzava: String,
        zip: String,
        gps: {
          lon: Number,
          lat: Number
        }
      },
      zanrovi: [String],
      _created: Date,
      _modified: Date
    },
    {
      collection: "klienti" //imeto na kolekcija
    }
  )
);
var k = new Klient({
  //ova e modelot odnosno sto sakame da vleze vo kolekcijata
  ime: "Janko",
  prezime: "Stankovski",
  telefon: "+38938373",
  email: "janko@stankovski.mk",
  lozinka: "1223",
  lozinka: {
    ulica: "Rajko Zinzifov",
    broj: "36",
    stan: "1a",
    grad: "Kumanovo",
    drzava: "Makedonija",
    zip: "1200",
    gps: {
      lon: 14.4,
      lat: 11.2
    }
  },
  zanrovi: ["komedija", "akcija", "ljuboven"],
  _created: new Date("2019-11-11T20:00:00Z"),
  _modified: new Date("2019-11-11T20:00:00Z")
});
// k.save(err => {
//   //posle na ovoj nacin pravime save na se ova vo baza
//   if (err) {
//     console.log("could not save klienti ");
//     return;
//   }
//   console.log("save successfully");
// });

Klient.find({ "Lokacija.grad": "Skopje", zanrovi: "komedija" }, (err, data) => {
  //so ova query vadi lugeto vo skopje sto sakaat komedija
  if (err) {
    console.log("could not read data");
    return;
  }
  // console.log(data);   //na ovoj nacin ke ni gi dade site podatoci sto gi imame
  data.forEach((k, i) => {
    //ovde filtirame sto konkretno da izvadi pr. ime prezime i mail samo
    console.log(k.ime, " ", k.prezime, " ", k.email);
  });
});
