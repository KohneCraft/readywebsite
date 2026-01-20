// ============================================
// Vav Yapı - Page Builder Types
// Yeni Page Builder sistemi için tip tanımlamaları
// PAGE -> SECTION -> COLUMN -> BLOCK hiyerarşisi
// ============================================

import type { Timestamp } from 'firebase/firestore';

/**
 * Block türleri
 */
export type BlockType =
  | 'text'
  | 'heading'
  | 'image'
  | 'video'
  | 'button'
  | 'spacer'
  | 'divider'
  | 'form'
  | 'map'
  | 'html'
  | 'slider'
  | 'panel';

/**
 * Responsive breakpoint
 */
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Spacing değerleri (margin/padding için)
 */
export interface Spacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Border ayarları
 */
export interface Border {
  width: number;
  style: 'solid' | 'dashed' | 'dotted' | 'none';
  color: string;
}

/**
 * Overlay ayarları
 */
export interface Overlay {
  enabled: boolean;
  color: string;
  blur: number;
}

/**
 * Animation ayarları
 */
export interface Animation {
  enabled: boolean;
  type: 'fadeIn' | 'slideUp' | 'slideDown' | 'zoomIn' | 'slideLeft' | 'slideRight';
  duration: number;
  delay: number;
}

/**
 * Image filter ayarları
 */
export interface ImageFilter {
  brightness: number;
  contrast: number;
  saturate: number;
  grayscale: number;
  blur: number;
}

/**
 * Hover efektleri
 */
export interface HoverEffect {
  scale?: number;
  opacity?: number;
  backgroundColor?: string;
  transform?: string;
  boxShadow?: string;
}

/**
 * Responsive ayarları
 */
export interface ResponsiveSettings {
  width?: number;
  padding?: Spacing;
  margin?: Spacing;
  fontSize?: number;
  height?: number;
  [key: string]: unknown;
}

/**
 * BLOCK - En küçük içerik birimi
 */
export interface Block {
  id: string;
  columnId: string;
  type: BlockType;
  props: BlockProps;
  order: number;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

/**
 * Block Props - Block türüne göre değişen özellikler
 */
export interface BlockProps {
  // Ortak özellikler
  padding?: Spacing;
  margin?: Spacing;
  borderRadius?: number;
  border?: Border;
  boxShadow?: string;
  animation?: Animation;
  responsive?: Record<Breakpoint, ResponsiveSettings>;
  // HTML özellikleri
  className?: string;
  id?: string;
  customCSS?: string;
  dataAttributes?: Record<string, string>;

  // Text Block
  content?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: 'normal' | 'bold' | number;
  fontStyle?: 'normal' | 'italic';
  color?: string;
  colorDark?: string | 'auto'; // Koyu tema rengi
  backgroundColor?: string;
  backgroundColorDark?: string | 'auto'; // Koyu tema arka plan
  backgroundBlur?: number; // Cam efekti blur değeri (px)
  backgroundPadding?: number; // Arka plan iç dolgu
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: number;
  letterSpacing?: number;
  textDecoration?: 'none' | 'underline' | 'line-through';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';

  // Heading Block
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  // Image Block
  src?: string;
  alt?: string;
  imageWidth?: string;
  imageHeight?: string;
  maxWidth?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  link?: string;
  linkTarget?: '_self' | '_blank';
  filter?: ImageFilter;
  hover?: HoverEffect;
  loading?: 'lazy' | 'eager';

  // Video Block
  videoProvider?: 'youtube' | 'vimeo' | 'custom';
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9';
  playsInline?: boolean;

  // Button Block
  text?: string;
  target?: '_self' | '_blank';
  buttonStyle?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  buttonWidth?: 'auto' | 'full';
  width?: number; // Buton genişliği (px)
  height?: number; // Buton yüksekliği (px)
  textColor?: string;
  textColorDark?: string | 'auto'; // Koyu tema buton metin rengi
  verticalAlign?: 'top' | 'center' | 'bottom'; // Dikey hizalama
  horizontalAlign?: 'left' | 'center' | 'right'; // Yatay hizalama
  icon?: {
    enabled: boolean;
    name: string;
    position: 'left' | 'right';
  };

  // Spacer Block
  spacerHeight?: number;

