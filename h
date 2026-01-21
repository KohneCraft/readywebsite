[33mcommit 79517c1776964b58edfa2e7ce11fcf47081d300c[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m)[m
Author: wolfkohneli <wolfkohneli@gmail.com>
Date:   Wed Jan 21 11:55:28 2026 +0000

    slug dosya ekleme

[1mdiff --git a/src/app/[locale]/[...slug]/page.tsx b/src/app/[locale]/[...slug]/page.tsx[m
[1mnew file mode 100644[m
[1mindex 0000000..032c6e9[m
[1m--- /dev/null[m
[1m+++ b/src/app/[locale]/[...slug]/page.tsx[m
[36m@@ -0,0 +1,68 @@[m
[32m+[m[32m'use client';[m
[32m+[m
[32m+[m[32m// ============================================[m
[32m+[m[32m// Page Builder - Dynamic Page Route (Catch-All)[m
[32m+[m[32m// Page Builder ile oluşturulan sayfaların dinamik route'u[m
[32m+[m[32m// /[locale]/[...slug] formatında çalışır (nested routes destekli)[m
[32m+[m[32m// ============================================[m
[32m+[m
[32m+[m[32mimport { PageRenderer } from '@/components/pageBuilder/renderers/PageRenderer';[m
[32m+[m[32mimport { useParams } from 'next/navigation';[m
[32m+[m[32mimport { useMemo } from 'react';[m
[32m+[m
[32m+[m[32m// Statik route'lar - bunlar dinamik route tarafından yakalanmamalı[m
[32m+[m[32mconst STATIC_ROUTES = [[m
[32m+[m[32m    'admin',[m
[32m+[m[32m    'preview',[m
[32m+[m[32m    'privacy',[m
[32m+[m[32m    'terms',[m
[32m+[m[32m];[m
[32m+[m
[32m+[m[32mexport default function DynamicPage() {[m
[32m+[m[32m    const params = useParams();[m
[32m+[m[32m    // slug artık array olarak geliyor (catch-all route)[m
[32m+[m[32m    const slugArray = params?.slug as string[] | undefined;[m
[32m+[m[32m    const locale = params?.locale as string;[m
[32m+[m
[32m+[m[32m    // Slug'ları birleştir (contact/x -> contact/x)[m
[32m+[m[32m    const slug = useMemo(() => {[m
[32m+[m[32m        if (!slugArray || slugArray.length === 0) return '';[m
[32m+[m[32m        return slugArray.join('/');[m
[32m+[m[32m    }, [slugArray]);[m
[32m+[m
[32m+[m[32m    // Slug kontrolü[m
[32m+[m[32m    const isValidSlug = useMemo(() => {[m
[32m+[m[32m        if (!slug) return false;[m
[32m+[m[32m        // İlk segment statik route'lardan biri değilse geçerli[m
[32m+[m[32m        const firstSegment = slugArray?.[0]?.toLowerCase() || '';[m
[32m+[m[32m        return !STATIC_ROUTES.includes(firstSegment);[m
[32m+[m[32m    }, [slug, slugArray]);[m
[32m+[m
[32m+[m[32m    if (!slug || !isValidSlug) {[m
[32m+[m[32m        return ([m
[32m+[m[32m            <div className="min-h-screen flex items-center justify-center">[m
[32m+[m[32m                <div className="text-center">[m
[32m+[m[32m                    <h1 className="text-5xl text-red-500 mb-5">404</h1>[m
[32m+[m[32m                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">[m
[32m+[m[32m                        Sayfa Bulunamadı[m
[32m+[m[32m                    </h2>[m
[32m+[m[32m                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">[m
[32m+[m[32m                        Aradığınız sayfa mevcut değil veya taşınmış olabilir.[m
[32m+[m[32m                    </p>[m
[32m+[m[32m                    <a[m
[32m+[m[32m                        href={locale === 'tr' ? '/' : `/${locale}`}[m
[32m+[m[32m                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"[m
[32m+[m[32m                    >[m
[32m+[m[32m                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">[m
[32m+[m[32m                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />[m
[32m+[m[32m                        </svg>[m
[32m+[m[32m                        Ana Sayfaya Dön[m
[32m+[m[32m                    </a>[m
[32m+[m[32m                </div>[m
[32m+[m[32m            </div>[m
[32m+[m[32m        );[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    // PageRenderer slug ile sayfayı yükler (nested slug destekli)[m
[32m+[m[32m    return <PageRenderer slug={slug} allowDraft={false} />;[m
[32m+[m[32m}[m
