// ============================================
// Vav Yapı - Admin Team Management Page
// CRUD operations for team members
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
  User,
  Mail,
  GripVertical,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TeamMember } from '@/types/team';

// Mock team data
const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    position: { tr: 'CEO & Kurucu', en: 'CEO & Founder', de: 'CEO & Gründer', fr: 'PDG & Fondateur' },
    bio: { 
      tr: '25 yıllık sektör deneyimi', 
      en: '25 years of industry experience',
      de: '25 Jahre Branchenerfahrung',
      fr: '25 ans d\'expérience dans l\'industrie'
    },
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    email: 'ahmet@vavyapi.com',
    phone: '+90 532 123 4567',
    linkedin: 'https://linkedin.com',
    order: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Elif Demir',
    position: { tr: 'Proje Direktörü', en: 'Project Director', de: 'Projektdirektor', fr: 'Directeur de Projet' },
    bio: { 
      tr: 'Proje yönetimi uzmanı', 
      en: 'Project management expert',
      de: 'Projektmanagement-Experte',
      fr: 'Expert en gestion de projet'
    },
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    email: 'elif@vavyapi.com',
    phone: '+90 532 234 5678',
    linkedin: 'https://linkedin.com',
    order: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Mehmet Kaya',
    position: { tr: 'Baş Mimar', en: 'Chief Architect', de: 'Chefarchitekt', fr: 'Architecte en Chef' },
    bio: { 
      tr: 'Yenilikçi tasarımlar', 
      en: 'Innovative designs',
      de: 'Innovative Designs',
      fr: 'Conceptions innovantes'
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    email: 'mehmet@vavyapi.com',
    order: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function AdminTeamPage() {
  const t = useTranslations('admin');
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Filter members by search
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.position.tr.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm(t('team.deleteConfirm'))) return;
    
    // TODO: Implement Firestore delete
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const toggleActive = async (id: string) => {
    setMembers(prev => prev.map(m => 
      m.id === id ? { ...m, isActive: !m.isActive } : m
    ));
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingMember(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('team.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('team.subtitle')}
          </p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="w-4 h-4 mr-2" />
          {t('team.addMember')}
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder={t('team.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Team List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
          <div className="col-span-1"></div>
          <div className="col-span-4">{t('team.name')}</div>
          <div className="col-span-3">{t('team.position')}</div>
          <div className="col-span-2">{t('team.status')}</div>
          <div className="col-span-2 text-right">{t('team.actions')}</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredMembers.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>{t('team.noMembers')}</p>
            </div>
          ) : (
            filteredMembers.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                {/* Drag Handle */}
                <div className="hidden md:flex col-span-1 items-center">
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                </div>

                {/* Member Info */}
                <div className="col-span-1 md:col-span-4 flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    {member.email && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {member.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Position */}
                <div className="col-span-1 md:col-span-3 flex items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    {member.position.tr}
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-1 md:col-span-2 flex items-center">
                  <button
                    onClick={() => toggleActive(member.id)}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      member.isActive
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                  >
                    {member.isActive ? (
                      <>
                        <Eye className="w-3 h-3" />
                        {t('team.active')}
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        {t('team.inactive')}
                      </>
                    )}
                  </button>
                </div>

                {/* Actions */}
                <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditModal(member)}
                    className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title={t('edit')}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title={t('delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Placeholder */}
      {showModal && (
        <TeamMemberModal
          member={editingMember}
          onClose={() => setShowModal(false)}
          onSave={(member) => {
            if (editingMember) {
              setMembers(prev => prev.map(m => m.id === member.id ? member : m));
            } else {
              setMembers(prev => [...prev, { ...member, id: Date.now().toString() }]);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

// Team Member Modal
interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
  onSave: (member: TeamMember) => void;
}

function TeamMemberModal({ member, onClose, onSave }: TeamMemberModalProps) {
  const t = useTranslations('admin');
  const [formData, setFormData] = useState<Partial<TeamMember>>(
    member || {
      name: '',
      position: { tr: '', en: '', de: '', fr: '' },
      bio: { tr: '', en: '', de: '', fr: '' },
      image: '',
      email: '',
      phone: '',
      linkedin: '',
      twitter: '',
      order: 0,
      isActive: true,
    }
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement Firestore save
    const savedMember: TeamMember = {
      id: member?.id || Date.now().toString(),
      name: formData.name || '',
      position: formData.position || { tr: '', en: '', de: '', fr: '' },
      bio: formData.bio,
      image: formData.image || '',
      email: formData.email,
      phone: formData.phone,
      linkedin: formData.linkedin,
      twitter: formData.twitter,
      order: formData.order || 0,
      isActive: formData.isActive ?? true,
      createdAt: member?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    onSave(savedMember);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {member ? t('team.editMember') : t('team.addMember')}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('team.name')} *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Position (TR) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('team.position')} (TR) *
            </label>
            <Input
              type="text"
              value={formData.position?.tr}
              onChange={(e) => setFormData({ 
                ...formData, 
                position: { ...formData.position!, tr: e.target.value } 
              })}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('team.email')}
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('team.imageUrl')} *
            </label>
            <Input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://..."
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {member ? t('save') : t('add')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