  // Divider Block
  dividerHeight?: number;
  dividerColor?: string;
  dividerColorDark?: string | 'auto'; // Koyu tema ayırıcı rengi
  dividerStyle?: 'solid' | 'dashed' | 'dotted';

  // Form Block
  title?: string;
  fields?: FormField[];
  submitButton?: {
    text: string;
    style: string;
    size: string;
  };
  action?: string;
  method?: 'GET' | 'POST';
  successMessage?: string;
  errorMessage?: string;
  formBackgroundColor?: string; // Form arkaplan rengi
  formBackgroundColorDark?: string | 'auto'; // Koyu tema form arkaplan
  formTextColor?: string; // Input text rengi
  formTextColorDark?: string | 'auto'; // Koyu tema input text
  formLabelColor?: string; // Label text rengi
  formLabelColorDark?: string | 'auto'; // Koyu tema label
  buttonColor?: string; // Submit button arka plan rengi
  buttonColorDark?: string | 'auto'; // Koyu tema buton arka plan
  buttonTextColor?: string; // Submit button text rengi
  buttonTextColorDark?: string | 'auto'; // Koyu tema buton text
  buttonText?: string; // Submit button metni

  // Map Block
  mapProvider?: 'google' | 'openstreetmap';
  latitude?: number;
  longitude?: number;
  zoom?: number;
  mapWidth?: number; // px cinsinden - responsive'de tablet: 90%, mobil: 100%
  mapHeight?: number;
  marker?: boolean;
  markerTitle?: string;
  mapStyle?: 'default' | 'dark' | 'light' | 'custom';
  style?: 'default' | 'dark' | 'light' | 'custom';
  interactive?: boolean;

  // HTML Block
  html?: string; // HTML içeriği
  css?: string;
  javascript?: string;

  // Slider Block
  slides?: SliderSlide[];
  autoPlay?: boolean; // Otomatik oynatma
  autoPlaySpeed?: number; // Oynatma hızı (ms)
  sliderLoop?: boolean; // Döngü (loop Video block'ta zaten var)
  showArrows?: boolean; // İleri/geri butonları
  showDots?: boolean; // Sayfa göstergeleri
  pauseOnHover?: boolean; // Fare üzerinde duraklat
  direction?: 'ltr' | 'rtl'; // Döngü yönü
  sliderHeight?: number | 'auto'; // Slider yükseakliği
  transitionSpeed?: number; // Geçiş hızı (ms)
  transitionEffect?: 'slide' | 'fade' | 'zoom' | 'flip'; // Geçiş efekti

