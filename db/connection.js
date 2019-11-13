const mongoose = require("mongoose");

const init = () => {
  mongoose
    .connect(
      "mongodb+srv://dev:DEV123!@cluster0-r2fa9.mongodb.net/videoteka?retryWrites=true&w=majority",
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
};
module.exports = { init };
