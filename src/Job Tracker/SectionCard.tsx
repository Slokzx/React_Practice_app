import { FC } from "react";
import { sample } from "./data";

const SectionCard: FC<{
  cardDetails: sample[];
  sectionTitle: string;
  onCardChange: (value: string, id: number) => void;
  sections: object;
}> = ({ cardDetails, sectionTitle, onCardChange, sections }) => {
  const sectionJobs = cardDetails.filter(
    (card) => card.status === sectionTitle
  );
  console.log(sectionJobs);
  return (
    <div className="section-panel">
      {sectionJobs.map((card, inx) => (
        <div key={inx} className="section-card">
          <div className="card-field">
            <label>Company:</label>
            <span>{card.company}</span>
          </div>
          <div className="card-field">
            <label>Date:</label>
            <span>{card.date}</span>
          </div>
          <div className="card-field">
            <label>Recruiter:</label>
            <span>{card.recruiter}</span>
          </div>
          <div className="card-field">
            <label>Status:</label>
            <select
              onChange={(e) => {
                onCardChange(e.target.value, card.id);
              }}
              value={card.status}
            >
              {Object.entries(sections).map((section, inx) => (
                <option key={inx}>{section[1]}</option>
              ))}
            </select>
          </div>
          <div className="card-field">
            <label>Favorite:</label>
            <span>{card.favourite ? "Yes" : "No"}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionCard;
