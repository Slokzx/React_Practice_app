import type { ChangeEvent } from "react";
import type { TabComponentProps, TabFormData } from "./types";

type ProfileField = keyof Pick<TabFormData, "name" | "age" | "email">;

const Profile = ({ data, setData, error }: TabComponentProps) => {
  const { name, age, email } = data;

  const handleDataChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: ProfileField,
  ) => {
    setData((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  return (
    <div className="profile">
      <div className="profile-input">
        <div className="input-item">
          <label> Name: </label>
          <input
            type="text"
            value={name}
            onChange={(event) => handleDataChange(event, "name")}
          />
          {error.name && <span className="errors">{error.name}</span>}
        </div>
        <div className="input-item">
          <label> Age: </label>
          <input
            type="number"
            value={age}
            onChange={(event) => handleDataChange(event, "age")}
          />
          {error.age && <span className="errors">{error.age}</span>}
        </div>
        <div className="input-item">
          <label> Email: </label>
          <input
            type="text"
            value={email}
            onChange={(event) => handleDataChange(event, "email")}
          />
          {error.email && <span className="errors">{error.email}</span>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
