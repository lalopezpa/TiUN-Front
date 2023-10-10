'use client';
import type React from 'react';
import {useEffect, useState} from 'react';
import 'font-awesome/css/font-awesome.min.css';
// Import '/home/laucami/TiUN/src/index.css';

const StarRating: React.FC<{rating: number}> = ({rating}) => {
	const [starClasses, setStarClasses] = useState<string[]>([]);

	useEffect(() => {
		const calculateStarClasses = () => {
			const stars = [];

			for (let i = 1; i <= 5; i++) {
				const starClass = i <= rating ? 'fa fa-star' : 'fa fa-star-o';
				stars.push(starClass);
			}

			return stars;
		};

		const updatedStarClasses = calculateStarClasses();
		setStarClasses(updatedStarClasses);
	}, [rating]);

	return (
		<div className='flex' style={{fontSize: '20px'}}>
			{starClasses.map((starClass, index) => (
				<i key={index} className={`custom-gold-star ${starClass}`}></i>
			))}
		</div>
	);
};

export default StarRating;
