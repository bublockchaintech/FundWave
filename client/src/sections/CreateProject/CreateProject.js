import React, { useEffect, useState } from "react";
import { Stage } from "../../components";
import "./CreateProject.css";
import { Contract } from "ethers";
import { DAO_ABI, DAO_CONTRACT_ADDRESS } from "../../constants";

const CreateProject = ({ lastUpdate, getProviderOrSigner, stageState }) => {
  const [contractAddress, setContractAddress] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  console.log(stageState);

  const createProject = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, signer);
      const tx = await contract.createProject(contractAddress, title, subject, text);
      await tx.wait();
      alert("Project created succesfully.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Stage
        stage={"CREATE_PROJECT"}
        lastUpdate={lastUpdate}
        stageState={stageState}
        getProviderOrSigner={getProviderOrSigner}
      />

      <div className="create_card card mt-5">
        <div className="row w-100">
          <div className="create_bg col-6">
            <h1>Create</h1>
            <h1>Your</h1>
            <h1>Project!</h1>
            <h5>Your project will be put to the vote when the project collection phase is over. Good luck now!</h5>
          </div>
          <div className="col-6">
            <div className="card-body py-4">
              <form>
                <div className="form-label">
                  <label>Contract Address:</label>
                  <input
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    className="create_form_control form-control"
                  />
                </div>
                <div className="form-label">
                  <label for="text">Title:</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    id="title"
                    className="create_form_control form-control"
                  />
                </div>
                <div className="form-label">
                  <label>Subject:</label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    type="text"
                    name="subject"
                    id="subject"
                    className="create_form_control form-control"
                  />
                </div>
              </form>
              <h5>Explain your project:</h5>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="create_form_control form-control"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button onClick={createProject} className="create_btn btn mt-3">
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
