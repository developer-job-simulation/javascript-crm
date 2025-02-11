import axios from "axios";
import { BACKEND_BASE_URI, COMPANIES_API_PATH } from "./constants";

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
    // Rethrowing error here. If we don't do this, then this function is going to return 'undefined' as opposed to throwing an error
    // If undefined is returned, execution of program will continue. We don't want that, because in our app it will only wreak havoc down the line
    // We'd rather stop throwing an error - which we do.
    throw err;
  }
};
