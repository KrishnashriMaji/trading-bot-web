import api from "./api";

export const botService = {
  async getBots() {
    const response = await api.get("/bots");
    return response.data;
  },

  async getBot(id) {
    const response = await api.get(`/bots/${id}`);
    return response.data;
  },

  async createBot(botData) {
    const response = await api.post("/bots", botData);
    return response.data;
  },

  async startBot(id) {
    const response = await api.post(`/bots/${id}/start`);
    return response.data;
  },

  async stopBot(id) {
    const response = await api.post(`/bots/${id}/stop`);
    return response.data;
  },

  async deleteBot(id) {
    const response = await api.delete(`/bots/${id}`);
    return response.data;
  },
};
