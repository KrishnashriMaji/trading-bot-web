import api from "./api";

export const brokerService = {
  async getBrokers() {
    const response = await api.get("/brokers");
    return response.data;
  },

  async getSupportedBrokers() {
    const response = await api.get("/brokers/supported");
    return response.data;
  },

  async addBroker(brokerData) {
    const response = await api.post("/brokers", brokerData);
    return response.data;
  },

  async testConnection(brokerId, totp) {
    const response = await api.post(`/brokers/${brokerId}/connect`, totp);
    return response.data;
  },

  async removeBroker(brokerId) {
    const response = await api.delete(`/brokers/${brokerId}`);
    return response.data;
  },
};
