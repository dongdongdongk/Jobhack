export default function DeleteNotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-8v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            포스트를 찾을 수 없음
          </h1>
          <p className="text-gray-600 mb-4">
            삭제하려는 블로그 포스트를 찾을 수 없습니다.
          </p>
          <p className="text-sm text-gray-500">
            포스트가 이미 삭제되었거나 존재하지 않을 수 있습니다.
          </p>
        </div>
        
        <div className="space-y-3">
          <a 
            href="/" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 inline-block"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  )
}