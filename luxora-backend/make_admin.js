const mongoose = require("mongoose");
const User = require("./models/user");
const dotenv = require("dotenv");

const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

async function makeAdmin() {
  const email = process.argv[2];
  if (!email) {
    console.error("Please provide an email address.");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const result = await User.updateOne({ email }, { role: "admin" });
    if (result.matchedCount > 0) {
      console.log(`Successfully promoted ${email} to admin.`);
    } else {
      console.error(`User with email ${email} not found.`);
    }
  } catch (error) {
    console.error("Database connection error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

makeAdmin();
