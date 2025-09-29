import "./Buttons.css";
import { BookingSummary } from "./BookingSummary";
import { ButtonProvider } from "./appContext";
import { SeatingArrangement } from "./SeatingArrangement";

const seatArrangements = {
  regular: 4,
  premium: 3,
  vip: 2,
};

const CinemaBookingApp = () => {
  return (
    <ButtonProvider>
      <div className="cinema-booking">
        <h1>AMC Movie Theatre</h1>
        <hr
          style={{
            borderRadius: "15px",
            height: "15px",
            backgroundColor: "grey",
            width: "90%",
            margin: "1.5rem auto",
          }}
        />
        <span>SCREEN</span>
        <SeatingArrangement
          seatDistribution={seatArrangements}
          numberOfColumn={12}
        />
        <BookingSummary />
      </div>
    </ButtonProvider>
  );
};

export default CinemaBookingApp;
