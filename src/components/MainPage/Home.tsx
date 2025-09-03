import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import CandidateTable, { Candidate } from "../an/ApplicantsTable";
import { useEffect, useRef } from "react";
import { Outlet, useNavigate, useSearch } from "@tanstack/react-router";
import { CandidateCountCard } from "../an/SingleCard";
import { ApiApplicant } from "~/lib/interface/applicants";
import {
  deleteApplicant,
  getAllApplicants,
  getStatsAPI,
} from "~/http/services/applicants";
import { useParams } from "@tanstack/react-router";

const apiApplicantToCandidate = (records: ApiApplicant): Candidate => ({
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
  const params = useParams({ strict: false });

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
     
      getNextPageParam: (lastPage) =>
        (lastPage && lastPage?.paginationInfo?.next_page) || undefined,
      initialPageParam: 1,
    });

  const deleteApplicantMutation = useMutation({
    mutationKey: ["deleteApplicant"],
    mutationFn: async (id: number) => {
      const response = await deleteApplicant(id);
      return response.data;
    },
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      if (String(params.applicant_id) === String(deletedId)) {
        navigate({ to: "/applicants", replace: true });
      }
    },
  });

  const candidatesData: Candidate[] =
    data?.pages.flatMap((page) =>
      page?.records?.map(apiApplicantToCandidate)
    ) || [];

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleDeleteCandidate = (id: number) => {
    deleteApplicantMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["applicants"] });
        queryClient.invalidateQueries({ queryKey: ["stats"] });
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4 m-2">
        <CandidateCountCard
          name="Total Applicants"
          number={statsData?.totalApplicants || 0}
          lineColor="border-[#9C1C24]"
          iconBgColor="bg-[#9C1C24]"
        />
        <CandidateCountCard
          name="Screened"
          number={statsData?.screened || 0}
          lineColor="border-[#2F80ED]"
          iconBgColor="bg-[#2F80ED]"
        />
        <CandidateCountCard
          name="Interview Scheduled"
          number={statsData?.interview_scheduled || 0}
          lineColor="border-[#556B2F]"
          iconBgColor="bg-[#556B2F]"
        />
        <CandidateCountCard
          name="Interviewed"
          number={statsData?.interviewed || 0}
          lineColor="border-[#F2994A]"
          iconBgColor="bg-[#F2994A]"
        />
        <CandidateCountCard
          name="Hired"
          number={statsData?.hired || 0}
          lineColor="border-[#556B2F]"
          iconBgColor="bg-[#556B2F]"
        />
      </div>
      <div className="grid grid-cols-[auto_1fr] border-t pt-2">
        <div className="flex-1 flex flex-col">
          <CandidateTable
            candidatesData={candidatesData}
            onDeleteCandidate={handleDeleteCandidate}
            isLoading={isFetching}
          />
          <div ref={loadMoreRef} className="flex items-center justify-center">
            {isFetchingNextPage}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
