import './assets/motion.scss'

// Объявляем maskMotion как объект настроек для DrawerProps
export const maskMotion = {
	motionAppear: true,
	motionName: 'mask-motion',
	onAppearEnd: console.warn,
}

// Объявляем motion как функцию, возвращающую объект настроек для DrawerProps
export const motion = (placement) => ({
	motionAppear: true,
	motionName: `panel-motion-${placement}`,
})

// Создаем объект настроек для DrawerProps
const motionProps = {
	maskMotion,
	motion,
}

export default motionProps
