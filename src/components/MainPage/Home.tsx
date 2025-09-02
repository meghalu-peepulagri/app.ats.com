import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CandidateTable, { Candidate } from "../an/ApplicantsTable";
import { useEffect, useRef } from "react";
import { Outlet, useSearch } from "@tanstack/react-router";
import { CandidateCountCard } from "../an/SingleCard";
import { ApiApplicant } from "~/lib/interface/applicants";
import { deleteApplicant, getAllApplicants, getStatsAPI } from "~/http/services/applicants";

const apiApplicantToCandidate = (records: ApiApplicant): Candidate => ({
  id: records.id,
  avatar: records.avatar,
  name: records.firstname + " " + records.lastName,
  position: records.role,
  status: records.status?.toUpperCase() || null,
});

export function Home() {
  const search: { search_string?: string; role?: string } = useSearch({ from: "/_header/_applicants" });
  const queryClient = useQueryClient();

  const { data: statsData, isLoading } = useQuery({
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
          pageParam ,
          search_string: search.search_string || "",
          role: search.role || "",
        }); 
        return response.data;
      },
      getNextPageParam: (lastPage) =>
        lastPage && lastPage?.paginationInfo?.next_page || undefined,
      initialPageParam: 1,
    });

    const deleteApplicantMutation = useMutation({
      mutationKey: ["deleteApplicant"],
      mutationFn: async (id: number) => {
        const response = await deleteApplicant(id);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["applicants"],
          exact: false,
        });
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

  const handleDeleteCandidate = async (id: number) => {
    try {
      await deleteApplicantMutation.mutateAsync(id);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
    <div className="flex items-center justify-center gap-4 m-2">
          <CandidateCountCard
            name="Total Candidates"
            number={statsData?.totalApplicants || 0}
            lineColor="border-[#9C1C24]"
            iconBgColor="bg-[#9C1C24]"
          />
          <CandidateCountCard
            name="Screened"
            number={statsData?.Screened || 0}
            lineColor="border-[#2F80ED]"
            iconBgColor="bg-[#2F80ED]"
          />
          <CandidateCountCard
            name="Rejected"
            number={statsData?.Rejected || 0}
            lineColor="border-[#556B2F]"
            iconBgColor="bg-[#556B2F]"
          />
          <CandidateCountCard
            name="Hired"
            number={statsData?.Hired || 0}
            lineColor="border-[#F2994A]"
            iconBgColor="bg-[#F2994A]"
          />
          <CandidateCountCard
            name="Joined"
            number={statsData?.Joined || 0}
            lineColor="border-[#556B2F]"
            iconBgColor="bg-[#556B2F]"
          />
    </div>
    <div className="grid grid-cols-[auto_1fr] border-t pt-2">
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <CandidateTable 
            candidatesData={candidatesData}
            onDeleteCandidate={handleDeleteCandidate}
            isLoading={isFetching} 
          />
          <div
            ref={loadMoreRef}
            className="flex items-center justify-center"
          >
            {isFetchingNextPage}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
    </div>
  );
}
