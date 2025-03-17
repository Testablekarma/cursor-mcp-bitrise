const axios = require('axios');

class BitriseClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.baseURL = 'https://api.bitrise.io/v0.1';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `token ${this.accessToken}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async getBuildStatus(appSlug, buildSlug) {
    try {
      const response = await this.client.get(`/apps/${appSlug}/builds/${buildSlug}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get build status: ${error.message}`);
    }
  }

  async getLatestBuild(appSlug) {
    try {
      const response = await this.client.get(`/apps/${appSlug}/builds`, {
        params: {
          limit: 1,
          sort_by: 'created_at'
        }
      });
      return response.data.data[0];
    } catch (error) {
      throw new Error(`Failed to get latest build: ${error.message}`);
    }
  }

  async getBuildLog(appSlug, buildSlug) {
    try {
      const response = await this.client.get(`/apps/${appSlug}/builds/${buildSlug}/log`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get build log: ${error.message}`);
    }
  }

  async listApps() {
    try {
      const response = await this.client.get('/apps');
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to list apps: ${error.message}`);
    }
  }

  async abortBuild(appSlug, buildSlug) {
    try {
      const response = await this.client.post(`/apps/${appSlug}/builds/${buildSlug}/abort`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to abort build: ${error.message}`);
    }
  }
}

module.exports = BitriseClient;