const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "patient_transporter"],
    required: true,
  },
  isAvailable: { type: Boolean, default: true }, // Tracks availability
  requests: [
    {
      patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
      appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ], // Array to store a reference to patient and appointment ID
});

// You can add a validation check to enforce the max length of 1 for the array
UserSchema.path("requests").validate(function (value) {
  return value.length <= 1;
}, "Only one request can be assigned at a time.");

// Hash the password before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
