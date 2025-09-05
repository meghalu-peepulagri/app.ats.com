import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import CandidateTable, { Candidate } from "../an/ApplicantsTable";
import { useCallback, useRef, useState } from "react";
import {
  Outlet,
  useNavigate,
  useSearch,
  useParams,
} from "@tanstack/react-router";
import { CandidateCountCard } from "../an/SingleCard";
import { ApiApplicant } from "~/lib/interface/applicants";
import {
  deleteApplicant,
  getAllApplicants,
  getStatsAPI,
} from "~/http/services/applicants";
import DeleteDialog from "~/lib/helper/DeleteDialog";
import { HiredIcon } from "../icons/stats/HiredIcon";
import { GroupIcon } from "../icons/stats/GroupIcon";
import { ScreenedIcon } from "../icons/stats/ScreenedIcon";
import { InterviewScheduledIcon } from "../icons/stats/InterviewScheduledIcon";
import { InterviewedIcon } from "../icons/stats/InterviewedIcon";

const apiApplicantToCandidate = (records: ApiApplicant): any => ({
  id: records.id,
  avatar: records.avatar,
  name:
    records.firstname.charAt(0).toUpperCase() +
    records.firstname.slice(1).toLowerCase() +
    " " +
    records.lastName.charAt(0).toUpperCase() +
    records.lastName.slice(1).toLowerCase(),
  position: records.role,
  status: records.status?.toUpperCase() || null,
});

export function Home() {
  const search: { search_string?: string; role?: string } = useSearch({
    from: "/_header/_applicants",
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { applicant_id: id } = useParams({ strict: false });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<any | null>(null);

  const { data: statsData } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await getStatsAPI();
      return response.data;
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["applicants", search.search_string, search.role],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getAllApplicants({
          pageParam,
          search_string: search.search_string || "",
          role: search.role || "",
        });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage || !lastPage.paginationInfo) return undefined;
        if (lastPage.paginationInfo.current_page < lastPage.paginationInfo.total_pages) {
          return lastPage.paginationInfo.current_page + 1;
        }
        return undefined;
      },
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    });

  const deleteApplicantMutation = useMutation({
    mutationKey: ["deleteApplicant"],
    mutationFn: async (id: number) => {
      const response = await deleteApplicant(id);
      return response.data;
    },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({
        queryKey: ["applicants", search.search_string, search.role],
      });
      const previousData = queryClient.getQueryData([
        "applicants",
        search.search_string,
        search.role,
      ]);

      queryClient.setQueryData(
        ["applicants", search.search_string, search.role],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              records: page.records.filter(
                (record: ApiApplicant) => record.id !== deletedId
              ),
            })),
          };
        }
      );

      return { previousData };
    },
    onError: (_error, _deletedId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["applicants", search.search_string, search.role],
          context.previousData
        );
      }
    },
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({
        queryKey: ["applicants", search.search_string, search.role],
      });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      setIsDeleteDialogOpen(false);
      if (id && String(id) === String(deletedId)) {
        navigate({ to: "/applicants", replace: true });
      } else if (id) {
        queryClient.invalidateQueries({ queryKey: ["applicant", id] });
      }
    },
  });

  const candidatesData: Candidate[] =
    data?.pages.flatMap((page) =>
      page?.records?.map(apiApplicantToCandidate)
    ) || [];

  const observer = useRef<IntersectionObserver | null>(null);
  const lastRowRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (isFetching || isFetchingNextPage || !hasNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { root: null, rootMargin: "0px", threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [isFetching, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const onDeleteId = (field: any) => {
    setDeleteId(field);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteApplicantMutation.mutate(deleteId.id, {
        onSettled: () => {
          setIsDeleteDialogOpen(false);
        },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4 m-2">
        <CandidateCountCard
          name="Total Applicants"
          number={statsData?.totalApplicants || 0}
          lineColor="border-[#9C1C24]"
          iconBgColor="bg-[#9C1C24]"
          icon={<GroupIcon />}
        />
        <CandidateCountCard
          name="Screened"
          number={statsData?.screened || 0}
          lineColor="border-[#2F80ED]"
          iconBgColor="bg-[#2F80ED]"
          icon={<ScreenedIcon />}
        />
        <CandidateCountCard
          name="Scheduled Interview"
          number={statsData?.interview_scheduled || 0}
          lineColor="border-[#556B2F]"
          iconBgColor="bg-[#556B2F]"
          icon={<InterviewScheduledIcon />}
        />
        <CandidateCountCard
          name="Interviewed"
          number={statsData?.interviewed || 0}
          lineColor="border-[#F2994A]"
          iconBgColor="bg-[#F2994A]"
          icon={<InterviewedIcon />}
        />
        <CandidateCountCard
          name="Hired"
          number={statsData?.hired || 0}
          lineColor="border-[#556B2F]"  
          iconBgColor="bg-[#556B2F]"
          icon={<HiredIcon />}
        />
      </div>

      <div className="grid grid-cols-[1fr_2.5fr] border-t pt-2">
        <div className="flex-1 flex flex-col">
          <CandidateTable
            candidatesData={candidatesData}
            isLoading={isFetching && !isFetchingNextPage}
            onDeleteId={onDeleteId}
            lastRowRef={lastRowRef}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>

        <DeleteDialog
          openOrNot={isDeleteDialogOpen}
          label="Are you sure you want to delete this candidate?"
          onCancelClick={() => setIsDeleteDialogOpen(false)}
          onOKClick={handleDeleteConfirm}
          deleteLoading={deleteApplicantMutation.isPending}
          buttonLable="Yes! Delete"
        />

        <Outlet />
      </div>
    </div>
  );
}
