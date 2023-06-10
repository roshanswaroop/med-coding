// pages/api/ehr_proxy.ts

import axios from 'axios';
import https from 'https'; // import https module
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("ENTERED EHR PROXY")
    console.log("token within EHR:", req.headers.token);
    // Create new httpsAgent instance with `rejectUnauthorized` set to false
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });
    const request_url = 'https://ec2-18-236-204-32.us-west-2.compute.amazonaws.com/apis/default/fhir/Encounter' + "?patient=" + req.headers.uuid;
    console.log("REQ URL:", request_url);
    const response = await axios.get(request_url, {
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + req.headers.token,
      },
      httpsAgent // Add httpsAgent to axios request config
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error occurred while fetching EHR data: ${error}`);
    console.error(error.response.data);
    res.status(500).json({ error: 'An error occurred while fetching EHR data.' });
  }
  
}

export default handler;
