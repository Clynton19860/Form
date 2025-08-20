'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Eye, FileText, Users, BarChart3, Calendar } from 'lucide-react'
import { supabase, SurveyResponse } from '@/lib/supabase'

export default function AdminPage() {
  const [responses, setResponses] = useState<SurveyResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedResponse, setSelectedResponse] = useState<SurveyResponse | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchResponses()
  }, [])

  const fetchResponses = async () => {
    try {
      const { data, error } = await supabase
        .from('survey_responses')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setResponses(data || [])
    } catch (error) {
      console.error('Error fetching responses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = async (responseId: string) => {
    try {
      const response = await fetch(`/api/pdf/${responseId}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `360-feedback-report-${responseId}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
    }
  }

  const handleViewResponse = (response: SurveyResponse) => {
    setSelectedResponse(response)
    setShowModal(true)
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Email', 'Date', 'Overall Average', 'Categories']
    const csvContent = [
      headers.join(','),
      ...responses.map(response => {
        const likertScores = response.likert_answers
        const overallAvg = (likertScores.reduce((sum, score) => sum + score, 0) / likertScores.length).toFixed(2)
        const date = new Date(response.created_at).toLocaleDateString()
        return [
          response.id,
          response.email || 'N/A',
          date,
          overallAvg,
          'Completed'
        ].join(',')
      })
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '360-feedback-responses.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const calculateOverallAverage = (likertAnswers: number[]) => {
    return (likertAnswers.reduce((sum, score) => sum + score, 0) / likertAnswers.length).toFixed(2)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading responses...</p>
        </div>
      </div>
    )
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
          <h1 className="text-4xl font-bold gradient-text mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg">Manage and analyze survey responses</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="glass-panel p-6 text-center">
            <Users className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{responses.length}</h3>
            <p className="text-gray-600">Total Responses</p>
          </div>
          
          <div className="glass-panel p-6 text-center">
            <FileText className="w-8 h-8 text-secondary-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">
              {responses.filter(r => r.email).length}
            </h3>
            <p className="text-gray-600">With Email</p>
          </div>
          
          <div className="glass-panel p-6 text-center">
            <BarChart3 className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">
              {responses.length > 0 ? calculateOverallAverage(responses[0].likert_answers) : '0'}
            </h3>
            <p className="text-gray-600">Avg Score</p>
          </div>
          
          <div className="glass-panel p-6 text-center">
            <Calendar className="w-8 h-8 text-secondary-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">
              {responses.length > 0 ? new Date(responses[0].created_at).toLocaleDateString() : 'N/A'}
            </h3>
            <p className="text-gray-600">Latest Response</p>
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
            className="glass-button flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export to CSV
          </button>
        </motion.div>

        {/* Responses Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Overall Score</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {responses.map((response) => (
                  <motion.tr
                    key={response.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800 font-mono">
                      {response.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {response.email || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(response.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                      {calculateOverallAverage(response.likert_answers)}/5
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewResponse(response)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(response.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
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
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Response ID</h4>
                      <p className="text-gray-600 font-mono">{selectedResponse.id}</p>
                    </div>

                    {selectedResponse.email && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                        <p className="text-gray-600">{selectedResponse.email}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Submission Date</h4>
                      <p className="text-gray-600">
                        {new Date(selectedResponse.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Overall Score</h4>
                      <p className="text-2xl font-bold text-primary-600">
                        {calculateOverallAverage(selectedResponse.likert_answers)}/5
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => handleDownloadPDF(selectedResponse.id)}
                        className="glass-button flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF Report
                      </button>
                    </div>
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
