import { useState } from "react";
import axios from "axios";
import { Typography, Grid, LinearProgress } from "@material-ui/core";
import useStyles from "./SearchStyles";
import SearchIcon from "@mui/icons-material/Search";
import GameCard from "../GameCard/GameCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../apiUrl";
import { useContext } from "react";
import { UserContext } from "../userContext";
const Search = () => {
  const classes = useStyles({});
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${API_URL}/api/game/${search}`);
      setGames(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const handleAdd = async (game) => {
    const PENDING = "PENDING";
    try {
      await axios.post(
        `${API_URL}/api/game/save`,
        {
          gameId: game.id,
          name: game.name,
          description: game.description,
          imageUrl: game.imageUrl,
          platforms: game.platforms,
          genres: game.genres,
          developers: game.developers,
          publisher: game.publisher,
          releaseDates: game.releaseDates,
          dlc: game.gameplays.dlc,
          timeToBeat: game.gameplays.single,
          status: PENDING,
          addedBy: user.display_name,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
        { withCredentials: true }
      );
      removeAdded(game.id);
      notify("Game added!", true);
    } catch (error) {
      notify(error.response.data.message, false);
    }
  };

  const notify = (msg, success) => {
    if (success) {
      toast.success(msg, {
        position: "bottom-left",
        autoClose: 5000,
      });
    } else {
      toast.error(msg, {
        position: "bottom-left",
        autoClose: 5000,
      });
    }
  };

  const removeAdded = (gameId) => {
    const copy = games;
    const filteredGames = copy.filter((game) => !(game.id === gameId));
    setGames(filteredGames);
  };
  return (
    <div className={classes.container}>
      <div style={{ margin: 10, marginBottom: 0, color: "lightblue" }}>
        <Typography variant="body1">Enter game title: </Typography>
      </div>
      <div className={classes.searchField}>
        <input
          className={classes.searchBar}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon className={classes.searchIcon} onClick={handleSubmit} />
      </div>
      {loading && <LinearProgress color="secondary" />}
      {!loading && (
        <div style={{ padding: 10 }}>
          <Grid container spacing={2} className={classes.gamesContainer}>
            {games?.map((game) => (
              <Grid
                item
                lg={4}
                md={6}
                xl={4}
                sm={12}
                xs={12}
                key={game.id}
                className={classes.gameCard}
              >
                <GameCard
                  game={game}
                  add={true}
                  handleAdd={handleAdd}
                  search={true}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
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
  );
};

export default Search;
