import { useEffect } from 'react';

export function useProfilePhotoChange() {
    useEffect(() => {
        const handlePhotoChange = () => {
            const photochangeButton = document.getElementById('photochangeButton');
            const profilePhotoInput = document.getElementById('profilePhotoInput');

            if (photochangeButton && profilePhotoInput) {
                photochangeButton.addEventListener('click', () => {
                    profilePhotoInput.click();
                });

                profilePhotoInput.addEventListener('change', () => {
                    if (profilePhotoInput.files.length > 0) {
                        photochangeButton.textContent = profilePhotoInput.files[0].name;
                    } else {
                        photochangeButton.textContent = 'Выбрать файл';
                    }
                });
            } else {
                // console.error('photochangeButton or profilePhotoInput not found');
            }

           
            return () => {
                if (photochangeButton) {
                    photochangeButton.removeEventListener('click', () => {
                        profilePhotoInput.click();
                    });
                }
                if (profilePhotoInput) {
                    profilePhotoInput.removeEventListener('change', () => {
                        if (profilePhotoInput.files.length > 0) {
                            photochangeButton.textContent = profilePhotoInput.files[0].name;
                        } else {
                            photochangeButton.textContent = 'Выбрать файл';
                        }
                    });
                }
            };
        };

        handlePhotoChange();
    }, []); // Пустой массив зависимостей гарантирует выполнение useEffect только один раз

    // Возвращаем null, так как это просто хук для эффекта
    return null;
}
