const mongoose = require("mongoose");

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

async function main() {
  await mongoose.connect(process.env.DB_URL);
}
