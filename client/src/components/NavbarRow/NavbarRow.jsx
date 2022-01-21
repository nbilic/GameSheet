import useStyles from "./NavbarRowStyles";
import { Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ifUserIsRequired } from "../allowedIDs";
import { UserContext } from "../userContext";
import { useContext } from "react";
const NavbarRow = ({ link, icon, text, userRequired }) => {
  const classes = useStyles({});
  const { user } = useContext(UserContext);
  return (
    <>
      {ifUserIsRequired(user, userRequired) && (
        <div className={classes.menuItemContainer}>
          <Link to={link ? link : "/"} className={classes.link}>
            <Grid item lg={4} className={classes.icon}>
              {icon}
            </Grid>
            <Grid item lg={8} className={classes.menuItem}>
              <Typography variant="body2">{text}</Typography>
            </Grid>
          </Link>
        </div>
      )}
    </>
  );
};

export default NavbarRow;
