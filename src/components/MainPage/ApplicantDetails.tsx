import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams} from "@tanstack/react-router";
import { useEffect } from "react";
import { getApplicantById, updateApplicantRole, updateApplicantStatus } from "~/http/services/applicants";
import Profile from "../an/Profile";
import { CommentDetails } from "./CommentDetails";
import { getListRolesAPI } from "~/http/services/users";

export function Resume() {
  const {applicant_id: id} = useParams({strict:false})
  const queryClient = useQueryClient();
  
  const {data: resume, isFetching} = useQuery({
    queryKey: [`resume-${id}`, id],
    queryFn: async () => {
      const response = await getApplicantById(id as string);
      return response.data;
    },
  })

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
    mutationFn: async (newRole: string) => {
      return updateApplicantRole(id as string, { role: newRole });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`resume-${id}`, id] });
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  })

  const {data: roles} = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const response = await getListRolesAPI();
      return response;
    }
  })
  const roleOptions = roles?.data?.map((role: any) => (role.role));

  useEffect(() => {
    queryClient.invalidateQueries({  queryKey: [`resume-${id}`, id]});
  }, [id, queryClient]);

  if (isFetching) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  const name = resume?.first_name.charAt(0).toUpperCase()+resume?.first_name.slice(1).toLowerCase() + " " + resume?.last_name.charAt(0).toUpperCase()+resume?.last_name.slice(1).toLowerCase();
  const avatarImg = resume?.first_name?.charAt(0).toUpperCase() + resume?.last_name?.charAt(0).toUpperCase();

  function capitalize(word: string) {
    return word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : "";
  }
    return(
        <div className="flex gap-2 w-[100%]">
        <Profile
          key={id}
          avatarImg={avatarImg || "A"}
          name={name || ''}
          email={resume?.email || ''}
          phone={resume?.phone || ''}
          jobTitle={resume?.role || ''}
          applyTime={new Date(resume?.created_at).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }).replace(/\//g, '-').replace(/, /g, ' ')}
          resumeOptions={['Applied','Screened','Schedule_interview','Interviewed','Rejected', 'Hired', 'Joined',]}
          statusValue={capitalize(resume?.status)}
          roleValue={resume?.role || ''}
          resume_key_path={resume?.resume_key_path || ''}
          downloadUrl={resume?.presignedUrl.download_url || ''}
          onStatusChange={(newStatus) => updateStatusMutation.mutate(newStatus)}
          onRoleChange={(newRole) => updateRoleMutation.mutate(newRole)}
          roleOptions={roleOptions || []}

        />
        <CommentDetails applicant_id={resume?.id}/>
      </div>
    )
}