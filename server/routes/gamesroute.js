const router = require("express").Router();
const Game = require("../models/Game");
const hltb = require("howlongtobeat");
const hltbService = new hltb.HowLongToBeatService();
const axios = require("axios");
const howlongtobeat = require("howlongtobeat-api");
const verify = require("../verify");
const loggedIn = require("../loggedIn");

const hltbSearch = async (gameName) => {
  const getById = async (id) => {
    const game = await howlongtobeat.get(id);
    return game;
  };
  const results = await howlongtobeat.find({ search: gameName });

  const games = await Promise.all(
    results.data.map(async (result) => {
      return await getById(result.id);
    })
  );

  return games;
};

//GET ALL PENDING GAMES
router.get("/games/pending", async (req, res) => {
  try {
    const response = await Game.find({ status: "PENDING" });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//GET ALL GAMES
router.get("/games/approved", async (req, res) => {
  try {
    const response = await Game.find();
    const filtered = response.filter((game) => game.status !== "PENDING");
    res.status(200).json(filtered);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// GET SPECIFIC GAME
router.get("/games/specific/:id", async (req, res) => {
  try {
    const gameHLTB = await howlongtobeat.get(req.params.id);
    const gameDB = await Game.findOne({ gameId: req.params.id });

    res.status(200).json({ ...gameHLTB, ...gameDB._doc });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
//GET ALL PLAYED GAMES
router.get("/played", async (req, res) => {
  try {
    const games = await Game.find();
    const filtered = games.filter((game) =>
      ["Beaten", "Failed Venture"].includes(game.played)
    );

    res.status(200).json(filtered);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//GET ALL GAMES SIMILIAR TO GAME TITLE GIVEN
router.get("/:game", async (req, res) => {
  try {
    const game = await hltbSearch(req.params.game);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const removeVote = async (type, gameId, userId) => {
  try {
    if (type === "LIKE") {
      await Game.findOneAndUpdate(
        { gameId: gameId },
        {
          $inc: { likes: -1 },
          $pull: { liked: userId },
        },
        { new: true }
      );
    } else if (type === "DISLIKE") {
      await Game.findOneAndUpdate(
        { gameId: gameId },
        {
          $inc: { dislikes: -1 },
          $pull: { disliked: userId },
        },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addVote = async (type, gameId, userId) => {
  try {
    if (type === "LIKE") {
      await Game.findOneAndUpdate(
        { gameId: gameId },
        {
          $inc: { likes: 1 },
          $addToSet: { liked: userId },
        },
        { new: true }
      );
    } else if (type === "DISLIKE") {
      await Game.findOneAndUpdate(
        { gameId: gameId },
        {
          $inc: { dislikes: 1 },
          $addToSet: { disliked: userId },
        },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};

//VOTE ON GAME
router.put("/vote/:id", loggedIn, async (req, res) => {
  // USERS CLICKS LIKE
  // CHECK IF USER LIKED BEFORE
  // IF TRUE REMOVE FROM LIKED AND LIKES--
  // IF FALSE ADD TO LIKED AND LIKES++
  // IF FALSE AND USER IN DISLIKED REMOVE FROM DISLIKED AND DISLIKES--
  try {
    const game = await Game.findOne({ gameId: req.params.id });
    if (req.body.type === "LIKE") {
      if (game.liked.includes(req.body.userid)) {
        await removeVote(req.body.type, req.params.id, req.body.userid);
      } else {
        await addVote(req.body.type, req.params.id, req.body.userid);
        if (game.disliked.includes(req.body.userid)) {
          await removeVote("DISLIKE", req.params.id, req.body.userid);
        }
      }
    } else if (req.body.type === "DISLIKE") {
      if (game.disliked.includes(req.body.userid)) {
        await removeVote(req.body.type, req.params.id, req.body.userid);
      } else {
        await addVote(req.body.type, req.params.id, req.body.userid);
        if (game.liked.includes(req.body.userid)) {
          await removeVote("LIKE", req.params.id, req.body.userid);
        }
      }
    }

    const newGame = await Game.findOne({ gameId: req.params.id });
    const { likes, dislikes, liked, disliked } = newGame._doc;
    res.status(200).json({ likes, dislikes, liked, disliked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//SAVE GAME TO DATABASE
router.post("/save", verify, async (req, res) => {
  if (req.verified) {
    try {
      const getGame = await Game.findOne({ gameId: req.body.gameId });
      if (getGame)
        return res.status(500).json({ message: "Game already on the list!" });
      const newGame = new Game({
        gameId: req.body.gameId,
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        platforms: req.body.platforms,
        genres: req.body.genres,
        developers: req.body.developers,
        publisher: req.body.publisher,
        releaseDates: req.body.releaseDates,
        dlc: req.body.dlc,
        timeToBeat: req.body.timeToBeat,
        status: req.body.status,
        addedBy: req.body.addedBy,
      });

      await newGame.save();
      res.status(200).json({ message: "Game submitted for review" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "Unauthorized action!" });
  }
});

//DELETE GAME
router.delete("/:gameId", verify, async (req, res) => {
  if (req.verified) {
    try {
      await Game.findOneAndDelete({ gameId: req.params.gameId });
      res.status(200).json("Item deleted!");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "Unauthorized action!" });
  }
});

//UPDATE GAME
router.put("/:gameId", verify, async (req, res) => {
  if (req.verified) {
    try {
      const game = await Game.findOneAndUpdate(
        { gameId: req.params.gameId },
        {
          $set: req.body,
        },
        { new: true }
      );
      game.save();
      res.status(200).json("Game updated!");
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "Unauthorized action!" });
  }
});

module.exports = router;
