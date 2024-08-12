'use client'
import React, { useEffect, useState } from 'react'
import Table from 'rc-table'
import Image from 'next/image'
import styles from '@/styles/Table.module.scss'

export default function UsersTable() {

	const [data, setData] = useState([])

	useEffect(() => {
		async function fetchProducts() {
			try {
				const response = await fetch('/api/users')
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
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 300,
			render: (text, record) => (
				<div className={styles.userColumn}>
					<Image
						src={record.profilePhoto || '/default-profile.png'} // Default image if none provided
						alt={`${record.name} ${record.surname}`}
						className={styles.profileImage}
						width={40}
						height={40}
					/>
					<div className={styles.userInfo}>
						<span className={styles.userNameBlock}>{`${record.name} ${record.surname}`}</span>
					</div>
				</div>
			),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: 250,
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
			width: 200,
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
					<p>Users</p>
				</div>
				<Table
					className={styles.table}
					columns={columns}
					data={data}
					rowClassName={() => styles.tableRow}
				/>
			</div>
		</div>
	)
}
