// ============================================
// Google Translate API Route
// ============================================

import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

interface TranslateRequest {
  text: string;
  targetLanguages: string[];
  sourceLanguage?: string;
}

interface TranslationResult {
  [locale: string]: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!GOOGLE_TRANSLATE_API_KEY) {
      return NextResponse.json(
        { error: 'Google Translate API key is not configured' },
        { status: 500 }
      );
    }

    const body: TranslateRequest = await request.json();
    const { text, targetLanguages, sourceLanguage = 'tr' } = body;

    if (!text || !targetLanguages || targetLanguages.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: text and targetLanguages' },
        { status: 400 }
      );
    }

    const translations: TranslationResult = {};

    // Her dil için çeviri yap
    for (const targetLang of targetLanguages) {
      if (targetLang === sourceLanguage) continue;

      const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLanguage,
          target: targetLang,
          format: 'text',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Translation error for ${targetLang}:`, errorData);
        continue;
      }

      const data = await response.json();
      const translatedText = data.data?.translations?.[0]?.translatedText;
      
      if (translatedText) {
        translations[targetLang] = translatedText;
      }
    }

    return NextResponse.json({ translations });
  } catch (error) {
    console.error('Translate API error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}