  // Panel Block
  panelPosition?: 'right' | 'left' | 'top' | 'bottom';
  panelDimensions?: {
    width?: number | string;
    height?: number | string;
    maxWidth?: number;
    minWidth?: number;
  };
  panelPositioning?: {
    type?: 'fixed' | 'sticky' | 'absolute';
    offset?: Spacing;
    zIndex?: number;
  };
  panelAppearance?: {
    backgroundColor?: string;
    backgroundColorDark?: string;
    borderColor?: string;
    borderWidth?: number;
    borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
    boxShadow?: string;
    borderRadius?: number;
  };
  panelBehavior?: {
    closeable?: boolean;
    defaultOpen?: boolean;
    showOnScroll?: boolean;
    hideOnScroll?: boolean;
    scrollThreshold?: number;
    overlay?: boolean;
    overlayColor?: string;
    closeOnEscape?: boolean;
    closeOnClickOutside?: boolean;
  };
  panelResponsive?: {
    mobile?: {
      enabled?: boolean;
      position?: 'right' | 'left' | 'top' | 'bottom';
      width?: number | string;
      height?: number | string;
      collapsible?: boolean;
      showAsModal?: boolean;
    };
    tablet?: {
      enabled?: boolean;
      width?: number | string;
      height?: number | string;
    };
  };
  panelAnimation?: {
    enabled?: boolean;
    type?: 'slide' | 'fade' | 'scale';
    duration?: number;
    easing?: string;
  };
  panelBlocks?: string[]; // İçindeki blok ID'leri
  panelSpacing?: {
    margin?: { top?: number; right?: number; bottom?: number; left?: number };
    padding?: { top?: number; right?: number; bottom?: number; left?: number };
  };
  panelMode?: 'overlay' | 'sidebar'; // Overlay: içerik üzerinde, Sidebar: içeriği iter
  panelSidebarSettings?: {
    pushNavbar?: boolean; // Navbar'ı iter (varsayılan: false)
    pushFooter?: boolean; // Footer'ı iter (varsayılan: false)
  };
}

/**
 * Slider Slide
 */
export interface SliderSlide {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  title?: string;
  titleColor?: string;
  titleColorDark?: string | 'auto';
  description?: string;
  descriptionColor?: string;
  descriptionColorDark?: string | 'auto';
  link?: string;
  linkTarget?: '_self' | '_blank';
  order: number;
}
export interface FormField {
  id: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  name: string;
  label: string;
  placeholder?: string;
  required: boolean;
  width?: string;
  rows?: number;
  options?: Array<{ value: string; label: string }>;
}

/**
 * COLUMN - Blokları tutan kapsayıcı
 */
export interface Column {
  id: string;
  sectionId: string;
  parentColumnId?: string; // İç içe kolonlar için parent column ID
  width: number; // Yüzde olarak (50 = 50%)
  blocks: string[]; // Block ID'leri
  columns?: string[]; // İç içe kolon ID'leri (nested columns)
  settings: ColumnSettings;
  order: number;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

/**
 * Column Settings
 */
export interface ColumnSettings {
  backgroundColor?: string;
  backgroundColorDark?: string | 'auto'; // Koyu tema arka plan
  height?: number | string; // px veya 'auto' veya '100%'
  maxHeight?: number; // px
  maxWidth?: number; // px
  backgroundImage?: string;
  backgroundSize?: string; // 'cover' | 'contain' | 'auto' | '100% 100%'
  backgroundPosition?: string; // 'center center' | 'top center' vb.
  backgroundRepeat?: string; // 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
  padding?: Spacing;
  margin?: Spacing;
  borderRadius?: number | {
    topLeft?: number;
    topRight?: number;
    bottomLeft?: number;
    bottomRight?: number;
  };
  border?: Border;
  boxShadow?: string;
  verticalAlign?: 'top' | 'center' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right' | 'stretch';
  minHeight?: number;
  responsive?: Record<Breakpoint, ResponsiveSettings>;
}

/**
 * SECTION - Kolonları tutan kapsayıcı
 */
export interface Section {
  id: string;
  pageId: string;
  name: string;
  columns: string[]; // Column ID'leri
  settings: SectionSettings;
  order: number;
  rowOrder: number;    // Hangi satırda (0, 1, 2...)
  columnOrder: number; // Satır içinde hangi sırada (0, 1, 2...)
  rowSpan?: number;    // Kaç satır kaplasın (default: 1)
  colSpan?: number;    // Kaç kolon kaplasın (default: 1)
  gridAlignment?: 'start' | 'center' | 'end'; // Section'ın grid içinde hizası
  visibility: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

/**
 * Section Settings
 */
export interface SectionSettings {
  // Layout
  fullWidth?: boolean;
  maxWidth?: number;
  columnGap?: number;
  columnDistribution?: 'equal' | 'custom';
  columnLayout?: 'row' | 'column'; // 'row' = yan yana, 'column' = alt alta
  columnAlignment?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'; // Kolonlar arası hizalama

  // Background
  backgroundColor?: string;
  backgroundColorDark?: string | 'auto'; // Koyu tema arka plan
  backgroundImage?: string;
  backgroundSize?: 'cover' | 'contain' | 'auto';
  backgroundPosition?: 'top' | 'center' | 'bottom' | 'left' | 'right';
  backgroundRepeat?: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y';
  backgroundAttachment?: 'scroll' | 'fixed';

  // Overlay
  overlay?: Overlay;

  // Spacing
  padding?: Spacing;
  margin?: Spacing;

  // Dimensions
  minHeight?: number;
  maxHeight?: number; // px
  height?: 'auto' | number;

  // Borders
  borderTop?: Border;
  borderBottom?: Border;
  borderRadius?: number;

  // Effects
  boxShadow?: string;

  // Animation
  animation?: Animation;

  // Responsive
  responsive?: Record<Breakpoint, ResponsiveSettings>;
}

/**
 * PAGE - Tüm yapıyı tutan ana obje
 */
export interface Page {
  id: string;
  title: string;
  slug: string;
  sections: string[]; // Section ID'leri
  globalPanels?: string[]; // Global panel block ID'leri (section dışında)
  settings: PageSettings;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
  publishedAt?: Date | Timestamp;
  author: string;
  versions?: PageVersion[];
}

/**
 * Page Settings
 */
export interface PageSettings {
  // SEO
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
    canonical?: string;
  };

