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
    company[REVENUE_YTD_FIELD_NAME] = formatRevenue(company[REVENUE_YTD_FIELD_NAME]); 
    company[CREATED_AT_FIELD_NAME] = formatTime(company[CREATED_AT_FIELD_NAME]);
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

// format Revenue column to thousand
function formatRevenue(rev){
  let revArray = rev.toString().split('').map(Number);
  let counter = revArray.length;
  while(counter-3>0){
    counter-=3;
    revArray.splice(counter, 0,' '); 
  }
  return revArray.join("");
}

// display date in 24-hour format
function formatTime(time){
  let dt = new Date(time);
  let options = {timeStyle:'short', hour12:false, timeZone:'UTC'};
  return dt.toLocaleString('en', options)
}