export const getStatusColor = (status: string | null) => {
  switch (status) {
    case "SCREENED":
      return {
        bg: "bg-[rgba(130,0,222,0.10)]",
        text: "text-[#8200DE]",
      };
    case "REJECTED":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
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
    case "SCHEDULE_INTERVIEW":
      case "SCHEDULE INTERVIEW":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
      };
    case "INTERVIEWED":
      return {
        bg: "bg-pink-100",
        text: "text-pink-800",
      };
      case "PIPELINE":
      return {
        bg: "bg-blue-100",
        text: "text-blue-800",
      }
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
      };
  }
};
