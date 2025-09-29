import "./Buttons.css";
import { Buttons } from "./Buttons";
import { useButtons } from "./appContext";

enum SeatingType {
  regular = "regular",
  premium = "premium",
  vip = "vip",
}

type SeatDistribution = Record<SeatingType, number>;

type SeatingArrangementProps = {
  numberOfColumn: number;
  seatDistribution: SeatDistribution;
};

const numberToLetter = (n: number): string => {
  if (n <= 0) return "";

  const alphabetLength = 26;
  let value = n;
  let label = "";

  while (value > 0) {
    const remainder = (value - 1) % alphabetLength;
    label = String.fromCharCode("A".charCodeAt(0) + remainder) + label;
    value = Math.floor((value - 1) / alphabetLength);
  }

  return label;
};

export const SeatingArrangement = ({
  numberOfColumn,
  seatDistribution,
}: SeatingArrangementProps) => {
  const { buttons, setButtonValue, setTotalCost } = useButtons();

  const totalRows =
    seatDistribution.regular +
    seatDistribution.premium +
    seatDistribution.vip;

  const rowLabels = Array.from({ length: totalRows }, (_, index) =>
    numberToLetter(index + 1)
  );

  const onButtonClick = (seatNumber: string, seatType: string) => {
    if (!seatNumber) return;

    if (buttons[seatNumber] === "selected") {
      setButtonValue(seatNumber, "");
      setTotalCost(false, seatType);
    } else {
      setButtonValue(seatNumber, "selected");
      setTotalCost(true, seatType);
    }
  };

  const renderRows = (
    startIndex: number,
    rows: number,
    type: SeatingType
  ) => {
    if (rows <= 0) {
      return null;
    }

    return (
      <div style={{ margin: "5px" }}>
        {Array.from({ length: rows }, (_, rowOffset) => {
          const rowValue = rowLabels[startIndex + rowOffset];
          if (!rowValue) {
            return null;
          }

          return (
            <div key={`${type}-${rowValue}`} style={{ display: "flex" }}>
              <div style={{ width: "5%", margin: "auto" }}>
                <span>{rowValue}</span>
              </div>
              <div
                style={{
                  width: "95%",
                  display: "grid",
                  gridTemplateColumns: `repeat(${numberOfColumn}, auto)`,
                  gap: "4px",
                  margin: "4px",
                }}
              >
                {Array.from({ length: numberOfColumn }, (_, columnIndex) => {
                  const seatNumber = `${rowValue}${columnIndex + 1}`;
                  return (
                    <Buttons
                      key={seatNumber}
                      seatType={type}
                      onClick={onButtonClick}
                      seatNumber={seatNumber}
                      selected={buttons[seatNumber] === "selected"}
                      disabled={buttons[seatNumber] === "disabled"}
                      value={String(columnIndex + 1)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {renderRows(0, seatDistribution.regular, SeatingType.regular)}
      {renderRows(
        seatDistribution.regular,
        seatDistribution.premium,
        SeatingType.premium
      )}
      {renderRows(
        seatDistribution.regular + seatDistribution.premium,
        seatDistribution.vip,
        SeatingType.vip
      )}
    </div>
  );
};
