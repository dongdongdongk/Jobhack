'use client'

import { useState, useEffect } from 'react'

interface RelativeTimeProps {
  date: string | Date
  className?: string
}

export function RelativeTime({ date, className }: RelativeTimeProps) {
  const [relativeTime, setRelativeTime] = useState<string>('Loading...')

  useEffect(() => {
    const updateRelativeTime = () => {
      const now = new Date()
      const targetDate = new Date(date)
      const diffInMs = now.getTime() - targetDate.getTime()
      const diffInSeconds = Math.floor(diffInMs / 1000)

      // 미래 날짜인 경우 방금 전으로 표시
      if (diffInSeconds < 0) {
        setRelativeTime('Posted just now')
        return
      }

      if (diffInSeconds < 60) {
        setRelativeTime(`Posted ${diffInSeconds} seconds ago`)
        return
      }

      const diffInMinutes = Math.floor(diffInSeconds / 60)
      if (diffInMinutes < 60) {
        const unit = diffInMinutes === 1 ? 'minute' : 'minutes'
        setRelativeTime(`Posted ${diffInMinutes} ${unit} ago`)
        return
      }

      const diffInHours = Math.floor(diffInMinutes / 60)
      if (diffInHours < 24) {
        const unit = diffInHours === 1 ? 'hour' : 'hours'
        setRelativeTime(`Posted ${diffInHours} ${unit} ago`)
        return
      }

      const diffInDays = Math.floor(diffInHours / 24)
      if (diffInDays < 7) {
        const unit = diffInDays === 1 ? 'day' : 'days'
        setRelativeTime(`Posted ${diffInDays} ${unit} ago`)
        return
      }

      const diffInWeeks = Math.floor(diffInDays / 7)
      if (diffInWeeks < 4) {
        const unit = diffInWeeks === 1 ? 'week' : 'weeks'
        setRelativeTime(`Posted ${diffInWeeks} ${unit} ago`)
        return
      }

      const diffInMonths = Math.floor(diffInDays / 30)
      if (diffInMonths < 12) {
        const unit = diffInMonths === 1 ? 'month' : 'months'
        setRelativeTime(`Posted ${diffInMonths} ${unit} ago`)
        return
      }

      const diffInYears = Math.floor(diffInDays / 365)
      const unit = diffInYears === 1 ? 'year' : 'years'
      setRelativeTime(`Posted ${diffInYears} ${unit} ago`)
    }

    // 초기 실행
    updateRelativeTime()

    // 1분마다 업데이트
    const interval = setInterval(updateRelativeTime, 60000)

    return () => clearInterval(interval)
  }, [date])

  return (
    <time dateTime={new Date(date).toISOString()} className={className}>
      {relativeTime}
    </time>
  )
}