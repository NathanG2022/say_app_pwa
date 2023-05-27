import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  registered: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
});

userSchema.methods.setVerified = function(value) {
  this.verified = value;
};

export default mongoose.model("User", userSchema);