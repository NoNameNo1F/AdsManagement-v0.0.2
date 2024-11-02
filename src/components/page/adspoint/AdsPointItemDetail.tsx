import React, { useEffect } from 'react';
import "./AdsPoint.css";
import { useDispatch } from 'react-redux';
import { IAdsBoardItem, IAdsPointItem } from '../../../interfaces';
import { fetchAdsBoards, selectAdsPoint } from '../../../store/redux/Advertisement/actions';
import { useGetAdsBoardsByPointIdQuery } from '../../../apis/advertisementApi';

const AdsPointItemDetail: React.FC<IAdsPointItem> = (adsPointItem: IAdsPointItem) => {
    const dispatch = useDispatch();
    const { data: adsBoardsList } = useGetAdsBoardsByPointIdQuery(adsPointItem.pointId);

    useEffect(() => {
        dispatch(fetchAdsBoards(adsBoardsList));
    }, [adsBoardsList, dispatch]);

    return (
        <div className="ads-point-item-detail">
            <div className="row mb-3">
                <div className="col-5 ads-point-item-details__image">
                    <img src="https://th.bing.com/th/id/OIP.v8hT9gXo1QmVeH-9LA6fHgHaIB?rs=1&pid=ImgDetMain" alt="Location Image" />
                </div>
                <div className="col">
                    <div className="ads-point-item-details__info">
                        <span className="fw-medium"><i className="bi bi-geo-alt-fill"></i></span> &nbsp;{adsPointItem.ward.wardName} - {adsPointItem.district.districtName}
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
            <div className="boards-section">
                <h4>Advertisement Boards</h4>
                {adsBoardsList && adsBoardsList.length > 0 ? (

                    adsBoardsList.map((board: IAdsBoardItem, index: number) => (
                        <div key={index} className="board-item">
                            <p>Company Name: {board.companyContact.name}</p>
                            <p>Board Type: {board.adsBoardType}</p>
                            <p>Size: {board.size}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center"> No advertisement boards found.</p>
                )}
            </div>
        </div>
    );
};

export default AdsPointItemDetail;