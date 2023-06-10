// ehr_request.ts

import axios, { AxiosResponse } from 'axios';

export async function getEHRData(uuid: string, token: string): Promise<AxiosResponse> {
  try {
    console.log("ENTERED EHR,", uuid);
    const response = await axios.get('/api/ehr_proxy', {
      headers: {
        'accept': 'application/json',
        'uuid': uuid,
        'token': token
      }
    });

    return response;
  } catch (error) {
    console.error(`Error occurred while fetching EHR data: ${error}`);
    throw error;
  }
}

export async function getPatientData(token: string): Promise<AxiosResponse> {
    try {
      console.log("ENTERED PATIENT");
      const response = await axios.get('/api/patient_proxy', {
        headers: {
          'accept': 'application/json',
          'token': token
        }
      });
  
      return response;
    } catch (error) {
      console.error(`Error occurred while fetching PATIENT data: ${error}`);
      throw error;
    }
  }

export async function getAccessToken(): Promise<AxiosResponse> {
    try {
      console.log("ENTERED GET TOKEN");
      const response = await axios.get('/api/get_token', {
        headers: {
          'accept': 'application/json'
        }
      });
  
      return response;
    } catch (error) {
      console.error(`Error occurred while fetching TOKEN data: ${error}`);
      throw error;
    }
  }