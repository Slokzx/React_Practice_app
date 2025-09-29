import { createContext, useContext, useState, type ReactNode } from "react";

type ButtonStatus = "" | "selected" | "disabled";

type ButtonState = Record<string, ButtonStatus>;

type ButtonContextType = {
  buttons: ButtonState;
  setButtonValue: (id: string, value: ButtonStatus) => void;
  setTotalCost: (increase: boolean, type: string) => void;
  payButton: () => void;
  totalCost: number;
};

const ButtonContext = createContext<ButtonContextType | undefined>(undefined);

export const ButtonProvider = ({ children }: { children: ReactNode }) => {
  const [buttons, setButtons] = useState<ButtonState>({});
  const [cost, setCost] = useState<number>(0);
  const setButtonValue = (id: string, value: ButtonStatus) => {
    setButtons((prev) => ({ ...prev, [id]: value }));
  };
  const setTotalCost = (increase: boolean, type: string) => {
    let ticketCost = 0;
    switch (type) {
      case "regular":
        ticketCost = 150;
        break;
      case "premium":
        ticketCost = 250;
        break;
      case "vip":
        ticketCost = 350;
        break;
      default:
        ticketCost = 0;
    }
    setCost((prev) => (increase ? prev + ticketCost : prev - ticketCost));
  };
  const payButton = () => {
    const newState = Object.fromEntries(
      Object.entries(buttons).map(([key, value]) => [
        key,
        value === "selected" ? "disabled" : value,
      ])
    ) as ButtonState;
    setButtons(newState);
    setCost(0);
  };

  return (
    <ButtonContext.Provider
      value={{
        buttons,
        setButtonValue,
        setTotalCost,
        payButton,
        totalCost: cost,
      }}
    >
      {children}
    </ButtonContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useButtons = () => {
  const context = useContext(ButtonContext);
  if (!context)
    throw new Error("useButtons must be used within ButtonProvider");
  return context;
};
