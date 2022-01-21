import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    // flexWrap: "wrap",
    //padding: 20,
  },
  searchField: {
    display: "flex",
    alignItems: "center",
    //border: "1px solid white",
  },
  searchBar: {
    margin: 10,
    padding: "10px 15px",
    backgroundColor: "#202427",
    borderTopLeftRadius: 2,
    borderBottomLefttRadius: 2,
    border: "none",
    color: "white",
    width: "20%",
    "&:focus": {
      outline: "none",
    },
    fontFamily: "Roboto",
  },
  searchIcon: {
    backgroundColor: "#202427",
    padding: "6px 5px",
    marginLeft: "-10px",
    color: "white",
    height: "100%",
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    "&:hover": {
      cursor: "pointer",
      color: "lightgreen",
    },
  },

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
    marginTop: "-15px",
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

    color: "white",
    height: "100%",
  },
  gameStats: {
    color: "lightblue",
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
