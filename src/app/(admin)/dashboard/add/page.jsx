'use client'
import React, { useState } from "react"
import axios from 'axios'

import styles from './AddProduct.module.scss'

export default function AddProduct() {
	const [formData, setFormData] = useState({
		product_type: 'pillow',
		product_name: '',
		product_color: 'white',
		product_size: 'small',
		quantity: '',
		filler_composition: '',
		fabric_type: '',
		price: '',
		discounted_price: ''
	})

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}))
	}

	const handleFileChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.files[0]
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formPayload = new FormData()

		for (const key in formData) {
			formPayload.append(key, formData[key])
		}

		try {
			const res = await axios.post('/api/addproduct', formPayload, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			console.log('Form submitted successfully:', res)
			// Очистить форму или выполнить другие действия по завершению
		} catch (error) {
			console.error('Error submitting form:', error)
		}
	}

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<div className={styles.body}>
					<form onSubmit={handleSubmit} encType="multipart/form-data">
						<div className={styles.inputGroup}>
							<h1>Adding product:</h1>
							<select name="product_type" id="product_type" value={formData.product_type} onChange={handleInputChange} required>
								<option value="pillow">Pillow</option>
								<option value="pillowcase">Pillowcase</option>
								<option value="bedsheet">Bed Sheet</option>
								<option value="carpets">Carpet</option>
							</select>
						</div>
						<div className={styles.formBody}>
							<div className={styles.characteristicSide}>
								<h2>Main characteristics</h2>
								<div className={styles.inputGroup}>
									<label>Enter product name</label>
									<input type="text" name="product_name" value={formData.product_name} onChange={handleInputChange} required />
								</div>
								<div className={styles.inputGroup}>
									<label>Select the color of the product</label>
									<select name="product_color" id="productcolor" value={formData.product_color} onChange={handleInputChange} required>
										<option value="white">White</option>
										<option value="black">Black</option>
										<option value="orange">Orange</option>
										<option value="red">Red</option>
										<option value="turquoise">Turquoise</option>
									</select>
								</div>
								<div className={styles.inputGroup}>
									<label>Select product size</label>
									<select name="product_size" id="productsize" value={formData.product_size} onChange={handleInputChange} required>
										<option value="small">Small</option>
										<option value="medium">Medium</option>
										<option value="large">Large</option>
									</select>
								</div>
								<h2>Additional characteristics</h2>
								<div className={styles.inputGroup}>
									<label>Quantity pcs. goods</label>
									<input type="number" className="small-input" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
								</div>
								<div className={styles.inputGroup}>
									<label>Filler composition</label>
									<input type="text" id="filler_composition" name="filler_composition" value={formData.filler_composition} onChange={handleInputChange} required />
								</div>
								<div className={styles.inputGroup}>
									<label>Fabric type</label>
									<input type="text" id="fabric_type" name="fabric_type" value={formData.fabric_type} onChange={handleInputChange} required />
								</div>
							</div>
							<div className={styles.rightsideblock}>
								<h2>Uploading photos/videos</h2>
								<div className={styles.fileuploadBody}>
									<div className={styles.fileUpload}>
										<input type="file" id="photoInput1" className={styles.photoInput} name="image1" accept="image/*" onChange={handleFileChange} />
										<label className={styles.loadfiles} htmlFor="photoInput1"></label>

										<input type="file" id="photoInput2" className={styles.photoInput} name="image2" accept="image/*" onChange={handleFileChange} />
										<label className={styles.loadfiles} htmlFor="photoInput2"></label>

										<input type="file" id="photoInput3" className={styles.photoInput} name="image3" accept="image/*" onChange={handleFileChange} />
										<label className={styles.loadfiles} htmlFor="photoInput3"></label>

										<input type="file" id="photoInput4" className={styles.photoInput} name="image4" accept="image/*" onChange={handleFileChange} />
										<label className={styles.loadfiles} htmlFor="photoInput4"></label>
									</div>
									<div className={styles.filebuttons}>
										<input type="file" id="photoInput" accept="image/*" multiple onChange={handleFileChange} />
										<label className={styles.loadfileslink} htmlFor="photoInput">Upload from device</label>
										<button type="button" className={`${styles.deleteBtn} ${styles.secondarybtn}`}>Delete last</button>
										<button type="button" className={`${styles.canceladdition} ${styles.secondarybtn}`}>Cancel addition</button>
									</div>
								</div>
								<div className={styles.priceBlock}>
									<h2>Specify the price of the product</h2>
									<div className={styles.inputGroup}>
										<label>Specify the price of the product</label>
										<input type="number" className={styles.smallInput} name="price" value={formData.price} onChange={handleInputChange} required />
									</div>
									<div className={styles.inputGroup}>
										<label>Specify the price of the product with a discount</label>
										<input type="number" className={styles.smallInput} name="discounted_price" value={formData.discounted_price} onChange={handleInputChange} required />
									</div>
								</div>
							</div>
						</div>
						<button type="submit" className={`${styles.confirmBtn} ${styles.mainBtn}`}>Confirm adding a new product</button>
					</form>
				</div>
			</div>
		</div>
	)
}
