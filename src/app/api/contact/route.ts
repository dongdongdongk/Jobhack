import { NextRequest, NextResponse } from 'next/server'
import { getEmail, getSiteInfo, getBranding } from '@/lib/config'
import nodemailer from 'nodemailer'

interface ContactFormData {
  name: string
  email: string
  subject: string
  category: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, subject, category, message } = body
    const emailConfig = getEmail()
    const siteInfo = getSiteInfo()
    const branding = getBranding()

    // Validate required fields
    if (!name || !email || !subject || !category || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
      }
    })

    // Email content (Korean)
    const emailSubject = `[${category.toUpperCase()}] ${subject} - ${name}`
    
    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>새로운 문의 접수</title>
          <style>
            body { 
              font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif; 
              line-height: 1.6; 
              color: #333; 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
            }
            .header { 
              background: linear-gradient(135deg, #1e293b, #334155); 
              color: white; 
              padding: 20px; 
              border-radius: 12px 12px 0 0; 
              text-align: center; 
            }
            .header h1 { 
              margin: 0; 
              font-size: 24px; 
            }
            .content { 
              background: #f8fafc; 
              padding: 30px; 
              border-radius: 0 0 12px 12px; 
            }
            .field { 
              margin-bottom: 20px; 
              padding: 15px; 
              background: white; 
              border-radius: 8px; 
              border-left: 4px solid #1e293b; 
            }
            .field-label { 
              font-weight: bold; 
              color: #1e293b; 
              margin-bottom: 5px; 
              font-size: 12px; 
            }
            .field-value { 
              color: #475569; 
              word-break: break-word; 
            }
            .category-badge { 
              display: inline-block; 
              background: #1e293b; 
              color: white; 
              padding: 4px 12px; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: bold; 
            }
            .timestamp { 
              text-align: center; 
              font-size: 12px; 
              color: #64748b; 
              margin-top: 20px; 
              padding-top: 15px; 
              border-top: 1px solid #e2e8f0; 
            }
            .message-content { 
              white-space: pre-wrap; 
              line-height: 1.8; 
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📧 새로운 문의가 접수되었습니다</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">${siteInfo.name} 문의 폼</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="field-label">문의 유형</div>
              <div class="field-value">
                <span class="category-badge">${category}</span>
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">이름</div>
              <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">이메일</div>
              <div class="field-value">
                <a href="mailto:${email}" style="color: #1e293b; text-decoration: none;">${email}</a>
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">제목</div>
              <div class="field-value">${subject}</div>
            </div>
            
            <div class="field">
              <div class="field-label">메시지</div>
              <div class="field-value message-content">${message}</div>
            </div>
            
            <div class="timestamp">
              접수 시간: ${new Date().toLocaleString('ko-KR', { 
                timeZone: 'Asia/Seoul',
                dateStyle: 'full',
                timeStyle: 'short'
              })}
            </div>
          </div>
        </body>
      </html>
    `

    // Send email to admin (use environment variable for actual email)
    const gmailUser = process.env.GMAIL_USER
    
    if (!gmailUser) {
      return NextResponse.json(
        { error: 'Gmail user not configured' },
        { status: 500 }
      )
    }
    
    const mailOptions = {
      from: `${siteInfo.name} <${gmailUser}>`,
      to: gmailUser, // 문자열로 직접 전송
      replyTo: `${name} <${email}>`,
      subject: emailSubject,
      html: emailHTML,
      text: `
새로운 문의가 접수되었습니다

문의 유형: ${category.toUpperCase()}
이름: ${name}
이메일: ${email}
제목: ${subject}

메시지:
${message}

접수 시간: ${new Date().toLocaleString('ko-KR', { 
  timeZone: 'Asia/Seoul',
  dateStyle: 'full',
  timeStyle: 'short'
})}
      `.trim()
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to send message',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}