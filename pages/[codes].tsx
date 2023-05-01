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
    const splitCodes = codes.split(',');
    const codeArray: string [] = [];
    console.log("CODES", codes);
    splitCodes.forEach((elem: string) => {
      console.log("ELEMENT: ", elem);
      codeArray.push(elem.trim().replace(".", ""));
    });
    console.log("CODEARRAY", codeArray);
    /** */
    return(
        <div className="main-container">
            <LeftTextbox note={note} />
            <IcdCodes codeArray={codeArray} />
        </div>
    );
}

export default Results;