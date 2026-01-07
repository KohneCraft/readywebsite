'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Trash2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';

interface Message {
  id: string;
  createdAt: Timestamp;
  read: boolean;
  [key: string]: any;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const messagesRef = collection(db, 'contact-messages');
      const q = query(messagesRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      
      setMessages(messagesData);
    } catch (error: any) {
      // Firestore hatalarını kontrol et
      if (error?.code === 'unavailable' || error?.code === 'permission-denied') {
        logger.ui.warn('Firestore bağlantı hatası (offline/permission)', error);
        // Offline modda veya permission yoksa boş göster
        setMessages([]);
      } else {
        logger.ui.error('Mesajlar yüklenemedi', error);
        toast.error('Mesajlar yüklenemedi');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return;
    
    try {
      await deleteDoc(doc(db, 'contact-messages', id));
      setMessages(messages.filter(msg => msg.id !== id));
      toast.success('Mesaj silindi');
    } catch (error) {
      logger.ui.error('Mesaj silinemedi', error);
      toast.error('Mesaj silinemedi');
    }
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return '-';
    return timestamp.toDate().toLocaleString('tr-TR');
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Mail className="w-6 h-6" />
          İletişim Mesajları
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Toplam {messages.length} mesaj
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Mail className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 dark:text-gray-400">Henüz mesaj yok</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Alan Bilgileri
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    İşlem
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {messages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatDate(message.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      <div className="space-y-1">
                        {Object.entries(message).map(([key, value]) => {
                          if (key === 'id' || key === 'createdAt' || key === 'read') return null;
                          return (
                            <div key={key} className="flex gap-2">
                              <span className="font-medium text-gray-600 dark:text-gray-400">{key}:</span>
                              <span>{String(value)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleDelete(message.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
