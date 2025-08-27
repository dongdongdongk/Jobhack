/**
 * 사이트 설정 유틸리티
 * 중앙 설정 파일에서 값을 읽어오는 헬퍼 함수들
 */

import siteConfig from '../../config/site.config.js'

// 타입 정의
export interface SiteConfig {
  site: {
    name: string
    title: string
    description: string
    url: string
    logo: string
    favicon: string
  }
  branding: {
    siteName: string
    tagline: string
    subtitle: string
    author: string
    email: string
    companyName: string
    footerDescription: string
  }
  blogTheme: {
    type: string
    primaryColor: {
      50: string
      100: string
      200: string
      500: string
      600: string
      700: string
    }
    secondaryColor: {
      50: string
      100: string
      500: string
      600: string
      700: string
    }
    contentSources: {
      selectedSubreddit: string
      fallbackSubreddits: string[]
      targetAudience: string
      outputLanguage: string
      commentLimits: {
        topComments: number
        newComments: number
        maxTotal: number
      }
      filterSettings: {
        minUpvotes: number
        minCommentLength: number
        excludeDeleted: boolean
        excludeRemoved: boolean
        excludeNSFW: boolean
      }
      aiSettings: {
        promptTemplate: string
        gptModel: string
        includeComments: boolean
        commentAnalysis: boolean
      }
    }
    availableModels: Record<string, {
      name: string
      description: string
      maxTokens: number
      costPerToken: string
      speed: string
    }>
    promptTemplates: Record<string, {
      name: string
      description: string
      blogStyle: string
      tone: string
    }>
    imageKeywords: {
      koreanToEnglish: Record<string, string>
      allowedEnglishKeywords: string[]
      defaultKeywords: string[]
    }
    uiColors: {
      cardTitle: string
      cardTitleHover: string
      linkHover: string
      tagColor: string
      buttonStyle: string
    }
  }
  uiText: {
    featuredArticleLabel: string
    staffPicksTitle: string
    latestArticlesTitle: string
    totalInsightsText: string
    loadMoreButton: string
    noMorePostsTitle: string
    noMorePostsSubtitle: string
    backToHomeText: string
    footerSectionTitle: string
    previousButtonLabel: string
    nextButtonLabel: string
    noPostsTitle: string        // 추가: 게시물이 없을 때 제목
    noPostsSubtitle: string     // 추가: 게시물이 없을 때 부제목

    featureBadges: Array<{
      icon: string
      text: string
    }>
  }
  social: {
    twitter: string
    github?: string
    linkedin?: string
    facebook?: string
    instagram?: string
  }
  theme: {
    primaryColor: string
    accentColor: string
    darkMode: boolean
    fontFamily: string
    language: string
    timezone: string
  }
  content: {
    postsPerPage: number
    excerptLength: number
    showReadingTime: boolean
    showAuthor: boolean
    showTags: boolean
    showDate: boolean
    enableComments: boolean
    enableSearch: boolean
    defaultAuthor: string
  }
  navigation: {
    main: Array<{ name: string; href: string; external?: boolean }>
    footer: Array<{ name: string; href: string }>
  }
  seo: {
    defaultKeywords: string[]
    ogImage: string
    twitterCard: string
    googleAnalytics: string
    googleSearchConsole: string
    robotsTxt: {
      allow: string[]
      disallow: string[]
      sitemap: string
    }
  }
  images: {
    provider: string
    defaultImage: string
    sizes: {
      thumbnail: string
      card: string
      featured: string
      og: string
    }
  }
  footer: {
    sections: Array<{
      title: string | null
      content: 'description' | 'navigation' | 'social' | 'automation' | 'custom'
      customText?: string | null
      customLinks?: Array<{ name: string; href: string }>
    }>
    automation: {
      schedule: string
      technology: string
    }
    copyright: {
      text: string
      showYear: boolean
      showCompany: boolean
    }
  }
  email: {
    from: string
    replyTo: string
    notifications: string[]
    templates: {
      success: string
      failure: string
      partial: string
    }
  }
}

// 전체 설정 가져오기
export function getConfig(): SiteConfig {
  return siteConfig as SiteConfig
}

// 사이트 기본 정보
export function getSiteInfo() {
  return siteConfig.site
}

// 브랜딩 정보
export function getBranding() {
  return siteConfig.branding
}

// 소셜 미디어 링크
export function getSocialLinks() {
  return siteConfig.social
}

// 테마 설정
export function getTheme() {
  return siteConfig.theme
}

// 네비게이션 메뉴
export function getNavigation() {
  return siteConfig.navigation
}

// SEO 설정
export function getSEOConfig() {
  return siteConfig.seo
}

// 콘텐츠 설정
export function getContentConfig() {
  return siteConfig.content
}

// 기본 작가 정보
export function getDefaultAuthor() {
  return siteConfig.content.defaultAuthor
}

