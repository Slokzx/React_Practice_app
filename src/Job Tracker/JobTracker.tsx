import "./JobTracker.css";
import { FC, useState } from "react";
import { sampleJobs } from "./data";
import SectionCard from "./SectionCard";
import SectionCardAdd from "./SectionAddForm";

const JobTracker = () => {
  enum sections {
    recruiter = "recruiter",
    initial = "initial round",
    hiring = "hiring",
    finalRound = "final round",
  }

  const SectionTitle: FC<{ title: string }> = ({ title }) => {
    return (
      <div className="section-title-card">
        <span className="section-title">{title}</span>
      </div>
    );
  };

  const onCardChange = (value: object, id: number) => {
    console.log(value, id);
  };

  const addCard = (value: object) => {
    console.log(value, "cardDetails");
    const newValue = { ...value, id: currentJobs.length + 1 };
    setCurrentJob([...currentJobs, newValue]);
  };

  
  const [currentJobs, setCurrentJob] = useState(sampleJobs);

  return (
    <div className="weather-app">
      <header>
        <h1>Job Tracker</h1>
      </header>
      <main>
        <section>
          <div className="job-tracker-section">
            {Object.entries(sections).map((title, inx) => {
              console.log(title);
              return (
                <div key={inx} className="job-section">
                  <SectionTitle title={title[1]} />
                  <SectionCard
                    cardDetails={currentJobs}
                    sectionTitle={title[1]}
                    onCardChange={onCardChange}
                    sections={sections}
                  />
                </div>
              );
            })}
          </div>

          <SectionCardAdd addCard={addCard} sections={sections} />
        </section>
      </main>
    </div>
  );
};

export default JobTracker;
