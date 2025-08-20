'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Sparkles } from 'lucide-react'

export default function CompletionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            delay: 0.2 
          }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Thank You!
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your feedback has been submitted successfully. Your insights will help drive 
            meaningful growth and development.
          </p>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Your response has been saved securely</span>
          </div>
          <p className="text-gray-500 text-sm">
            You can close this page now. Thank you for your valuable feedback!
          </p>
        </motion.div>

        {/* Floating Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-3 h-3 bg-primary-400 rounded-full opacity-60"
          />
          <motion.div
            animate={{ 
              y: [0, 25, 0],
              rotate: [0, -8, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-10 w-2 h-2 bg-secondary-400 rounded-full opacity-60"
          />
        </div>
      </div>
    </div>
  )
}
