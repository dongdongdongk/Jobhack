/**
 * 사이트 전체 설정 파일
 * 다른 주제의 블로그로 쉽게 변경할 수 있도록 모든 설정을 중앙화
 */

const siteConfig = {
  // === 사이트 기본 정보 ===
  site: {
    name: "Jobhack",
    title: "Jobhack - Smart Job Search Tips & Strategies",
    description: "Modern job search strategies, interview tips, resume guides, and career advancement tactics for job seekers and professionals.",
    url: "https://jobhack.roono.net",
    logo: "/logo.png",
    favicon: "/favicon.ico"
  },

  // === 브랜딩 (UI에서 직접 사용되는 텍스트) ===
  branding: {
    siteName: "Jobhack",
    tagline: "Your simple guide to career success",
    subtitle: "Master modern job hunting with proven strategies, insider tips, and step-by-step guides.",
    author: "Jobhack Team",
    email: "hello@jobhack.com",
    companyName: "Jobhack",
    footerDescription: "Practical, modern, and effective job search strategies for today's competitive market."
  },

  // === Blog Theme Settings (Only change this section when creating new blog) ===
  blogTheme: {
    type: 'career',

    // Primary color (Professional Navy Blue)
    primaryColor: {
      50: "#f0f4f8", // Light blue-gray
      100: "#d9e6f2", // Soft blue
      200: "#b3d1e8", // Light professional blue
      500: "#2563eb", // Professional blue (main)
      600: "#1d4ed8", // Deep blue
      700: "#1e40af"  // Navy blue
    },

    secondaryColor: {
      50: "#f8fafc", // Almost white
      100: "#f1f5f9", // Very light gray
      500: "#64748b", // Professional gray (secondary accent)
      600: "#475569", // Medium gray
      700: "#334155"  // Dark gray
    },

    // UI 요소별 색상 설정
    uiColors: {
      // 카드 제목 색상 (전문적인 네이비로 강조)
      cardTitle: 'primary', // 'auto', 'primary', 'secondary', 'gray'
      // 카드 호버시 제목 색상 (회색으로 대비 효과)
      cardTitleHover: 'secondary', // 'primary', 'secondary', 'gray'
      // 메뉴/링크 호버 색상 (프로페셔널한 블루)
      linkHover: 'primary', // 'primary', 'secondary', 'gray'
      // 태그 색상 (세컨더리 그레이)
      tagColor: 'secondary', // 'primary', 'secondary', 'gray'
      // 버튼 색상 (프로페셔널한 블루)
      buttonStyle: 'solid-primary', // 'gradient', 'solid-primary', 'solid-secondary'
    },

    // Reddit 서브레딧 설정 (기존 reddit-config.json 통합)
    contentSources: {
      selectedSubreddit: "jobs", // 메인 서브레딧
      fallbackSubreddits: ["careerguidance", "resumes", "interviews", "careeradvice"], // 대체 서브레딧들
      targetAudience: "general", // 'general', 'expert', 'beginner'
      outputLanguage: "english", // 'korean', 'english'

      // 댓글 수집 제한
      commentLimits: {
        topComments: 15,
        newComments: 30,
        maxTotal: 50
      },

      // 필터링 설정
      filterSettings: {
        minUpvotes: 3,
        minCommentLength: 10,
        excludeDeleted: true,
        excludeRemoved: true,
        excludeNSFW: true
      },

      // AI 글쓰기 설정
      aiSettings: {
        promptTemplate: "summary", // 'informative', 'engaging', 'analytical', 'technical', 'casual', 'summary'
        gptModel: "gpt-4o", // 'gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo'  
        includeComments: true,
        commentAnalysis: true
      }
    },

    // AI 모델 정의 (기존 reddit-config.json에서 이동)
    availableModels: {
      "gpt-3.5-turbo": {
        name: "GPT-3.5 Turbo",
        description: "빠른 속도, 저렴한 비용, 일반적인 블로그 작성에 적합",
        maxTokens: 4096,
        costPerToken: "낮음",
        speed: "빠름"
      },
      "gpt-4": {
        name: "GPT-4",
        description: "높은 품질, 정확성, 복잡한 주제 분석에 적합",
        maxTokens: 8192,
        costPerToken: "높음",
        speed: "보통"
      },
      "gpt-4-turbo": {
        name: "GPT-4 Turbo",
        description: "GPT-4의 성능과 빠른 속도, 긴 글 작성에 최적화",
        maxTokens: 128000,
        costPerToken: "중간",
        speed: "빠름"
      }
    },

    // 글쓰기 스타일 템플릿 (기존 reddit-config.json에서 이동)
    promptTemplates: {
      informative: {
        name: "정보 전달형",
        description: "정확한 정보 전달에 중점을 둔 체계적이고 논리적인 글쓰기 스타일",
        blogStyle: "informative",
        tone: "professional"
      },
      engaging: {
        name: "흥미 유발형",
        description: "독자의 흥미를 끄는 스토리텔링과 감정적 연결에 중점을 둔 글쓰기 스타일",
        blogStyle: "engaging",
        tone: "conversational"
      },
      analytical: {
        name: "분석형",
        description: "데이터와 근거를 바탕으로 한 깊이 있는 분석과 인사이트 제공에 중점을 둔 글쓰기 스타일",
        blogStyle: "analytical",
        tone: "academic"
      },
      technical: {
        name: "기술형",
        description: "기술적 세부사항과 전문적인 내용 전달에 중점을 둔 글쓰기 스타일",
        blogStyle: "technical",
        tone: "expert"
      },
      casual: {
        name: "캐주얼형",
        description: "친근하고 편안한 대화체로 쉽게 읽을 수 있는 글쓰기 스타일",
        blogStyle: "casual",
        tone: "friendly"
      },
      summary: {
        name: "쉬운 요약형",
        description: "복잡한 내용을 쉬운 용어로 간단명료하게 핵심만 정리해서 설명하는 글쓰기 스타일",
        blogStyle: "summary",
        tone: "simple"
      }
    },

    // 이미지 키워드 설정 (구직 테마에 맞게 변경)
    imageKeywords: {
      koreanToEnglish: {
        "취업": "job search",
        "면접": "interview",
        "이력서": "resume",
        "커리어": "career",
        "구직": "job hunting",
        "회사": "company",
        "직장": "workplace",
        "성공": "success",
        "전략": "strategy",
        "네트워킹": "networking",
        "스킬": "skills",
        "경험": "experience",
        "급여": "salary",
        "승진": "promotion"
      },
      allowedEnglishKeywords: [
        "job search", "interview", "resume", "career", "workplace",
        "networking"
      ],
      defaultKeywords: ["job search", "career"]
    }
  },

  // === UI Text (Changed to Digital Marketing theme) ===
  uiText: {
    featuredArticleLabel: "🎯 Essential Read",
    staffPicksTitle: "Career Experts' Choice",
    latestArticlesTitle: "Latest Job Search Insights",
    totalInsightsText: "Job search tips",
    loadMoreButton: "Load More Tips",
    noMorePostsTitle: "New strategies coming soon!",
    noMorePostsSubtitle: "Fresh job search tips are on the way.",

    searchPlaceholder: "Search resumes, interviews, careers...",
    totalPostsText: "Total {count} articles",
    searchResultText: "Search results for '{query}'",
    noSearchResultsTitle: "No results found",
    noSearchResultsSubtitle: "Try different keywords.",
    viewAllPostsButton: "View All Tips",

    backToHomeText: "View More Job Tips",
    footerSectionTitle: "Was this career guide helpful?",

    contactPageTitle: "Get in Touch",
    contactPageSubtitle: "Have questions, collaboration ideas, or feedback? We'd love to hear from you!",
    contactFormTitle: "Send us a message",
    contactFormSubtitle: "We'll reply within 24 hours",


    previousButtonLabel: "Previous",
    nextButtonLabel: "Next",
    noPostsTitle: "No career tips available yet",
    noPostsSubtitle: "Stay tuned for upcoming job search guides",

    contactFields: {
      name: { label: "Name", placeholder: "Your full name", required: true },
      email: { label: "Email", placeholder: "your.email@example.com", required: true },
      subject: { label: "Subject", placeholder: "What's this about?", required: true },
      category: {
        label: "Category",
        required: true,
        options: [
          { value: "business", label: "Business Inquiry" },
          { value: "collaboration", label: "Collaboration" },
          { value: "feedback", label: "Feedback" },
          { value: "press", label: "Press & Media" },
          { value: "other", label: "Other" }
        ]
      },
      message: { label: "Message", placeholder: "Tell us more about your inquiry...", required: true }
    },

    contactFormButton: "Send Message",
    contactFormSending: "Sending...",
    contactFormSuccess: "Message sent! 🎉",
    contactFormSuccessDesc: "Thanks for reaching out! We'll get back to you soon.",
    contactFormError: "Failed to send message",
    contactFormErrorDesc: "Please try again or email us at {email}",

    featureBadges: [
      { icon: "trending-up", text: "Proven Strategies" },
      { icon: "calendar", text: "Up-to-Date Tips" },
      { icon: "zap", text: "Actionable Advice" }
    ]
  },

  // === Social Media ===
  social: {
    twitter: "@jobhack_tips",
    linkedin: "https://linkedin.com/company/jobhack",
    facebook: "https://facebook.com/jobhack"
  },

  // === Theme Settings ===
  theme: {
    primaryColor: "blue",
    accentColor: "gray",
    darkMode: false,
    fontFamily: "Inter",
    language: "en",
    timezone: "America/New_York"
  },

  // === 콘텐츠 설정 ===
  content: {
    postsPerPage: 6,
    excerptLength: 160,
    showReadingTime: true,
    showAuthor: true,
    showTags: true,
    showDate: true,
    enableComments: false,
    enableSearch: true,
    defaultAuthor: 'Jobhack Team'
  },

  // === Menu Structure ===
  navigation: {
    main: [
      { name: "Home", href: "/", external: false },
      { name: "About", href: "/about", external: false },
      { name: "Contact", href: "/contact", external: false }
    ],
    footer: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Resume Tips", href: "/resume" },
      { name: "Interview Prep", href: "/interview" },
      { name: "Career Advice", href: "/career" },
      { name: "Contact Us", href: "/contact" }
    ]
  },

  // === SEO Settings ===
  seo: {
    defaultKeywords: ["Job Search", "Resume Tips", "Interview Prep", "Career Advice", "Job Hunting", "Professional Development"],
    ogImage: "/og-job-search.jpg",
    twitterCard: "summary_large_image",
    googleAnalytics: "", // GA4 measurement ID
    googleSearchConsole: "", // Ownership verification meta tag
    robotsTxt: {
      allow: ["/"],
      disallow: ["/admin", "/api"],
      sitemap: "/sitemap.xml"
    }
  },

  // === 이미지 설정 ===
  images: {
    provider: "unsplash",
    defaultImage: "https://source.unsplash.com/1200x600/?career,professional",
    sizes: {
      thumbnail: "300x200",
      card: "600x400",
      featured: "1200x600",
      og: "1200x630"
    }
  },


  // === Footer Settings ===
  footer: {
    sections: [
      {
        title: "About",
        content: "custom",
        customText: "Jobhack helps job seekers and professionals navigate the modern job market with proven strategies and insider tips."
      },
      {
        title: "Popular Topics",
        content: "custom",
        customText: "Resume Writing • Interview Skills • Career Change • Salary Negotiation • Networking • LinkedIn Optimization"
      },
      {
        title: "Community",
        content: "custom",
        customText: "Join thousands of successful job seekers who trust Jobhack for career advancement strategies."
      }
    ],
    automation: {
      schedule: "Daily career content",
      technology: "Curated by career experts"
    },
    copyright: {
      text: "All rights reserved",
      showYear: true,
      showCompany: true
    }
  },

  // === 이메일 설정 ===
  email: {
    from: "Jobhack <${GMAIL_USER}>", // 환경변수로 대체됨
    replyTo: "${GMAIL_USER}", // 환경변수로 대체됨
    notifications: ["${GMAIL_USER}"], // 환경변수로 대체됨
    templates: {
      success: "자동화 성공 알림",
      failure: "자동화 실패 알림",
      partial: "부분 성공 알림"
    }
  },

  // === 포스트 정리 설정 (AI 생성 후 후처리) ===
  postProcessing: {
    // 제거할 패턴들 (정규식)
    removePatterns: [
      /\n===TAGS===[\s\S]*$/m,     // ===TAGS=== 섹션
      /\n---TAGS---[\s\S]*$/m,     // ---TAGS--- 섹션
      /\n\*\*Tags:\*\*[\s\S]*$/m,  // **Tags:** 섹션
      /\nTags:[\s\S]*$/m           // Tags: 섹션
    ],

    // 태그 관련 설정
    tags: {
      // 기본 태그 (부적절한 태그 대신 사용)
      defaultTags: ["Job Search", "Career Tips", "Interview Prep"],

      // 최대 태그 개수
      maxTags: 5
    }
  },

  // === About Page Configuration ===
  aboutPage: {
    hero: {
      title: "About Jobhack",
      subtitle: "Your trusted guide to career success",
      description: "We provide practical job search strategies, interview preparation tips, and career advancement advice based on real-world experience and industry insights."
    },
    team: {
      title: "Who We Are",
      subtitle: "Career specialists passionate about helping you succeed",
      members: [
        {
          name: "Career Strategists",
          role: "Job Search & Strategy Specialists",
          expertise: ["Resume Optimization", "Job Search Strategy", "Career Planning", "ATS Systems"],
          experience: "We help job seekers navigate the modern job market with proven strategies that actually work in today's competitive environment",
          image: "/team/career-team.jpg"
        },
        {
          name: "Interview Coaches",
          role: "Interview & Communication Specialists",
          expertise: ["Interview Preparation", "Behavioral Questions", "Salary Negotiation", "Communication Skills"],
          experience: "We train professionals to ace interviews and communicate their value effectively to potential employers",
          image: "/team/interview-team.jpg"
        },
        {
          name: "Industry Experts",
          role: "HR & Recruitment Specialists",
          expertise: ["Recruitment Process", "HR Insights", "Industry Trends", "Employer Perspective"],
          experience: "We share insider knowledge from the recruitment and HR world to give you an edge in your job search",
          image: "/team/hr-team.jpg"
        }
      ]
    },
    mission: {
      title: "What We Do",
      content: "We bridge the gap between job seekers and employers by providing actionable advice that works. Our content is based on real experiences, current market trends, and proven strategies that have helped thousands of professionals advance their careers.",
      values: [
        {
          title: "Practical Advice",
          description: "Every tip we share is tested and proven to work in real job search situations",
          icon: "book-open"
        },
        {
          title: "Current Market Insights",
          description: "We stay updated with the latest hiring trends and employer expectations",
          icon: "chart-line"
        },
        {
          title: "Actionable Strategies",
          description: "Our guides provide step-by-step instructions you can implement immediately",
          icon: "academic-cap"
        },
        {
          title: "Continuous Learning",
          description: "We constantly research and adapt our advice to match evolving job market demands",
          icon: "refresh"
        }
      ]
    },
    authority: {
      title: "Why Trust Us",
      credentials: [
        "Years of combined experience in recruitment, HR, and career coaching",
        "Successful track record of helping professionals at all career levels",
        "Deep understanding of modern hiring processes and employer expectations",
        "Regular interaction with HR professionals and hiring managers across industries",
        "Certified career coaches and recruitment specialists on our team"
      ],
      stats: [
        { number: "500+", label: "Job Seekers Helped" },
        { number: "10+", label: "Years Experience" },
        { number: "Real", label: "World Results" },
        { number: "Proven", label: "Strategies" }
      ]
    },
    company: {
      logo: "/logo-about.png",
      founded: "2020",
      location: "Global Team",
      description: "Jobhack was founded by career professionals who understand the challenges of modern job searching. We experienced the frustration of generic advice that doesn't work in today's market, so we created a platform that provides practical, tested strategies that actually help people land their dream jobs.",
      certifications: [
        { name: "Certified Career Coach", image: "/cert/career-coach.png" },
        { name: "HR Professional Certification", image: "/cert/hr-cert.png" },
        { name: "LinkedIn Learning Partner", image: "/cert/linkedin-partner.png" }
      ]
    }
  },

}

module.exports = siteConfig