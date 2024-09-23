import React from 'react';
import "./AdsPoint.css";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';
import { IAdsBoardItem, IAdsPointItem } from '../../../interfaces';
import { selectAdsPoint } from '../../../store/redux/AdsPoint/actions';

const AdsPointItemDetail: React.FC<IAdsPointItem> = (adsPointItem: IAdsPointItem) => {
    const boards: IAdsBoardItem[] = useSelector((state: RootState) => state.adsPoint.adsBoardsList);
    const dispatch = useDispatch();

    return (
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
                </div>
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
        </div>
    );
};

export default AdsPointItemDetail;