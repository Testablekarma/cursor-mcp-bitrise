const BitriseClient = require('./bitrise');
require('dotenv').config();

class CursorBitriseMCP {
  constructor() {
    const token = process.env.BITRISE_ACCESS_TOKEN;
    if (!token) {
      throw new Error('BITRISE_ACCESS_TOKEN environment variable is required');
    }
    this.client = new BitriseClient(token);
  }

  async getBuildStatus({ appSlug, buildSlug }) {
    try {
      const build = buildSlug 
        ? await this.client.getBuildStatus(appSlug, buildSlug)
        : await this.client.getLatestBuild(appSlug);

      return {
        success: true,
        data: {
          status: build.status,
          startedAt: build.started_on,
          finishedAt: build.finished_on,
          triggeredBy: build.triggered_by,
          branch: build.branch,
          workflow: build.triggered_workflow,
          buildNumber: build.build_number
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getBuildLog({ appSlug, buildSlug }) {
    try {
      const log = await this.client.getBuildLog(appSlug, buildSlug);
      return {
        success: true,
        data: log
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async listApps() {
    try {
      const apps = await this.client.listApps();
      return {
        success: true,
        data: apps.map(app => ({
          slug: app.slug,
          title: app.title,
          repoUrl: app.repo_url,
          status: app.status
        }))
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async abortBuild({ appSlug, buildSlug }) {
    try {
      const result = await this.client.abortBuild(appSlug, buildSlug);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = CursorBitriseMCP;