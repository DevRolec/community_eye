const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lga: {
      type: String,
      required: true,
      enum: [
        "Aba North", "Aba South", "Arochukwu", "Bende",
        "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato",
        "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", 
        "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", 
        "Umu Nneochi"
      ],
    },
    role: { type: String, default: "user" }, // or "admin"
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
