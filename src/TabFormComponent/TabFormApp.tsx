import Interest from "./Interest";
import Profile from "./Profile";
import Settings from "./Settings";
import { useState } from "react";
import type { ComponentType } from "react";
import type {
  TabComponentProps,
  TabFormData,
  TabFormErrors,
} from "./types";
import "./TabForm.css"

type TabConfig = {
  name: string;
  component: ComponentType<TabComponentProps>;
  validate: () => boolean;
};

const TabFormApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<TabFormData>({
    name: "slok",
    age: "32",
    email: "slokshah92@gmail.com",
    interest: ["coding", "tennis", "cooking"],
    theme: "dark",
  });
  const [error, setErrors] = useState<TabFormErrors>({});

  const tabs: TabConfig[] = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        const err: TabFormErrors = {};
        if (!formData.name || formData.name.length < 2) {
          err.name = "Name is not valid";
        }

        const ageValue = Number(formData.age);
        if (!formData.age || Number.isNaN(ageValue) || ageValue < 18) {
          err.age = "Age is not valid";
        }

        if (!formData.email || formData.email.length < 2) {
          err.email = "Email is not valid";
        }

        setErrors(err);
        return Object.keys(err).length === 0;
      },
    },
    {
      name: "Interest",
      component: Interest,
      validate: () => {
        const err: TabFormErrors = {};
        if (formData.interest.length < 1) {
          err.interest = "Selected atleast 1 interest";
        }
        setErrors(err);
        return Object.keys(err).length === 0;
      },
    },
    {
      name: "Settings",
      component: Settings,
      validate: () => true,
    },
  ];

  const handleNextClick = () => {
    if (tabs[activeTab].validate()) {
      setActiveTab((prevTab) => prevTab + 1);
    }
  };

  const handlePreviousClick = () => {
    if (tabs[activeTab].validate()) {
      setActiveTab((prevTab) => prevTab - 1);
    }
  };

  const handleSubmitClick = () => {
    console.log(formData);
  };

  const ActiveTabComponent = tabs[activeTab].component;
  return (
    <div className="tabs-container">
      <div className="heading-container">
        {tabs.map((tab, tabIndex) => (
          <div
            key={tabIndex}
            className="heading"
            onClick={() => setActiveTab(tabIndex)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTabComponent
          data={formData}
          setData={setFormData}
          error={error}
        />
      </div>
      <div className="buttons">
        <div>
          {activeTab > 0 && (
            <button onClick={handlePreviousClick}>Previous</button>
          )}
        </div>
        <div>
          {activeTab < tabs.length - 1 && (
            <button onClick={handleNextClick}>Next</button>
          )}
        </div>
        <div>
          {activeTab === tabs.length - 1 && (
            <button onClick={handleSubmitClick}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabFormApp;
