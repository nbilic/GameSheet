import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import useStyles from "./FilterButtonsStyles";
const FilterButtons = ({ options, setAlignment, alignment }) => {
  const classes = useStyles({});
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
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
            <p
              className={`${
                option == alignment ? classes.selectedItem : classes.filterItem
              }`}
            >
              {`${option}`}
            </p>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default FilterButtons;
