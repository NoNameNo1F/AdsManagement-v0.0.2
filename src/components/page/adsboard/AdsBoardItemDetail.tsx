import { useDispatch, useSelector } from 'react-redux';
import { IAdsBoardItem } from '../../../interfaces';
import { RootState } from '../../../store/redux/store';
import { selectAdsBoard } from '../../../store/redux/Advertisement/actions';
import "./AdsBoard.css";

const ModalAdsBoardItemDetail: React.FC = () => {
  const adsBoardItem: IAdsBoardItem = useSelector((state: RootState) => state.advertisement.selectedAdsBoardItem);
  const dispatch = useDispatch();

  return (
    <div className="ads-board-container d-flex justify-content-center align-content-between">
      <div className="ads-board__content col-6">
        <div className="ads-board__title d-block pb-3">
          <span> {adsBoardItem.adsPoint.address} </span>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            Ward - District:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.adsPoint.ward.wardName} - {adsBoardItem.adsPoint.district.districtName}
          </p>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            LonLat:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.adsPoint.coordinates.longtitude} - {adsBoardItem.adsPoint.coordinates.latitude}
          </p>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            Ads Board Type:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.adsBoardType}
          </p>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            Size of Board:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.size}
          </p>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            Expiration:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.expiredDate}
          </p>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            Company Name:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.companyContact.name}
          </p>
        </div>
        <div className="row">
          <span className="d-inline-block col-4 ads-board__content-title">
            Company Phone:
          </span>
          <p className="d-inline-block col-7">
            {adsBoardItem.companyContact.phone}
          </p>
        </div>
      </div>
      <div className="vr m-1"></div>
      <div className="col-5 col-md-5">
        <div className="row">
          <div className="ads-board-image mb-3">
            {adsBoardItem.image && (
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
