import { Metadata } from 'next'
import { generateSEOMetadata, generateJSONLD, StructuredData } from '@/components/SEO'
import { getAboutPageConfig, getUIText, getSiteInfo, getBlogThemeColors } from '@/lib/config'
import Image from 'next/image'

export default function AboutPage() {
  const aboutConfig = getAboutPageConfig()
  const uiText = getUIText()
  const siteInfo = getSiteInfo()
  const colors = getBlogThemeColors()

  const jsonLD = generateJSONLD({
    title: aboutConfig.hero.title,
    description: aboutConfig.hero.description,
    url: `${siteInfo.url}/about`,
    type: 'website'
  })

  return (
    <>
      <StructuredData data={jsonLD} />
      
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="mb-8">
            <Image
              src={aboutConfig.company.logo}
              alt={siteInfo.name}
              width={200}
              height={200}
              className="mx-auto mb-6 rounded-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {aboutConfig.hero.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            {aboutConfig.hero.subtitle}
          </p>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {aboutConfig.hero.description}
          </p>
        </section>

        {/* Authority Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {aboutConfig.authority.stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.primary[500] }}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="rounded-lg p-8 md:p-12" style={{ background: `linear-gradient(to right, ${colors.primary[50]}, ${colors.secondary[50]})` }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {aboutConfig.mission.title}
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto text-center leading-relaxed">
              {aboutConfig.mission.content}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutConfig.mission.values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary[100] }}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary[600] }}>
                      {value.icon === 'book-open' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                      {value.icon === 'chart-line' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                      {value.icon === 'academic-cap' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />}
                      {value.icon === 'refresh' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />}
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {aboutConfig.team.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {aboutConfig.team.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {aboutConfig.team.members.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(to right, ${colors.primary[500]}, ${colors.secondary[500]})` }}>
                    <span className="text-white font-bold text-xl">
                      {member.name.split(' ')[0][0]}{member.name.split(' ')[1] ? member.name.split(' ')[1][0] : ''}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="font-medium mb-3" style={{ color: colors.primary[600] }}>
                    {member.role}
                  </p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.primary[100], color: colors.primary[700] }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  {member.experience}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Authority & Credentials */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {aboutConfig.authority.title}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Credentials</h3>
                <ul className="space-y-3">
                  {aboutConfig.authority.credentials.map((credential, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary[500] }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{credential}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h3>
                <div className="space-y-4">
                  {aboutConfig.company.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-xs font-semibold text-gray-600">{cert.name.slice(0, 2)}</span>
                      </div>
                      <span className="font-medium text-gray-900">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="text-center">
          <div className="rounded-lg p-8" style={{ background: `linear-gradient(to right, ${colors.secondary[50]}, ${colors.primary[50]})` }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Our Company</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
              {aboutConfig.company.description}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 2m8-2l2 2" />
                </svg>
                Founded {aboutConfig.company.founded}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {aboutConfig.company.location}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export const metadata: Metadata = generateSEOMetadata({
  title: 'About - JobHacks Blog',
  description: 'Learn about the team behind JobHacks Blog. Discover our mission, expertise, and practical approach to career advice and job search strategies.',
  url: '/about',
  type: 'website'
})