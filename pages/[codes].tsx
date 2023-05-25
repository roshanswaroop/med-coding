import type { NextPage } from "next";
import { useRouter } from "next/router";
import LeftTextbox from "../components/LeftTextbox";
import IcdCodes from "../components/IcdCodes";

const Results: NextPage = () => {
    const router = useRouter();
    /* SHOW ERROR MESSAGE */
    if (!router.query.codes) {
        return (
            <h1>
                We're sorry, an error has occurred. Please try again. 
            </h1>
        )
    } 
    const codes: string = router.query.codes as string;
    const note: string = router.query.note as string;
    console.log("CODES", codes);
    const splitCodes = codes.split('\n');
    const codeArray: string [] = [];
    const explanations: string [] = [];
    splitCodes.forEach((elem: string) => {
      console.log("ELEMENT: ", elem);
      if (elem.includes("Code:")) {
        codeArray.push(elem.replace("Code: ", "").replace(".", "").trim());
      } else if (elem.includes("Explanation:")) {
        explanations.push(elem.replace("Explanation: ", "").trim());
      }
    });
    console.log("CODEARRAY", codeArray);
    console.log("EXPLANAITONS ARRAY", explanations);

    /** */
    return(
        <div className="main-container">
            <LeftTextbox note={note} />
            <IcdCodes codeArray={codeArray} explanations={explanations} />
        </div>
    );
}

export default Results;