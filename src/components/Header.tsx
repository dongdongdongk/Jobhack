import Link from 'next/link'
import Image from 'next/image'
import { getBranding, getNavigation } from '@/lib/config'

export default function Header() {
  const branding = getBranding()
  const navigation = getNavigation()
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
          >
            <Image
              src="/logo-about.png"
              alt={branding.siteName}
              width={40}
              height={40}
              className="rounded-lg transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-2xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent group-hover:from-primary-700 group-hover:to-secondary-700 transition-all duration-200">
              {branding.siteName}
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.main.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-4 py-2 rounded-full hover:bg-primary-100"
                {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {item.name}
              </Link>
            ))}
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-secondary-600 rounded-full animate-pulse"></div>
              <span className="font-medium">Live</span>
            </div>
          </nav>
          
          <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}