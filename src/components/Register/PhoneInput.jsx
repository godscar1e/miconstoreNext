import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, { countries } from 'react-phone-number-input';

import styles from "./PhoneInput.module.scss";

export default function PhoneInputMask() {
    const [value, setValue] = useState();

    return (
        <div className={styles.phoneInput}>
            <PhoneInput
                id="phone"
                name="phone"
                defaultCountry="CH"
                countries={countries}
                countryCallingCodeEditable={false}
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
                maxLength={16} // Set max length as per your requirement
                international
            />
        </div>
    );
}
