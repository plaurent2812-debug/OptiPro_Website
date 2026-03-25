'use client';

interface LogoProps {
    size?: string;
    className?: string;
}

export default function Logo({ size = '1.9rem', className }: LogoProps) {
    return (
        <span
            className={className}
            style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
                fontWeight: 800,
                fontSize: size,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'baseline',
                gap: 0,
                userSelect: 'none',
            }}
            aria-label="OptiPro"
        >
            <span style={{ color: '#0d1b40' }}>Opti</span>
            <span style={{ color: '#e86d00' }}>Pro</span>
        </span>
    );
}
