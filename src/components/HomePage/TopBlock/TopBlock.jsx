import Image from 'next/image'
import Link from 'next/link'
import styles from './TopBlock.module.scss'

export default function TopBlock() {
	return (
		<section className={styles.topblock}>
			<div className={styles.body}>
				<p className={styles.text}>
					The wrong pillow is not only a source of discomfort. If the neck is in
					an uncomfortable position for a long time, this can lead to unpleasant or even painful
					sensations.
					We have collected a huge range, where everyone will find the best option for themselves.
				</p>
				<Link href="/catalog">
					<button className={styles.catalogButton}>
						Go to catalog
					</button>
				</Link>
			</div>
			<div className={styles.image}>
				<Image src="/images/bgimage.png" width={930} height={472} alt="bgimage" />
			</div>
		</section>
	)
}
