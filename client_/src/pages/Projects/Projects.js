import React, { useEffect, useState } from "react";
import { CreateProject, ExecuteProject, FundProject } from "../../sections";
import { Contract } from "ethers";
import { DAO_CONTRACT_ADDRESS, DAO_ABI } from "../../constants";

const Projects = ({ getProviderOrSigner, address }) => {
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
    setStageProjectsCount(stage.projectCount);
    setStageState(stage.stageState);
    setLastUpdate(stage.updatedAt);
  };

  const getProjects = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
      for (let i = 1; i <= stageProjectsCount; i++) {
        const _project = await contract.stagesToProject(stageCount, i);
        console.log(_project);
        // TODO: Set project props
        // setProjects([...projects, {}]);
      }
    } catch (error) {
      console.log(error);
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
        <CreateProject
          getProviderOrSigner={getProviderOrSigner}
          lastUpdate={lastUpdate}
          stageState={stageState}
          address={address}
        />
      )}
      {stageState === 2 && (
        <FundProject
          projects={projects}
          lastUpdate={lastUpdate}
          getProviderOrSigner={getProviderOrSigner}
          address={address}
          stageState={stageState}
        />
      )}
      {(stageState === 3 || stageState === 4) && (
        <ExecuteProject
          projects={projects}
          lastUpdate={lastUpdate}
          getProviderOrSigner={getProviderOrSigner}
          stageState={stageState}
          address={address}
        />
      )}
    </>
  );
};

export default Projects;
