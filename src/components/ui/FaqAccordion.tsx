'use client';

import { useState } from 'react';

interface FaqItem {
    q: string;
    a: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {items.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                    <div
                        key={i}
                        style={{
                            background: 'var(--surface)',
                            border: isOpen ? '1px solid rgba(249,115,22,0.35)' : '1px solid var(--border)',
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            transition: 'border-color 0.2s',
                        }}
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            style={{
                                width: '100%',
                                padding: '1.25rem 1.75rem',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '1rem',
                                textAlign: 'left',
                            }}
                        >
                            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--foreground)', flex: 1 }}>
                                {item.q}
                            </span>
                            <span style={{
                                color: 'var(--accent)',
                                fontSize: '1.4rem',
                                transition: 'transform 0.25s ease',
                                transform: isOpen ? 'rotate(45deg)' : 'none',
                                flexShrink: 0,
                                lineHeight: 1,
                                display: 'block',
                            }}>
                                +
                            </span>
                        </button>
                        {isOpen && (
                            <div style={{
                                padding: '0 1.75rem 1.25rem',
                                color: 'var(--secondary)',
                                lineHeight: 1.7,
                                fontSize: '0.92rem',
                                animation: 'fadeIn 0.2s ease',
                            }}>
                                {item.a}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
