import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./IndividualGameStyles";
import axios from "axios";
import { IndividualRow } from "../index";
import API_URL from "../apiUrl";
import { useParams } from "react-router";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { UserContext } from "../userContext";
import { useContext } from "react";
const IndividualGame = () => {
  const location = useLocation();
  const { gameId } = useParams();
  const options = ["100", "75", "50", "25", "0"];
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const played = ["Not played", "Failed Venture", "Beaten"];
  const [game, setGame] = useState(location?.state?.game || null);
  const [loading, setLoading] = useState(true);
  const [chance, setChance] = useState(null);
  const [playedStatus, setPlayedStatus] = useState(null);
  const classes = useStyles({});
  const { user } = useContext(UserContext);

  const notify = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
    });
  };

  const vote = async (type) => {
    if (!user) notify("Must be signed in to vote!");
    else {
      try {
        const [likedCopy, dislikedCopy] = [likes, dislikes];

        await axios.put(
          `${API_URL}/api/game/vote/${gameId}`,
          {
            type: type,
            userid: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
          { withCredentials: true }
        );
        if (type === "LIKE") {
          if (liked) {
            setLiked(false);
            setLikes((likedCopy) => likedCopy - 1);
          } else {
            setLiked(true);
            setLikes((likedCopy) => likedCopy + 1);
            disliked && setDisliked(false);
            disliked && setDislikes((dislikedCopy) => dislikedCopy - 1);
          }
        } else {
          if (disliked) {
            setDisliked(false);
            setDislikes((dislikedCopy) => dislikedCopy - 1);
          } else {
            setDisliked(true);
            setDislikes((dislikedCopy) => dislikedCopy + 1);
            liked && setLiked(false);
            liked && setLikes((likedCopy) => +likedCopy - 1);
          }
        }
      } catch (error) {
        alert(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    const getGame = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/api/game/games/specific/${gameId}`
        );

        setGame({ ...response.data, ...game });
        const copyLikes = game.likes;
        const copyDislikes = game.dislikes;
        setLikes(copyLikes);
        setDislikes(copyDislikes);
        const copyLiked = game?.liked?.includes(user?.id);
        const copyDisliked = game?.disliked?.includes(user?.id);

        setLiked(copyLiked ? true : false);
        setDisliked(copyDisliked ? true : false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getGame();
  }, [location, user]);

  if (loading)
    return <CircularProgress style={{ margin: "auto" }} color="secondary" />;

  return (
    <div className={classes.container}>
      <div className={classes.containerLeftSide}>
        <img src={game?.imageUrl} alt={game?.name} className={classes.cover} />
        <div className={classes.description}>
          <Typography variant="h6">{game?.name}</Typography>
          <div className={classes.voting}>
            <div className={classes.likesContainer}>
              <Typography variant="subtitle2">
                {likes ? likes : game.likes}
              </Typography>
              <ThumbUp
                className={`${classes.icon} ${classes.likeIcon} ${
                  liked && classes.liked
                }`}
                onClick={() => vote("LIKE")}
              />
            </div>
            <div className={classes.likesContainer}>
              <ThumbDown
                className={`${classes.icon} ${classes.dislikeIcon} ${
                  disliked && classes.disliked
                }`}
                onClick={() => vote("DISLIKE")}
              />
              <Typography variant="subtitle2">
                {dislikes ? dislikes : game.dislikes}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.gameInfo}>
        <div className={classes.timeToBeat}>
          {game?.timeToBeat?.map((time) => (
            <div className={classes.time} key={time.type}>
              <Typography variant="h6" sx={{ borderBottom: "1px solid white" }}>
                {time.type}
              </Typography>
              <Typography variant="h6">{time.average}</Typography>
            </div>
          ))}
        </div>
        <Grid container className={classes.gameData}>
          <Grid item lg={12} className={classes.description}>
            <Typography variant="subtitle2">{game?.description}</Typography>
          </Grid>
          <IndividualRow
            lg={3}
            variant="subtitle2"
            arr={game?.genres}
            type="Genres"
          />
          <IndividualRow
            lg={3}
            variant="subtitle2"
            arr={game?.platforms}
            type="Platforms"
          />
          <IndividualRow
            lg={3}
            variant="subtitle2"
            arr={game?.developers}
            type="Developer"
          />
          <IndividualRow
            lg={3}
            variant="subtitle2"
            arr={game?.publisher}
            type="Publisher"
          />
          <IndividualRow
            lg={3}
            variant="subtitle2"
            arr={game?.dlc}
            type="DLC"
          />
          <IndividualRow
            lg={3}
            variant="subtitle2"
            arr={[game?.name]}
            type="Gameplay trailer"
          />
          <IndividualRow
            lg={3}
            variant="h5"
            arr={[`${chance ? chance : game?.status}%`]}
            type="Chance to play"
            setChance={setChance}
            game={game}
            options={options}
          />

          <IndividualRow
            lg={3}
            variant="h6"
            arr={[`${playedStatus ? playedStatus : game?.played}`]}
            type="Played"
            setPlayedStatus={setPlayedStatus}
            game={game}
            options={played}
          />
        </Grid>

        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastStyle={{ backgroundColor: "#202427", color: "lightblue" }}
        />
      </div>
    </div>
  );
};

export default IndividualGame;
