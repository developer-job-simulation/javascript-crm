import { fetchCompanies } from './api';
import {
  ACCOUNT_EXECUTIVE_FIELD_NAME,
  COMPANIES_TABLE_HEADERS,
  COMPANY_NAME_FIELD_NAME,
  CREATED_AT_FIELD_NAME,
  REVENUE_YTD_FIELD_NAME,
  STATUS_FIELD_NAME,
} from './constants';

export const makeTable = async () => {
  const companies = await fetchCompanies();

  // Initialize new array and push a header row
  const companiesToDisplay = [];
  companiesToDisplay.push(COMPANIES_TABLE_HEADERS);

  // Here we simply rearrange company fields in the order in which we want to display them in UI
  companies.map((company) => {
    const createdAtHour = new Date(company[CREATED_AT_FIELD_NAME])
      .getHours()
      .toString()
      .padStart(2, '0');

    const createdAtMinute = new Date(company[CREATED_AT_FIELD_NAME])
      .getMinutes()
      .toString()
      .padStart(2, '0');

    const humanReadableCreatedAt = `${createdAtHour}:${createdAtMinute}`;

    const row = [];
    row.push(
      company[COMPANY_NAME_FIELD_NAME],
      company[STATUS_FIELD_NAME],
      humanReadableCreatedAt,
      company[REVENUE_YTD_FIELD_NAME].toLocaleString().replaceAll(',', ' '),
      company[ACCOUNT_EXECUTIVE_FIELD_NAME]
    );
    companiesToDisplay.push(row);
  });

  // Programmatically create html table
  const table = document.createElement('table');
  document.body.appendChild(table); // Drew the main table node on the document

  companiesToDisplay.forEach((row) => {
    const tr = table.insertRow(); //Create a new row

    row.forEach((column) => {
      const td = tr.insertCell();
      td.innerText = column; // Take string from placeholder variable and append it to <tr> node
    });
  });
};
