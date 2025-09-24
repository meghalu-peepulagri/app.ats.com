import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  getApplicantById,
  updateApplicantRole,
  updateApplicantStatus,
} from "~/http/services/applicants";
import { getListRolesAPI } from "~/http/services/users";
import Profile from "../an/Profile";
import { Skeleton } from "../ui/skeleton";
import { CommentDetails } from "./CommentDetails";
import { InitialPage } from "./InitialPage";

export function Resume() {
  const { applicant_id: id } = useParams({ strict: false });
  const queryClient = useQueryClient();

  const { data: resume, isFetching} = useQuery({
    queryKey: [`resume-${id}`, id],
    queryFn: async () => {
      const response = await getApplicantById(id as string);
      return response.data;
    },
    // onError: (error : any) => {
    //   console.log(error, 'error');
    // },
    enabled: !!id
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
    "Pipeline",
    "Rejected",
    "Hired",
    "Joined",
  ].map((option) =>
    option === "Schedule_interview" ? "Schedule Interview" : option
  );

  if (isFetching) {
    return (
      <div className="flex gap-2 w-full bg-white p-2">
        <div className="flex-1 flex flex-col gap-2 border rounded-md">
          <Skeleton className="h-16 w-full rounded-md" /> 
          <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-1/3 rounded-md" /> 
          <Skeleton className="h-8 w-1/3 rounded-md" />
          </div>
          <Skeleton className="h-[calc(100vh-263px)] w-full rounded-md" /> 
        </div>
        <div className="w-[32%] flex flex-col gap-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    );
  }

  if (!resume && !isFetching) {
    return (
        <InitialPage/>
    );
  }

  return (
    <div className="flex gap-2 w-full">
      {isFetching ? 
          <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex flex-col gap-2 p-4">
          <Skeleton className="h-6 w-1/4 rounded-md" />
          <Skeleton className="h-6 w-1/4 rounded-md" />
          <Skeleton className="h-[calc(100vh-263px)] w-full rounded-md" />
        </div>
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
