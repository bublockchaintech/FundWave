import React, { useEffect } from "react";
import { Stage } from "../../components";
import "./ExecuteProject.css";
import { Contract } from "ethers";
import { DAO_ABI, DAO_CONTRACT_ADDRESS } from "../../constants";
import Item from "./Item";
const ExecuteProject = ({
  projects,
  lastUpdate,
  getProviderOrSigner,
  address,
  stageState,
  stageCount,
  stageProjectsCount,
  setStageProjects,
}) => {
  useEffect(() => {
    const getProjects = async () => {
      try {
        const provider = await getProviderOrSigner();
        const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
        const projectsArr = [];
        for (let i = 1; i <= stageProjectsCount; i++) {
          const _project = await contract.stagesToProject(stageCount, i);
          projectsArr.push({
            project_name: _project.title,
            community_address: _project.ownerContractAddress,
            totalFunds: _project.totalFunds.toString() / 10 ** 18,
            totalVotes: _project.totalVotes.toString(),
            id: _project.id,
            subject: _project.subject,
            text: _project.explanation,
          });
        }
        setStageProjects(projectsArr);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  return (
    <>
      <Stage
        stage={"EXECUTE_PROJECT"}
        lastUpdate={lastUpdate}
        stageState={stageState}
        getProviderOrSigner={getProviderOrSigner}
      />
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4">
          {projects.map((project, i) => (
            <Item key={i} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ExecuteProject;
