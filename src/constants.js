/*
  Storing string constants in a separate file is a good practice to use.
  Why do this? Because here they are a single source of truth - if the change here, they will change everywhere else, too.
 */
export const BACKEND_BASE_URI = "http://localhost:3000";
export const COMPANIES_API_PATH = "/companies";

export const COMPANIES_TABLE_HEADERS = ["Company Name", "Status", "Created At", "Revenue YTD", "Account Executive"];

export const COMPANY_NAME_FIELD_NAME = "name";
export const STATUS_FIELD_NAME = "status";
export const CREATED_AT_FIELD_NAME = "created_at";
export const REVENUE_YTD_FIELD_NAME = "revenue_ytd";
export const ACCOUNT_EXECUTIVE_FIELD_NAME = "account_executive";