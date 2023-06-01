import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import LeftTextbox from "../../components/LeftTextbox";
import AppealsInfo from "../../components/AppealsInfo";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Results: NextPage = () => {
    const router = useRouter();
    /* SHOW ERROR MESSAGE */
    if (!router.query.appeals) {
        return (
            <h1>
                We're sorry, an error has occurred. Please try again. 
            </h1>
        )
    } 
    const denialNote: string = decodeURIComponent(router.query.appeals as string);
    const fileURL: string = decodeURIComponent(router.query.url as string);
    console.log("url", fileURL);
    console.log("note", denialNote);

    const denialReason = "We do not deem there is medical necessity for this treatment,.";
    const code = "CO-50";
    const patientName = "Jane Doe"
    const claimID = "1KEJVN909329KNFE"
    const policyNumber = "38298327"
    const diagnosisCode = "TM40.11"
    /** */
    return(
        <div className="main-container">
            <div className="left-textbox">
                <Document file={fileURL}>
                <Page pageNumber={1} />
                </Document>
            </div>
            <div className="right-textbox">
                <AppealsInfo 
                    denialReason={denialReason} 
                    denialCode={code} 
                    patientName={patientName}
                    claimNumber={claimID}
                    policyNumber={policyNumber}
                    diagnosisCode={diagnosisCode}
                />
            </div>
        </div>
    );
}

export default Results;