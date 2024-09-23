import React from 'react';
import "./AdsPoint.css";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';
import { IAdsPointItem } from '../../../interfaces';
import { selectAdsPoint } from '../../../store/redux/AdsPoint/actions';

const AdsPointItemDetail: React.FC<IAdsPointItem> = (adsPointItem: IAdsPointItem) => {

    const dispatch = useDispatch();

    return (
<<<<<<< Updated upstream
        <div>
            <div className="ads-point-item-detail">
                <div className="detail-section" style={{ width: '330px', height: '300px' }}>
                    <h4>Detail Information</h4>
                    <p>Address: {adsPointItem.address}</p>
                    <p>Ward: {adsPointItem.ward.name}</p>
                    <p>District: {adsPointItem.district.name}</p>
                    <p>Type of Ads: {adsPointItem.adsType}</p>
                    <p>Location Type: {adsPointItem.locationType}</p>
                    <p>Number of Boards: {adsPointItem.numberOfBoards}</p>
                    <p>Planned Status: {adsPointItem.isPlanned ? "Planned" : "Wait for Approval"}</p>
=======
        <div className="ads-point-item-detail">
            <div className="row mb-3">
                <div className="col-5 ads-point-item-details__image">
                    <img src="https://th.bing.com/th/id/OIP.v8hT9gXo1QmVeH-9LA6fHgHaIB?rs=1&pid=ImgDetMain" alt="Location Image" />
                </div>
                <div className="col">
                    <div className="ads-point-item-details__info">
                        <span className="fw-medium"><i className="bi bi-geo-alt-fill"></i></span> &nbsp;{adsPointItem.ward.wardname} - {adsPointItem.district.districtName}
                    </div>
                    <div className="ads-point-item-details__info">
                        <span className="fw-medium"><i className="bi bi-geo-alt-fill"></i></span> &nbsp;{adsPointItem.advertisingForm}
                    </div>
                    <div className="ads-point-item-details__info">
                        <span className="fw-medium"><i className="bi bi-geo-alt-fill"></i></span> &nbsp;{adsPointItem.locationType}
                    </div>
                    <div className="ads-point-item-details__info">
                        <span className="fw-medium"></span> &nbsp;
                        {adsPointItem.isPlanned ? (
                            <i className="bi bi-patch-check-fill ads-point-item-details approved">Planned</i>
                        ) : (
                            <i className="bi bi-exclamation-triangle-fill ads-point-item-details not-approved">Wait for Approval</i>
                        )}
                    </div>
                    <div className="d-flex align-items-center">
                        <button className="button button-close col-4" onClick={() => dispatch(selectAdsPoint(null))}>
                            Back
                        </button>

                        <button className=" button button-report col-4" onClick={() => dispatch(selectAdsPoint(null))}>
                            Report
                        </button>
                    </div>
>>>>>>> Stashed changes
                </div>
                {/* <div className="boards-section">
                    <h4>Advertisement Boards</h4>
                    {adsPointItem.adsBoards?.map((board, index) => (
                        <div key={index} className="board-item">
                            <p>Company Name: {board.companyContacts.companyName}</p>
                            <p>Board Type: {board.adBoardType}</p>
                            <p>Size: {board.size}</p>
                        </div>
                    ))}
                </div> */}
                {/* <div className="ads-point-detail-image">
                    <img src="https://th.bing.com/th/id/OIP.v8hT9gXo1QmVeH-9LA6fHgHaIB?rs=1&pid=ImgDetMain" alt="Location Image" />
                </div> */}
                <button onClick={() => dispatch(selectAdsPoint(null))}>Close</button>
            </div>
        </div>
    );
};

export default AdsPointItemDetail;