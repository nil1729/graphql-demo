import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const Paginate = ({ pageNums, paginate, currentPage }) => {
	return (
		<div className='container pagination mb-3'>
			<nav aria-label='Page navigation example'>
				<ul className='pagination'>
					{pageNums.map(page =>
						currentPage === page ? (
							<li key={page} className='page-item active'>
								<a
									onClick={() => paginate(page)}
									className='page-link text-white'>
									{page}
								</a>
							</li>
						) : (
							<li key={page} className='page-item'>
								<a
									onClick={() => paginate(page)}
									className='page-link text-white'>
									{page}
								</a>
							</li>
						)
					)}
				</ul>
			</nav>
		</div>
	);
};

Paginate.propTypes = {
	pageNums: PropTypes.array.isRequired,
	paginate: PropTypes.func.isRequired,
};

export default Paginate;
