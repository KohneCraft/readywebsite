'use client';

// ============================================
// Vav Yapı - Admin Contacts List
// Contact message management with Firestore integration
// ============================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Search, 
  Mail, 
  MailOpen,
  Trash2, 
  Reply,
  Archive,
  Filter,
  ChevronDown,
  Clock,
  Phone,
  User,
  Eye,
  X,
  RefreshCcw,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import { 
  getContactForms, 
  updateContactForm,
  deleteContactForm as firestoreDeleteContactForm 
} from '@/lib/firebase/firestore';
import type { Locale } from '@/i18n';

// Contact interface for display
interface AdminContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  isArchived: boolean;
  createdAt: string;
}

type FilterType = 'all' | 'unread' | 'read' | 'replied' | 'archived';

export default function AdminContactsPage() {
  const t = useTranslations('admin');
  const locale = useLocale() as Locale;
  
  const [contacts, setContacts] = useState<AdminContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedContact, setSelectedContact] = useState<AdminContact | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load contacts from Firestore
  const loadContacts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getContactForms({ limit: 100 });
      
      // Convert ContactFormSummary to AdminContact format
      const adminContacts: AdminContact[] = result.forms.map((form) => ({
        id: form.id,
        name: form.name,
        email: form.email,
        phone: form.phone || '',
        subject: form.subject,
        message: '', // Will be loaded when viewing details
        isRead: form.status !== 'new',
        isReplied: form.status === 'replied',
        isArchived: form.status === 'archived',
        createdAt: form.createdAt instanceof Date ? form.createdAt.toISOString() : String(form.createdAt),
      }));
      
      setContacts(adminContacts);
    } catch (err) {
      console.error('Error loading contacts:', err);
      setError(t('contacts.loadError') || 'Mesajlar yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (filter) {
      case 'unread':
        return matchesSearch && !contact.isRead;
      case 'read':
        return matchesSearch && contact.isRead && !contact.isReplied;
      case 'replied':
        return matchesSearch && contact.isReplied;
      case 'archived':
        return matchesSearch && contact.isArchived;
      default:
        return matchesSearch && !contact.isArchived;
    }
  });

  const unreadCount = contacts.filter(c => !c.isRead).length;

  const handleMarkAsRead = async (id: string) => {
    try {
      await updateContactForm(id, { status: 'read' });
      setContacts(contacts.map(c => 
        c.id === id ? { ...c, isRead: true } : c
      ));
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, isRead: true });
      }
    } catch (err) {
      console.error('Error marking as read:', err);
      setError(t('contacts.updateError') || 'Güncelleme hatası');
    }
  };

  const handleMarkAsUnread = async (id: string) => {
    try {
      await updateContactForm(id, { status: 'new' });
      setContacts(contacts.map(c => 
        c.id === id ? { ...c, isRead: false } : c
      ));
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, isRead: false });
      }
    } catch (err) {
      console.error('Error marking as unread:', err);
      setError(t('contacts.updateError') || 'Güncelleme hatası');
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await updateContactForm(id, { status: 'archived' });
      setContacts(contacts.map(c => 
        c.id === id ? { ...c, isArchived: true } : c
      ));
      setSelectedContact(null);
    } catch (err) {
      console.error('Error archiving:', err);
      setError(t('contacts.updateError') || 'Güncelleme hatası');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await firestoreDeleteContactForm(id);
      setContacts(contacts.filter(c => c.id !== id));
      setDeleteConfirm(null);
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
    } catch (err) {
      console.error('Error deleting contact:', err);
      setError(t('contacts.deleteError') || 'Silme hatası');
    }
  };

  const handleReply = async (contact: AdminContact) => {
    // Open email client
    window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`);
    // Mark as replied in Firestore
    try {
      await updateContactForm(contact.id, { status: 'replied' });
      setContacts(contacts.map(c => 
        c.id === contact.id ? { ...c, isReplied: true, isRead: true } : c
      ));
    } catch (err) {
      console.error('Error marking as replied:', err);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filterOptions: { key: FilterType; label: string; count?: number }[] = [
    { key: 'all', label: t('contacts.filters.all') },
    { key: 'unread', label: t('contacts.filters.unread'), count: unreadCount },
    { key: 'read', label: t('contacts.filters.read') },
    { key: 'replied', label: t('contacts.filters.replied') },
    { key: 'archived', label: t('contacts.filters.archived') },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center justify-between">
          <p className="text-red-700 dark:text-red-400">{error}</p>
          <Button variant="ghost" size="sm" onClick={() => setError(null)}>
            ✕
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('contacts.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('contacts.subtitle')}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadContacts}
          className="flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          {t('contacts.refresh') || 'Yenile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder={t('contacts.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setFilter(option.key)}
                className={cn(
                  'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  filter === option.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                {option.label}
                {option.count !== undefined && option.count > 0 && (
                  <span className="ml-1">({option.count})</span>
                )}
              </button>
            ))}
          </div>

          {/* Messages */}
          <Card>
            <CardContent className="p-0 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredContacts.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {t('contacts.noMessages')}
                  </p>
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => {
                      setSelectedContact(contact);
                      if (!contact.isRead) {
                        handleMarkAsRead(contact.id);
                      }
                    }}
                    className={cn(
                      'w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
                      selectedContact?.id === contact.id && 'bg-primary-50 dark:bg-primary-900/20',
                      !contact.isRead && 'bg-blue-50/50 dark:bg-blue-900/10'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                        contact.isRead
                          ? 'bg-gray-100 dark:bg-gray-800'
                          : 'bg-primary-100 dark:bg-primary-900/30'
                      )}>
                        {contact.isRead ? (
                          <MailOpen className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={cn(
                            'text-sm text-gray-900 dark:text-white truncate',
                            !contact.isRead && 'font-semibold'
                          )}>
                            {contact.name}
                          </p>
                          {contact.isReplied && (
                            <Badge variant="success" className="text-xs">
                              Yanıtlandı
                            </Badge>
                          )}
                        </div>
                        <p className={cn(
                          'text-sm text-gray-600 dark:text-gray-400 truncate',
                          !contact.isRead && 'font-medium'
                        )}>
                          {contact.subject}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(contact.createdAt)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <Card>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {selectedContact.subject}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDate(selectedContact.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg lg:hidden"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Sender Info */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t('contacts.detail.from')}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedContact.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t('contacts.detail.email')}
                        </p>
                        <a 
                          href={`mailto:${selectedContact.email}`}
                          className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          {selectedContact.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t('contacts.detail.phone')}
                        </p>
                        <a 
                          href={`tel:${selectedContact.phone}`}
                          className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          {selectedContact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contacts.detail.message')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="primary"
                    onClick={() => handleReply(selectedContact)}
                  >
                    <Reply className="w-4 h-4 mr-2" />
                    {t('contacts.reply')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => selectedContact.isRead 
                      ? handleMarkAsUnread(selectedContact.id)
                      : handleMarkAsRead(selectedContact.id)
                    }
                  >
                    {selectedContact.isRead ? (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        {t('contacts.markAsUnread')}
                      </>
                    ) : (
                      <>
                        <MailOpen className="w-4 h-4 mr-2" />
                        {t('contacts.markAsRead')}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleArchive(selectedContact.id)}
                  >
                    <Archive className="w-4 h-4 mr-2" />
                    {t('contacts.archive')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteConfirm(selectedContact.id)}
                    className="text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t('contacts.delete')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Detayları görmek için bir mesaj seçin
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-4 shadow-xl"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Mesajı Sil
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('contacts.confirmDelete')}
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
              >
                İptal
              </Button>
              <Button
                variant="primary"
                onClick={() => handleDelete(deleteConfirm)}
                className="bg-red-600 hover:bg-red-700"
              >
                Sil
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
