import React, { useState } from "react";
import { CreateProject, ExecuteProject, FundProject } from "../../sections";

const Projects = () => {
  const [stageStage, setStageStage] = useState("FUND_PROJECT");

  return (
    <>
      {/* Project Cards */}
      {stageStage === "CREATE_PROJECT" && <CreateProject />}
      {stageStage === "FUND_PROJECT" && <FundProject />}
      {stageStage === "EXECUTE_PROJECT" && <ExecuteProject />}
    </>
  );
};

export default Projects;
