import useStyles from "./NavbarStyles";
import { Typography, Grid, Avatar } from "@material-ui/core";
import {
  SportsEsports,
  RateReview,
  Add,
  Equalizer,
  Logout,
  Games,
} from "@mui/icons-material";
import { NavbarRow } from "../index";
import API_URL from "../apiUrl";
import { useEffect, useContext } from "react";
import { UserContext } from "../userContext";
import axios from "axios";
import logo from "../../images/logo.png";
const Navbar = () => {
  const classes = useStyles({});
  const twitch = () => window.open(`${API_URL}/auth/twitch`, "_self");
  const rows = [
    {
      link: "/approved",
      icon: <SportsEsports />,
      text: "Games reviewed",
      userRequired: false,
    },
    {
      link: "/played",
      icon: <Games />,
      text: "Games played",
      userRequired: false,
    },
    {
      link: "/pending",
      icon: <RateReview />,
      text: "Pending review",
      userRequired: false,
    },
    {
      link: "/add",
      icon: <Add />,
      text: "Add new game",
      userRequired: true,
    },
    {
      link: "/statistics",
      icon: <Equalizer />,
      text: "Statistics",
      userRequired: false,
    },
  ];
  const { user, setUser } = useContext(UserContext);
  const logout = async () => {
    setUser(null);
    await axios.get(`${API_URL}/auth/logout`);
  };
  useEffect(() => {
    const getUser = () => {
      fetch(`${API_URL}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("No user found");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => console.log(err.message));
    };
    getUser();
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Avatar
          src="https://www.pinclipart.com/picdir/big/559-5592691_blue-gaming-controller-logo-clipart.png"
          className={classes.logo}
        />
        <Typography variant="h6">GameSheet</Typography>
      </div>

      <Grid container className={classes.menu}>
        {rows?.map((row, index) => (
          <NavbarRow
            link={row.link}
            icon={row.icon}
            text={row.text}
            userRequired={row.userRequired}
            key={row.text}
          />
        ))}
        <div className={classes.line}></div>
        {user && (
          <div className={classes.menuItemContainer} onClick={logout}>
            <Grid item lg={4} className={classes.icon}>
              <Logout />
            </Grid>
            <Grid item lg={8} className={classes.menuItem}>
              <Typography variant="body2">Log out</Typography>
            </Grid>
          </div>
        )}
      </Grid>

      {!user ? (
        <div className={classes.signup} onClick={twitch}>
          <Avatar
            src="https://cdna.artstation.com/p/assets/images/images/029/691/050/large/ali-bayat-twitch-logo.jpg?1598357240"
            alt=""
            className={classes.signupLogo}
          />
          <Typography variant="body2">Log in with twitch</Typography>
        </div>
      ) : (
        <div className={classes.signedup}>
          <Avatar
            src={user.profile_image_url}
            alt=""
            className={classes.signupLogo}
          />
          <Typography variant="subtitle1">{user.display_name}</Typography>
        </div>
      )}
    </div>
  );
};

export default Navbar;
