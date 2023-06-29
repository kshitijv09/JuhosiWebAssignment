const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, "Please enter name of the Task"],
      minlength: 5,
      maxlength: 25,
    },
    date: {
      type: Date,
      required: [true, "Please enter date  of the Task"],
    },
    description: {
      type: String,

      required: [true, "Please enter description of the Task"],
    },
    completed: { type: String, default: "Pending" },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
