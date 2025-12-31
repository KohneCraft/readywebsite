'use client';

// ============================================
// Page Builder - Home Page
// Modern landing page for Page Builder
// ============================================

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Zap, 
  Palette, 
  Smartphone, 
  Globe, 
  Code, 
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function HomePage() {
  const features = [
    {
      icon: Layers,
      title: 'Drag & Drop',
      description: 'Sürükle bırak ile kolay sayfa tasarımı. Kod bilgisi gerektirmez.',
    },
    {
      icon: Palette,
      title: 'Özelleştirilebilir',
      description: 'Renkler, fontlar ve düzenleri istediğiniz gibi özelleştirin.',
    },
    {
      icon: Smartphone,
      title: 'Responsive',
      description: 'Tüm cihazlarda mükemmel görünen responsive tasarımlar.',
    },
    {
      icon: Globe,
      title: 'SEO Uyumlu',
      description: 'Arama motorları için optimize edilmiş sayfalar.',
    },
    {
      icon: Zap,
      title: 'Hızlı',
      description: 'Yüksek performanslı ve hızlı yüklenen sayfalar.',
    },
    {
      icon: Code,
      title: 'Modern Teknolojiler',
      description: 'Next.js, React ve en son web teknolojileri.',
    },
  ];

  return (
    <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative container mx-auto px-4 py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Modern Web Sayfaları Oluşturun</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Modern ve Esnek Web Sayfaları
                <br />
                <span className="text-primary-200">Oluşturun</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Drag & drop ile kolay sayfa tasarımı. Kod bilgisi gerektirmez. 
                Responsive ve SEO uyumlu sayfalar oluşturun.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/admin/page-builder">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                    Hemen Başla
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/preview/demo">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Örnekleri Gör
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Neden Page Builder?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Modern web sayfaları oluşturmak için ihtiyacınız olan her şey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Hemen Başlayın
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Modern web sayfalarınızı oluşturmaya başlayın. Ücretsiz deneyin.
              </p>
              <Link href="/admin/page-builder">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                  Sayfa Oluşturmaya Başla
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
  );
}
