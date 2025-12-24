import { useQuery } from "@tanstack/react-query";
import { PortfolioContent } from "@/types/portfolio";
import localData from "@/data/portfolio-content.json";

const fetchPortfolioData = async (): Promise<PortfolioContent> => {
  return localData as PortfolioContent;
};

export const usePortfolioData = () => {
  return useQuery({
    queryKey: ["portfolio-content"],
    queryFn: fetchPortfolioData,
    staleTime: Infinity,
  });
};
