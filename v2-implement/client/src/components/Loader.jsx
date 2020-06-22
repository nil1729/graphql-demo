import React from 'react';
import spinner from './loader.gif';

const Loader = () => {
	return (
		<div className='row text-center'>
			<img src={spinner} alt='Spinner' style={{ margin: 'auto' }} />
		</div>
	);
};

export default Loader;
