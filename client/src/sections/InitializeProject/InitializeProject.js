import React from "react";
import { Stage } from "../../components";
import "./InitializeProject.css";

const InitializeProject = ({ lastUpdate, getProviderOrSigner, stageState }) => {
  return (
    <>
      <Stage
        stage={"INITIALIZE_PROJECT"}
        lastUpdate={lastUpdate}
        stageState={stageState}
        getProviderOrSigner={getProviderOrSigner}
      />

      <div className="create_card card mt-5">
        <div className="row w-100">
          <div className="create_bg_in">
            <h1>Project Creation</h1>
            <h1>Will Start Soon!</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default InitializeProject;
