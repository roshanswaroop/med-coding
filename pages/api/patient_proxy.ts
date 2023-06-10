// pages/api/proxy.ts

import axios from 'axios';
import https from 'https'; // import https module
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      console.log("ENTERED PROXY");
      console.log("token within patient proxy: ", req.headers.token);
      // Create new httpsAgent instance with `rejectUnauthorized` set to false
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false
      });
  
      const response = await axios.get('https://ec2-18-236-204-32.us-west-2.compute.amazonaws.com/apis/default/fhir/Patient', {
        headers: {
          'accept': 'application/json',
        //   'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVdzlRT3RjN0Jmc3dEV0NITm5VaEd3UXlfa2p0aTJRZEN3Tm5FZjRPVFlFIiwianRpIjoiZGJjMWViYWUwZjlhODMwMGU2NTA2NzQ5YjBjODA1YTU3NjdhMDVlMDhmODdmNzVjNzQ1YTJiMGI0MTU3ZGRkNTVmZjc2MDljOGQ1MmQwZGEiLCJpYXQiOjE2ODY0MTYzNDEuNjQ0NTIsIm5iZiI6MTY4NjQxNjM0MS42NDQ1MjIsImV4cCI6MTY4NjQxOTk0MS42Mjg3OTgsInN1YiI6Ijk5NjA0Yjk2LTJiNzktNDkxMi05ZjI1LTI2M2ZkZGU5M2RiNCIsInNjb3BlcyI6WyJvcGVuaWQiLCJvZmZsaW5lX2FjY2VzcyIsImFwaTpvZW1yIiwiYXBpOmZoaXIiLCJ1c2VyL0FsbGVyZ3lJbnRvbGVyYW5jZS5yZWFkIiwidXNlci9DYXJlVGVhbS5yZWFkIiwidXNlci9Db25kaXRpb24ucmVhZCIsInVzZXIvQ292ZXJhZ2UucmVhZCIsInVzZXIvRW5jb3VudGVyLnJlYWQiLCJ1c2VyL0ltbXVuaXphdGlvbi5yZWFkIiwidXNlci9Mb2NhdGlvbi5yZWFkIiwidXNlci9NZWRpY2F0aW9uLnJlYWQiLCJ1c2VyL01lZGljYXRpb25SZXF1ZXN0LnJlYWQiLCJ1c2VyL09ic2VydmF0aW9uLnJlYWQiLCJ1c2VyL09yZ2FuaXphdGlvbi5yZWFkIiwidXNlci9Pcmdhbml6YXRpb24ud3JpdGUiLCJ1c2VyL1BhdGllbnQucmVhZCIsInVzZXIvUGF0aWVudC53cml0ZSIsInVzZXIvUHJhY3RpdGlvbmVyLnJlYWQiLCJ1c2VyL1ByYWN0aXRpb25lci53cml0ZSIsInVzZXIvUHJhY3RpdGlvbmVyUm9sZS5yZWFkIiwidXNlci9Qcm9jZWR1cmUucmVhZCIsInNpdGU6ZGVmYXVsdCJdfQ.hyJbC-v1aR28HEmJ5WxfBftO0tIcUm1WyQiGn2za_ClNt5l4mRAPBhNNgg4AI0JQ7-HrDwuPUNkvO9W6nEyq77TPFzRiripFyW8L88Ce6xQfIhcN9N2a-TjsfbYvvQdkhbtW-8dGe3bk_VVKKXCoZwMxbJBtNr5PvI3cFE8y9ftCdW_QQ9hglzI_tGWU0mzLYtjNcNJT39hAPo9yBlshA155r7iJqNws_dEcuyux3klJQTqKl70GXGQAlRU8ZrXLeVFlgECN-5_f3y4nZljLZ61tFGcxh0Vq8CtgOUSefsD59i9em7oi-oLh8yX0IFbtVMZQZ172b-mz4YQcXFkf-A'
          'Authorization': 'Bearer ' + req.headers.token,
        },
        httpsAgent // Add httpsAgent to axios request config
      });
  
      res.status(200).json(response.data);
    } catch (error) {
      console.error(`Error occurred while fetching Patient data: ${error}`);
      console.error(error.response.data);
      res.status(500).json({ error: 'An error occurred while fetching Patient data.' });
    }
  }

export default handler;
