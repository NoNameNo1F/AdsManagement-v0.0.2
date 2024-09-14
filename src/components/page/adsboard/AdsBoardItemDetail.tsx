import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAdsBoardItem } from '../../../interfaces';
import { RootState } from '../../../store/redux/store';
import { selectAdsBoard } from '../../../store/redux/AdsPoint/actions';
import "./AdsBoard.css";

const ModalAdsBoardItemDetail: React.FC = () => {
  const adsBoardItem: IAdsBoardItem = useSelector((state: RootState) => state.adsPoint.selectedAdsBoardItem);
  const dispatch = useDispatch();

  return (
    <div className="ads-board-container d-flex justify-content-center align-content-between">
      <div className="ads-board__content col-6">
        <div className="ads-board__title d-block pb-3">
          <span> {adsBoardItem.AdsPoint.Address} </span>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            Ward - District:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.AdsPoint.Ward.name} - {adsBoardItem.AdsPoint.District.name}
          </p>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            LonLat:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.AdsPoint.Coordinates.Longtitude} - {adsBoardItem.AdsPoint.Coordinates.Latitude}
          </p>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            Ads Board Type:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.AdsBoardType}
          </p>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            Size of Board:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.Size}
          </p>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            Expiration:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.ExpiredDate}
          </p>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            Company Name:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.CompanyContact.Name}
          </p>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            Company Phone:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.CompanyContact.Phone}
          </p>
        </div>
      </div>
      <div className="vr m-1"></div>
      <div className="col-5 col-md-5">
        <div className="row">
          <div className="ads-board-image mb-3">
            {adsBoardItem.Image && (
              <img
                src={"https://th.bing.com/th/id/OIP.SMIO75YWFqQnk5sWCutx4wHaEK?rs=1&pid=ImgDetMain"}//selectedAdsBoardItem.image
                alt="Board Image"
              />
            )}
          </div>
        </div>
        <div className="row align-content-end justify-content-end board-button mt-2">
          <button className="button button-close col-2" onClick={() => dispatch(selectAdsBoard(null))}>
            Close
          </button>
          <div className="col-1"></div>
          <button className=" button button-report col-3" onClick={() => dispatch(selectAdsBoard(null))}>
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdsBoardItemDetail;
