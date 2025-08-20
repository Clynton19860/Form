import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '360° Feedback Survey',
  description: 'Professional 360-degree feedback survey with stunning design and comprehensive reporting',
  keywords: 'feedback, survey, 360, performance, assessment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-purple-50 to-pink-50">
          {/* Navigation */}
          <Navigation />
          
          {/* Animated background elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl animate-float-slow"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary-100/20 to-secondary-100/20 rounded-full blur-2xl animate-float"></div>
          </div>
          
          {/* Main content */}
          <div className="relative z-10 pt-16">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
