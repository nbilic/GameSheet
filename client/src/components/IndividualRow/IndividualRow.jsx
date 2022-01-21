import useStyles from "./IndividualRowStyles";
import { Typography, Grid } from "@material-ui/core";
import LinkIcon from "@mui/icons-material/Link";
import { CustomPopup } from "../index";
import { UserContext } from "../userContext";
import { useContext } from "react";
import { ifUserIsRequired } from "../allowedIDs";
const IndividualRow = (props) => {
  const classes = useStyles({});
  const { lg, arr, type, variant, customKey } = props;
  const { user } = useContext(UserContext);
  const changeOutput = (option) => {
    switch (type) {
      case "DLC":
        return option.name;
      case "Gameplay trailer":
        return (
          <a
            href={`https://www.youtube.com/results?search_query=${option}+gameplay+trailer`}
            style={{ textDecoration: "none", color: "inherit" }}
            target={"_blank"}
            rel="noreferrer"
          >
            <LinkIcon />
          </a>
        );
      case "Chance to play":
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {option === "PENDING%" ? option.replaceAll("%", "") : option}
            {ifUserIsRequired(user, true) && (
              <CustomPopup
                game={props.game}
                setChance={props.setChance}
                type="status"
                position="bottom"
                options={props.options}
                individual
                style={{ marginLeft: 10 }}
              />
            )}
          </div>
        );
      case "Played":
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {option}
            {ifUserIsRequired(user, true) && (
              <CustomPopup
                game={props.game}
                setPlayedStatus={props.setPlayedStatus}
                type="played"
                position="bottom"
                options={props.options}
                individual
              />
            )}
          </div>
        );
      default:
        return option;
    }
  };
  return (
    <Grid item lg={lg} className={classes.item}>
      <Typography variant="body1">{type}:</Typography>
      {
        <div variant={variant} className={classes.gameStats}>
          {arr?.map((option, index) => (
            <Typography
              variant={variant}
              key={`${
                option?.name ? option.name : option ? option : type
              }${variant}`}
            >
              {changeOutput(option)}
            </Typography>
          ))}
        </div>
      }
    </Grid>
  );
};

export default IndividualRow;
