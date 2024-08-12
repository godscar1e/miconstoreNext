import React from 'react'
import ReactStars from 'react-stars'

const RatingStars = ({ rating, editable }) => {

	const ratingChanged = (newRating) => {
		console.log(newRating)
		if (onRatingChange) {
			onRatingChange(newRating)
		}
	}

	return (
		<ReactStars
			count={5}
			value={rating}
			onChange={ratingChanged}
			size={19}
			color1={'#D9D9D9'}
			color2={'#B1A084'}
			edit={editable}
		/>
	)
}

export default RatingStars
