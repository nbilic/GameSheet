import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cover: {
    maxHeight: 160,
    maxWidth: 300,
    margin: 10,
  },
  gameInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginLeft: 10,
    padding: "10px 0px",
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
  },
  denieIcon: {
    "&:hover": {
      cursor: "pointer",
      color: "crimson",
    },
  },
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#202427",
      color: "lightblue",
    },
    color: "lightblue",
    border: "1px dashed lightblue",
    marginBottom: 10,
    marginRight: 2,
    padding: 5,
    width: "100%",
  },
  menuItem: {
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
  imageOnly: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(38, 44, 48)",
  },
  imageOnlyCover: {
    height: 180,
    width: 110,
    margin: 0,
    border: "1px solid lightblue",
  },
}));

export default useStyles;
