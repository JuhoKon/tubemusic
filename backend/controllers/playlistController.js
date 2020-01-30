var Playlist = require("../models/playlist.model");

exports.index = function(req, res, next) {
  Playlist.find()
    .select("-playlist")
    .then(Playlist => {
      //console.log(Playlist);
      res.json({ Playlist: Playlist }); //todo: return nimi + id kaikki postaukset
    }) //return all posts
    .catch(err => res.status(400).json("Error: " + err));
};

exports.create = function(req, res, next) {
  var playlist = new Playlist({
    name: req.body.name,
    playlist: req.body.playlist
  });
  playlist
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json(err));
};
exports.findByID = function(req, res, next) {
  console.log(req.params.id);
  if (!req.params.id) {
    return res.status(400).json({ error: "Id not submitted" });
  }
  Playlist.findById(req.params.id)
    .then(playlist => res.json(playlist))
    .catch(err => res.status(400).json("Error:" + err));
};
exports.updatebyID = function(req, res, next) {
  if (!req.body.name || !req.body.playlist) {
    return res.status(400).json({ error: "Please enter all fields" });
  }
  Playlist.findById(req.params.id).then(playlist => {
    (playlist.name = req.body.name), (playlist.playlist = req.body.playlist);
    playlist
      .save()
      .then(() => res.json(playlist))
      .catch(err => res.status(400).json({ error: err }));
  });
  // console.log(req.params.id);
};
exports.deletebyID = function(req, res, next) {
  Playlist.findByIdAndDelete(req.params.id) //delete actual post from the database
    .then(() => {
      res.json("Playlist deleted.");
    })
    .catch(err => res.status(400).json({ error: err }));
};
