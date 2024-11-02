import React, { useState } from 'react';
// import HeaderButton from '../../common/HeaderButton';
import './Dashboard.css';
import Table from './shares/Table';
import { IAdsPointItem } from '../../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';

const Dashboard: React.FC = () => {
    const adsPointsList: IAdsPointItem[] = useSelector((state: RootState) => state.advertisement.adsPointsList);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;
    const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null);

    // Pagination handler
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Logic to fetch new data based on page number
    };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <nav>
                    <ul className="list-unstyled">
                        <li className="nav-item">
                            <i className="bi bi-geo-alt-fill"></i>&nbsp;
                            AdsPoints
                        </li>
                        <li className="nav-item">
                            <i className="bi bi-collection-fill"></i>&nbsp;
                            AdsBoards
                        </li>
                        <li className="nav-item">
                            <i className="bi bi-envelope-exclamation"></i>&nbsp;
                            Reports
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                <header className="header">
                    <div className="header-left">
                        <h2>Welcome Office Ward <i className="bi bi-person-raised-hand"></i></h2>
                    </div>
                </header>
                <section className="metrics">
                    <div className="metric-card">
                        <div className="metric-content">
                            <h3>Total Points</h3>
                            <div className="metric-chart">
                                <span className="metric-percentage">40</span>
                            </div>
                        </div>
                    </div>
                    <div className="metric-card">
                        <h3>Total Boards</h3>
                        <div className="metric-details">
                            <span>120 / 160 Boards</span>
                        </div>
                    </div>
                    <div className="metric-card">
                        <h3>Reports</h3>
                        <div className="metric-report">
                            <span>8 Reports Remain</span>
                        </div>
                    </div>
                </section>

                <section className="data-table">
                    <div className="table-header">
                        <input type="text" className="search-input-dashboard" placeholder="Search by point" />
                        <button className="add-button" title="Add New Point"><i className="bi bi-plus-circle"></i></button>

                        <button className="filter-button" title="Filter By ..."><i className="bi bi-filter-square"></i></button>

                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <button className="sort-button"><i className="bi bi-caret-down-fill"></i> &nbsp;Sort By</button>
                    </div>
                    <Table table={adsPointsList} />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;