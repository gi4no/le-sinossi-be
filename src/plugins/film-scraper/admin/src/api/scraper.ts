import axiosInstance from "../../src/utils/axiosInstance";

const scrapeRequest = {
  getScrapeResult: async () => {
    const data = await axiosInstance.get(`/film-scraper/scraper`);
    return data;
  },
  saveScrapeResult: async (data: any) => {
    const result = await axiosInstance.post(`/film-scraper/scraper/save`, data);
    return result;
  },
  deleteScrapeResult: async () => {
    const result = await axiosInstance.delete("/film-scraper/scraper/delete");
    return result;
  },
};
export default scrapeRequest;
