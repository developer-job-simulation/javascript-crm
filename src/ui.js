import {fetchCompanies} from "./api";
import {
  ACCOUNT_EXECUTIVE_FIELD_NAME,
  COMPANIES_TABLE_HEADERS,
  COMPANY_NAME_FIELD_NAME,
  CREATED_AT_FIELD_NAME,
  REVENUE_YTD_FIELD_NAME,
  STATUS_FIELD_NAME
} from "./constants";

let dateConverter = (data)=>{
  var newDate = ''
  let date = new Date (data)
  if (date.getUTCHours.length >= 2 ){
    newDate = date.getUTCHours()+':'+date.getMinutes()
    return  newDate 
  }else{
    newDate = '0'+ date.getUTCHours()+':'+date.getMinutes()
  }

  return  newDate 



}

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};


export const makeTable = async () => {
  const companies = await fetchCompanies();
  // Print result of api call to the developer console
  // Uncomment if you need it for debugging.
  // While this method of logging variables of interest to the console is primitive, but often highly valuable debugging technique
  // console.log(companies);
  //let date = new Date(companies[0].created_at)
  
  //console.log(date.getUTCHours()+':'+date.getMinutes())

  //let test = companies[0].created_at
  //console.log('test'+dateConverter(test))

  console.log(numberWithSpaces(companies[0].revenue_ytd))

  for (var i = 0; i< companies.length;i++){
    companies[i].created_at = dateConverter(companies[i].created_at)
    companies[i].revenue_ytd = numberWithSpaces(companies[i].revenue_ytd)
  }

  // Initialize new array and push a header row
  const companiesToDisplay = [];
  companiesToDisplay.push(COMPANIES_TABLE_HEADERS);

  // Here we simply rearrange company fields in the order in which we want to display them in UI
  companies.map(company => {
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