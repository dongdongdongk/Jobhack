import { Metadata } from 'next'
import { generateSEOMetadata, generateJSONLD, StructuredData } from '@/components/SEO'
import { getUIText } from '@/lib/config'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  const uiText = getUIText()
  
  // Generate JSON-LD for contact page
  const jsonLD = generateJSONLD({
    title: uiText.contactPageTitle,
    description: uiText.contactPageSubtitle,
    url: 'https://webmaker-ai-blog.vercel.app/contact',
    type: 'website'
  })

  return (
    <>
      <StructuredData data={jsonLD} />
      <ContactForm />
    </>
  )
}

// Generate metadata for SEO
export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us - Get in Touch',
  description: 'Have a trending topic suggestion, business inquiry, or collaboration idea? Contact TokTips Daily team and get expert insights on TikTok trends.',
  url: 'https://webmaker-ai-blog.vercel.app/contact',
  type: 'website'
})