import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, LinearProgress } from "@mui/material";
import useStyles from "./ApprovedStyles";
import API_URL from "../apiUrl";
import { GameCard, FilterBar } from "../index";
import { Link } from "react-router-dom";
import TrieSearch from "trie-search";

const Approved = () => {
  const [alignment, setAlignment] = useState("ALL");
  const [nameFilter, setNameFilter] = useState("");
  const classes = useStyles({});
  const options = ["ALL", "100%", "75%", "50%", "25%", "0%"];
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState(4);
  const [trie] = useState(new TrieSearch("name"));
  useEffect(() => {
    const getGames = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/game/games/approved`);
        const filterPlayed = response.data.filter(
          (game) => !["Failed Venture", "Beaten"].includes(game.played)
        );

        filterPlayed.sort((a, b) => b.status - a.status);

        setGames(filterPlayed);
        setFilteredGames(filterPlayed);
        //console.log(filterPlayed);
        trie.addAll(filterPlayed);

        //console.log(trie.search("witche"));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response.data.message);
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
          game.status === alignment.replaceAll("%", "") ||
          alignment === "ALL")
      ) {
        return game;
      }
    });
    setFilteredGames(arr);
  };

  useEffect(() => {
    nameFilter.length > 0 && setFilteredGames(trie.search(nameFilter));
    nameFilter.length <= 0 && setFilteredGames(games);
  }, [nameFilter]);
  /*   useEffect(() => {
    filterGames();
  }, [alignment, nameFilter]); */

  return (
    <div className={classes.container}>
      <FilterBar
        options={options}
        alignment={alignment}
        setAlignment={setAlignment}
        nameFiltering={{ nameFilter, setNameFilter }}
        viewTypeDisplay={{ viewType, setViewType }}
      />

      {loading && <LinearProgress color="secondary" />}
      {!loading && (
        <div style={{ padding: 10 }}>
          <Grid container spacing={2} className={classes.gamesContainer}>
            {filteredGames?.map((game) => (
              <Grid
                item
                xl={viewType}
                lg={4}
                md={6}
                sm={12}
                xs={12}
                key={game?.gameId}
                className={classes.gameCard}
              >
                <GameCard game={game} approved={true} viewType={viewType} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Approved;
