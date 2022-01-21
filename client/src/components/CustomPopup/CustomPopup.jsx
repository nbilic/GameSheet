import useStyles from "./CustomPopupStyles";
import { useRef } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import API_URL from "../apiUrl";
import { usePopupState } from "material-ui-popup-state/hooks";
import { Done, SettingsSuggest } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "../userContext";
import Popup from "reactjs-popup";

const CustomPopup = (props) => {
  const classes = useStyles({});
  const { game, pending, filterGames, type, position, options } = props;
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });
  const ref = useRef();
  const CTP = ["100", "75", "50", "25", "0"];
  const closeTooltip = () => ref.current.close();
  const { user } = useContext(UserContext);
  const updateGame = async (gameId, status, type) => {
    try {
      await axios.put(
        `${API_URL}/api/game/${gameId}`,
        {
          ...(type === "status" ? { status: status } : { played: status }),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
        { withCredentials: true }
      );
      pending && filterGames(gameId);
      !pending && type === "status"
        ? props.setChance(status)
        : props.setPlayedStatus(status);
      popupState.close();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      <Popup
        ref={ref}
        trigger={
          !props.individual ? (
            <Done className={classes.approveIcon} />
          ) : (
            <SettingsSuggest className={classes.settingsIcon} />
          )
        }
        position={position}
        // className={classes.popup}
        offsetX={5}
        closeOnDocumentClick
      >
        <div className={classes.menu}>
          {options.map((option) => (
            <Typography
              key={option}
              variant="body2"
              onClick={() => {
                updateGame(game.gameId, option, type);
                closeTooltip();
              }}
              className={classes.menuItem}
            >
              {`${CTP.includes(option) ? `${option}%` : option}`}
            </Typography>
          ))}
        </div>
      </Popup>
    </div>
  );
};

export default CustomPopup;
