import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    backgroundColor: "#202427",
    width: "fit-content",
    paddingRight: 20,
    position: "sticky",
    top: 0,
  },
  icon: {
    color: "white",
    textAlign: "center",
  },
  menuItem: {
    color: "#80888C",

    width: "100%",
  },
  line: {
    margin: 10,
    width: "100%",
    color: "#80888C",
    borderBottom: "1px solid #80888C",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    //border: "1px solid red",
    //alignItems: "center",
    width: "100%",
  },
  menuItemContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    margin: "0px 0px",
    padding: 10,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#3A4246",
    },
  },
  title: {
    color: "white",
    padding: "30px 0px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginLeft: 10,
  },
  logo: {
    marginRight: 10,
  },
  link: {
    width: "100%",
    textDecoration: "none",
    //margin: "auto",
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: 2,
    "&:hover": {
      cursor: "pointer",
    },
    // border: "1px solid red",
  },
}));

export default useStyles;
