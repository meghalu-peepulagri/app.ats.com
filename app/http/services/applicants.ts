import { $fetch } from "../fetch";
import { ApplicantPayload, ApplicantResponse, ApplicantErrorResponse, CommentPayload, ApiApplicant, ApplicantsResponse } from "../../lib/interface/applicants";

export const getAllApplicants = async ({ pageParam = 1 }): Promise<ApplicantsResponse> => {
  const response = await $fetch.get(`/applicants?page=${pageParam}&limit=10`);
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

export const updateApplicant = async (id: string | number, payload: ApplicantPayload): Promise<ApplicantResponse | ApplicantErrorResponse> => {
  try {
    const response = await $fetch.patch(`/applicants/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStatsAPI = async () => {
  try {
    const response = await $fetch.get('/applicants/dashboard/stats');
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