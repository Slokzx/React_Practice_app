import "./Buttons.css";

type ButtonProps = {
  seatType: string;
  onClick: (seatNumber: string, seatType: string) => void;
  seatNumber: string;
  selected?: boolean;
  disabled?: boolean;
  value?: string;
};

export const Buttons = ({
  seatType,
  onClick,
  seatNumber,
  selected,
  disabled,
  value,
}: ButtonProps) => {
  const classes = [
    "button",
    seatType,
    selected ? "selected" : "",
    disabled ? "disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={() => onClick(seatNumber, seatType)}
      value={seatNumber}
    >
      <span>{value}</span>
    </button>
  );
};
