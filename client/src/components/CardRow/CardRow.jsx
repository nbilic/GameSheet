import useStyles from "./CardRowStyles";
import { Typography } from "@material-ui/core";

const CardRow = ({ type, arr }) => {
  const classes = useStyles({});
  return (
    <div>
      <Typography variant="body2">{type}:</Typography>
      <Typography variant="body2" className={classes.gameStats}>
        {arr?.map((option, index) => (
          <span key={option}>
            {`${option} ${index < arr.length - 1 ? "| " : ""}${
              type === "Chance to play" ? "%" : ""
            }`}
          </span>
        ))}
      </Typography>
    </div>
  );
};

export default CardRow;
