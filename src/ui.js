import { fetchCompanies } from "./api";
import {
  ACCOUNT_EXECUTIVE_FIELD_NAME,
  COMPANIES_TABLE_HEADERS,
  COMPANY_NAME_FIELD_NAME,
  CREATED_AT_FIELD_NAME,
  REVENUE_YTD_FIELD_NAME,
  STATUS_FIELD_NAME,
} from "./constants";

export const makeTable = async () => {
  const companies = await fetchCompanies();
  // Print result of api call to the developer console
  // Uncomment if you need it for debugging.
  // While this method of logging variables of interest to the console is primitive, but often highly valuable debugging technique
  // console.log(companies);

  // Initialize new array and push a header row
  const companiesToDisplay = [];
  companiesToDisplay.push(COMPANIES_TABLE_HEADERS);

  // Convert formats of the date and revenue fields
  companies.map((company) => {
    company[CREATED_AT_FIELD_NAME] = convertTime(
      company[CREATED_AT_FIELD_NAME]
    );
    company[REVENUE_YTD_FIELD_NAME] = convertRevenue(
      company[REVENUE_YTD_FIELD_NAME]
    );
  });

  // Here we simply rearrange company fields in the order in which we want to display them in UI
  companies.map((company) => {
    const row = [];
    row.push(
      company[COMPANY_NAME_FIELD_NAME],
      company[STATUS_FIELD_NAME],
      company[CREATED_AT_FIELD_NAME],
      company[REVENUE_YTD_FIELD_NAME],
      company[ACCOUNT_EXECUTIVE_FIELD_NAME]
    );
    companiesToDisplay.push(row);
  });

  // Programmatically create html table
  const table = document.createElement("table");
  document.body.appendChild(table); // Drew the main table node on the document

  companiesToDisplay.forEach((row) => {
    const tr = table.insertRow(); //Create a new row

    row.forEach((column) => {
      const td = tr.insertCell();
      td.innerText = column; // Take string from placeholder variable and append it to <tr> node
    });
  });
};

//Converts ISO 8061 time to 24-hour hh:mm format
function convertTime(dateString) {
  let oldTime = new Date(dateString);
  let newTime = oldTime.toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  return newTime;
}

//Adds a space at every thousandth place in the revenue
function convertRevenue(revenueString) {
  let revenue = Array.from(String(revenueString), Number);
  for (let i = revenue.length - 3; i > 0; i -= 3) {
    revenue.splice(i, 0, " ");
  }
  revenue = revenue.join("");
  return revenue;
}
