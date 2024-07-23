import { useState } from 'react';

export function useActiveButton(initialButtonId) {
    const [activeButton, setActiveButton] = useState(initialButtonId);

    const handleButtonClick = (id) => {
        setActiveButton(id);
    };

    return {
        activeButton,
        handleButtonClick,
    };
}
