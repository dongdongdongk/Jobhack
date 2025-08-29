/**
 * 삭제 기능 테스트 스크립트
 * 토큰 생성 및 삭제 URL 테스트
 */

const TokenManager = require('./utils/token-manager');

function testDeleteFunctionality() {
  console.log('=== GitHub Actions 삭제 로직 테스트 ===\n');

  try {
    const tokenManager = new TokenManager();

    // 테스트 데이터
    const testData = {
      filename: '2024-01-01-test-post.md',
      title: 'Test Blog Post for Deletion',
      baseUrl: 'https://jobhack.roono.net'
    };

    console.log('1. 토큰 생성 테스트');
    console.log(`   파일명: ${testData.filename}`);
    console.log(`   제목: ${testData.title}`);

    // 토큰 생성
    const deleteToken = tokenManager.generateDeleteToken(testData.filename, testData.title);
    console.log(`   생성된 토큰: ${deleteToken.substring(0, 50)}...`);

    // 삭제 URL 생성
    const deleteUrl = tokenManager.generateDeleteUrl(testData.baseUrl, testData.filename, testData.title);
    console.log(`   삭제 URL: ${deleteUrl}`);

    console.log('\n2. 토큰 검증 테스트');
    
    // 토큰 검증
    const decoded = tokenManager.verifyDeleteToken(deleteToken);
    if (decoded) {
      console.log('   ✅ 토큰 검증 성공');
      console.log(`   - 파일명: ${decoded.filename}`);
      console.log(`   - 제목: ${decoded.title}`);
      console.log(`   - 액션: ${decoded.action}`);
      console.log(`   - 타임스탬프: ${new Date(decoded.timestamp).toISOString()}`);
      console.log(`   - 만료 시간: ${decoded.exp ? new Date(decoded.exp * 1000).toISOString() : '없음'}`);
    } else {
      console.log('   ❌ 토큰 검증 실패');
    }

    console.log('\n3. 잘못된 토큰 테스트');
    const invalidToken = 'invalid.token.here';
    const invalidDecoded = tokenManager.verifyDeleteToken(invalidToken);
    if (!invalidDecoded) {
      console.log('   ✅ 잘못된 토큰 정상적으로 거부됨');
    } else {
      console.log('   ❌ 잘못된 토큰이 검증 통과함');
    }

    console.log('\n4. 토큰 디코딩 테스트 (검증 없이)');
    const decodedWithoutVerification = tokenManager.decodeToken(deleteToken);
    if (decodedWithoutVerification) {
      console.log('   ✅ 토큰 디코딩 성공');
      console.log(`   - 액션: ${decodedWithoutVerification.action}`);
      console.log(`   - 파일명: ${decodedWithoutVerification.filename}`);
    }

    console.log('\n=== 테스트 완료 ===');
    console.log('\n사용 방법:');
    console.log('1. 환경변수 설정: GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN, JWT_SECRET');
    console.log('2. 블로그 생성 시 삭제 URL 이메일 발송에 포함');
    console.log('3. 사용자가 URL 클릭 시 자동 삭제 실행');
    console.log('4. 삭제 후 성공/실패 페이지로 리다이렉트');

  } catch (error) {
    console.error('❌ 테스트 중 오류 발생:', error.message);
  }
}

// 스크립트 실행
if (require.main === module) {
  testDeleteFunctionality();
}

module.exports = { testDeleteFunctionality };