export const getStatusColor = (status: string | null) => {
  switch (status) {
    case "SCREENING":
      return {
        bg: "bg-[rgba(130,0,222,0.10)]",
        text: "text-[#8200DE]",
      };
    case "INTERVIEWED":
      return {
        bg: "bg-[rgba(79,92,227,0.10)]",
        text: "text-[#4F5CE3]",
      };
    case "REJECTED":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
      };
    case "PENDING":
      return {
        bg: "bg-blue-100",
        text: "text-blue-800",
      };
    case "SHORTLISTED":
      return {
        bg: "bg-[rgba(242,153,74,0.10)]",
        text: "text-[#F2994A]",
      };
    case "JOINED":
      return {
        bg: "bg-[rgba(0,130,54,0.10)]",
        text: "text-[#008236]",
      };
    case "HIRED":
      return {
        bg: "bg-indigo-100",
        text: "text-indigo-800",
      };
    case "APPLIED":
      return {
        bg: "bg-cyan-100",
        text: "text-cyan-800",
      };
    case "APPROVED":
      return {
        bg: "bg-amber-100",
        text: "text-amber-800",
      };
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
      };
  }
};
