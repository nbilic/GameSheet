import { Typography } from "@material-ui/core";
import useStyles from "./GameCardStyles";
import { Close, Add } from "@mui/icons-material";
import { ifUserIsRequired } from "../allowedIDs";
import { CardRow, CustomPopup } from "../index";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import LinkIcon from "@mui/icons-material/Link";
const GameSearch = ({
  game,
  filterGames,
  deleteGame,
  pending,
  add,
  handleAdd,
  approved,
  viewType,
  played,
  search,
}) => {
  const classes = useStyles({});
  const { user } = useContext(UserContext);

  return (
    <div className={classes.container}>
      <div className={`${classes.test} ${viewType === 1 && classes.imageOnly}`}>
        {search && (
          <img
            src={`${game?.imageUrl}`}
            alt=""
            className={`${classes.cover} ${
              viewType === 1 && classes.imageOnlyCover
            }`}
          />
        )}

        {!search && (
          <Link
            to={`/game/${game?.gameId}`}
            state={{
              game: game ? game : "Does not exist",
            }}
            style={{
              textDecoration: "none",
            }}
          >
            <img
              src={`${game?.imageUrl}`}
              alt=""
              className={`${classes.cover} ${
                viewType === 1 && classes.imageOnlyCover
              }`}
            />
          </Link>
        )}

        <div className={classes.icons}>
          {pending && ifUserIsRequired(user, true) && (
            <>
              <CustomPopup
                game={game}
                pending={true}
                filterGames={filterGames}
                type="status"
                options={["100", "75", "50", "25", "0"]}
                position="top"
              />
              <Close
                className={classes.denieIcon}
                onClick={() => deleteGame(game?.gameId)}
              />
            </>
          )}

          {add && ifUserIsRequired(user, true) && (
            <Add className={classes.addIcon} onClick={() => handleAdd(game)} />
          )}
        </div>
        {viewType !== 1 && (
          <div className={classes.gameInfo}>
            {search && (
              <Typography variant="body1" className={classes.gameName}>
                {game?.name}
              </Typography>
            )}
            {!search && (
              <Link
                to={`/game/${game?.gameId}`}
                state={{ game: game ? game : "Does not exist" }}
                style={{ textDecoration: "none" }}
              >
                <Typography variant="body1" className={classes.gameName}>
                  {game?.name}
                </Typography>
              </Link>
            )}

            {pending && <CardRow type="Added by" arr={[game?.addedBy]} />}
            {approved && <CardRow type="Chance to play" arr={[game?.status]} />}
            {played && <CardRow type="Played" arr={[game?.played]} />}
            <CardRow type="Genres" arr={game?.genres} />
            <CardRow type="Platforms" arr={game?.platforms} />
            {pending && (
              <div>
                <Typography variant="body2">Gameplay link:</Typography>
                <a
                  href={`https://www.youtube.com/results?search_query=${game?.name}+gameplay+trailer`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <LinkIcon />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSearch;
