import React, { useState } from 'react';

export default function AppealsInfo(props: { 
    denialReason: string, 
    denialCode: string, 
    patientName: string,
    claimNumber: string,
    policyNumber: string,
    diagnosisCode: string,

}) {

    const [reason, setReason] = useState(props.denialReason);
    const [code, setCode] = useState(props.denialCode);
    const [patientName, setPatientName] = useState(props.patientName);
    const [claimID, setClaimID] = useState(props.claimNumber);
    const [policyNumber, setPolicyNumber] = useState(props.policyNumber);
    const [diagnosisCode, setDiagnosisCode] = useState(props.diagnosisCode);

    const labels = [
        "Denial Reason",
        "Denial Code",
        "Patient Name",
        "Claim Number",
        "Policy Number",
        "Diagnosis Code"
    ];

    const data = [
        reason,
        code,
        patientName,
        claimID,
        policyNumber,
        diagnosisCode
    ]

    return (
        <div>
        <div className="right-title">Claim Information</div>
        <div className="left-text">
        {labels
          .map((label, index) => { 
            return (
              <div className="code-boxes" >
                <span className="code-font">
                  {index + 1}. {label}
                </span>
                <div className="code-description">
                    <input 
                        type="text" 
                        value={data[index]} 
                        // onChange={handleChange} 
                        className="form-input"
                    />                
                </div>
              </div>
            ); 
          })}        
            </div>
        </div>

    );

    // function MyForm() {
    // const [name, setName] = useState('John Doe');

    // const handleNameChange = (event) => {
    //     setName(event.target.value);
    // };

    // return (
    //     <div>
    //     <label>
    //         Name:
    //         <input type="text" value={name} onChange={handleNameChange} />
    //     </label>
    //     </div>
    // );
    // }

    // export default MyForm;

  }
