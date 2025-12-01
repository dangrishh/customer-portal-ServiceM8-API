export interface ServiceM8Job {
  job_uuid: string;
  job_number?: number;
  job_description?: string;
  client_email?: string;
  client_contact_email?: string;
  client_name?: string;
  company_name?: string;
  job_state?: string;
  [key: string]: unknown;
}

export interface ServiceM8Attachment {
  attachment_uuid: string;
  filename?: string;
  job_uuid: string;
  [key: string]: unknown;
}
