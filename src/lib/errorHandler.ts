/**
 * Error Handler Service
 * 
 * Merkezi hata yönetimi servisi
 * Hataları yakalama, loglama ve kullanıcıya bildirim gösterme
 */

import { logger } from './logger';

// Hata türleri
export type ErrorType = 
  | 'NETWORK_ERROR'
  | 'AUTH_ERROR'
  | 'VALIDATION_ERROR'
  | 'FIREBASE_ERROR'
  | 'STORAGE_ERROR'
  | 'UNKNOWN_ERROR';

// Hata yapısı
export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: unknown;
  context?: string;
  timestamp: string;
  recoverable: boolean;
}

// Hata sonucu
export interface ErrorResult<T = null> {
  success: false;
  error: AppError;
  data: T;
}

// Başarı sonucu
export interface SuccessResult<T> {
  success: true;
  data: T;
  error: null;
}

// Genel sonuç tipi
export type Result<T> = SuccessResult<T> | ErrorResult;

/**
 * Başarılı sonuç oluştur
 */
export const success = <T>(data: T): SuccessResult<T> => ({
  success: true,
  data,
  error: null,
});

/**
 * Hata sonucu oluştur
 */
export const failure = (error: AppError): ErrorResult => ({
  success: false,
  error,
  data: null,
});

/**
 * Hata türünü belirle
 */
const determineErrorType = (error: unknown): ErrorType => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('network') || message.includes('fetch')) {
      return 'NETWORK_ERROR';
    }
    if (message.includes('auth') || message.includes('permission') || message.includes('unauthorized')) {
      return 'AUTH_ERROR';
    }
    if (message.includes('validation') || message.includes('invalid')) {
      return 'VALIDATION_ERROR';
    }
    if (message.includes('firebase') || message.includes('firestore')) {
      return 'FIREBASE_ERROR';
    }
    if (message.includes('storage') || message.includes('upload')) {
      return 'STORAGE_ERROR';
    }
  }
  
  return 'UNKNOWN_ERROR';
};

/**
 * Kullanıcı dostu hata mesajı üret
 */
export const getUserFriendlyMessage = (type: ErrorType, originalMessage?: string): string => {
  const messages: Record<ErrorType, string> = {
    NETWORK_ERROR: 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.',
    AUTH_ERROR: 'Yetkilendirme hatası. Lütfen tekrar giriş yapın.',
    VALIDATION_ERROR: 'Girilen bilgiler geçersiz. Lütfen kontrol edin.',
    FIREBASE_ERROR: 'Veritabanı hatası. Lütfen daha sonra tekrar deneyin.',
    STORAGE_ERROR: 'Dosya işlemi başarısız. Lütfen tekrar deneyin.',
    UNKNOWN_ERROR: 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
  };
  
  return messages[type] || originalMessage || messages.UNKNOWN_ERROR;
};

/**
 * Hata oluştur
 */
export const createError = (
  type: ErrorType,
  message: string,
  originalError?: unknown,
  context?: string,
  recoverable = true
): AppError => ({
  type,
  message,
  originalError,
  context,
  timestamp: new Date().toISOString(),
  recoverable,
});

/**
 * Hata yakala ve logla
 */
export const handleError = (
  error: unknown,
  context?: string,
  _showNotification = true
): AppError => {
  const errorType = determineErrorType(error);
  const originalMessage = error instanceof Error ? error.message : String(error);
  const userMessage = getUserFriendlyMessage(errorType, originalMessage);
  
  const appError = createError(errorType, userMessage, error, context);
  
  // Hatayı logla
  logger.error(`Error in ${context || 'unknown'}:`, {
    type: errorType,
    message: originalMessage,
    userMessage,
  });
  
  // Geliştirme modunda tam hatayı göster
  if (process.env.NODE_ENV === 'development') {
    console.error('Full error:', error);
  }
  
  return appError;
};

/**
 * Async işlem wrapper - hataları otomatik yakalar
 */
export const tryCatch = async <T>(
  fn: () => Promise<T>,
  context?: string
): Promise<Result<T>> => {
  try {
    const data = await fn();
    return success(data);
  } catch (error) {
    const appError = handleError(error, context);
    return failure(appError);
  }
};

/**
 * Sync işlem wrapper
 */
export const tryCatchSync = <T>(
  fn: () => T,
  context?: string
): Result<T> => {
  try {
    const data = fn();
    return success(data);
  } catch (error) {
    const appError = handleError(error, context);
    return failure(appError);
  }
};

/**
 * Firebase hata kodu çevirici
 */
export const translateFirebaseError = (errorCode: string): string => {
  const translations: Record<string, string> = {
    'auth/user-not-found': 'Kullanıcı bulunamadı.',
    'auth/wrong-password': 'Şifre yanlış.',
    'auth/email-already-in-use': 'Bu e-posta adresi zaten kullanımda.',
    'auth/weak-password': 'Şifre çok zayıf.',
    'auth/invalid-email': 'Geçersiz e-posta adresi.',
    'auth/too-many-requests': 'Çok fazla deneme. Lütfen daha sonra tekrar deneyin.',
    'permission-denied': 'Bu işlem için yetkiniz yok.',
    'not-found': 'İstenen kaynak bulunamadı.',
    'already-exists': 'Bu kayıt zaten mevcut.',
    'resource-exhausted': 'İşlem limiti aşıldı.',
    'unavailable': 'Servis şu anda kullanılamıyor.',
  };
  
  return translations[errorCode] || `Bir hata oluştu: ${errorCode}`;
};

// Named exports for module default
const errorHandler = {
  handleError,
  createError,
  tryCatch,
  tryCatchSync,
  success,
  failure,
  getUserFriendlyMessage,
  translateFirebaseError,
};

export default errorHandler;
