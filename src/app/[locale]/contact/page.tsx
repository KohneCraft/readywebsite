'use client';

// ============================================
// Vav Yapı - Contact Page
// Contact form with react-hook-form + Zod
// Dynamic layout support via usePageLayout
// ============================================

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle2,
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { GoogleMap } from '@/components/contact/GoogleMap';
import { usePageLayout } from '@/hooks/usePageLayout';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacy: z.boolean().refine((val) => val === true, 'You must accept the privacy policy'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Dynamic layout support
  const { elements, isLoading: layoutLoading, isElementVisible } = usePageLayout('contact');
  
  // Sort elements by order
  const sortedElements = useMemo(() => {
    return [...elements].sort((a, b) => a.order - b.order);
  }, [elements]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // In production, this would send to Firebase
      console.log('Form data:', data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact info data
  const contactInfo = [
    {
      icon: MapPin,
      title: t('info.address.title'),
      content: t('info.address.value'),
      link: 'https://maps.google.com/?q=Istanbul+Turkey',
    },
    {
      icon: Phone,
      title: t('info.phone.title'),
      content: '+90 (212) 555 0123',
      link: 'tel:+902125550123',
    },
    {
      icon: Mail,
      title: t('info.email.title'),
      content: 'info@vavyapi.com',
      link: 'mailto:info@vavyapi.com',
    },
    {
      icon: Clock,
      title: t('info.hours.title'),
      content: t('info.hours.value'),
      link: null,
    },
  ];

  // Social links
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  // Subject options
  const subjectOptions = [
    { value: '', label: t('form.subjectPlaceholder') },
    { value: 'general', label: t('subjects.general') },
    { value: 'quote', label: t('subjects.quote') },
    { value: 'partnership', label: t('subjects.partnership') },
    { value: 'career', label: t('subjects.career') },
    { value: 'other', label: t('subjects.other') },
  ];

  // Render Hero Section
  const renderHero = () => {
    if (!isElementVisible('hero')) return null;
    
    return (
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1920"
            alt="Contact"
            fill
            className="object-cover"
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>
    );
  };

  // Render Contact Info Section
  const renderContactInfo = () => (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="lg:col-span-1"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t('info.title')}
      </h2>

      <div className="space-y-6">
        {contactInfo.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {item.link ? (
              <a
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : undefined}
                rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.content}
                  </p>
                </div>
              </a>
            ) : (
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.content}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Social Links */}
      <div className="mt-8">
        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
          {t('info.social')}
        </h3>
        <div className="flex gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Render Contact Form Section
  const renderContactForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="lg:col-span-2"
    >
      <Card className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t('form.title')}
        </h2>

        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('form.success')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('form.successDesc')}
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              {t('form.sendAnother')}
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t('form.name')} *
                </label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder={t('form.namePlaceholder')}
                  error={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t('form.email')} *
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder={t('form.emailPlaceholder')}
                  error={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t('form.phone')}
                </label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder={t('form.phonePlaceholder')}
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t('form.subject')} *
                </label>
                <select
                  id="subject"
                  {...register('subject')}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                    errors.subject
                      ? 'border-red-500'
                      : 'border-gray-200 dark:border-gray-700'
                  )}
                >
                  {subjectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t('form.message')} *
              </label>
              <textarea
                id="message"
                {...register('message')}
                rows={5}
                placeholder={t('form.messagePlaceholder')}
                className={cn(
                  'w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none',
                  errors.message
                    ? 'border-red-500'
                    : 'border-gray-200 dark:border-gray-700'
                )}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacy"
                {...register('privacy')}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="privacy"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                {t('form.privacy')}
              </label>
            </div>
            {errors.privacy && (
              <p className="text-sm text-red-500">{errors.privacy.message}</p>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{t('form.errorDesc')}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'w-full md:w-auto px-8 py-3 bg-primary-600 text-white font-medium rounded-lg',
                'hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
                'flex items-center justify-center gap-2'
              )}
            >
              {isSubmitting ? (
                <>
                  <Spinner size="sm" />
                  {t('form.submitting')}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t('form.submit')}
                </>
              )}
            </button>
          </form>
        )}
      </Card>
    </motion.div>
  );

  // Render Map Section
  const renderMap = () => {
    if (!isElementVisible('map')) return null;
    
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('map.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('map.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
          >
            <GoogleMap 
              address="Levent, İstanbul, Türkiye"
              lat={41.0751}
              lng={29.0125}
              zoom={15}
              height="400px"
            />
          </motion.div>
        </div>
      </section>
    );
  };

  // Render Contact Section (Form + Info)
  const renderContactSection = () => {
    const showForm = isElementVisible('contact-form');
    const showInfo = isElementVisible('info-cards');
    
    if (!showForm && !showInfo) return null;
    
    return (
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {showInfo && renderContactInfo()}
            {showForm && renderContactForm()}
          </div>
        </div>
      </section>
    );
  };

  // Loading state
  if (layoutLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      {/* Render elements based on layout order */}
      {sortedElements.map((element) => {
        if (!element.visible) return null;
        
        switch (element.type) {
          case 'hero':
            return <div key={element.id}>{renderHero()}</div>;
          case 'contact-form':
          case 'info-cards':
            // These are rendered together in renderContactSection
            // Only render once when we hit contact-form
            if (element.type === 'contact-form') {
              return <div key={element.id}>{renderContactSection()}</div>;
            }
            return null;
          case 'map':
            return <div key={element.id}>{renderMap()}</div>;
          default:
            return null;
        }
      })}
    </>
  );
}
