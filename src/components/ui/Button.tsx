import Link from 'next/link';
import { ReactNode, CSSProperties } from 'react';

interface ButtonProps {
    children: ReactNode;
    href?: string;
    variant?: 'primary' | 'outline' | 'secondary';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    style?: CSSProperties;
    disabled?: boolean;
}

export default function Button({
    children,
    href,
    variant = 'primary',
    className = '',
    type = 'button',
    onClick,
    style,
    disabled
}: ButtonProps) {
    const baseClass = 'btn';
    const variantClass = variant === 'primary' ? 'btn-primary' : variant === 'outline' ? 'btn-outline' : '';
    const combinedClass = `${baseClass} ${variantClass} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClass} style={style}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={combinedClass} onClick={onClick} style={style} disabled={disabled}>
            {children}
        </button>
    );
}
