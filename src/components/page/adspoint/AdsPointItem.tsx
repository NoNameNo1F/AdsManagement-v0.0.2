import React from 'react';
import './AdsPoint.css';
import { IAdsPointItem } from '../../../interfaces';
import { useDispatch } from 'react-redux';
import { selectAdsPoint } from '../../../store/redux/AdsPoint/actions';

const AdsPointItem: React.FC<IAdsPointItem> = (adsPointItem: IAdsPointItem) => {
  const dispatch = useDispatch();
  const handleItemClick = () => {
    dispatch(selectAdsPoint(adsPointItem));
  };

  return (
    <div className="ads-point-item" onClick={handleItemClick}>
      <div className="row">
        <div className="d-inline-block col-8 ads-point-title">

          <span>{adsPointItem.Address}</span>
        </div>
        <div className="d-inline-block col-4">
          {adsPointItem.NumberOfBoards}/6 Boards
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <div className="ads-point-item__summary">
            <span className="fw-medium">
              Type of Ads:
            </span>
            &nbsp;{adsPointItem.adsType}
            &nbsp;{adsPointItem.advertisingForm}
          </div>
          <div className="ads-point-item__summary">
            <span className="fw-medium">
              Location Type:
            </span>
            &nbsp;{adsPointItem.LocationType}
          </div>
          <div className="align-content-between ads-point-item__summary">
            <span className="fw-medium">
              Area:
            </span>
            &nbsp;{adsPointItem.ward.wardname} - {adsPointItem.district.districtName}
          </div>
          <div className="ads-point-item__summary">
            <span className="fw-medium">
              Planned Status:
            </span>
            &nbsp;{adsPointItem.IsPlanned ? "Planned" : "Wait for Approval"}
          </div>
        </div>
        <div className="col-4 ads-point-item__image">
          <img src="https://th.bing.com/th/id/OIP.v8hT9gXo1QmVeH-9LA6fHgHaIB?rs=1&pid=ImgDetMain" alt="Location Image" />
        </div>
      </div>

    </div>
  );
};

export default AdsPointItem;