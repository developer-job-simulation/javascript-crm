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

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); //every three digits, add a space. it uses a lookahead regex.
  }

  //const hourRegex = //g

  function dateTo24HourFormat(dateString){
    let time = new Date(dateString)
    //let formattedTime = time.toISOString().substring(11,16) //so it converts it, then returns the hour and minute portion.
    let formattedTime = time.toLocaleTimeString([], {hour12: false, hour: 'numeric', minute:'numeric'})
    // console.log(formattedTime)
    return formattedTime
  }


  // Here we simply rearrange company fields in the order in which we want to display them in UI
  companies.map(company => {

    company[REVENUE_YTD_FIELD_NAME] = numberWithSpaces(company[REVENUE_YTD_FIELD_NAME]); 
    company[CREATED_AT_FIELD_NAME] = dateTo24HourFormat(company[CREATED_AT_FIELD_NAME]);

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

  companiesToDisplay.forEach(row => {
    const tr = table.insertRow(); //Create a new row

    row.forEach(column => {
      const td = tr.insertCell();
      td.innerText = column; // Take string from placeholder variable and append it to <tr> node
    });
  });
};