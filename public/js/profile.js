document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    const buttons = document.querySelectorAll('.list_button');
    const infoblocks = document.querySelectorAll('.infoblock > div');
    const infoblock = document.querySelector('.infoblock');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Button clicked:", button.id);

            // Check if button.classList.add('active') is executed
            buttons.forEach(btn => btn.classList.remove('active'));
            infoblocks.forEach(block => block.classList.remove('active'));

            button.classList.add('active');

            const buttonId = button.id.replace('Btn', '');
            console.log("Button ID:", buttonId);
            const activeBlock = document.getElementById(buttonId);
            if (activeBlock) {
                activeBlock.classList.add('active');
            } else {
                console.error(`No infoblock found for: ${buttonId}`);
            }

            if (button.id === 'supportBtn') {
                infoblock.style.padding = '0';
            } else {
                infoblock.style.padding = '';
            }
        });
    });


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
        console.error('photochangeButton or profilePhotoInput not found');
    }
});
