import useStyles from "./DisplayButtonsStyles";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ViewList, ViewColumn, ViewComfy } from "@mui/icons-material";
const DisplayButtons = ({ alignment, handleAlignment }) => {
  const classes = useStyles({});
  const options = [
    <ViewComfy className={classes.button} />,
    <ViewColumn className={classes.button} />,
    <ViewList className={classes.button} />,
  ];
  return (
    <div>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        className={classes.filterBar}
      >
        {options?.map((option) => (
          <ToggleButton value={option} aria-label={option} key={option}>
            {option}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default DisplayButtons;
