import React, { useState } from "react";
import { CreateProject, ExecuteProject, FundProject } from "../../sections";

const projects = [
  {
    project_name: "PROJECT NAME",
    community_address: "0x343...2321",
    totalFunds: 342.123,
    totalVotes: 1.123,
    subject: "Subject",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
  },
  {
    project_name: "PROJECT NAME",
    community_address: "0x343...2321",
    totalFunds: 342.123,
    totalVotes: 1.123,
    subject: "Subject",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
  },
  {
    project_name: "PROJECT NAME",
    community_address: "0x343...2321",
    totalFunds: 342.123,
    totalVotes: 1.123,
    subject: "Subject",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
  },
  {
    project_name: "PROJECT NAME",
    community_address: "0x343...2321",
    totalFunds: 342.123,
    totalVotes: 1.123,
    subject: "Subject",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
  },
  {
    project_name: "PROJECT NAME",
    community_address: "0x343...2321",
    totalFunds: 342.123,
    totalVotes: 1.123,
    subject: "Subject",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
  },
];

const Projects = () => {
  const [stageStage, setStageStage] = useState("EXECUTE_PROJECT");

  return (
    <>
      {/* Project Cards */}
      {stageStage === "CREATE_PROJECT" && <CreateProject />}
      {stageStage === "FUND_PROJECT" && <FundProject projects={projects} />}
      {stageStage === "EXECUTE_PROJECT" && <ExecuteProject projects={projects} />}
    </>
  );
};

export default Projects;
