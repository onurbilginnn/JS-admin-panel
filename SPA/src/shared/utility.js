import * as transKeys from '../shared/transKeys';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};



export const checkValidity = (value, rules, comparisonObj) => {
    let isValid = true;
    let errorArr = [];

    if (!rules) {
        return true;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        const msg = transKeys.isEmail;
        const boolVal = !pattern.test(value);
        isValid = pattern.test(value) && isValid;
        updateErrorArr(errorArr, msg, boolVal);
    }

    if (rules.isPassword) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        const msg = transKeys.isPassword;
        const boolVal = !pattern.test(value);
        isValid = pattern.test(value) && isValid;
        updateErrorArr(errorArr, msg, boolVal);
    }

    if (rules.isAlphanumeric) {
        const pattern = /^[a-zA-Z0-9]+$/;
        const msg = transKeys.isAlphanumeric;
        const boolVal = !pattern.test(value);
        isValid = pattern.test(value) && isValid;
        updateErrorArr(errorArr, msg, boolVal);
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        const msg = transKeys.isNumeric;
        const boolVal = !pattern.test(value);
        isValid = pattern.test(value) && isValid;
        updateErrorArr(errorArr, msg, boolVal);

    }

    if (rules.notNullString) {
        const msg = transKeys.notNullString;
        const boolVal = value === 'null';
        isValid = value !== 'null' && isValid;
        updateErrorArr(errorArr, msg, boolVal);
    }

    if (rules.compareWith) {
        const msg = transKeys.compareWith;
        const boolVal = value !== comparisonObj.value;
        isValid = value === comparisonObj.value && isValid;
        updateErrorArr(errorArr, msg, boolVal);
    }


    if (rules.minLength) {
        const msg = transKeys.minLength;
        const boolVal = value.length < rules.minLength;
        isValid = value.length >= rules.minLength && isValid
        updateErrorArr(errorArr, msg, boolVal);
    }

    if (rules.maxLength) {
        const msg = transKeys.maxLength;
        const boolVal = value.length > rules.maxLength;
        isValid = value.length <= rules.maxLength && isValid;
        updateErrorArr(errorArr, msg, boolVal);
    }

    if (rules.required) {
        const msg = transKeys.required;
        const boolVal = value.trim() === '';
        isValid = value.trim() !== '' && isValid;
        updateErrorArr(errorArr, msg, boolVal);
    }

    const validationObj = {
        isValid: isValid,
        errorArr: errorArr
    }
    return validationObj;
}

const updateErrorArr = (errorArr, msg, boolVal) => {
    if (boolVal) {
        errorArr.push(msg);
    } else {
        let index = errorArr.indexOf(msg);
        if (index !== -1)
            errorArr.splice(index, 1);
    }
}
