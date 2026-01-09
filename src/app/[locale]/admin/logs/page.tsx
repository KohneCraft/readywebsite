'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';

interface LogEntry {
  id: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: Date;
  data?: string;
  context?: string;
}

const LOG_COLORS = {
  debug: 'bg-gray-500',
  info: 'bg-blue-500',
  warn: 'bg-yellow-500',
  error: 'bg-red-500',
};

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'debug' | 'info' | 'warn' | 'error'>('all');
  const [contextFilter, setContextFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month' | 'all'>('today');

  const loadLogs = async () => {
    setLoading(true);
    try {
      const logsRef = collection(db, 'logs');
      let q = query(logsRef, orderBy('timestamp', 'desc'), limit(500));

      // Tarih filtresi
      if (dateFilter !== 'all') {
        const now = new Date();
        let startDate = new Date();
        
        switch (dateFilter) {
          case 'today':
            startDate.setHours(0, 0, 0, 0);
            break;
          case 'week':
            startDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            startDate.setMonth(now.getMonth() - 1);
            break;
        }
        
        q = query(logsRef, where('timestamp', '>=', Timestamp.fromDate(startDate)), orderBy('timestamp', 'desc'), limit(500));
      }

      const snapshot = await getDocs(q);
      let logData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          level: data.level,
          message: data.message,
          timestamp: data.timestamp?.toDate() || new Date(),
          data: data.data,
          context: data.context,
        } as LogEntry;
      });

      // Level filtresi
      if (filter !== 'all') {
        logData = logData.filter(log => log.level === filter);
      }

      // Context filtresi
      if (contextFilter !== 'all') {
        logData = logData.filter(log => log.context === contextFilter);
      }

      setLogs(logData);
    } catch (error) {
      console.error('Log yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, contextFilter, dateFilter]);

  // Unique context'leri al
  const uniqueContexts = Array.from(new Set(logs.map(log => log.context).filter(Boolean)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Sistem Logları</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sistemdeki tüm işlem loglarını görüntüleyin
        </p>
      </div>

      {/* Filtreler */}
      <Card className="mb-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Level Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Log Seviyesi</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
            >
              <option value="all">Tümü</option>
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warn">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          {/* Context Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Context</label>
            <select
              value={contextFilter}
              onChange={(e) => setContextFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
            >
              <option value="all">Tümü</option>
              {uniqueContexts.map(context => (
                <option key={context} value={context}>{context}</option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Tarih Aralığı</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as typeof dateFilter)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
            >
              <option value="today">Bugün</option>
              <option value="week">Son 7 Gün</option>
              <option value="month">Son 30 Gün</option>
              <option value="all">Tümü</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Log Listesi */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : logs.length === 0 ? (
        <Card className="p-8 text-center text-gray-500">
          Log kaydı bulunamadı
        </Card>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <Card key={log.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <Badge className={`${LOG_COLORS[log.level]} text-white text-xs uppercase`}>
                  {log.level}
                </Badge>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{log.message}</span>
                    {log.context && (
                      <Badge variant="secondary" className="text-xs">
                        {log.context}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {log.timestamp.toLocaleString('tr-TR')}
                  </div>
                  
                  {log.data && (
                    <details className="mt-2">
                      <summary className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer">
                        Detayları Göster
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto">
                        {log.data}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
