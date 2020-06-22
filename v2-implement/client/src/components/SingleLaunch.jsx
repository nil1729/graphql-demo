import React from 'react';
import { Link, useParams } from 'react-router-dom';

// Components
import Loader from './Loader';

// Apollo
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// Launch Query
const LAUNCH_QUERY = gql`
	query Launch($flight_number: Int!) {
		launch(flight_number: $flight_number) {
			launch_year
			launch_success
			flight_number
			mission_name
			rocket {
				rocket_id
				rocket_name
				rocket_type
			}
		}
	}
`;

const SingleLaunch = () => {
	// Use Params
	const { id } = useParams();
	const { loading, error, data } = useQuery(LAUNCH_QUERY, {
		variables: { flight_number: parseInt(id) },
	});
	if (error)
		return (
			<div style={{ fontSize: '1.5em', textAlign: 'center' }} className='mt-4'>
				<p className='font-weght-bold text-danger'>Server Error</p>
				<p>Please Try Again Later</p>
			</div>
		);
	return (
		<div className='container mb-4'>
			{loading ? (
				<Loader />
			) : (
				<>
					<h1 className='display-4 text-center'>
						<span className='text-secondary'>Mission:</span>{' '}
						{data.launch.mission_name}
					</h1>
					<hr className='bg-white' />
					<h4 className='text-white text-center' style={{ fontWeight: '300' }}>
						Launch Details
					</h4>
					<div className='continer bg-light p-3'>
						<p className='lead'>Flight Number: {data.launch.flight_number}</p>
						<p className='lead'>Launch Year: {data.launch.launch_year}</p>
						<p className='lead'>
							Launch Sucessful:{' '}
							<span
								style={{ color: data.launch.launch_success ? 'green' : 'red' }}>
								{data.launch.launch_success ? 'Yes' : 'No'}
							</span>
						</p>
					</div>
					<h4
						className='text-white text-center mt-3'
						style={{ fontWeight: '300' }}>
						Rocket Details
					</h4>
					<div className='continer bg-light p-3'>
						<p className='lead'>Rocket ID: {data.launch.rocket.rocket_id}</p>
						<p className='lead'>
							Rocket Name: {data.launch.rocket.rocket_name}
						</p>
						<p className='lead'>
							Rocket Type: {data.launch.rocket.rocket_type}
						</p>
					</div>
					<Link to='/' type='button' className='btn btn-sm btn-secondary mt-4'>
						Go Back
					</Link>
				</>
			)}
		</div>
	);
};

export default SingleLaunch;
