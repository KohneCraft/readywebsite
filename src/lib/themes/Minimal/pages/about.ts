// ============================================
// Minimal Tema - Hakkımda Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const aboutPage: ThemePageData = {
    slug: 'about',
    title: 'Hakkımda',
    sections: [
        {
            name: 'About Hero',
            settings: {
                backgroundColor: '#0a0a0a',
                padding: { top: 120, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Hakkımda',
                                level: 'h1',
                                fontSize: '56px',
                                fontWeight: '300',
                                color: '#fafafa',
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'About Content',
            settings: {
                backgroundColor: '#fafafa',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'image',
                            props: {
                                src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
                                alt: 'Tasarımcı',
                            },
                        },
                    ],
                },
                {
                    width: 50,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Minimalizm Bir Felsefedir',
                                level: 'h2',
                                fontSize: '36px',
                                fontWeight: '400',
                                color: '#0a0a0a',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '10 yılı aşkın deneyimle, markaların özlerini en sade ve etkili biçimde ifade etmelerine yardımcı oluyorum. İnanıyorum ki, gerçek güzellik gereksiz detayların çıkarılmasıyla ortaya çıkar.',
                                fontSize: '18px',
                                color: '#525252',
                                lineHeight: '1.8',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Her projede hedefim, mesajı net ve güçlü bir şekilde iletmek. Karmaşıklık yerine açıklık, süsleme yerine işlevsellik tercihimdir.',
                                fontSize: '18px',
                                color: '#525252',
                                lineHeight: '1.8',
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Skills',
            settings: {
                backgroundColor: '#0a0a0a',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Marka Kimliği',
                                level: 'h4',
                                fontSize: '18px',
                                fontWeight: '400',
                                color: '#fafafa',
                            },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Web Tasarım',
                                level: 'h4',
                                fontSize: '18px',
                                fontWeight: '400',
                                color: '#fafafa',
                            },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'UX/UI',
                                level: 'h4',
                                fontSize: '18px',
                                fontWeight: '400',
                                color: '#fafafa',
                            },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Art Direction',
                                level: 'h4',
                                fontSize: '18px',
                                fontWeight: '400',
                                color: '#fafafa',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
