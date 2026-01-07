'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
    name?: string;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`Uncaught error in ${this.props.name || 'ErrorBoundary'}:`, error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="p-4 m-4 bg-red-50 border border-red-100 rounded-lg text-red-800">
                    <h3 className="font-semibold text-sm mb-1">
                        {this.props.name ? `${this.props.name} Yüklenemedi` : 'Bir hata oluştu'}
                    </h3>
                    <p className="text-xs opacity-80">
                        {this.state.error?.message || 'Beklenmedik bir sorun oluştu.'}
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}
