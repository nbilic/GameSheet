import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3%",
  },
  timeToBeat: {
    display: "flex",
    color: "lightblue",
    backgroundColor: "#202427",
    borderRadius: 5,
    justifyContent: "space-evenly",
  },
  time: {
    margin: 10,
  },
  description: {
    color: "lightblue",
    margin: 10,
  },
  gameInfo: {
    width: "100%",
    margin: 10,
    marginTop: 0,
  },
  item: {
    color: "lightblue",
    padding: 8,
  },
  cover: {
    maxHeight: 400,
    maxWidth: 250,
  },
  menuItem: {
    color: "lightblue",
    border: "1px solid lightblue",
    minWidth: 50,
    padding: 5,
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
  editIcon: {
    marginLeft: 15,
    "&:hover": {
      cursor: "pointer",
      color: "crimson",
    },
  },
}));

export default useStyles;
