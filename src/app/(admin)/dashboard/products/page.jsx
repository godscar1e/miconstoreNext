'use client'
import React, { useEffect, useState } from 'react'
import Table from 'rc-table'
import Image from 'next/image'
import styles from '@/styles/Table.module.scss'

export default function ProductsTable() {

	const [data, setData] = useState([])

	useEffect(() => {
		async function fetchProducts() {
			try {
				const response = await fetch('/api/products')
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const products = await response.json()
				setData(products)
			} catch (error) {
				console.error('Failed to fetch products:', error)
			}
		}
		fetchProducts()
	}, [])

	const columns = [
		{
			title: 'Product Name',
			dataIndex: 'productName',
			key: 'productName',
			width: 300,
			render: (text, record) => (
				<div className={styles.productColumn}>
					<Image
						src={record.images[0] || '/icons/payment-methods/applepay.svg'} // Default image if none provided
						alt={record.productName}
						className={styles.productImage}
						width={40}
						height={40}
					/>
					<div className={styles.productInfo}>
						<span className={styles.productNameBlock}>{record.productName}</span>
					</div>
				</div>
			),
		},
		{
			title: 'Type',
			dataIndex: 'productType',
			key: 'productType',
			width: 150,
		},
		{
			title: 'Color',
			dataIndex: 'productColor',
			key: 'productColor',
			width: 150,
		},
		{
			title: 'Size',
			dataIndex: 'productSize',
			key: 'productSize',
			width: 150,
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			width: 100,
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			width: 100,
		},
		{
			title: 'Discounted Price',
			dataIndex: 'discountedPrice',
			key: 'discountedPrice',
			width: 150,
		},
		{
			title: 'Operations',
			dataIndex: '',
			key: 'operations',
			render: () => <a href="#">Edit</a>,
		},
	]

	return (
		<div className={styles.container}>
			<div className={styles.block}>
				<div className={styles.tableTitle}>
					<p>Products</p>
				</div>
				<Table
					className={styles.table}
					columns={columns}
					data={data}
					rowKey="id" 
					rowClassName={() => styles.tableRow}
				/>
			</div>
		</div>
	)
}
