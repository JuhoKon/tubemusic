var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var playlistSchema = new Schema(
  {
    name: { type: String, required: true },
    playlist: { type: Array },
    private: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("playlist", playlistSchema);
