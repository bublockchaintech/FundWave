import { CreateProject } from "@/components/CreateProject";
import { ExecuteProject } from "@/components/ExecuteProject";
import { FundProject } from "@/components/FundProject";
import styles from "@/styles/Projects.module.css";
import Head from "next/head";
import { useState } from "react";

export default function () {
  const [stageStage, setStageStage] = useState("CREATE_PROJECT");
  function chooseStage() {
    setStageStage("CREATE_PROJECT");
    setStageStage("FUND_PROJECT");
    setStageStage("EXECUTE_PROJECT");
  }

  return (
    <>
      <Head>
        <title>Font Wave | Projects</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>

      {/* Project Cards */}
      {stageStage === "CREATE_PROJECT" && <CreateProject />}
      {stageStage === "FUND_PROJECT" && <FundProject />}
      {stageStage === "EXECUTE_PROJECT" && <ExecuteProject />}
    </>
  );
}
