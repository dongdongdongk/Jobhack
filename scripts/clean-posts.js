/**
 * 포스트 정리 스크립트 (AI 생성 후 후처리)
 * site.config.js의 postProcessing 설정 기반으로 동작
 * 
 * 기능:
 * - 설정된 패턴들 제거 (===TAGS=== 등)
 * - 부적절한 태그를 기본 태그로 교체
 * - frontmatter 정규화
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const siteConfig = require('../config/site.config.js')

/**
 * frontmatter 파싱
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { frontmatter: '', body: content, hasFrontmatter: false }
  }
  
  return { 
    frontmatter: match[1], 
    body: match[2], 
    hasFrontmatter: true 
  }
}

/**
 * frontmatter 업데이트 (패턴이 제거된 경우에만 기본 태그 사용)
 */
function updateFrontmatterWithDefaultTags(frontmatter) {
  const { defaultTags, maxTags } = siteConfig.postProcessing.tags
  
  // 기본 태그를 최대 개수만큼 제한
  const finalTags = defaultTags.slice(0, maxTags)
  
  // frontmatter에서 tags 라인 업데이트
  const updatedFrontmatter = frontmatter.replace(
    /tags:\s*\[(.*?)\]/s,
    `tags: [${finalTags.map(tag => `"${tag}"`).join(', ')}]`
  )
  
  return updatedFrontmatter
}

/**
 * 설정된 패턴들 제거 (제거 여부 반환)
 */
function removeConfiguredPatterns(content) {
  const { removePatterns } = siteConfig.postProcessing
  
  let cleanContent = content
  let wasPatternRemoved = false
  
  removePatterns.forEach(pattern => {
    const beforeLength = cleanContent.length
    cleanContent = cleanContent.replace(pattern, '')
    if (cleanContent.length !== beforeLength) {
      wasPatternRemoved = true
    }
  })
  
  return { cleanContent, wasPatternRemoved }
}

/**
 * 단일 파일 처리
 */
function processFile(filePath) {
  console.log(`Processing: ${path.basename(filePath)}`)
  
  try {
    const originalContent = fs.readFileSync(filePath, 'utf8')
    
    // 1. 설정된 패턴들 제거 (제거 여부 확인)
    const { cleanContent, wasPatternRemoved } = removeConfiguredPatterns(originalContent)
    let content = cleanContent
    
    // 2. 패턴이 제거된 경우에만 frontmatter 태그를 기본값으로 변경
    if (wasPatternRemoved) {
      const { frontmatter, body, hasFrontmatter } = parseFrontmatter(content)
      
      if (hasFrontmatter) {
        const updatedFrontmatter = updateFrontmatterWithDefaultTags(frontmatter)
        content = `---\n${updatedFrontmatter}\n---\n${body}`
      }
    }
    
    // 변경사항이 있는 경우만 파일 저장
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(`✅ Cleaned: ${path.basename(filePath)}`)
      return true
    } else {
      console.log(`⏭️  No changes: ${path.basename(filePath)}`)
      return false
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message)
    return false
  }
}

/**
 * 메인 실행 함수
 */
function main() {
  console.log('🧹 Starting post cleanup process...\n')
  
  // 설정 정보 출력
  const { removePatterns, tags } = siteConfig.postProcessing
  console.log('📋 Configuration:')
  console.log(`   - Remove patterns: ${removePatterns.length} configured`)
  console.log(`   - Default tags: [${tags.defaultTags.join(', ')}]`)
  console.log(`   - Max tags: ${tags.maxTags}\n`)
  
  // 모든 마크다운 파일 찾기
  const postsDir = path.join(__dirname, '../content/posts')
  const pattern = path.join(postsDir, '*.md')
  
  const files = glob.sync(pattern)
  
  if (files.length === 0) {
    console.log('No markdown files found.')
    return
  }
  
  // 파일명으로 정렬해서 가장 최신 파일 찾기 (YYYYMMDD-HHMM 패턴)
  const sortedFiles = files
    .map(filePath => ({
      path: filePath,
      basename: path.basename(filePath)
    }))
    .sort((a, b) => b.basename.localeCompare(a.basename)) // 내림차순 정렬
  
  const latestFile = sortedFiles[0]
  
  console.log(`Latest file: ${latestFile.basename}\n`)
  
  // 최신 파일만 처리
  const wasChanged = processFile(latestFile.path)
  
  console.log('\n🎉 Post cleanup completed!')
  console.log(`\n📊 Summary:`)
  console.log(`   - Files processed: 1`)
  console.log(`   - Files changed: ${wasChanged ? 1 : 0}`)
  console.log(`   - Files unchanged: ${wasChanged ? 0 : 1}`)
}

// 스크립트 실행
if (require.main === module) {
  main()
}

module.exports = { processFile, main }