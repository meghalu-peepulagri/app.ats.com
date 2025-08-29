import { getAllApplicants, getStatsAPI } from "@/app/http/services/applicants";
import { ApiApplicant } from "@/app/lib/interface/applicants";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import CandidateTable, { Candidate } from "../an/ApplicantsTable";
import { useEffect, useRef } from "react";
import { Outlet } from "@tanstack/react-router";
import { CandidateCountCard } from "../an/SingleCard";

const apiApplicantToCandidate = (applicant: ApiApplicant): Candidate => ({
  id: applicant.id,
  avatar: applicant.avatar,
  name: applicant.firstname,
  position: applicant.role,
  status: applicant.status?.toUpperCase() || null,
});

export function Home() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await getStatsAPI();
      return response.data;
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["applicants"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getAllApplicants({ pageParam });
        return response.data;
      },
      getNextPageParam: (lastPage) =>
        lastPage.pagination?.next_page || undefined,
      initialPageParam: 1,
    });

  const candidatesData: Candidate[] =
    data?.pages.flatMap((page) =>
      page.applicants.map(apiApplicantToCandidate)
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

  const totalApplicants = statsData?.totalApplicants || 0;
  const recentApplicants = statsData?.recentApplicants || 0;
  const rejected = statsData?.stats?.find(
    (stat) => stat.status === "REJECTED"
  ).count;
  const hired = statsData?.stats?.find((stat) => stat.status === "HIRED").count;
  const inProgress = statsData?.stats?.reduce((acc, stat) => {
    if (
      stat.status === "SCREENING" ||
      stat.status === "INTERVIEWED" ||
      stat.status === "PENDING" ||
      stat.status === "SHORTLISTED"
    ) {
      return acc + parseInt(stat.count);
    }
    return acc;
  }, 0);

  return (
    <div>
    <div className="flex items-center justify-center gap-4 m-2">
          <CandidateCountCard
            name="Total Candidates"
            number={totalApplicants}
            lineColor="border-[#9C1C24]"
            iconBgColor="bg-[#9C1C24]"
          />
          <CandidateCountCard
            name="New Applicants"
            number={recentApplicants}
            lineColor="border-[#2F80ED]"
            iconBgColor="bg-[#2F80ED]"
          />
          <CandidateCountCard
            name="In Progress"
            number={inProgress}
            lineColor="border-[#F2994A]"
            iconBgColor="bg-[#F2994A]"
          />
          <CandidateCountCard
            name="Hired"
            number={hired}
            lineColor="border-[#556B2F]"
            iconBgColor="bg-[#556B2F]"
          />
          <CandidateCountCard
            name="Rejected"
            number={rejected}
            lineColor="border-[#556B2F]"
            iconBgColor="bg-[#556B2F]"
          />
    </div>
    <div className="grid grid-cols-[auto_1fr] border-t pt-3">
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <CandidateTable candidatesData={candidatesData} />
          <div
            ref={loadMoreRef}
            className="flex items-center justify-center"
          >
            {isFetchingNextPage && <span>Loading more...</span>}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
    </div>
  );
}
