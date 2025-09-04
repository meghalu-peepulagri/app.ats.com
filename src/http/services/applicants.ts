import { $fetch } from "../fetch";
import { ApplicantPayload, ApplicantResponse, ApplicantErrorResponse, CommentPayload, ApplicantsResponse, getAllApplicantsParams } from "../../lib/interface/applicants";
import { UserFormData } from "./users";

export const getAllApplicants = async ({ pageParam = 1, search_string, role }: getAllApplicantsParams): Promise<ApplicantsResponse> => {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: "20",
  });
  if (search_string && search_string.trim() !== "") {
    params.append("search_string", search_string);
  }
  if (role && role !== "All" && role.trim() !== "") {
    params.append("role", role);
  }
  const response = await $fetch.get(`/applicants?${params.toString()}`);
  return response.data;
};

export const createApplicant = async (payload: ApplicantPayload): Promise<ApplicantResponse | ApplicantErrorResponse> => {
  try {
    const response = await $fetch.post("/applicants", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteApplicant = async (id: number) => {
  try {
    const response = await $fetch.delete(`/applicants/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getApplicantById = async (id: string | number) => {
  try {
    const response = await $fetch.get(`/applicants/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateApplicantStatus = async (id: string | number, payload : any) => {
  try {
    const response = await $fetch.patch(`/applicants/${id}/status`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateApplicantRole = async (id: string | number, payload : any) => {
  try {
    const response = await $fetch.patch(`/applicants/${id}/role`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getStatsAPI = async () => {
  try {
    const response = await $fetch.get('/applicants/dashboard/stats');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCommentsAPI = async (applicant_id: string | number, page: number) => {
  try {
    const response = await $fetch.get(`/comments/${applicant_id}?page=${page}&limit=20`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCommentById = async (id: string | number, payload: CommentPayload) => {
  try {
    const response = await $fetch.post(`/comments/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};