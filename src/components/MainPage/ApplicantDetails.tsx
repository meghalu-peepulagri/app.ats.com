import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  getApplicantById,
  updateApplicantRole,
  updateApplicantStatus,
} from "~/http/services/applicants";
import Profile from "../an/Profile";
import { CommentDetails } from "./CommentDetails";
import { getListRolesAPI } from "~/http/services/users";
import LoadingComponent from "~/lib/helper/LoadingComponent";

export function Resume() {
  const { applicant_id: id } = useParams({ strict: false });
  const queryClient = useQueryClient();

  const { data: resume, isFetching} = useQuery({
    queryKey: [`resume-${id}`, id],
    queryFn: async () => {
      const response = await getApplicantById(id as string);
      return response.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      return updateApplicantStatus(id as string, { status: newStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`resume-${id}`, id] });
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async (newRoleId: number) => {
      return updateApplicantRole(id as string, { role_id: newRoleId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`resume-${id}`, id] });
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await getListRolesAPI();
      return response;
    },
  });
  const roleOptions = roles?.data?.map((role: any) => ({
    id: role.id,
    name: role.role
  }));

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [`resume-${id}`, id] });
  }, [id, queryClient]);


  const name =
    resume?.first_name.charAt(0).toUpperCase() +
    resume?.first_name.slice(1).toLowerCase() +
    " " +
    resume?.last_name.charAt(0).toUpperCase() +
    resume?.last_name.slice(1).toLowerCase();
  const avatarImg =
    resume?.first_name?.charAt(0).toUpperCase() +
    resume?.last_name?.charAt(0).toUpperCase();

  function capitalize(word: string) {
    return word
      ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      : "";
  }
  const resumeOptions = [
    "Applied",
    "Screened",
    "Schedule_interview",
    "Interviewed",
    "Rejected",
    "Hired",
    "Joined",
  ].map((option) =>
    option === "Schedule_interview" ? "Schedule Interview" : option
  );

  return (
    <div className="flex gap-2 w-full bg-[#f8f8f8]">
      {isFetching ? 
          <LoadingComponent loading={isFetching} />
        : (
      <>
      <Profile
        key={id}
        avatarImg={avatarImg || "A"}
        name={name || ""}
        email={resume?.email || ""}
        phone={resume?.phone || ""}
        jobTitle={resume?.role || ""}
        applyTime={new Date(resume?.created_at)
          .toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .replace(/\//g, "-")
          .replace(/, /g, " ")}
        resumeOptions={resumeOptions}
        statusValue={resume?.status === "SCHEDULE_INTERVIEW" ? "Schedule Interview" : capitalize(resume?.status)}
        roleValue={resume?.role_id ? String(resume.role_id) : ""}
        resume_key_path={resume?.resume_key_path || ""}
        downloadUrl={resume?.presignedUrl.download_url || ""}
        onStatusChange={(newStatus) => updateStatusMutation.mutate(newStatus)}
        onRoleChange={(newRoleId) => updateRoleMutation.mutate(parseInt(newRoleId))}
        roleOptions={roleOptions ?? []}
      />
      <CommentDetails applicant_id={resume?.id} />
      </>
      )}
    </div>
  );
}
