import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 30,
  },
  container: {
    width: 300,
    height: 300,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    color: "lightblue",
    textAlign: "center",
  },
  barChart: {
    marginTop: "5%",
    display: "block",
    width: "60%",
    margin: "auto",
    color: "lightblue",
    textAlign: "center",
  },
  main: {
    width: "100%",
  },
}));

export default useStyles;
