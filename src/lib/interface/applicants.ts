export interface ApiApplicant {
  id: number;
  firstname: string;
  email: string;
  phone: string;
  role: string;
  status: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  avatar: string;
  position: string;
}

export interface ApplicantsResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    paginationInfo: {
      total_records: number;
      total_pages: number;
      page_size: number;
      current_page: number;
      next_page: number | null;
      prev_page: number | null;
    };
    records: ApiApplicant[];
  };
}

export interface ApplicantPayload {
  firstname: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

export interface CommentPayload {
  comment_description?: string | undefined;
}
export interface ApplicantResponse {
  status: number;
  success: boolean;
  message: string;
  data: ApiApplicant;
}

export interface ApplicantErrorResponse {
  status: number;
  success: false;
  message: string;
  errData: {
    firstname?: string[];
    email?: string[];
    phone?: string[];
    role?: string[];
    status?: string[];
  };
}

export interface PaginationInfo {
  total_records: number;
  total_pages: number;
  page_size: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
}

export interface getAllApplicantsParams {
  pageParam: number;
  search_string: string;
  role: string;
}