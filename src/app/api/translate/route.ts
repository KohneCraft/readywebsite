// ============================================
// Translation API Route (Google & DeepL Support)
// Uses centralized API Keys from /api/settings/api-keys
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface TranslateRequest {
  text: string;
  targetLanguages: string[];
  sourceLanguage?: string;
}

interface TranslationResult {
  [locale: string]: string;
}

interface ApiKeysSettings {
  translationProvider: 'google' | 'deepl' | 'none';
  googleTranslateKey?: string;
  deeplApiKey?: string;
  mapProvider?: string;
  googleMapsKey?: string;
}

// Firestore'dan API ayarlarını al (centralized)
async function getTranslationSettings(): Promise<{
  provider: 'google' | 'deepl' | 'none';
  googleApiKey?: string;
  deeplApiKey?: string;
}> {
  try {
    const docRef = doc(db, 'settings', 'apiKeys');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as ApiKeysSettings;
      return {
        provider: data.translationProvider || 'none',
        googleApiKey: data.googleTranslateKey,
        deeplApiKey: data.deeplApiKey,
      };
    }
  } catch (error) {
    console.error('Error fetching translation settings:', error);
  }
  return { provider: 'none' };
}

// Google Translate API
async function translateWithGoogle(
  text: string,
  sourceLang: string,
  targetLang: string,
  apiKey: string
): Promise<string | null> {
  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Google Translate error for ${targetLang}:`, errorData);
      return null;
    }

    const data = await response.json();
    return data.data?.translations?.[0]?.translatedText || null;
  } catch (error) {
    console.error('Google Translate error:', error);
    return null;
  }
}

// DeepL API
async function translateWithDeepL(
  text: string,
  sourceLang: string,
  targetLang: string,
  apiKey: string
): Promise<string | null> {
  try {
    // DeepL dil kodları farklı olabilir
    const deeplSourceLang = sourceLang.toUpperCase();
    let deeplTargetLang = targetLang.toUpperCase();
    
    // DeepL'de EN için EN-GB veya EN-US kullanılıyor
    if (deeplTargetLang === 'EN') {
      deeplTargetLang = 'EN-GB';
    }

    // Free API: api-free.deepl.com, Pro API: api.deepl.com
    const isFreePlan = apiKey.endsWith(':fx');
    const baseUrl = isFreePlan 
      ? 'https://api-free.deepl.com/v2/translate'
      : 'https://api.deepl.com/v2/translate';

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        source_lang: deeplSourceLang,
        target_lang: deeplTargetLang,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`DeepL error for ${targetLang}:`, errorData);
      return null;
    }

    const data = await response.json();
    return data.translations?.[0]?.text || null;
  } catch (error) {
    console.error('DeepL error:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const settings = await getTranslationSettings();

    if (settings.provider === 'none') {
      return NextResponse.json(
        { error: 'No translation API configured. Please configure in Settings > Translation API.' },
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

      let translatedText: string | null = null;

      if (settings.provider === 'google' && settings.googleApiKey) {
        translatedText = await translateWithGoogle(
          text,
          sourceLanguage,
          targetLang,
          settings.googleApiKey
        );
      } else if (settings.provider === 'deepl' && settings.deeplApiKey) {
        translatedText = await translateWithDeepL(
          text,
          sourceLanguage,
          targetLang,
          settings.deeplApiKey
        );
      }

      if (translatedText) {
        translations[targetLang] = translatedText;
      }
    }

    return NextResponse.json({ 
      translations,
      provider: settings.provider 
    });
  } catch (error) {
    console.error('Translate API error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}

// API ayarlarını getir (GET) - redirect to centralized endpoint
export async function GET() {
  try {
    const settings = await getTranslationSettings();
    return NextResponse.json({
      provider: settings.provider,
      hasGoogleKey: !!settings.googleApiKey,
      hasDeeplKey: !!settings.deeplApiKey,
    });
  } catch (error) {
    console.error('Error getting translation settings:', error);
    return NextResponse.json(
      { error: 'Failed to get settings' },
      { status: 500 }
    );
  }
}
