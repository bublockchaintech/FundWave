import React from "react";
import { Stage } from "../../components";
import "./CreateProject.css";

const CreateProject = () => {
  return (
    <>
      <Stage stage={"CREATE_PROJECT"} />
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
                  <label for="text">Contract Address:</label>
                  <input type="text" name="name" id="name" className="create_form_control form-control"></input>
                </div>
                <div className="form-label">
                  <label for="text">Title:</label>
                  <input type="text" name="title" id="title" className="create_form_control form-control"></input>
                </div>
                <div className="form-label">
                  <label for="text">Subject:</label>
                  <input type="text" name="subject" id="subject" className="create_form_control form-control"></input>
                </div>
              </form>
              <h5>Explain your project:</h5>
              <textarea name="" id="" cols="30" rows="10" className="create_form_control form-control"></textarea>
            </div>
            <button className="create_btn btn mt-3">Create</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
