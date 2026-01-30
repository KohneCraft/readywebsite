// ============================================
// Minimal Tema - Hakkımda Sayfası
// Çoklu dil desteği ile (TR/EN/DE/FR)
// ============================================

import type { ThemePageData } from '@/types/theme';

export const aboutPage: ThemePageData = {
    slug: 'about',
    title: 'Hakkımda',
    titles: { tr: 'Hakkımda', en: 'About Me', de: 'Über mich', fr: 'À Propos' },
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
                                content: {
                                    tr: 'Hakkımda',
                                    en: 'About Me',
                                    de: 'Über mich',
                                    fr: 'À Propos de Moi'
                                },
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
                                alt: { tr: 'Tasarımcı', en: 'Designer', de: 'Designer', fr: 'Designer' },
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
                                content: {
                                    tr: 'Minimalizm Bir Felsefedir',
                                    en: 'Minimalism is a Philosophy',
                                    de: 'Minimalismus ist eine Philosophie',
                                    fr: 'Le Minimalisme est une Philosophie'
                                },
                                level: 'h2',
                                fontSize: '36px',
                                fontWeight: '400',
                                color: '#0a0a0a',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: {
                                    tr: '10 yılı aşkın deneyimle, markaların özlerini en sade ve etkili biçimde ifade etmelerine yardımcı oluyorum. İnanıyorum ki, gerçek güzellik gereksiz detayların çıkarılmasıyla ortaya çıkar.',
                                    en: 'With over 10 years of experience, I help brands express their essence in the simplest and most effective way. I believe that true beauty emerges when unnecessary details are removed.',
                                    de: 'Mit über 10 Jahren Erfahrung helfe ich Marken, ihr Wesen auf einfachste und effektivste Weise auszudrücken. Ich glaube, dass wahre Schönheit entsteht, wenn unnötige Details entfernt werden.',
                                    fr: 'Avec plus de 10 ans d\'expérience, j\'aide les marques à exprimer leur essence de la manière la plus simple et la plus efficace. Je crois que la vraie beauté émerge lorsque les détails inutiles sont supprimés.'
                                },
                                fontSize: '18px',
                                color: '#525252',
                                lineHeight: '1.8',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: {
                                    tr: 'Her projede hedefim, mesajı net ve güçlü bir şekilde iletmek. Karmaşıklık yerine açıklık, süsleme yerine işlevsellik tercihimdir.',
                                    en: 'In every project, my goal is to convey the message clearly and powerfully. I prefer clarity over complexity, functionality over decoration.',
                                    de: 'In jedem Projekt ist mein Ziel, die Botschaft klar und kraftvoll zu vermitteln. Ich bevorzuge Klarheit statt Komplexität, Funktionalität statt Dekoration.',
                                    fr: 'Dans chaque projet, mon objectif est de transmettre le message de manière claire et puissante. Je préfère la clarté à la complexité, la fonctionnalité à la décoration.'
                                },
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
                                content: {
                                    tr: 'Marka Kimliği',
                                    en: 'Brand Identity',
                                    de: 'Markenidentität',
                                    fr: 'Identité de Marque'
                                },
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
                                content: {
                                    tr: 'Web Tasarım',
                                    en: 'Web Design',
                                    de: 'Webdesign',
                                    fr: 'Design Web'
                                },
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
