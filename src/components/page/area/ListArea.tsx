import React from 'react'
import AreaItem from './AreaItem';
import './Area.css';

const areas = [
  { imageSrc: '/assets/images/dall-e-3-HCM-2025.png', title: 'Quận 1' },
  { imageSrc: '/assets/images/dall-e-3-HCM-2025(2).png', title: 'Quận 2' },
  { imageSrc: '/assets/images/dall-e-3-HCM-2025(3).png', title: 'Quận 3' },
  { imageSrc: '/assets/images/dall-e-3-HCM-2025.png', title: 'Quận 4' },
  { imageSrc: '/assets/images/dall-e-3-HCM-2025(2).png', title: 'Quận 5' },
  { imageSrc: '/assets/images/dall-e-3-HCM-2025(3).png', title: 'Quận 6' },
  { imageSrc: '/assets/images/dall-e-3-HCM-2025.png', title: 'Quận 7' },
  { imageSrc: '/assets/images/dall-e-3-HCM-2025(2).png', title: 'Quận 8' },
  { imageSrc: '/assets/images/dall-e-3-HCM-2025(3).png', title: 'Quận 9' },
  { imageSrc: '/assets/images/dall-e-3-HCM-2025.png', title: 'Quận 10' },
  { imageSrc: '/assets/images/dall-e-3-HCM-2025(2).png', title: 'Quận 11' },
  { imageSrc: '/assets/images/dall-e-3-HCM-2025(3).png', title: 'Quận 12' },
];

const ListArea: React.FC = () => {
  return (
    <div className="area-grid">
      {areas.map((area, index) => (
        <AreaItem key={index} imageSrc={area.imageSrc} title={area.title} />
      ))}
    </div>
  );
};

export default ListArea