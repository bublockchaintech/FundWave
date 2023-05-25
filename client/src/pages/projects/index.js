import { CreateProject } from "@/components/CreateProject";
import { ExecuteProject } from "@/components/ExecuteProject";
import { FundProject } from "@/components/FundProject";
import Head from "next/head";
import { useState } from "react";

export default function () {
  const [stageStage, setStageStage] = useState("EXECUTE_PROJECT");

  return (
    <>
      <Head></Head>

      {/* Project Cards */}
      {stageStage === "CREATE_PROJECT" && <CreateProject />}
      {stageStage === "FUND_PROJECT" && <FundProject />}
      {stageStage === "EXECUTE_PROJECT" && <ExecuteProject />}
    </>
  );
}