  // Custom Code
  customCSS?: string;
  customJS?: string;
  headCode?: string;
  footerCode?: string;

  // Page Settings
  layout?: 'default' | 'fullwidth' | 'boxed';
  containerWidth?: number;

  // Colors
  primaryColor?: string;
  secondaryColor?: string;

  // Typography
  bodyFont?: string;
  headingFont?: string;
}

/**
 * Page Version
 */
export interface PageVersion {
  id: string;
  createdAt: Date | Timestamp;
  snapshot: Page;
}

/**
 * Create Input Types
 */
export interface PageCreateInput {
  title: string;
  slug: string;
  settings?: Partial<PageSettings>;
  author: string;
}

export interface SectionCreateInput {
  pageId: string;
  name?: string;
  settings?: Partial<SectionSettings>;
  order?: number;
  rowOrder?: number;
  columnOrder?: number;
}

export interface ColumnCreateInput {
  sectionId: string;
  parentColumnId?: string; // İç içe kolonlar için
  width?: number;
  settings?: Partial<ColumnSettings>;
  order?: number;
}

export interface BlockCreateInput {
  columnId: string;
  type: BlockType;
  props?: Partial<BlockProps>;
  order?: number;
}

/**
 * Update Input Types
 */
export interface PageUpdateInput {
  title?: string;
  slug?: string;
  settings?: Partial<PageSettings>;
  status?: 'draft' | 'published' | 'archived';
  sections?: string[];
  globalPanels?: string[];
}

export interface SectionUpdateInput {
  name?: string;
  settings?: Partial<SectionSettings>;
  order?: number;
  rowOrder?: number;
  columnOrder?: number;
  columns?: string[];
  visibility?: {
    desktop?: boolean;
    tablet?: boolean;
    mobile?: boolean;
  };
}

export interface ColumnUpdateInput {
  width?: number;
  columns?: string[]; // Nested columns için
  settings?: Partial<ColumnSettings>;
  order?: number;
  blocks?: string[];
}

export interface BlockUpdateInput {
  type?: BlockType;
  props?: Partial<BlockProps>;
  order?: number;
}

/**
 * Varsayılan değerler
 */
export const DEFAULT_SPACING: Spacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const DEFAULT_BORDER: Border = {
  width: 0,
  style: 'solid',
  color: '#000000',
};

export const DEFAULT_ANIMATION: Animation = {
  enabled: false,
  type: 'fadeIn',
  duration: 0.8,
  delay: 0,
};

/**
 * Block türleri için Türkçe etiketler
 */
export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  text: 'Metin',
  heading: 'Başlık',
  image: 'Görsel',
  video: 'Video',
  button: 'Buton',
  spacer: 'Boşluk',
  divider: 'Ayırıcı',
  form: 'Form',
  map: 'Harita',
  html: 'HTML',
  slider: 'Slider',
  panel: 'Panel',
};

/**
 * Block türleri için varsayılan props
 */
export function getDefaultBlockProps(type: BlockType): Partial<BlockProps> {
  const defaults: Record<BlockType, Partial<BlockProps>> = {
    text: {
      content: '<p>Metin içeriği buraya gelir</p>',
      fontSize: 16,
      fontFamily: 'Roboto',
      fontWeight: 400,
      color: '#333333',
      textAlign: 'left',
      lineHeight: 1.6,
      padding: DEFAULT_SPACING,
      margin: DEFAULT_SPACING,
    },
    heading: {
      level: 'h2',
      content: 'Başlık Metni',
      fontSize: 32,
      fontFamily: 'Montserrat',
      fontWeight: 700,
      color: '#1a1a1a',
      textAlign: 'center',
      lineHeight: 1.2,
      margin: { ...DEFAULT_SPACING, bottom: 30 },
    },
    image: {
      src: '/placeholder.jpg',
      alt: 'Görsel açıklaması',
      imageWidth: '100%',
      imageHeight: 'auto',
      objectFit: 'cover',
      borderRadius: 8,
      filter: {
        brightness: 100,
        contrast: 100,
        saturate: 100,
        grayscale: 0,
        blur: 0,
      },
    },
    video: {
      videoProvider: 'youtube',
      src: '',
      autoplay: false,
      loop: false,
      muted: false,
      controls: true,
      aspectRatio: '16:9',
    },
    button: {
      text: 'Tıklayın',
      link: '#',
      target: '_self',
      buttonStyle: 'primary',
      size: 'medium',
      buttonWidth: 'auto',
      backgroundColor: '#007bff',
      textColor: '#ffffff',
      fontSize: 16,
      fontWeight: 600,
      padding: { top: 12, right: 24, bottom: 12, left: 24 },
      borderRadius: 6,
    },
    spacer: {
      spacerHeight: 50,
    },
    divider: {
      dividerHeight: 1,
      dividerColor: '#e0e0e0',
      dividerStyle: 'solid',
      margin: { top: 30, right: 0, bottom: 30, left: 0 },
    },
    form: {
      title: 'İletişim Formu',
      fields: [],
      submitButton: {
        text: 'Gönder',
        style: 'primary',
        size: 'large',
      },
      action: '/api/contact',
      method: 'POST',
      successMessage: 'Mesajınız başarıyla gönderildi!',
      errorMessage: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    },
    map: {
      mapProvider: 'google',
      latitude: 39.9334,
      longitude: 32.8597,
      zoom: 15,
      mapWidth: 1200, // px - varsayılan genişlik
      mapHeight: 400,
      marker: true,
      markerTitle: 'Konum',
      mapStyle: 'default',
      interactive: true,
    },
    html: {
      content: '<div class="custom">Özel HTML kodu</div>',
      css: '',
      javascript: '',
    },
    slider: {
      slides: [],
      autoPlay: true,
      autoPlaySpeed: 5000,
      sliderLoop: true,
      showArrows: true,
      showDots: true,
      pauseOnHover: true,
      direction: 'ltr',
      sliderHeight: 400,
      transitionSpeed: 500,
      transitionEffect: 'slide',
    },
    panel: {
      panelPosition: 'right',
      panelDimensions: {
        width: 320,
        height: 'auto',
        maxWidth: 400,
        minWidth: 200,
      },
      panelPositioning: {
        type: 'fixed',
        offset: { top: 0, right: 0, bottom: 0, left: 0 },
        zIndex: 1000,
      },
      panelAppearance: {
        backgroundColor: '#ffffff',
        backgroundColorDark: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        borderStyle: 'solid',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        borderRadius: 0,
      },
      panelBehavior: {
        closeable: true,
        defaultOpen: true,
        showOnScroll: false,
        hideOnScroll: false,
        scrollThreshold: 100,
        overlay: false,
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        closeOnEscape: true,
        closeOnClickOutside: false,
      },
      panelResponsive: {
        mobile: {
          enabled: true,
          position: 'bottom',
          width: '100%',
          collapsible: true,
          showAsModal: true,
        },
        tablet: {
          enabled: true,
          width: 280,
        },
      },
      panelAnimation: {
        enabled: true,
        type: 'slide',
        duration: 0.3,
        easing: 'ease-in-out',
      },
      panelBlocks: [],
    },
  };

  return defaults[type] || {};
}

// ============================================
// Section Template Sistemi
// Hazır template yapıları için tipler
// ============================================

/**
 * Template kategorileri
 */
export type TemplateCategory =
  | 'landing'
  | 'portfolio'
  | 'blog'
  | 'ecommerce'
  | 'business'
  | 'event'
  | 'restaurant';

/**
 * Template içindeki block verisi
 */
export interface TemplateBlockData {
  type: BlockType;
  props: Record<string, unknown>;
}

/**
 * Template içindeki column verisi
 */
export interface TemplateColumnData {
  width: number;
  settings?: Partial<ColumnSettings>;
  blocks: TemplateBlockData[];
}

/**
 * Template içindeki section verisi
 */
export interface TemplateSectionData {
  name: string;
  settings: Partial<SectionSettings>;
  columns: TemplateColumnData[];
}

/**
 * Section Template - Hazır sayfa düzeni
 */
export interface SectionTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  thumbnail?: string;
  description: string;
  sections: TemplateSectionData[];
  tags: string[];
  createdAt?: Date | Timestamp;
  author?: string;
}
