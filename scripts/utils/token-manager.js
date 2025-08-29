/**
 * JWT 토큰 관리자
 * 게시글 삭제를 위한 보안 토큰 생성 및 검증
 */

const jwt = require('jsonwebtoken')

class TokenManager {
  constructor() {
    // JWT 시크릿 키 (환경변수 또는 기본값)
    this.secret = process.env.JWT_SECRET || 'jobhack-blog-default-secret-2024-secure-token-key-please-change-in-production'
    
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