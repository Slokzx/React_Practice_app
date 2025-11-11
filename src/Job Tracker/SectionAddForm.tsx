import { FC, useState } from "react";

const SectionCardAdd: FC<{
  sections: object;
  addCard: (cardDetails: object) => void;
}> = ({ addCard, sections }) => {
  const [cardDetails, setCardDetails] = useState({
    company: "",
    date: "",
    recruiter: "",
    status: "",
    favourite: "No",
  });

  const onInputChange = (value: string, field: string) => {
    setCardDetails({
      ...cardDetails,
      [field]: value,
    });
  };

  const handleAdd = () => {
    addCard(cardDetails);
    setCardDetails({
      company: "",
      date: "",
      recruiter: "",
      status: "",
      favourite: "No",
    });
  };

  return (
    <div className="section-card-form">
      <div className="card-field">
        <label>Company:</label>
        <input
          onChange={(e) => {
            onInputChange(e.target.value, "company");
          }}
          value={cardDetails.company}
        />
      </div>
      <div className="card-field">
        <label>Date:</label>
        <input
          onChange={(e) => {
            onInputChange(e.target.value, "date");
          }}
          type="date"
          value={cardDetails.date}
        />
      </div>
      <div className="card-field">
        <label>Recruiter:</label>
        <input
          onChange={(e) => {
            onInputChange(e.target.value, "recruiter");
          }}
          value={cardDetails.recruiter}
        />
      </div>
      <div className="card-field">
        <label>Status:</label>
        <select
          onChange={(e) => {
            onInputChange(e.target.value, "status");
          }}
          value={cardDetails.status}
        >
          {Object.entries(sections).map((section, inx) => (
            <option key={inx}>{section[1]}</option>
          ))}
        </select>
      </div>
      <div className="card-field">
        <label>Favorite:</label>
        <select
          onChange={(e) => {
            onInputChange(e.target.value, "favourite");
          }}
          value={cardDetails.favourite}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default SectionCardAdd;
