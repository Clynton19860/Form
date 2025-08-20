'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Eye, FileText, Users, BarChart3, Calendar, TrendingUp, Award, Target } from 'lucide-react'
import { categories } from '@/lib/survey-data'

// Sample data for demonstration
const sampleResponses = [
  {
    id: 'demo-001',
    email: 'john.doe@company.com',
    created_at: '2024-01-15T10:30:00Z',
    likert_answers: [4, 5, 3, 4, 5, 4, 3, 5, 4, 4, 5, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 5, 3, 4, 4, 5, 4, 3, 4, 5, 4, 4, 5, 3, 4, 4, 5, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 5, 3, 4],
    text_answers: [
      'Excellent leadership skills and always provides clear direction',
      'Could improve on delegating tasks more effectively',
      'Great team player who always supports colleagues',
      'Shows strong problem-solving abilities',
      'Adapts well to change and embraces new challenges',
      'Has a unique perspective that adds value to discussions',
      'Mentors junior team members effectively',
      'Contributes significantly to project success',
      'Lives company values through daily actions',
      'Overall excellent performance with room for growth in time management'
    ]
  },
  {
    id: 'demo-002',
    email: 'sarah.johnson@company.com',
    created_at: '2024-01-14T14:45:00Z',
    likert_answers: [5, 4, 5, 5, 4, 5, 4, 4, 5, 5, 4, 5, 4, 5, 4, 5, 5, 4, 4, 5, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 4, 5, 5, 4, 5, 4],
    text_answers: [
      'Outstanding communication skills and technical expertise',
      'Very detail-oriented, perhaps too much at times',
      'Natural leader who inspires the team',
      'Innovative thinker with creative solutions',
      'Handles pressure exceptionally well',
      'Brings positivity and energy to the workplace',
      'Excellent at knowledge sharing and training',
      'Key contributor to our most successful projects',
      'Embodies our core values perfectly',
      'Exceptional performer, ready for advancement'
    ]
  },
  {
    id: 'demo-003',
    email: 'mike.chen@company.com',
    created_at: '2024-01-13T09:15:00Z',
    likert_answers: [3, 4, 3, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 4, 3, 4],
    text_answers: [
      'Solid performer with consistent results',
      'Would benefit from more proactive communication',
      'Reliable team member who completes tasks well',
      'Good analytical skills, could be more creative',
      'Steady under pressure but could take more initiative',
      'Methodical approach to work',
      'Helpful when asked, could be more proactive in mentoring',
      'Contributes to team goals effectively',
      'Follows company policies well',
      'Dependable performer with potential for growth'
    ]
  },
  {
    id: 'demo-004',
    email: 'emily.rodriguez@company.com',
    created_at: '2024-01-12T16:20:00Z',
    likert_answers: [4, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 4, 5, 4, 4, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 4],
    text_answers: [
      'Great balance of technical and people skills',
      'Could work on time management during peak periods',
      'Excellent collaborator across departments',
      'Strong problem-solving with innovative approaches',
      'Shows great resilience and adaptability',
      'Brings fresh ideas and perspectives',
      'Active in mentoring and knowledge sharing',
      'Significant impact on customer satisfaction',
      'Strong advocate for company values',
      'High performer with leadership potential'
    ]
  },
  {
    id: 'demo-005',
    email: 'david.thompson@company.com',
    created_at: '2024-01-11T11:30:00Z',
    likert_answers: [5, 5, 4, 5, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5, 5, 5, 4, 5, 5, 4, 5, 4, 5, 5, 4, 5, 5, 4, 5, 4, 5, 5, 4, 5],
    text_answers: [
      'Exceptional leader with vision and execution skills',
      'Sometimes moves too fast for team to keep up',
      'Builds high-performing teams consistently',
      'Revolutionary thinking that drives innovation',
      'Thrives under pressure and delivers results',
      'Unique strategic mindset that sets direction',
      'Develops talent across the organization',
      'Transforms projects and exceeds expectations',
      'Champion of company culture and values',
      'Top performer ready for executive leadership'
    ]
  }
]

