import { getAllApplicants } from "@/app/http/services/applicants";
import { ApiApplicant } from "@/app/lib/interface/applicants";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import CandidateTable, { Candidate } from "../an/ApplicantsTable";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "@tanstack/react-router";

const apiApplicantToCandidate = (applicant: ApiApplicant): Candidate => ({
  id: applicant.id,
  avatar: applicant.avatar,
  name: applicant.firstname,
  position: applicant.role,
  status: applicant.status?.toUpperCase() || null,
});

export function Home() {
  // const {data: statsData, isLoading,} = useQuery({
  //   queryKey: ['stats'],
  //   queryFn: async () => {
  //     const response = await getStatsAPI();
  //     console.log(response.data);
  //     return response.data;
  //   },
  // })
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

  return (
    <div className="grid grid-cols-[auto_1fr]">
      <div className="flex-1 flex flex-col">
        {/* <CandidateCountCard /> */}
        <div className="flex-1">
          <CandidateTable candidatesData={candidatesData} />
          <div
            ref={loadMoreRef}
            className="h-10 flex items-center justify-center"
          >
            {isFetchingNextPage && <span>Loading more...</span>}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
