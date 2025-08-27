'use client'

import { useState } from 'react'
import { getUIText, getBranding } from '@/lib/config'

interface ContactFormData {
  name: string
  email: string
  subject: string
  category: string
  message: string
}

interface FormState {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
}

export default function ContactForm() {
  const uiText = getUIText()
  const branding = getBranding()
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  })
  
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (formState.error) {
      setFormState(prev => ({ ...prev, error: null }))
    }
  }

  const validateForm = (): boolean => {
    const requiredFields = ['name', 'email', 'subject', 'category', 'message']
    
    for (const field of requiredFields) {
      if (!formData[field as keyof ContactFormData].trim()) {
        setFormState(prev => ({
          ...prev,
          error: `${uiText.contactFields[field as keyof typeof uiText.contactFields].label} is required`
        }))
        return false
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormState(prev => ({
        ...prev,
        error: 'Please enter a valid email address'
      }))
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      error: null
    }))

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setFormState({
        isSubmitting: false,
        isSuccess: true,
        error: null
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      })

    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: 'Failed to send message. Please try again.'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {uiText.contactPageTitle}
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {uiText.contactPageSubtitle}
          </p>
        </div>

        {/* Success Message */}
        {formState.isSuccess && (
          <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-green-900">{uiText.contactFormSuccess}</h3>
                <p className="text-green-700 mt-1">{uiText.contactFormSuccessDesc}</p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">{uiText.contactFormTitle}</h2>
            <p className="text-primary-100 mt-2">{uiText.contactFormSubtitle}</p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  {uiText.contactFields.name.label}
                  {uiText.contactFields.name.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={uiText.contactFields.name.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  required={uiText.contactFields.name.required}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  {uiText.contactFields.email.label}
                  {uiText.contactFields.email.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={uiText.contactFields.email.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  required={uiText.contactFields.email.required}
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                  {uiText.contactFields.subject.label}
                  {uiText.contactFields.subject.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={uiText.contactFields.subject.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  required={uiText.contactFields.subject.required}
                />
              </div>

              {/* Category Field */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
                  {uiText.contactFields.category.label}
                  {uiText.contactFields.category.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  required={uiText.contactFields.category.required}
                >
                  <option value="">Select a category...</option>
                  {uiText.contactFields.category.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  {uiText.contactFields.message.label}
                  {uiText.contactFields.message.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={uiText.contactFields.message.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-vertical"
                  required={uiText.contactFields.message.required}
                />
              </div>

              {/* Error Message */}
              {formState.error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex">
                    <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="ml-2 text-sm text-red-700">{formState.error}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {formState.isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {uiText.contactFormSending}
                    </div>
                  ) : (
                    uiText.contactFormButton
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-3xl border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {branding.siteName}
              </span>
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {branding.footerDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {uiText.featureBadges.map((badge, index) => (
                <div key={index} className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <div className={`w-6 h-6 mr-3 flex items-center justify-center rounded-lg ${
                    index === 0 ? 'bg-gradient-to-br from-primary-500 to-primary-600' :
                    index === 1 ? 'bg-gradient-to-br from-secondary-500 to-secondary-600' :
                    'bg-gradient-to-br from-primary-500 to-secondary-500'
                  }`}>
                    {badge.icon === 'trending-up' && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z" />
                      </svg>
                    )}
                    {badge.icon === 'calendar' && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19M16,1V6L18.5,3.5L19.9,4.9L16,8.8L12.1,4.9L13.5,3.5L16,6V1Z" />
                      </svg>
                    )}
                    {badge.icon === 'zap' && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13,10V3L4,14H11V21L20,10H13Z" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium text-gray-700">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}