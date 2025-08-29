/**
 * GitHub API service for managing blog files
 */

interface GitHubConfig {
  owner: string;
  repo: string;
  token: string;
  branch?: string;
}

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content?: string;
  encoding?: string;
}

export class GitHubAPI {
  private config: GitHubConfig;
  private baseUrl = 'https://api.github.com';

  constructor() {
    this.config = {
      owner: process.env.GITHUB_OWNER || '',
      repo: process.env.GITHUB_REPO || '',
      token: process.env.GITHUB_TOKEN || '',
      branch: process.env.GITHUB_BRANCH || 'main'
    };

    if (!this.config.owner || !this.config.repo || !this.config.token) {
      throw new Error('Missing required GitHub configuration. Please set GITHUB_OWNER, GITHUB_REPO, and GITHUB_TOKEN environment variables.');
    }
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    console.log(`GitHub API Request: ${url}`);
    console.log(`Using token: ${this.config.token ? this.config.token.substring(0, 10) + '...' : 'NOT SET'}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `token ${this.config.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Jobhack-Blog',
        'X-GitHub-Api-Version': '2022-11-28',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`GitHub API Error: ${response.status} ${response.statusText}`);
      console.error(`Error details: ${error}`);
      throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${error}`);
    }

    const data = await response.json();
    console.log(`GitHub API Response: Success`);
    return data;
  }

  /**
   * Get file content and metadata
   */
  async getFile(filePath: string): Promise<GitHubFile> {
    const endpoint = `/repos/${this.config.owner}/${this.config.repo}/contents/${filePath}`;
    return this.makeRequest(endpoint);
  }

  /**
   * Delete a file from the repository
   */
  async deleteFile(filePath: string, message: string): Promise<void> {
    try {
      // First, get the file to obtain its SHA
      const file = await this.getFile(filePath);
      
      const endpoint = `/repos/${this.config.owner}/${this.config.repo}/contents/${filePath}`;
      
      await this.makeRequest(endpoint, {
        method: 'DELETE',
        body: JSON.stringify({
          message,
          sha: file.sha,
          branch: this.config.branch,
        }),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete file ${filePath}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Search for files by pattern in the posts directory
   */
  async searchPostFiles(pattern?: string): Promise<GitHubFile[]> {
    const endpoint = `/repos/${this.config.owner}/${this.config.repo}/contents/content/posts`;
    
    try {
      const files = await this.makeRequest(endpoint);
      
      if (!Array.isArray(files)) {
        return [];
      }

      let filteredFiles = files.filter((file: GitHubFile) => 
        file.type === 'file' && file.name.endsWith('.md')
      );

      if (pattern) {
        filteredFiles = filteredFiles.filter((file: GitHubFile) => 
          file.name.includes(pattern)
        );
      }

      return filteredFiles;
    } catch (error) {
      console.error('Error searching post files:', error);
      return [];
    }
  }

  /**
   * Find post file by title (reads file content to match title)
   */
  async findPostByTitle(title: string): Promise<GitHubFile | null> {
    try {
      const files = await this.searchPostFiles();
      
      for (const file of files) {
        try {
          const fileData = await this.getFile(file.path);
          
          if (fileData.content && fileData.encoding === 'base64') {
            const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
            const titleMatch = content.match(/^title:\s*["'](.+)["']/m);
            
            if (titleMatch && titleMatch[1] === title) {
              return fileData;
            }
          }
        } catch (error) {
          console.error(`Error reading file ${file.name}:`, error);
          continue;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error finding post by title:', error);
      return null;
    }
  }

  /**
   * Delete blog post by filename or title
   */
  async deleteBlogPost(filename: string, title: string): Promise<{ success: boolean; message: string; deletedFile?: string }> {
    try {
      let fileToDelete: GitHubFile | null = null;
      let filePath = `content/posts/${filename}`;

      // Try to find by exact filename first
      try {
        fileToDelete = await this.getFile(filePath);
      } catch (error) {
        console.log(`File not found by filename: ${filename}, searching by title...`);
      }

      // If not found by filename, search by title
      if (!fileToDelete) {
        fileToDelete = await this.findPostByTitle(title);
        if (fileToDelete) {
          filePath = fileToDelete.path;
        }
      }

      if (!fileToDelete) {
        return {
          success: false,
          message: `Blog post not found: ${title} (${filename})`
        };
      }

      // Delete the file
      const commitMessage = `Delete blog post: ${title}`;
      await this.deleteFile(filePath, commitMessage);

      return {
        success: true,
        message: `Blog post successfully deleted: ${title}`,
        deletedFile: filePath
      };

    } catch (error) {
      console.error('Error deleting blog post:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

export default GitHubAPI;