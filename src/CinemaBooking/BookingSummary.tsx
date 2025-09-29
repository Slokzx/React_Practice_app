import { useButtons } from "./appContext";

export const BookingSummary = () => {
  const { totalCost, buttons, payButton } = useButtons();
  const numberOfSeats = Object.values(buttons).filter(
    (status) => status === "selected"
  ).length;
  const selectedSeats = Object.keys(buttons)
    .filter((key) => buttons[key] === "selected")
    .join(", ");

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          margin: "15px",
          alignItems: "start",
        }}
      >
        <span style={{ fontSize: "20px" }}>
          <b>Booking Summary</b>
        </span>
        <span> Selected Seats: {selectedSeats}</span>
        <span> Number of Seats: {numberOfSeats}</span>
        <span style={{ fontSize: "20px", color: "green" }}>
          <b>Total: $ {totalCost}</b>
        </span>
      </div>
      <div style={{ marginTop: "50px" }}>
        <button
          style={{
            marginTop: "20px",
            padding: "15px",
            width: "100%",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "10px",
            backgroundColor: selectedSeats.length === 0 ? "gray" : "green",
            color: "white",
            cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer",
          }}
          onClick={() => {
            payButton();
          }}
          disabled={selectedSeats.length === 0}
        >
          Book {numberOfSeats} Seats(s)
        </button>
      </div>
    </div>
  );
};
