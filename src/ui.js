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

  const convert_time_format = (dateString)=>{
    const hour = dateString.slice(11, 13).padStart(2, "0");
    const minute = dateString.slice(14, 16);
    return hour+":"+minute;
  }

  const convert_revenue_format_readable = (ori_str)=>{
    
    if(ori_str.length<=3)
      return String(ori_str);
    
    let reversedStr = (String(ori_str)).split("").reverse().join("");

    let temp_array = [];
    let temp_str1 = undefined;
    let temp_str2 = reversedStr;

    while(temp_str2.length>3){
      temp_str1 = temp_str2.slice(0,3);
      temp_array.push(temp_str1);
      temp_str2 = temp_str2.slice(3);
      if(temp_str2.length<=3)
        temp_array.push(temp_str2);
    }
    let new_str = temp_array.join(" ").split("").reverse().join("");

    return new_str;
  }

  // Here we simply rearrange company fields in the order in which we want to display them in UI
  companies.map(company => {

    console.log();
    const row = [];
    row.push(
      company[COMPANY_NAME_FIELD_NAME],
      company[STATUS_FIELD_NAME],
      convert_time_format(company[CREATED_AT_FIELD_NAME]),
      convert_revenue_format_readable(company[REVENUE_YTD_FIELD_NAME]),
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