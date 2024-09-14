// HeaderButton.tsx
import React from 'react';
import "../Dashboard.css";
interface HeaderButtonProps {
    label: string;
    onClick: () => void;
    isSorted?: boolean;
    sortDirection?: 'asc' | 'desc';
}

const HeaderSortButton: React.FC<HeaderButtonProps> = ({
    label,
    onClick,
    isSorted = false,
    sortDirection,
}) => {
    return (
        <button
            onClick={onClick}
            className="header-button"
            style={{
                background: 'none',
                border: 'none',
                padding: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
            }}
        >
            {label}
            {isSorted && (
                <span style={{ fontSize: '12px' }}>
                    {sortDirection === 'asc' ? (<i className="bi bi-caret-up-fill"></i>) : (<i className="bi bi-caret-down-fill"></i>)}
                </span>
            )}
        </button>
    );
};

export default HeaderSortButton;
