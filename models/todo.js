const mongoose = require("mongoose");
const QueryPlugin = require("mongoose-query");

const todoSchema = mongoose.Schema(
  {
    title: { type: String, require: true,  min: 5, max: 20 },
    status: {
      type: String,
      enum: ["to-do", "done", "in progress"],
      require: true,
      default: "to-do",
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
      },
    tags:{
      type: [{
        type: String,
        maxLength: 10,
    }],
    require: false,
    }
  },
  { timestamps: true }
);

todoSchema.plugin(QueryPlugin);

module.exports = mongoose.model("Todo", todoSchema);