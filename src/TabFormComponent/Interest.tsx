import type { ChangeEvent } from "react";
import type { TabComponentProps } from "./types";

const Interest = ({ data, setData, error }: TabComponentProps) => {
  const { interest } = data;

  const handleDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    setData((prevState) => {
      const nextInterest = checked
        ? [...prevState.interest, name]
        : prevState.interest.filter((item) => item !== name);
      return {
        ...prevState,
        interest: nextInterest,
      };
    });
  };

  return (
    <div className="interest">
      <div className="checkbox-input">
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={interest.includes("coding")}
            onChange={handleDataChange}
          />
          Coding
        </label>
        <label>
          <input
            type="checkbox"
            name="tennis"
            checked={interest.includes("tennis")}
            onChange={handleDataChange}
          />
          Tennis
        </label>
        <label>
          <input
            type="checkbox"
            name="cooking"
            checked={interest.includes("cooking")}
            onChange={handleDataChange}
          />
          Cooking
        </label>
        <label>
          <input
            type="checkbox"
            name="javascript"
            checked={interest.includes("javascript")}
            onChange={handleDataChange}
          />
          Javascript
        </label>
      </div>
      {error.interest && <span className="errors">{error.interest}</span>}
    </div>
  );
};

export default Interest;
