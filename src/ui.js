import {fetchCompanies} from "./api";
import {
  ACCOUNT_EXECUTIVE_FIELD_NAME,
  COMPANIES_TABLE_HEADERS,
  COMPANY_NAME_FIELD_NAME,
  CREATED_AT_FIELD_NAME,
  REVENUE_YTD_FIELD_NAME,
  STATUS_FIELD_NAME
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

  // Here we simply rearrange company fields in the order in which we want to display them in UI
  companies.map(company => {
    const row = [];

    // update REVENUE YTD with spacing for three numbers from right to left : 1000 -> 1 000
    let YTD = company[REVENUE_YTD_FIELD_NAME];
    const convertYTD = (YTD) => {
      let n = YTD.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return n;
    };
    let newYTD = convertYTD(YTD);
    
    // update CREATED AT format to HH:MM
    let time = company[CREATED_AT_FIELD_NAME];
    const convertTimeFormat = (time) => {
      let date = new Date(time);
      let h = date.getHours();
      let m = date.getMinutes();
      return `${h}:${m}`;
    };
    let newTime = convertTimeFormat(time);

    row.push(
      company[COMPANY_NAME_FIELD_NAME],
      company[STATUS_FIELD_NAME],
      newTime,
      newYTD,
      company[ACCOUNT_EXECUTIVE_FIELD_NAME]
    );
    companiesToDisplay.push(row);
  });

  // Programmatically create html table
  const table = document.createElement("table");
  document.body.appendChild(table); // Drew the main table node on the document

  companiesToDisplay.forEach(row => {
    const tr = table.insertRow(); //Create a new row

    row.forEach(column => {
      const td = tr.insertCell();
      td.innerText = column; // Take string from placeholder variable and append it to <tr> node
    });
  });
};