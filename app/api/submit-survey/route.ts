import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { likert, text, email } = body

    // Validate required fields
    if (!likert || !text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Convert likert object to array
    const likertArray = Array.from({ length: 50 }, (_, i) => likert[i + 1] || 0)
    const textArray = Array.from({ length: 10 }, (_, i) => text[i + 1] || '')

    // Insert into database
    const { data, error } = await supabase
      .from('survey_responses')
      .insert({
        email: email || null,
        likert_answers: likertArray,
        text_answers: textArray,
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save survey response' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      id: data.id,
      message: 'Survey submitted successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
