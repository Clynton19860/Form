'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, CheckCircle, Circle, Star, TrendingUp, Users, Lightbulb, Target, BarChart3, FileText } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { likertQuestions, textQuestions, categories } from '@/lib/survey-data'
import { useRouter } from 'next/navigation'

interface SurveyForm {
  likert: { [key: string]: number }
  text: { [key: string]: string }
  email?: string
}

export default function SurveyPage() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [currentSection, setCurrentSection] = useState<'likert' | 'text'>('likert')
  const router = useRouter()
  
  const { control, handleSubmit, watch, formState: { errors } } = useForm<SurveyForm>({
    defaultValues: {
      likert: {},
      text: {}
    }
  })

  const watchedValues = watch()
  
  // Calculate progress based on actual answered questions
  const totalLikertQuestions = likertQuestions.length
  const totalTextQuestions = textQuestions.length
  const answeredLikertQuestions = Object.values(watchedValues.likert || {}).filter(score => score > 0).length
  const answeredTextQuestions = Object.values(watchedValues.text || {}).filter(text => text && text.trim().length > 0).length
  
  const totalProgress = ((answeredLikertQuestions + answeredTextQuestions) / (totalLikertQuestions + totalTextQuestions)) * 100

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const onSubmit = async (data: SurveyForm) => {
    try {
      const response = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (response.ok) {
        const result = await response.json()
        router.push(`/completion?id=${result.id}`)
      }
    } catch (error) {
      console.error('Error submitting survey:', error)
    }
  }

  const likertScaleLabels = [
    'Strongly Disagree',
    'Disagree', 
    'Neutral',
    'Agree',
    'Strongly Agree'
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Leadership & Management': return Target
      case 'Communication Skills': return Users
      case 'Teamwork & Collaboration': return Users
      case 'Problem Solving & Innovation': return Lightbulb
      case 'Professional Development': return TrendingUp
      default: return Star
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Leadership & Management': return 'from-blue-500 to-purple-500'
      case 'Communication Skills': return 'from-green-500 to-teal-500'
      case 'Teamwork & Collaboration': return 'from-orange-500 to-red-500'
      case 'Problem Solving & Innovation': return 'from-purple-500 to-pink-500'
      case 'Professional Development': return 'from-indigo-500 to-blue-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-6">360° Feedback Survey</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Help us understand performance and development areas. Your feedback drives meaningful growth.
          </p>
        </motion.div>

        {/* Enhanced Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          className="mb-12"
        >
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Survey Progress</h3>
              <span className="text-2xl font-bold gradient-text">{Math.round(totalProgress)}%</span>
            </div>
            
            <div className="progress-bar h-6 rounded-full overflow-hidden mb-4">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-primary-600">{answeredLikertQuestions}</div>
                <div className="text-sm text-gray-600">Likert Questions</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-secondary-600">{answeredTextQuestions}</div>
                <div className="text-sm text-gray-600">Text Questions</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">{totalLikertQuestions + totalTextQuestions - answeredLikertQuestions - answeredTextQuestions}</div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-600">{totalLikertQuestions + totalTextQuestions}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-12 justify-center"
        >
          <button
            onClick={() => setCurrentSection('likert')}
            className={`px-8 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center gap-3 ${
              currentSection === 'likert'
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-xl scale-105'
                : 'bg-white/20 text-gray-700 hover:bg-white/30 hover:scale-105'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Likert Questions ({answeredLikertQuestions}/{totalLikertQuestions})
          </button>
          <button
            onClick={() => setCurrentSection('text')}
            className={`px-8 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center gap-3 ${
              currentSection === 'text'
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-xl scale-105'
                : 'bg-white/20 text-gray-700 hover:bg-white/30 hover:scale-105'
            }`}
          >
            <FileText className="w-5 h-5" />
            Open Questions ({answeredTextQuestions}/{totalTextQuestions})
          </button>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Likert Questions Section */}
          {currentSection === 'likert' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {categories.map((category) => {
                const categoryQuestions = likertQuestions.filter(q => q.category === category)
                const answeredInCategory = categoryQuestions.filter(q => 
                  watchedValues.likert?.[q.id] && watchedValues.likert[q.id] > 0
                ).length
                const isExpanded = expandedCategories.includes(category)
                const Icon = getCategoryIcon(category)
                const categoryColor = getCategoryColor(category)

                return (
                  <motion.div
                    key={category}
                    className="glass-panel overflow-hidden"
                    layout
                  >
                    {/* Enhanced Category Header */}
                    <button
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className="w-full p-8 flex items-center justify-between hover:bg-white/5 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${categoryColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">{category}</h3>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                              {answeredInCategory}/{categoryQuestions.length} completed
                            </span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
                                style={{ width: `${(answeredInCategory / categoryQuestions.length) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronUp className="w-8 h-8 text-gray-600" />
                      </motion.div>
                    </button>

                    {/* Questions */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="px-8 pb-8 space-y-8"
                        >
                          {categoryQuestions.map((question, index) => (
                            <motion.div
                              key={question.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="glass-panel p-6 hover:shadow-xl transition-all duration-300"
                            >
                              <div className="mb-6">
                                <div className="flex items-start gap-4">
                                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {question.id}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                      {question.question}
                                    </h4>
                                    {question.description && (
                                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border-l-4 border-primary-200">
                                        💡 {question.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Enhanced Likert Scale */}
                              <Controller
                                name={`likert.${question.id}`}
                                control={control}
                                rules={{ required: 'Please select a rating' }}
                                render={({ field }) => (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-5 gap-3">
                                      {likertScaleLabels.map((label, index) => (
                                        <label
                                          key={index}
                                          className="group cursor-pointer"
                                        >
                                          <input
                                            type="radio"
                                            value={index + 1}
                                            checked={field.value === index + 1}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            className="sr-only"
                                          />
                                          <div className={`p-4 rounded-xl border-2 transition-all duration-300 text-center group-hover:scale-105 ${
                                            field.value === index + 1
                                              ? 'border-primary-500 bg-primary-50 shadow-lg'
                                              : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                                          }`}>
                                            <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center transition-all duration-300 ${
                                              field.value === index + 1
                                                ? 'bg-primary-500 text-white'
                                                : 'bg-gray-100 text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-500'
                                            }`}>
                                              {field.value === index + 1 ? (
                                                <CheckCircle className="w-5 h-5" />
                                              ) : (
                                                <Circle className="w-5 h-5" />
                                              )}
                                            </div>
                                            <span className={`text-xs font-medium ${
                                              field.value === index + 1 ? 'text-primary-700' : 'text-gray-600'
                                            }`}>
                                              {label}
                                            </span>
                                          </div>
                                        </label>
                                      ))}
                                    </div>
                                    {errors.likert?.[question.id] && (
                                      <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                                        ⚠️ {errors.likert[question.id]?.message}
                                      </p>
                                    )}
                                  </div>
                                )}
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {/* Text Questions Section */}
          {currentSection === 'text' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {textQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {question.id}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-800 mb-3">
                          {question.question}
                        </h4>
                        {question.description && (
                          <p className="text-gray-600 bg-blue-50 p-4 rounded-lg border-l-4 border-secondary-200">
                            💭 {question.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <Controller
                      name={`text.${question.id}`}
                      control={control}
                      rules={{ required: 'Please provide an answer' }}
                      render={({ field }) => (
                        <div>
                          <TextareaAutosize
                            {...field}
                            minRows={4}
                            maxRows={10}
                            placeholder="Share your thoughts and provide specific examples..."
                            className="w-full p-6 border-2 border-gray-200 rounded-2xl resize-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300 text-lg"
                          />
                          {errors.text?.[question.id] && (
                            <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200 mt-3">
                              ⚠️ {errors.text[question.id]?.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Enhanced Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <button
              type="submit"
              disabled={totalProgress < 100}
              className="glass-button text-xl px-16 py-6 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {totalProgress < 100 ? (
                <>
                  <CheckCircle className="w-6 h-6 mr-3" />
                  Complete All Questions to Submit
                </>
              ) : (
                <>
                  <CheckCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Submit Survey
                </>
              )}
            </button>
            
            {totalProgress < 100 && (
              <p className="text-gray-500 mt-4">
                {totalLikertQuestions + totalTextQuestions - answeredLikertQuestions - answeredTextQuestions} questions remaining
              </p>
            )}
          </motion.div>
        </form>
      </div>
    </div>
  )
}
