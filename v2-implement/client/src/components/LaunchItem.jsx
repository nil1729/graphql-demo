import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

const LaunchItem = ({ launch }) => {
	return (
		<li
			key={launch.flight_number}
			className='list-group-item d-flex justify-content-between align-items-center'>
			<div>
				<h5 style={{ fontWeight: '100', letterSpacing: '0.5px' }}>
					Mission:{' '}
					<span
						style={{
							color: launch.launch_success ? 'green' : 'red',
							fontWeight: '400',
						}}>
						{launch.mission_name}
					</span>
				</h5>
				<p className='text-secondary'>
					Date: {moment(launch.launch_date_local).format('MMMM Do YYYY h:mm a')}
				</p>
			</div>
			<Link
				to={`/launch/${launch.flight_number}`}
				type='button'
				className='btn btn-secondary'>
				Launch Detail
			</Link>
		</li>
	);
};

LaunchItem.propTypes = {
	launch: PropTypes.object.isRequired,
};

export default LaunchItem;
