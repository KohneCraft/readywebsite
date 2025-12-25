// ============================================
// Vav Yapı - Admin Partners Management Page
// CRUD operations for partners/references
// ============================================

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  Building2,
  ExternalLink,
  GripVertical,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Partner } from '@/types/team';

// Mock partner data
const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Türk Yapı A.Ş.',
    logo: 'https://via.placeholder.com/200x80?text=Partner+1',
    website: 'https://example.com',
    description: { tr: 'Stratejik iş ortağı', en: 'Strategic partner', de: 'Strategischer Partner', fr: 'Partenaire stratégique' },
    category: 'partner',
    order: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Global Çelik',
    logo: 'https://via.placeholder.com/200x80?text=Partner+2',
    website: 'https://example.com',
    category: 'supplier',
    order: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Mega İnşaat',
    logo: 'https://via.placeholder.com/200x80?text=Partner+3',
    category: 'client',
    order: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const categoryColors = {
  partner: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  supplier: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  client: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

export default function AdminPartnersPage() {
  const t = useTranslations('admin');
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  // Filter partners
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || partner.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    if (!confirm(t('partners.deleteConfirm'))) return;
    
    setIsLoading(true);
    // TODO: Implement Firestore delete
    setPartners(prev => prev.filter(p => p.id !== id));
    setIsLoading(false);
  };

  const toggleActive = async (id: string) => {
    setPartners(prev => prev.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const openEditModal = (partner: Partner) => {
    setEditingPartner(partner);
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingPartner(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('partners.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('partners.subtitle')}
          </p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="w-4 h-4 mr-2" />
          {t('partners.addPartner')}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder={t('partners.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">{t('partners.allCategories')}</option>
          <option value="partner">{t('partners.categoryPartner')}</option>
          <option value="supplier">{t('partners.categorySupplier')}</option>
          <option value="client">{t('partners.categoryClient')}</option>
        </select>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.length === 0 ? (
          <div className="col-span-full p-12 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{t('partners.noPartners')}</p>
          </div>
        ) : (
          filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Logo */}
              <div className="relative h-32 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={64}
                  className="object-contain max-h-16"
                />
                {/* Category Badge */}
                <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${categoryColors[partner.category]}`}>
                  {t(`partners.category${partner.category.charAt(0).toUpperCase() + partner.category.slice(1)}`)}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {partner.name}
                  </h3>
                  <button
                    onClick={() => toggleActive(partner.id)}
                    className={`p-1 rounded transition-colors ${
                      partner.isActive 
                        ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20' 
                        : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {partner.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-3"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {t('partners.visitWebsite')}
                  </a>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => openEditModal(partner)}
                    className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title={t('edit')}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(partner.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title={t('delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <PartnerModal
          partner={editingPartner}
          onClose={() => setShowModal(false)}
          onSave={(partner) => {
            if (editingPartner) {
              setPartners(prev => prev.map(p => p.id === partner.id ? partner : p));
            } else {
              setPartners(prev => [...prev, { ...partner, id: Date.now().toString() }]);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

// Partner Modal
interface PartnerModalProps {
  partner: Partner | null;
  onClose: () => void;
  onSave: (partner: Partner) => void;
}

function PartnerModal({ partner, onClose, onSave }: PartnerModalProps) {
  const t = useTranslations('admin');
  const [formData, setFormData] = useState<Partial<Partner>>(
    partner || {
      name: '',
      logo: '',
      website: '',
      category: 'partner',
      order: 0,
      isActive: true,
    }
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const savedPartner: Partner = {
      id: partner?.id || Date.now().toString(),
      name: formData.name || '',
      logo: formData.logo || '',
      website: formData.website,
      description: formData.description,
      category: formData.category || 'partner',
      order: formData.order || 0,
      isActive: formData.isActive ?? true,
      createdAt: partner?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    onSave(savedPartner);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {partner ? t('partners.editPartner') : t('partners.addPartner')}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('partners.name')} *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Logo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('partners.logoUrl')} *
            </label>
            <Input
              type="url"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              placeholder="https://..."
              required
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('partners.website')}
            </label>
            <Input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('partners.category')} *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Partner['category'] })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            >
              <option value="partner">{t('partners.categoryPartner')}</option>
              <option value="supplier">{t('partners.categorySupplier')}</option>
              <option value="client">{t('partners.categoryClient')}</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {partner ? t('save') : t('add')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
