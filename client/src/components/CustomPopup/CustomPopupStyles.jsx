import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cover: {
    maxHeight: 160,
    //maxWidth: 160,
    margin: 10,
  },
  gameInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginLeft: 10,
  },
  gameName: {
    color: "lightblue",
  },
  gameCard: {
    //border: "1px dashed crimson",
    //margin: 2,
  },
  gamesContainer: {
    display: "flex",
  },
  test: {
    width: "100%",
    position: "relative",
    //border: "1px dashed red",
    margin: "auto",
    display: "flex",
    backgroundColor: "#202427",

    //backgroundAttachment: "fixed",
    color: "white",
    height: "100%",
  },
  gameStats: {
    color: "lightblue",
  },
  addIcon: {},
  icons: {
    position: "absolute",
    display: "flex",
    right: 5,
    bottom: 5,
  },
  approveIcon: {
    marginRight: 5,
    "&:hover": {
      cursor: "pointer",
      color: "lightgreen",
    },
    height: "100%",
  },
  settingsIcon: {
    marginLeft: 5,
    "&:hover": {
      cursor: "pointer",
      color: "lightgreen",
    },
    height: "100%",
    marginTop: 5,
  },
  denieIcon: {
    "&:hover": {
      cursor: "pointer",
      color: "crimson",
    },
  },

  menuItem: {
    color: "lightblue",
    border: "1px solid lightblue",
    backgroundColor: "#202427",
    padding: 3,
    minWidth: 50,
    "&:hover": {
      cursor: "pointer",
      color: "crimson",
      backgroundColor: "lightblue",
    },
    margin: 0,
  },
  popup: {
    marginLeft: "-10px",
    color: "red",
    minWidth: "100px",
  },
  addIcon: {
    position: "absolute",
    right: 5,
    bottom: 5,
    "&:hover": {
      cursor: "pointer",
      color: "lightgreen",
    },
  },
}));

export default useStyles;
