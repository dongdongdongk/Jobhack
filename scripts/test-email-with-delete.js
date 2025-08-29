/**
 * 삭제 버튼이 포함된 이메일 테스트 스크립트
 */

const EmailNotifier = require('./apis/email-notifier');

// 간단한 로거 구현
class SimpleLogger {
  info(message, data = {}) {
    console.log(`[INFO] ${message}`, data);
  }
  
  success(message, data = {}) {
    console.log(`[SUCCESS] ${message}`, data);
  }
  
  error(message, data = {}) {
    console.error(`[ERROR] ${message}`, data);
  }
}

async function testEmailWithDeleteButton() {
  console.log('=== 삭제 버튼 포함 이메일 테스트 ===\n');

  try {
    const logger = new SimpleLogger();
    const emailNotifier = new EmailNotifier(logger);

    console.log('1. 테스트 이메일 발송 중...');
    const result = await emailNotifier.testEmail();
    
    console.log('✅ 테스트 이메일 발송 성공!');
    console.log(`   메시지 ID: ${result.messageId}`);
    console.log(`   수신자: ${process.env.NOTIFICATION_EMAIL || process.env.GMAIL_USER}`);

    console.log('\n2. 실제 블로그 알림 이메일 테스트 (모의 데이터)');
    
    // 모의 블로그 데이터
    const mockBlogData = {
      title: "JobHack 테스트 블로그 포스트",
      sourceData: {
        originalUrl: "https://reddit.com/r/jobs/test-post"
      },
      metadata: {
        category: "Career Advice",
        tags: ["Job Search", "Interview Tips", "Resume"],
        author: "Jobhack Team",
        source: {
          platform: "Reddit"
        }
      },
      aiModel: "gpt-4o",
      outputLanguage: "korean",
      tokenUsage: {
        prompt_tokens: 1500,
        completion_tokens: 2000,
        total_tokens: 3500
      }
    };

    const mockGenerationInfo = {
      blog: {
        filename: "2024-01-01-jobhack-test-post.md",
        contentLength: 2500,
        wordCount: 400
      },
      source: {
        subreddit: "jobs",
        originalTitle: "How to ace your next job interview",
        engagement: {
          upvotes: 156,
          comments: 42
        }
      },
      stats: {},
      executionTimeMs: 15000
    };

    console.log('   모의 블로그 알림 이메일 발송 중...');
    const blogResult = await emailNotifier.sendBlogCreatedNotification(mockBlogData, mockGenerationInfo);
    
    console.log('✅ 모의 블로그 알림 이메일 발송 성공!');
    console.log(`   메시지 ID: ${blogResult.messageId}`);

    console.log('\n=== 테스트 완료 ===');
    console.log('✅ 모든 이메일이 성공적으로 발송되었습니다.');
    console.log('📧 이메일을 확인하여 삭제 버튼이 올바르게 표시되는지 확인하세요.');
    console.log('\n💡 확인 사항:');
    console.log('  - 삭제 버튼이 빨간색으로 표시되는지');
    console.log('  - 삭제 URL이 올바른 형식인지');
    console.log('  - 삭제 관련 안내 메시지가 표시되는지');
    console.log('  - 텍스트 버전에도 삭제 URL이 포함되는지');

  } catch (error) {
    console.error('❌ 이메일 테스트 실패:', error.message);
    
    if (error.message.includes('Gmail 계정')) {
      console.error('\n🔧 해결방법:');
      console.error('  1. .env 파일에 GMAIL_USER와 GMAIL_PASSWORD 설정');
      console.error('  2. Gmail 앱 비밀번호 생성 후 GMAIL_PASSWORD에 설정');
      console.error('  3. NOTIFICATION_EMAIL 설정 (선택사항)');
    }
    
    if (error.message.includes('JWT_SECRET')) {
      console.error('\n🔧 JWT 관련 오류:');
      console.error('  1. .env 파일에 JWT_SECRET 설정');
      console.error('  2. 32자 이상의 강력한 랜덤 문자열 사용');
    }
  }
}

// 환경변수 확인
function checkEnvironmentVariables() {
  console.log('📋 환경변수 확인:');
  
  const required = ['GMAIL_USER', 'GMAIL_PASSWORD'];
  const optional = ['NOTIFICATION_EMAIL', 'JWT_SECRET'];
  
  let allSet = true;
  
  required.forEach(env => {
    if (process.env[env]) {
      console.log(`  ✅ ${env}: 설정됨`);
    } else {
      console.log(`  ❌ ${env}: 설정되지 않음`);
      allSet = false;
    }
  });
  
  optional.forEach(env => {
    if (process.env[env]) {
      console.log(`  ✅ ${env}: 설정됨`);
    } else {
      console.log(`  ⚠️  ${env}: 설정되지 않음 (선택사항)`);
    }
  });
  
  console.log();
  return allSet;
}

// 스크립트 실행
if (require.main === module) {
  console.log('🧪 삭제 버튼 포함 이메일 테스트를 시작합니다...\n');
  
  if (checkEnvironmentVariables()) {
    testEmailWithDeleteButton();
  } else {
    console.error('❌ 필수 환경변수가 설정되지 않았습니다.');
    console.error('   .env 파일을 확인하고 다시 시도하세요.');
  }
}

module.exports = { testEmailWithDeleteButton };