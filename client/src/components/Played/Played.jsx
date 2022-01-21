import { useEffect, useState } from "react";
import axios from "axios";
import useStyles from "./PlayedStyles";
import API_URL from "../apiUrl";
import { Link } from "react-router-dom";
import { GameCard } from "../index";
import { Grid, LinearProgress } from "@mui/material";
import { FilterButtons, FilterBar } from "../index";
const Played = () => {
  const classes = useStyles({});
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alignment, setAlignment] = useState("ALL");
  const options = ["ALL", "Beaten", "Failed Venture"];
  const [nameFilter, setNameFilter] = useState("");
  const [viewType, setViewType] = useState(4);
  useEffect(() => {
    const getGames = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/game/played`);
        setGames(response.data);
        setFilteredGames(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    getGames();
  }, []);

  const filterGames = () => {
    const copy = games;
    const arr = copy.filter((game) => {
      if (
        game?.name?.toUpperCase().indexOf(nameFilter.toUpperCase()) >= 0 &&
        (!alignment ||
          game.played === alignment.replaceAll("%", "") ||
          alignment === "ALL")
      ) {
        return game;
      }
    });
    setFilteredGames(arr);
  };
  useEffect(() => {
    filterGames();
  }, [alignment, nameFilter]);

  return (
    <div className={classes.container}>
      <FilterBar
        options={options}
        alignment={alignment}
        setAlignment={setAlignment}
        nameFiltering={{ nameFilter, setNameFilter }}
        viewTypeDisplay={{ viewType, setViewType }}
      />
      <div style={{ padding: 10 }}>
        {loading && <LinearProgress color="secondary" />}
        <Grid container spacing={2} className={classes.gamesContainer}>
          {!loading &&
            filteredGames?.map((game) => (
              <Grid
                item
                xl={viewType}
                lg={4}
                md={6}
                sm={12}
                xs={12}
                key={game.gameId}
                className={classes.gameCard}
              >
                <GameCard game={game} played viewType={viewType} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Played;
