/**
 * Logger Service
 * 
 * Merkezi loglama servisi - console.log yerine kullanılacak
 * Production'da logları kapatma veya harici servislere gönderme imkanı sağlar
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
  context?: string;
}

interface LoggerConfig {
  enabled: boolean;
  minLevel: LogLevel;
  showTimestamp: boolean;
  showContext: boolean;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Default configuration
const defaultConfig: LoggerConfig = {
  enabled: process.env.NODE_ENV !== 'production',
  minLevel: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  showTimestamp: true,
  showContext: true,
};

let config: LoggerConfig = { ...defaultConfig };

/**
 * Logger yapılandırmasını güncelle
 */
export const configureLogger = (newConfig: Partial<LoggerConfig>): void => {
  config = { ...config, ...newConfig };
};

/**
 * Log seviyesi kontrolü
 */
const shouldLog = (level: LogLevel): boolean => {
  if (!config.enabled) return false;
  return LOG_LEVELS[level] >= LOG_LEVELS[config.minLevel];
};

/**
 * Log entry formatla
 */
const formatLogEntry = (entry: LogEntry): string => {
  const parts: string[] = [];
  
  if (config.showTimestamp) {
    parts.push(`[${entry.timestamp}]`);
  }
  
  parts.push(`[${entry.level.toUpperCase()}]`);
  
  if (config.showContext && entry.context) {
    parts.push(`[${entry.context}]`);
  }
  
  parts.push(entry.message);
  
  return parts.join(' ');
};

/**
 * Temel log fonksiyonu
 */
const log = (level: LogLevel, message: string, data?: unknown, context?: string): void => {
  if (!shouldLog(level)) return;
  
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    data,
    context,
  };
  
  const formattedMessage = formatLogEntry(entry);
  
  switch (level) {
    case 'debug':
      if (data !== undefined) {
        console.debug(formattedMessage, data);
      } else {
        console.debug(formattedMessage);
      }
      break;
    case 'info':
      if (data !== undefined) {
        console.info(formattedMessage, data);
      } else {
        console.info(formattedMessage);
      }
      break;
    case 'warn':
      if (data !== undefined) {
        console.warn(formattedMessage, data);
      } else {
        console.warn(formattedMessage);
      }
      break;
    case 'error':
      if (data !== undefined) {
        console.error(formattedMessage, data);
      } else {
        console.error(formattedMessage);
      }
      break;
  }
};

/**
 * Context'li logger oluştur
 */
export const createLogger = (context: string) => ({
  debug: (message: string, data?: unknown) => log('debug', message, data, context),
  info: (message: string, data?: unknown) => log('info', message, data, context),
  warn: (message: string, data?: unknown) => log('warn', message, data, context),
  error: (message: string, data?: unknown) => log('error', message, data, context),
});

/**
 * Global logger instance
 */
export const logger = {
  debug: (message: string, data?: unknown, context?: string) => log('debug', message, data, context),
  info: (message: string, data?: unknown, context?: string) => log('info', message, data, context),
  warn: (message: string, data?: unknown, context?: string) => log('warn', message, data, context),
  error: (message: string, data?: unknown, context?: string) => log('error', message, data, context),
  
  // Firebase işlemleri için özel loggerlar
  firebase: createLogger('Firebase'),
  firestore: createLogger('Firestore'),
  storage: createLogger('Storage'),
  auth: createLogger('Auth'),
  
  // UI işlemleri için
  ui: createLogger('UI'),
  theme: createLogger('Theme'),
  pageBuilder: createLogger('PageBuilder'),
  
  // API işlemleri için
  api: createLogger('API'),
};

export default logger;
