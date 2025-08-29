
// 폴더위치 lib

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
        'User-Agent': 'Digital-Marketing-Hub-Blog',
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




폴더 위치 utils - token-manager.js


// 폴더위치 api - delete-blog - route.ts


import { NextRequest, NextResponse } from 'next/server'
import GitHubAPI from '@/lib/github-api'

const TokenManager = require('../../../../scripts/utils/token-manager')

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Delete token is required' },
        { status: 400 }
      )
    }

    const tokenManager = new TokenManager()
    const decoded = tokenManager.verifyDeleteToken(token)

    if (!decoded) {
      return Response.redirect(new URL('/delete-expired', request.url))
    }

    const { filename, title } = decoded

    // GitHub API를 사용해서 파일 삭제
    try {
      const githubAPI = new GitHubAPI()
      const result = await githubAPI.deleteBlogPost(filename, title)
      
      if (result.success) {
        console.log(`Blog deleted via GitHub API: ${result.deletedFile} - ${title}`)
        return Response.redirect(new URL('/delete-success', request.url))
      } else {
        console.error('GitHub API delete failed:', result.message)
        return Response.redirect(new URL('/delete-not-found', request.url))
      }
    } catch (deleteError) {
      console.error('GitHub API error:', deleteError)
      return Response.redirect(new URL('/delete-expired?reason=delete_failed', request.url))
    }

  } catch (error) {
    console.error('Delete blog error:', error)
    return Response.redirect(new URL('/delete-expired?reason=server_error', request.url))
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { error: 'Delete token is required' },
        { status: 400 }
      )
    }

    const tokenManager = new TokenManager()
    const decoded = tokenManager.verifyDeleteToken(token)

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    const { filename, title } = decoded

    // GitHub API를 사용해서 파일 삭제
    try {
      const githubAPI = new GitHubAPI()
      const result = await githubAPI.deleteBlogPost(filename, title)
      
      if (result.success) {
        console.log(`Blog deleted via GitHub API: ${result.deletedFile} - ${title}`)
        return NextResponse.json({
          success: true,
          message: result.message,
          filename: filename,
          title: title,
          deletedFile: result.deletedFile
        })
      } else {
        console.error('GitHub API delete failed:', result.message)
        return NextResponse.json(
          { error: result.message },
          { status: 404 }
        )
      }
    } catch (deleteError) {
      console.error('GitHub API error:', deleteError)
      return NextResponse.json(
        { error: deleteError instanceof Error ? deleteError.message : 'Failed to delete blog file' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Delete blog API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}





/**
 * JWT 토큰 관리자
 * 게시글 삭제를 위한 보안 토큰 생성 및 검증
 */

const jwt = require('jsonwebtoken')

class TokenManager {
  constructor() {
    // JWT 시크릿 키 (환경변수 또는 기본값)
    this.secret = process.env.JWT_SECRET || 'your-super-secret-key-change-this'
    
    // 토큰 만료 시간 (7일)
    this.expiresIn = '7d'
  }

  /**
   * 삭제 토큰 생성
   * @param {string} filename - 파일명
   * @param {string} title - 게시글 제목
   * @returns {string} JWT 토큰
   */
  generateDeleteToken(filename, title) {
    const payload = {
      filename,
      title,
      action: 'delete',
      timestamp: Date.now()
    }

    return jwt.sign(payload, this.secret, { 
      expiresIn: this.expiresIn 
    })
  }

  /**
   * 토큰 검증
   * @param {string} token - JWT 토큰
   * @returns {object|null} 토큰 페이로드 또는 null
   */
  verifyDeleteToken(token) {
    try {
      const decoded = jwt.verify(token, this.secret)
      
      // 액션 타입 확인
      if (decoded.action !== 'delete') {
        throw new Error('Invalid token action')
      }

      return decoded
    } catch (error) {
      console.error('Token verification failed:', error.message)
      return null
    }
  }

  /**
   * 토큰 디코딩 (검증 없이)
   * @param {string} token - JWT 토큰
   * @returns {object|null} 토큰 페이로드 또는 null
   */
  decodeToken(token) {
    try {
      return jwt.decode(token)
    } catch (error) {
      console.error('Token decode failed:', error.message)
      return null
    }
  }

  /**
   * 삭제 URL 생성
   * @param {string} baseUrl - 기본 URL
   * @param {string} filename - 파일명
   * @param {string} title - 게시글 제목
   * @returns {string} 삭제 URL
   */
  generateDeleteUrl(baseUrl, filename, title) {
    const token = this.generateDeleteToken(filename, title)
    return `${baseUrl}/api/delete-blog?token=${encodeURIComponent(token)}`
  }
}

module.exports = TokenManager