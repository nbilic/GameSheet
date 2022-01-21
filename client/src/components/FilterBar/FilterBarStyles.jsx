import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#202427",
    position: "sticky",
    top: 0,
    zIndex: 100,
    input: {
      color: "white",
    },
  },
  select: {
    marginLeft: 10,
    padding: "12px 8px",
    backgroundColor: "#202427",
    color: "lightblue",
    border: "2px solid lightblue",
    borderRadius: 5,
    fontFamily: "Arial",
    fontWeight: "bold",
    "&:hover": {
      cursor: "pointer",
    },
  },
  selectOption: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  displaySelect: {
    position: "absolute",
    display: "flex",
    borderRadius: 5,
    right: 20,
    border: "2px solid lightblue",
  },
  icon: {
    color: "lightblue",
  },
  toggleButton: {
    borderLeft: "2px solid lightblue",
  },
  selected: {
    color: "crimson",
  },
}));

export default useStyles;