// UI 텍스트
export function getUIText() {
  return siteConfig.uiText
}

// 블로그 주제 설정
export function getBlogTheme() {
  return siteConfig.blogTheme
}

// 이미지 설정
export function getImageConfig() {
  return siteConfig.images
}


// 푸터 설정
export function getFooterConfig() {
  return siteConfig.footer
}

// 이메일 설정
export function getEmailConfig() {
  return siteConfig.email
}

// 이메일 설정 (별칭)
export function getEmail() {
  return siteConfig.email
}

// 특정 색상 클래스 생성 (기존 theme 방식)
export function getColorClasses() {
  const theme = getTheme()
  return {
    primary: `${theme.primaryColor}-600`,
    primaryHover: `${theme.primaryColor}-700`,
    accent: `${theme.accentColor}-600`,
    accentHover: `${theme.accentColor}-700`,
    gradient: `from-${theme.primaryColor}-600 to-${theme.accentColor}-600`,
    gradientHover: `from-${theme.primaryColor}-700 to-${theme.accentColor}-700`
  }
}

// blogTheme 색상을 인라인 스타일로 사용
export function getBlogThemeColors() {
  const blogTheme = getBlogTheme()
  return {
    primary: {
      50: blogTheme.primaryColor[50],
      100: blogTheme.primaryColor[100],
      200: blogTheme.primaryColor[200],
      500: blogTheme.primaryColor[500],
      600: blogTheme.primaryColor[600],
      700: blogTheme.primaryColor[700]
    },
    secondary: {
      50: blogTheme.secondaryColor[50],
      100: blogTheme.secondaryColor[100],
      500: blogTheme.secondaryColor[500],
      600: blogTheme.secondaryColor[600],
      700: blogTheme.secondaryColor[700]
    }
  }
}

// UI 요소별 색상 클래스 생성 (설정 기반)
export function getUIColorClasses() {
  const blogTheme = getBlogTheme()
  const { uiColors } = blogTheme
  
  // 색상 타입을 Tailwind 클래스로 변환
  const getColorClass = (colorType: string, shade = '600') => {
    switch (colorType) {
      case 'primary': return `primary-${shade}`
      case 'secondary': return `secondary-${shade}`
      case 'gray': return `gray-${shade}`
      case 'auto': return `primary-${shade}` // 기본값
      default: return `primary-${shade}`
    }
  }
  
  const getTextColorClass = (colorType: string, shade = '600') => {
    return `text-${getColorClass(colorType, shade)}`
  }
  
  const getBgColorClass = (colorType: string, shade = '600') => {
    return `bg-${getColorClass(colorType, shade)}`
  }
  
  return {
    // 카드 제목 색상
    cardTitle: uiColors.cardTitle === 'auto' ? 'text-gray-900' : getTextColorClass(uiColors.cardTitle),
    cardTitleHover: getTextColorClass(uiColors.cardTitleHover),
    
    // 링크 호버
    linkHover: getTextColorClass(uiColors.linkHover),
    
    // 태그 색상
    tagText: getTextColorClass(uiColors.tagColor),
    tagBg: getBgColorClass(uiColors.tagColor, '50'),
    tagBgHover: getBgColorClass(uiColors.tagColor, '100'),
    
    // 버튼 스타일
    buttonClasses: (() => {
      switch (uiColors.buttonStyle) {
        case 'gradient':
          return 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700'
        case 'solid-primary':
          return 'bg-primary-600 hover:bg-primary-700'
        case 'solid-secondary':
          return 'bg-secondary-600 hover:bg-secondary-700'
        default:
          return 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700'
      }
    })(),
    
    // 기본 색상들 (호환성)
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    bgPrimary: 'bg-primary-600',
    bgSecondary: 'bg-secondary-600'
  }
}

// 랜덤 이미지 URL 생성
export function generateImageUrl(width: number = 1200, height: number = 600, seed?: string | number) {
  const config = getImageConfig()
  const randomSeed = seed || Math.floor(Math.random() * 100) + 1
  
  switch (config.provider) {
    case 'picsum':
      return `https://picsum.photos/${width}/${height}?random=${randomSeed}`
    case 'unsplash':
      return `https://source.unsplash.com/${width}x${height}/?random=${randomSeed}`
    default:
      return config.defaultImage
  }
}

// 환경변수와 설정 병합
export function getEnvironmentConfig() {
  const config = getConfig()
  
  return {
    ...config,
    // 환경변수로 덮어쓰기 가능한 설정들
    site: {
      ...config.site,
      url: process.env.NEXT_PUBLIC_SITE_URL || config.site.url
    },
    seo: {
      ...config.seo,
      googleAnalytics: process.env.NEXT_PUBLIC_GA_ID || config.seo.googleAnalytics
    },
    social: {
      ...config.social,
      twitter: process.env.NEXT_PUBLIC_TWITTER || config.social.twitter
    }
  }
}