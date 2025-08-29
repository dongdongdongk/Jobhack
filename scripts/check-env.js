/**
 * 환경변수 및 JWT 토큰 상태 확인 스크립트
 */

const TokenManager = require('./utils/token-manager');

function checkEnvironment() {
  console.log('=== 환경변수 및 토큰 상태 확인 ===\n');

  // 환경변수 확인
  console.log('📋 환경변수 상태:');
  const envVars = ['GITHUB_OWNER', 'GITHUB_REPO', 'GITHUB_TOKEN', 'JWT_SECRET'];
  
  envVars.forEach(env => {
    if (process.env[env]) {
      console.log(`  ✅ ${env}: 설정됨 (${process.env[env].substring(0, 10)}...)`);
    } else {
      console.log(`  ❌ ${env}: 설정되지 않음`);
    }
  });

  if (!process.env.JWT_SECRET) {
    console.log('\n❌ JWT_SECRET이 설정되지 않아 토큰 검증이 불가능합니다.');
    return;
  }

  console.log('\n🔑 JWT 토큰 테스트:');
  
  try {
    const tokenManager = new TokenManager();
    
    // 새 토큰 생성
    const newToken = tokenManager.generateDeleteToken('test.md', 'Test Post');
    console.log(`  ✅ 토큰 생성 성공: ${newToken.substring(0, 50)}...`);
    
    // 토큰 검증
    const decoded = tokenManager.verifyDeleteToken(newToken);
    if (decoded) {
      console.log('  ✅ 토큰 검증 성공');
      console.log(`     만료시간: ${new Date(decoded.exp * 1000).toLocaleString('ko-KR')}`);
      
      // 만료까지 남은 시간 계산
      const timeLeft = decoded.exp * 1000 - Date.now();
      const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
      console.log(`     남은 시간: 약 ${daysLeft}일`);
    } else {
      console.log('  ❌ 토큰 검증 실패');
    }

    // 실제 URL 생성
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const deleteUrl = tokenManager.generateDeleteUrl(siteUrl, 'test.md', 'Test Post');
    console.log(`\n🔗 테스트 삭제 URL:`);
    console.log(`  ${deleteUrl}`);

  } catch (error) {
    console.error('❌ 토큰 테스트 실패:', error.message);
  }

  console.log('\n💡 문제 해결:');
  console.log('  1. JWT_SECRET이 개발/프로덕션 환경에서 동일한지 확인');
  console.log('  2. 토큰이 실제로 이 환경에서 생성된 것인지 확인');
  console.log('  3. 토큰이 7일 내에 생성된 것인지 확인');
}

// 스크립트 실행
if (require.main === module) {
  checkEnvironment();
}

module.exports = { checkEnvironment };