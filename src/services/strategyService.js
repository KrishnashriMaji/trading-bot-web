import api from "./api";

export const strategyService = {
  async getAvailableStrategies() {
    const response = await api.get("/strategies/templates");
    return response.data;
  },

  async getStrategies() {
    const response = await api.get("/strategies");
    return response.data;
  },

  async createStrategy(strategyData) {
    const response = await api.post("/strategies", strategyData);
    return response.data;
  },

  async removeStrategy(strategyId) {
    const response = await api.delete(`/strategies/${strategyId}`);
    return response.data;
  },
};
