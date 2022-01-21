import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../apiUrl";
import { Typography } from "@material-ui/core";
import useStyles from "./StatisticsStyles";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [games, setGames] = useState([]);
  const classes = useStyles({});
  const [unplayedCount, setUnplayedCount] = useState(0);
  const [barData, setBarData] = useState(null);
  const [unplayedData, setUnplayedData] = useState(null);
  const [playedCount, setPlayedCount] = useState(0);
  const [playedData, setPlayedData] = useState(null);
  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/game/games/approved`);
        setGames(response.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getGames();
  }, []);

  useEffect(() => {
    const getUnplayedGamesStats = () => {
      let [v100, v75, v50, v25, v0] = [0, 0, 0, 0, 0];
      const options = ["100", "75", "50", "25", "0"];

      games.forEach((game) => {
        if (options.includes(game.status) && game.played === "Not played") {
          if (game.status === "100") v100++;
          if (game.status === "75") v75++;
          if (game.status === "50") v50++;
          if (game.status === "25") v25++;
          if (game.status === "0") v0++;
        }
      });

      setUnplayedData({
        labels: ["100%", "75%", "50%", "25%", "0%"],
        datasets: [
          {
            label: "Approved games",
            data: [v100, v75, v50, v25, v0],

            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
      setUnplayedCount(v100 + v75 + v50 + v25 + v0);
    };

    const getPlayedGamesStats = () => {
      let [total, beaten, failed] = [0, 0, 0];
      const options = ["Beaten", "Failed Venture"];

      games.forEach((game) => {
        if (options.includes(game.played)) {
          if (game.played === "Beaten") beaten++;
          if (game.played === "Failed Venture") failed++;
          total++;
        }
      });

      setPlayedData({
        labels: ["Beaten", "Failed venture"],
        datasets: [
          {
            label: "Approved games",
            data: [beaten, failed],

            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      });
      setPlayedCount(total);
    };

    const getGenres = () => {
      const genresArr = [];
      games?.forEach((game) => {
        game.genres?.forEach((genre) => {
          if (!genresArr.includes(genre)) genresArr.push(genre);
        });
      });

      const arrToObj = genresArr.map((a) => {
        return {
          name: a,
          count: 0,
        };
      });

      arrToObj.forEach((element) => {
        games.forEach((game) => {
          game.genres?.forEach((genre) => {
            if (element.name === genre) element.count++;
          });
        });
      });

      const sortedArr = arrToObj.sort((a, b) => b.count - a.count);
      setBarData({
        labels: sortedArr.map((a) => a.name),
        datasets: [
          {
            label: "Genres",
            data: sortedArr.map((a) => a.count),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    };
    getUnplayedGamesStats();
    getPlayedGamesStats();
    getGenres();
  }, [games]);
  return (
    <div className={classes.main}>
      <div className={classes.body}>
        <div className={classes.container}>
          <Typography variant="h6">{`Distribution of ${unplayedCount} approved games`}</Typography>
          {unplayedData && <Pie data={unplayedData} />}
        </div>

        <div className={classes.container}>
          <Typography variant="h6">{`Distribution of ${playedCount} played games`}</Typography>
          {playedData && <Pie data={playedData} />}
        </div>
      </div>
      <div className={classes.barChart}>
        <Typography variant="h6">Most common genres</Typography>
        {barData && <Bar data={barData} />}
      </div>
    </div>
  );
};

export default Statistics;
