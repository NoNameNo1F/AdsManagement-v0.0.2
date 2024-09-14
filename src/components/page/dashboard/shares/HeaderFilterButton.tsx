// FilterButton.tsx
import React, { useState } from 'react';
import "../Dashboard.css";
interface FilterButtonProps {
    label: string;
    options: string[];
    onFilter: (filter: string) => void;
}

const HeaderFilterButton: React.FC<FilterButtonProps> = ({ label, options, onFilter }) => {
    const [isOpen, setIsOpen] = useState(false);


    const handleFilter = (filter: string) => {
        onFilter(filter);
        setIsOpen(false);
    };

    return (
        <div className="filter-button" style={{ position: 'relative', display: 'inline-block' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="header-button"
                style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {label} &nbsp;<i className="bi bi-filter-square"></i>
            </button>
            {isOpen && (
                <div
                    className="filter-dropdown"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
                        zIndex: 1000,
                    }}
                >
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleFilter(option)}
                            className="filter-option"
                            style={{
                                padding: '8px 16px',
                                width: '100%',
                                textAlign: 'left',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HeaderFilterButton;
