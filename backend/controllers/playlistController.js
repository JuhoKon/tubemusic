var Playlist = require("../models/playlist.model");
var User = require("../models/user.model");
exports.index = function(req, res, next) {
  Playlist.find()
    .select("-playlist")
    .then(Playlist => {
      //console.log(Playlist);
      res.json({ Playlist: Playlist });
    }) //return playlists name + id
    .catch(err => res.status(400).json("Error: " + err));
};
exports.create = function(req, res, next) {
  var playlist = new Playlist({
    name: req.body.name,
    playlist: req.body.playlist,
    private: req.body.isPrivate,
    owner: req.body.owner,
    genre: req.body.genre
  });
  playlist
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json(err));
};
exports.findByID = function(req, res, next) {
  //console.log(req.params.id);
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
  //console.log(req.body);
  Playlist.findById(req.params.id).then(playlist => {
    (playlist.name = req.body.name),
      (playlist.playlist = req.body.playlist),
      (playlist.private = req.body.private),
      (playlist.owner = playlist.owner);
    playlist
      .save()
      .then(() => res.json(playlist))
      .catch(err => res.status(400).json({ error: err }));
  });
  // console.log(req.params.id);
};
exports.deletebyID = function(req, res, next) {
  if (req.user.role !== "Admin") {
    return res
      .status(401)
      .json({ msg: "Authorization denied. Insufficient role" });
  }
  Playlist.findByIdAndDelete(req.params.id) //delete actual post from the database
    .then(() => {
      next();
    })
    .catch(err => res.status(400).json({ error: err }));
};
exports.deletebyIDHelper = function(req, res, next) {
  User.updateMany(
    {},
    { $pull: { playlists: { _id: req.params.id } } },
    function(err, data) {
      if (err) return res.status(400).json({ error: err });
      res.json("Playlist deleted.");
    }
  );
};
