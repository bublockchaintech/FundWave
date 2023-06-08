import React, { useEffect, useState } from "react";
import { CreateProject, ExecuteProject, FundProject, InitializeProject } from "../../sections";
import { Contract } from "ethers";
import { DAO_CONTRACT_ADDRESS, DAO_ABI } from "../../constants";

const Projects = ({ getProviderOrSigner, address, stageProjects, setStageProjects }) => {
  const [stageState, setStageState] = useState(null);
  const [stageCount, setStageCount] = useState(null);
  const [stageProjectsCount, setStageProjectsCount] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

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

  useEffect(() => {
    stageSection();
  }, []);
  return (
    <>
      {/* Project Cards */}

      {stageState === 0 && (
        <InitializeProject
          getProviderOrSigner={getProviderOrSigner}
          lastUpdate={lastUpdate}
          stageState={stageState}
          address={address}
        />
      )}
      {stageState === 1 && (
        <CreateProject
          getProviderOrSigner={getProviderOrSigner}
          lastUpdate={lastUpdate}
          stageState={stageState}
          address={address}
        />
      )}
      {stageState === 2 && (
        <FundProject
          projects={stageProjects}
          lastUpdate={lastUpdate}
          getProviderOrSigner={getProviderOrSigner}
          address={address}
          stageState={stageState}
          stageCount={stageCount}
          stageProjectsCount={stageProjectsCount}
          setStageProjects={setStageProjects}
        />
      )}
      {(stageState === 3 || stageState === 4) && (
        <ExecuteProject
          projects={stageProjects}
          lastUpdate={lastUpdate}
          getProviderOrSigner={getProviderOrSigner}
          stageState={stageState}
          address={address}
          stageCount={stageCount}
          stageProjectsCount={stageProjectsCount}
          setStageProjects={setStageProjects}
        />
      )}
    </>
  );
};

export default Projects;
