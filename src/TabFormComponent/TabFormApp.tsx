import { useState } from "react";

const TabFormApp = () => {
    const [tabFormAge, setAge] = useState(0);
     
    setAge(40);
    
      return (
        <div className="tabForm">
          <h1>Tab Form Component</h1>
          <span>${tabFormAge}</span>
        </div>
      );
    };

export default TabFormApp;