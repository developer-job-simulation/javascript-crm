import axios from 'axios';
import { BACKEND_BASE_URI, COMPANIES_API_PATH } from './constants';

/*
  Fetch list of all companies from backend
 */
export const fetchCompanies = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URI}${COMPANIES_API_PATH}`
    );

    return response.data;
  } catch (err) {
    console.log(`Error occurred while fetching companies. Error: ${err}`);
    throw err;
  }
};
