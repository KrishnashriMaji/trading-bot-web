import api from "./api";

export const tradeService = {
  async getTrades(params = {}) {
    const response = await api.get("/trades", { params });
    return response.data;
  },

  async getStats() {
    const response = await api.get("/trades/stats");
    return response.data;
  },
};
