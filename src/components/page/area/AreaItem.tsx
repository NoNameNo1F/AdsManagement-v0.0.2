import React from 'react';
import './Area.css';
// Define the type for the component props
interface AreaProps {
    imageSrc: string;
    title: string;
}

const AreaItem: React.FC<AreaProps> = ({ imageSrc, title }) => {
    return (
        <div
            className="area-item d-flex flex-column align-items-center"
        >
            <img
                className="area-image"
                src={imageSrc}
                alt={title}
            />

            <span
                className="area-title fw-bold"
            >
                {title}
            </span>
        </div>
    );
};

export default AreaItem;
