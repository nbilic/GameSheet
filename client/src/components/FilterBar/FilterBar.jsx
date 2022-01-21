import useStyles from "./FilterBarStyles";
import { TextField, ToggleButton } from "@mui/material";
import { useState } from "react";
import { ViewColumn, ViewComfy } from "@mui/icons-material";
const FilterBar = ({
  options,
  viewTypeDisplay,
  setAlignment,
  nameFiltering,
}) => {
  const classes = useStyles({});
  const [view, setView] = useState("list");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };
  return (
    <div className={classes.container}>
      <TextField
        label="Filter by game name...."
        variant="standard"
        color="warning"
        focused
        placeholder="Game name...."
        sx={{ input: { color: "lightblue" } }}
        value={nameFiltering.nameFilter}
        onChange={(e) => nameFiltering.setNameFilter(e.target.value)}
      />

      <select
        onChange={(e) => setAlignment(e.target.value)}
        className={classes.select}
      >
        {options.map((option) => (
          <option value={option} className={classes.selectOption} key={option}>
            {option}
          </option>
        ))}
      </select>

      <div className={classes.displaySelect}>
        <div onClick={() => viewTypeDisplay.setViewType(4)}>
          <ToggleButton value={"view"} className={`${classes.toggleButton}`}>
            <ViewComfy
              className={`${classes.icon} ${
                viewTypeDisplay.viewType === 4 && classes.selected
              }`}
            />
          </ToggleButton>
        </div>
        <div
          className={classes.toggleButton}
          onClick={() => viewTypeDisplay.setViewType(1)}
        >
          <ToggleButton value={"view"} className={`${classes.toggleButton}`}>
            <ViewColumn
              className={`${classes.icon}  ${
                viewTypeDisplay.viewType === 1 && classes.selected
              }`}
            />
          </ToggleButton>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
