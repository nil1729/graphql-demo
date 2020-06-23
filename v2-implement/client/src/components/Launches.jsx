import React, { useEffect, useState } from 'react';

// Components
import Loader from './Loader';
import LaunchItem from './LaunchItem';
import Paginate from './Paginate';

// Apollo
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const LAUNCHES_QUERY = gql`
	{
		launches {
			mission_name
			flight_number
			launch_date_local
			launch_success
		}
	}
`;

const Launches = () => {
	const [launches, setLaunches] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageNums, setPageNums] = useState([]);
	const launchesPerPage = 15;
	let indexOfLastLaunch, indexOfFirstLaunch;

	const { loading, error, data } = useQuery(LAUNCHES_QUERY);
	useEffect(() => {
		if (typeof data !== 'undefined') {
			setCurrentLuanches(data.launches, currentPage);
			let arr = [];
			const totalPages = Math.ceil(data.launches.length / launchesPerPage);
			for (let i = 1; i <= totalPages; i++) {
				arr.push(i);
			}
			setPageNums(arr);
		}
	}, [data]);

	const setCurrentLuanches = (launches, currentPage) => {
		indexOfLastLaunch = currentPage * launchesPerPage;
		indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
		setLaunches(launches.slice(indexOfFirstLaunch, indexOfLastLaunch));
	};

	const changePage = page => {
		setCurrentPage(page);
		setCurrentLuanches(data.launches, page);
	};

	if (error)
		return (
			<div style={{ fontSize: '1.5em', textAlign: 'center' }} className='mt-4'>
				<p className='font-weght-bold text-danger'>Server Error</p>
				<p>Please Try Again Later</p>
			</div>
		);
	return (
		<div className='container'>
			<h1 className='display-4 my-3 text-center'>SpaceX Launches</h1>
			<p className='lead'>
				<span className='badge badge-success'>Success</span> - Success
			</p>
			<p className='lead'>
				<span className='badge badge-danger'>Failure</span> - Fail
			</p>
			{loading ? (
				<Loader />
			) : (
				<>
					<Paginate
						pageNums={pageNums}
						paginate={changePage}
						currentPage={currentPage}
					/>
					<div className='list-group mb-4'>
						{launches.map(launch => (
							<LaunchItem key={launch.flight_number} launch={launch} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Launches;
