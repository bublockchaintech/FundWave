import React, { useEffect, useState } from "react";
import { CreateProject, ExecuteProject, FundProject } from "../../sections";
import { Contract } from "ethers";
import { DAO_CONTRACT_ADDRESS, DAO_ABI } from "../../constants";

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

const Projects = ({ getProviderOrSigner }) => {
  const [stageState, setStageState] = useState(null);
  const [stageCount, setStageCount] = useState(null);
  const [stageProjectsCount, setStageProjectsCount] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [projects, setProjects] = useState([]);

  const stageSection = async () => {
    const provider = await getProviderOrSigner();
    const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
    const _stageCount = await contract.stageCount();
    const stage = await contract.stages(_stageCount);
    setStageCount(_stageCount);
    setStageProjectsCount(stage.projectsCount);
    setStageState(stage.stageState);
    setLastUpdate(stage.updatedAt);
  };

  const getProjects = async () => {
    const provider = await getProviderOrSigner();
    const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
    for (let i = 1; i <= stageProjectsCount; i++) {
      const _project = await contract.stagesToProject(stageCount, i);
      setProjects([...projects, _project]);
    }
  };

  useEffect(() => {
    stageSection();
    getProjects();
  }, []);

  return (
    <>
      {/* Project Cards */}

      {(stageState === 0 || stageState === 1) && (
        <CreateProject getProviderOrSigner={getProviderOrSigner} lastUpdate={lastUpdate} />
      )}
      {stageState === 2 && <FundProject projects={projects} lastUpdate={lastUpdate} />}
      {(stageState === 3 || stageState === 4) && <ExecuteProject projects={projects} lastUpdate={lastUpdate} />}
    </>
  );
};

export default Projects;