export default function AdminDemoPage() {
  const [selectedResponse, setSelectedResponse] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const calculateOverallAverage = (likertAnswers: number[]) => {
    return (likertAnswers.reduce((sum: number, score: number) => sum + score, 0) / likertAnswers.length).toFixed(2)
  }

  const calculateCategoryAverage = (likertAnswers: number[], categoryStart: number, categoryLength: number) => {
    const categoryScores = likertAnswers.slice(categoryStart, categoryStart + categoryLength)
    return (categoryScores.reduce((sum: number, score: number) => sum + score, 0) / categoryScores.length).toFixed(2)
  }

  const handleViewResponse = (response: any) => {
    setSelectedResponse(response)
    setShowModal(true)
  }

  const handleDownloadPDF = (responseId: string) => {
    // Simulate PDF download
    alert(`PDF download for response ${responseId} would start here. This is a demo - connect to real PDF generation in production.`)
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Email', 'Date', 'Overall Average', 'Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Professional Dev']
    const csvContent = [
      headers.join(','),
      ...sampleResponses.map(response => {
        const overallAvg = calculateOverallAverage(response.likert_answers)
        const leadership = calculateCategoryAverage(response.likert_answers, 0, 10)
        const communication = calculateCategoryAverage(response.likert_answers, 10, 10)
        const teamwork = calculateCategoryAverage(response.likert_answers, 20, 10)
        const problemSolving = calculateCategoryAverage(response.likert_answers, 30, 10)
        const professionalDev = calculateCategoryAverage(response.likert_answers, 40, 10)
        const date = new Date(response.created_at).toLocaleDateString()
        
        return [
          response.id,
          response.email,
          date,
          overallAvg,
          leadership,
          communication,
          teamwork,
          problemSolving,
          professionalDev
        ].join(',')
      })
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'demo-360-feedback-responses.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const overallStats = {
    totalResponses: sampleResponses.length,
    averageScore: (sampleResponses.reduce((sum, response) => 
      sum + parseFloat(calculateOverallAverage(response.likert_answers)), 0) / sampleResponses.length).toFixed(2),
    withEmail: sampleResponses.filter(r => r.email).length,
    latestDate: new Date(Math.max(...sampleResponses.map(r => new Date(r.created_at).getTime()))).toLocaleDateString()
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">Demo Admin Dashboard</h1>
          </div>
          <p className="text-gray-600 text-lg">Preview how your 360° feedback data will look with sample responses</p>
          <div className="mt-4 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 inline-block">
            🎭 This is sample data for demonstration purposes
          </div>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="glass-panel p-6 text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{overallStats.totalResponses}</h3>
            <p className="text-gray-600 text-sm">Total Responses</p>
          </div>
          
          <div className="glass-panel p-6 text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{overallStats.averageScore}</h3>
            <p className="text-gray-600 text-sm">Average Score</p>
          </div>
          
          <div className="glass-panel p-6 text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{overallStats.withEmail}</h3>
            <p className="text-gray-600 text-sm">With Email</p>
          </div>
          
          <div className="glass-panel p-6 text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{overallStats.latestDate}</h3>
            <p className="text-gray-600 text-sm">Latest Response</p>
          </div>
        </motion.div>

        {/* Category Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-primary-600" />
            <h3 className="text-xl font-semibold text-gray-800">Category Performance Overview</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {categories.map((category, index) => {
              const categoryAverage = (sampleResponses.reduce((sum, response) => 
                sum + parseFloat(calculateCategoryAverage(response.likert_answers, index * 10, 10)), 0) / sampleResponses.length).toFixed(2)
              
              return (
                <div key={category} className="bg-white/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-2">{categoryAverage}</div>
                  <div className="text-sm text-gray-600 leading-tight">{category}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(parseFloat(categoryAverage) / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-8 justify-center"
        >
          <button
            onClick={exportToCSV}
            className="glass-button flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Download className="w-4 h-4" />
            Download Demo CSV
          </button>
          <button
            onClick={() => alert('Bulk PDF generation would happen here in the real dashboard')}
            className="glass-button flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <FileText className="w-4 h-4" />
            Generate All PDFs
          </button>
        </motion.div>

        {/* Responses Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-semibold text-gray-800">Survey Responses</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Overall Score</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Performance</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {sampleResponses.map((response, index) => {
                  const overallScore = parseFloat(calculateOverallAverage(response.likert_answers))
                  const performanceLevel = overallScore >= 4.5 ? 'Excellent' : overallScore >= 4.0 ? 'Good' : overallScore >= 3.5 ? 'Average' : 'Below Average'
                  const performanceColor = overallScore >= 4.5 ? 'text-green-600 bg-green-50' : overallScore >= 4.0 ? 'text-blue-600 bg-blue-50' : overallScore >= 3.5 ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'
                  
                  return (
                    <motion.tr
                      key={response.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800 font-mono">
                        {response.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {response.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(response.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">{overallScore.toFixed(2)}/5</span>
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
                              style={{ width: `${(overallScore / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${performanceColor}`}>
                          {performanceLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewResponse(response)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => handleDownloadPDF(response.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors group"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Response Detail Modal */}
        <AnimatePresence>
          {showModal && selectedResponse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-panel max-w-4xl max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Response Details</h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Response ID</h4>
                        <p className="text-gray-600 font-mono bg-gray-50 p-2 rounded">{selectedResponse.id}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                        <p className="text-gray-600">{selectedResponse.email}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Submission Date</h4>
                        <p className="text-gray-600">
                          {new Date(selectedResponse.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Overall Score</h4>
                        <p className="text-3xl font-bold text-primary-600">
                          {calculateOverallAverage(selectedResponse.likert_answers)}/5
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Category Breakdown</h4>
                        <div className="space-y-2">
                          {categories.map((category, index) => (
                            <div key={category} className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">{category}</span>
                              <span className="font-medium text-gray-800">
                                {calculateCategoryAverage(selectedResponse.likert_answers, index * 10, 10)}/5
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Sample Text Responses</h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {selectedResponse.text_answers.slice(0, 3).map((answer: string, index: number) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Question {index + 1}:</p>
                          <p className="text-gray-800">{answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => handleDownloadPDF(selectedResponse.id)}
                      className="glass-button flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF Report
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
