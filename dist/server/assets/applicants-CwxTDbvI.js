import { $ as $fetch } from "./button-r8v9fEsh.js";
const uploadFileAPI = async (file) => {
  try {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const fileName = file.name.split(".")[0];
    const data = await $fetch.post("/files/upload", {
      file_type: fileExtension,
      file_name: fileName
    });
    const { target_url } = data.data.data;
    if (!target_url) {
      throw new Error("Presigned URL is missing");
    }
    return {
      ...data,
      message: data.message || "File uploaded successfully"
    };
  } catch (error) {
    throw error;
  }
};
const uploadTos3 = async ({ url, file }) => {
  try {
    const response = await uploadToS3API(url, file);
    if (!response.ok) {
      throw new Error("Failed to upload file to storage");
    }
  } catch (error) {
    throw error;
  }
};
const uploadToS3API = async (url, file) => {
  try {
    const options = {
      method: "PUT",
      body: file
    };
    return await fetch(url, options);
  } catch (err) {
    throw err;
  }
};
const createUserAPI = async (userData) => {
  try {
    const response = await $fetch.post("/applicants", userData);
    if (!response.success) {
      throw {
        status: response.status,
        message: response.data?.message || response.message || "Request failed",
        errors: response.data?.errors
      };
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
const updateUserAPI = async (id, userData) => {
  try {
    const response = await $fetch.patch(`/applicants/${id}`, userData);
    if (!response.success) {
      throw {
        status: response.status,
        message: response.data?.message || response.message || "Request failed",
        errors: response.data?.errors
      };
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
const addUserRoleAPI = async (role) => {
  try {
    const response = await $fetch.post("/roles", { role });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getListRolesAPI = async () => {
  try {
    const response = await $fetch.get("/roles");
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getAllApplicants = async ({ pageParam = 1, search_string, role, status }) => {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: "15"
  });
  if (search_string && search_string.trim() !== "") {
    params.append("search_string", search_string);
  }
  if (role && role !== "All" && role.trim() !== "") {
    params.append("role", role);
  }
  if (status && status !== "All" && status.trim() !== "") {
    params.append("status", status);
  }
  const response = await $fetch.get(`/applicants?${params.toString()}`);
  return response.data;
};
const deleteApplicant = async (id) => {
  try {
    const response = await $fetch.delete(`/applicants/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getApplicantById = async (id) => {
  try {
    const response = await $fetch.get(`/applicants/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const updateApplicantStatus = async (id, payload) => {
  try {
    const response = await $fetch.patch(`/applicants/${id}/status`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const updateApplicantRole = async (id, payload) => {
  try {
    const response = await $fetch.patch(`/applicants/${id}/role`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getStatsAPI = async () => {
  try {
    const response = await $fetch.get("/applicants/dashboard/stats");
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getCommentsAPI = async (applicant_id) => {
  try {
    const response = await $fetch.get(`/comments/${applicant_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const updateCommentById = async (id, payload) => {
  try {
    const response = await $fetch.post(`/comments/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export {
  getStatsAPI as a,
  getAllApplicants as b,
  getApplicantById as c,
  deleteApplicant as d,
  uploadTos3 as e,
  createUserAPI as f,
  getListRolesAPI as g,
  updateUserAPI as h,
  addUserRoleAPI as i,
  getCommentsAPI as j,
  updateCommentById as k,
  updateApplicantStatus as l,
  updateApplicantRole as m,
  uploadFileAPI as u
};
