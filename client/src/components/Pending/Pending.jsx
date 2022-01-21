import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, LinearProgress, Typography } from "@material-ui/core";
import useStyles from "./PendingStyles";
import API_URL from "../apiUrl";
import GameCard from "../GameCard/GameCard";
import { useContext } from "react";

import { UserContext } from "../userContext";
const Pending = () => {
  const classes = useStyles({});
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const filterGames = async (gameId) => {
    const copy = games;
    const filtered = copy.filter((game) => gameId !== game.gameId);
    setGames(filtered);
  };

  const deleteGame = async (gameId) => {
    try {
      await axios.delete(`${API_URL}/api/game/${gameId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      filterGames(gameId);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    const getGames = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/game/games/pending`);
        setGames(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response.data.message);
      }
    };
    getGames();
  }, []);
  return (
    <div className={classes.container}>
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
                key={game.gameId}
                className={classes.gameCard}
              >
                <GameCard
                  game={game}
                  filterGames={filterGames}
                  deleteGame={deleteGame}
                  pending={true}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
      {!loading && games.length === 0 && (
        <div style={{ color: "lightblue", marginLeft: 10 }}>
          <Typography variant="h2">No games pending review.</Typography>
        </div>
      )}
    </div>
  );
};

export default Pending;
