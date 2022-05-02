import axios from "axios";
import { BACKEND_BASE_URI, COMPANIES_API_PATH } from "./constants";

/*
  Fetch list of all companies from backend
 */
export const fetchCompanies = async () => {
  try {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const response = await axios.get(
      `${BACKEND_BASE_URI}${COMPANIES_API_PATH}`
    );
    //for each company, format revenue_ytd field to USD
    response.data.forEach((company) => {
      company.revenue_ytd = formatter.format(company.revenue_ytd);
      company.created_at = dateFormatter.format(new Date(company.created_at));
    });
    return response.data;
  } catch (err) {
    console.log(`Error occurred while fetching companies. Error: ${err}`);
    // Rethrowing error here. If we don't do this, then this function is going to return 'undefined' as opposed to throwing an error
    // If undefined is returned, execution of program will continue. We don't want that, because in our app it will only wreak havoc down the line
    // We'd rather stop throwing an error - which we do.
    throw err;
  }
};
