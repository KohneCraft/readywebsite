/**
 * HTML Sanitizer
 * 
 * DOMPurify kullanarak XSS koruması sağlar
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * HTML içeriğini sanitize et (XSS koruması)
 * Tehlikeli script ve event handler'ları temizler
 */
export function sanitizeHTML(dirty: string): string {
  if (!dirty) return '';
  
  return DOMPurify.sanitize(dirty, {
    // İzin verilen tag'ler
    ALLOWED_TAGS: [
      'p', 'br', 'b', 'i', 'u', 'strong', 'em', 'span', 'div',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'blockquote', 'pre', 'code',
      'hr', 'sub', 'sup',
    ],
    // İzin verilen attribute'lar
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'title', 'width', 'height',
      'class', 'id', 'style',
      'colspan', 'rowspan',
    ],
    // Link hedeflerini kontrol et
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * Sadece metin içeren HTML'i sanitize et
 * Tüm tag'leri kaldırır, sadece metin kalır
 */
export function sanitizeText(dirty: string): string {
  if (!dirty) return '';
  
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

/**
 * CSS kodunu sanitize et
 * Tehlikeli CSS özelliklerini temizler
 */
export function sanitizeCSS(dirty: string): string {
  if (!dirty) return '';
  
  // Tehlikeli CSS pattern'lerini temizle
  const dangerous = [
    /expression\s*\(/gi,
    /javascript\s*:/gi,
    /behavior\s*:/gi,
    /-moz-binding\s*:/gi,
    /url\s*\(\s*["']?\s*data:/gi,
  ];
  
  let clean = dirty;
  for (const pattern of dangerous) {
    clean = clean.replace(pattern, '/* removed */');
  }
  
  return clean;
}

/**
 * Admin tarafından girilen head/footer code için sanitize
 * Script tag'lerine izin verir ama XSS'e karşı koruma sağlar
 */
export function sanitizeAdminCode(dirty: string): string {
  if (!dirty) return '';
  
  // Admin kodları için daha geniş izinler (güvenilir kaynak)
  // Ama yine de bazı kontroller
  return DOMPurify.sanitize(dirty, {
    ADD_TAGS: ['script', 'style', 'link', 'meta'],
    ADD_ATTR: ['async', 'defer', 'type', 'charset', 'content', 'name', 'property'],
    FORCE_BODY: true,
  });
}

// Named exports for module default
const sanitizer = {
  sanitizeHTML,
  sanitizeText,
  sanitizeCSS,
  sanitizeAdminCode,
};

export default sanitizer;
