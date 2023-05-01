export default function IcdCodes(props: { codeArray: string [] }) {

    const codeDescriptions: {[key: string]: string} = require("../codemCodes.json");
    const newCodeArray = props.codeArray.filter(code => code in codeDescriptions);
    console.log("OLD CODE ARRAY:", props.codeArray);
    console.log("NEW CODE ARRAY:", newCodeArray);

    return (
      <div className="right-textbox">
        <div className="right-title">Suggested Codes</div>
        <div className="left-text">
        {newCodeArray
          .map((code, index) => { 
            return (
              <div className="code-boxes" >
                <span className="code-font">
                  {index + 1}. {code}
                </span>
                <div className="code-description">
                  {codeDescriptions[code]} 
                </div>
              </div>
            ); 
          })}        
            </div>
      </div>
    );
  }
