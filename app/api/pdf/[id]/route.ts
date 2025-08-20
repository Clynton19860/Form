import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { likertQuestions, textQuestions, categories } from '@/lib/survey-data'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Fetch survey response
    const { data: response, error } = await supabase
      .from('survey_responses')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !response) {
      return NextResponse.json(
        { error: 'Survey response not found' },
        { status: 404 }
      )
    }

    // Create PDF document
    const pdfDoc = await PDFDocument.create()
    let page = pdfDoc.addPage([595.28, 841.89]) // A4 size
    const { width, height } = page.getSize()

    // Load fonts
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // Helper function to add text with wrapping
    const addWrappedText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      fontSize: number,
      font: any,
      color: any = rgb(0, 0, 0)
    ) => {
      const words = text.split(' ')
      let line = ''
      let currentY = y
      const lineHeight = fontSize * 1.2

      for (const word of words) {
        const testLine = line + word + ' '
        const testWidth = font.widthOfTextAtSize(testLine, fontSize)
        
        if (testWidth > maxWidth && line !== '') {
          page.drawText(line.trim(), { x, y: currentY, size: fontSize, font, color })
          line = word + ' '
          currentY -= lineHeight
        } else {
          line = testLine
        }
      }
      
      if (line.trim()) {
        page.drawText(line.trim(), { x, y: currentY, size: fontSize, font, color })
        currentY -= lineHeight
      }
      
      return currentY
    }

    // Header
    const headerY = height - 50
    page.drawText('360° Feedback Survey Report', {
      x: 50,
      y: headerY,
      size: 24,
      font: helveticaBold,
      color: rgb(0.4, 0.2, 0.6)
    })

    page.drawText(`Generated on: ${new Date().toLocaleDateString()}`, {
      x: 50,
      y: headerY - 30,
      size: 12,
      font: helveticaFont,
      color: rgb(0.5, 0.5, 0.5)
    })

    // Summary Statistics
    let currentY = headerY - 80
    page.drawText('Survey Summary', {
      x: 50,
      y: currentY,
      size: 18,
      font: helveticaBold,
      color: rgb(0.2, 0.2, 0.2)
    })

    currentY -= 30

    // Calculate category averages
    const categoryAverages: { [key: string]: number } = {}
    categories.forEach(category => {
      const categoryQuestions = likertQuestions.filter(q => q.category === category)
      const categoryScores = categoryQuestions.map(q => response.likert_answers[q.id - 1])
      const average = categoryScores.reduce((sum: number, score: number) => sum + score, 0) / categoryScores.length
      categoryAverages[category] = Math.round(average * 100) / 100
    })

    // Display category averages
    Object.entries(categoryAverages).forEach(([category, average]) => {
      const scoreText = `${category}: ${average}/5`
      page.drawText(scoreText, {
        x: 50,
        y: currentY,
        size: 12,
        font: helveticaFont,
        color: rgb(0.3, 0.3, 0.3)
      })
      currentY -= 20
    })

    currentY -= 20

    // Overall average
    const overallAverage = response.likert_answers.reduce((sum: number, score: number) => sum + score, 0) / response.likert_answers.length
    page.drawText(`Overall Average: ${Math.round(overallAverage * 100) / 100}/5`, {
      x: 50,
      y: currentY,
      size: 14,
      font: helveticaBold,
      color: rgb(0.2, 0.2, 0.2)
    })

    currentY -= 40

    // Detailed Likert Responses
    page.drawText('Detailed Responses - Likert Scale Questions', {
      x: 50,
      y: currentY,
      size: 16,
      font: helveticaBold,
      color: rgb(0.2, 0.2, 0.2)
    })

    currentY -= 25

    categories.forEach(category => {
      if (currentY < 100) {
        page = pdfDoc.addPage([595.28, 841.89])
        currentY = height - 50
      }

      page.drawText(category, {
        x: 50,
        y: currentY,
        size: 14,
        font: helveticaBold,
        color: rgb(0.4, 0.2, 0.6)
      })
      currentY -= 20

      const categoryQuestions = likertQuestions.filter(q => q.category === category)
      categoryQuestions.forEach(question => {
        const score = response.likert_answers[question.id - 1]
        const scoreLabel = ['', 'Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'][score]
        
        const questionText = `${question.id}. ${question.question}`
        currentY = addWrappedText(questionText, 70, currentY, width - 140, 10, helveticaFont)
        
        page.drawText(`Score: ${score}/5 (${scoreLabel})`, {
          x: 70,
          y: currentY,
          size: 10,
          font: helveticaFont,
          color: rgb(0.5, 0.5, 0.5)
        })
        currentY -= 25
      })
      
      currentY -= 10
    })

    // Text Responses
    if (currentY < 150) {
      page = pdfDoc.addPage([595.28, 841.89])
      currentY = height - 50
    }

    page.drawText('Open-Ended Responses', {
      x: 50,
      y: currentY,
      size: 16,
      font: helveticaBold,
      color: rgb(0.2, 0.2, 0.2)
    })

    currentY -= 25

    textQuestions.forEach(question => {
      if (currentY < 100) {
        page = pdfDoc.addPage([595.28, 841.89])
        currentY = height - 50
      }

      page.drawText(`${question.id}. ${question.question}`, {
        x: 50,
        y: currentY,
        size: 12,
        font: helveticaBold,
        color: rgb(0.3, 0.3, 0.3)
      })
      currentY -= 20

      const answer = response.text_answers[question.id - 1] || 'No response provided'
      currentY = addWrappedText(answer, 70, currentY, width - 140, 10, helveticaFont)
      currentY -= 20
    })

    // Footer
    const lastPage = pdfDoc.getPages()[pdfDoc.getPageCount() - 1]
    lastPage.drawText('360° Feedback Survey Report - Confidential', {
      x: 50,
      y: 50,
      size: 10,
      font: helveticaFont,
      color: rgb(0.5, 0.5, 0.5)
    })

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save()

    return new Response(new Blob([Buffer.from(pdfBytes)], { type: 'application/pdf' }), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="360-feedback-report-${id}.pdf"`
      }
    })

  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
