import React, { useState } from 'react';
import {
    CButton,
    CCardFooter,
    CCol,
    CFormGroup,
    CLabel,
    CSelect,
    CInput
  } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useTranslation } from 'react-i18next';

import { checkValidity, updateObject } from '../../../shared/utility';
import * as transKeys from '../../../shared/transKeys';

const AddPositionForm = props => {
  const { t } = useTranslation();

    const [controls, setControls] = useState({
        gtip: {
            title: 'GTIP',
          elementType: 'select',
          elementConfig: {
            type: 'text',
            placeholder: 'Select an option',
          },
          value: '',
          validation: {
            notNullString: true,
          },
          errorMessage: [],
          isValid: false,
          isTouched: false
        },
        packVol: {
            title: transKeys.packVol,
            elementType: 'select',
            elementConfig: {
              type: 'text',
              placeholder: 'Select an option',
            },
            value: '',
            validation: {
              notNullString: true,
            },
            errorMessage: [],
            isValid: false,
            isTouched: false
          },
          codeType: {
            title: transKeys.codeType,
            elementType: 'select',
            elementConfig: {
              type: 'text',
              placeholder: 'Select an option',
            },
            value: '',
            validation: {
              notNullString: true,
            },
            errorMessage: [],
            isValid: false,
            isTouched: false
          },
          prodBandRef: {
            title: transKeys.prodBandRef,
            elementType: 'select',
            elementConfig: {
              type: 'text',
              placeholder: 'Select an option',
            },
            value: '',
            validation: {
              notNullString: true,
            },
            errorMessage: [],
            isValid: false,
            isTouched: false
          },
          packType: {
            title: transKeys.packType,
            elementType: 'p',
            elementConfig: {
              type: 'text',
              placeholder: '',
            },
            value: '',
            validation: {},
            errorMessage: [],
            isValid: true,
            isTouched: false
          },
          bandType: {
            title: transKeys.bandType,
            elementType: 'p',
            elementConfig: {
              type: 'text',
              placeholder: '',
            },
            value: '',
            validation: {},
            errorMessage: [],
            isValid: true,
            isTouched: false
          },
          skuProd: {
            title: 'SKU',
            elementType: 'select',
            elementConfig: {
              type: 'text',
              placeholder: 'Select an option',
            },
            value: '',
            validation: {
              notNullString: true,
            },
            errorMessage: [],
            isValid: false,
            isTouched: false
          },
          qty: {
            title: transKeys.qty,
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Quantity',
            },
            value: '',
            validation: {
                isNumeric: true,
                required: true
            },
            errorMessage: [],
            isValid: false,
            isTouched: false
          },
          unAppBandStockQty: {
            title: transKeys.unAppBandStockQty,
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Quantity',
            },
            value: '',
            validation: {
                isNumeric: true,
                required: true
            },
            errorMessage: [],
            isValid: false,
            isTouched: false
          },
          bandAppProdStockQtyProdSite: {
            title: transKeys.bandAppProdStockQtyProdSite,
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Quantity',
            },
            value: '',
            validation: {
                isNumeric: true,
                required: true
            },
            errorMessage: [],
            isValid: false,
            isTouched: false
          },
          bandAppProdQtyConsin: {
            title: transKeys.bandAppProdQtyConsin,
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Quantity',
            },
            value: '',
            validation: {
                isNumeric: true,
                required: true
            },
            errorMessage: [],
            isValid: false,
            isTouched: false
          },
          bandAppProdQtyMarkSales: {
            title: transKeys.bandAppProdQtyMarkSales,
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Quantity',
            },
            value: '',
            validation: {
                isNumeric: true,
                required: true
            },
            errorMessage: [],
            isValid: false,
            isTouched: false
          },
          bandAppProdQtyKVK: {
            title: transKeys.bandAppProdQtyKVK,
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Quantity',
            },
            value: '',
            validation: {
                isNumeric: true,
                required: true
            },
            errorMessage: [],
            isValid: false,
            isTouched: false
          },
          codesQty: {
            title: transKeys.codesQty,
            elementType: 'p',
            elementConfig: {
              type: 'text',
              placeholder: '',
            },
            value: '',
            validation: {},
            errorMessage: [],
            isValid: true,
            isTouched: false
          },
          uniPrice: {
            title: transKeys.uniPrice,
            elementType: 'p',
            elementConfig: {
              type: 'text',
              placeholder: '',
            },
            value: '',
            validation: {},
            errorMessage: [],
            isValid: true,
            isTouched: false
          },
          totalPrice: {
            title: transKeys.totalPrice,
            elementType: 'p',
            elementConfig: {
              type: 'text',
              placeholder: '',
            },
            value: '',
            validation: {},
            errorMessage: [],
            isValid: true,
            isTouched: false
          }
      });

      const formElementsArray = [];
      for (let key in controls) {
        formElementsArray.push({
          id: key,
          config: controls[key]
        })
      }

      const onValueChange = (event, controlName) => {
        const value = event.target.value;
        const validationObj = checkValidity(value, controls[controlName].validation);

        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
              value: value,
              isTouched: true,
              isValid: validationObj.isValid,
              errorMessage: validationObj.errorArr
            })
          });

          setControls(updatedControls);
      }

      let form = formElementsArray.map(formEl => {

        const touched = formEl.config.isTouched;
        const valid = formEl.config.isValid;
        let validClass = '';
        let errorMessage = '';

        if (!touched) {
            validClass = '';
          } else if (touched && valid) {
            validClass = 'is-valid';
          } else if (touched && !valid) {
            validClass = 'is-invalid';
          }

          for (let err in formEl.config.errorMessage) {    
            const maxLength = formEl.config.validation.maxLength;
            const minLength = formEl.config.validation.minLength;
            if(minLength) {
              errorMessage += t(formEl.config.errorMessage[err], {length: minLength}) + ' ';
            } else if(maxLength) {
              errorMessage += t(formEl.config.errorMessage[err], {length: maxLength}) + ' ';            
            } else {
              errorMessage += t(formEl.config.errorMessage[err]) + ' ';
            } 
        }

          return (
            <CFormGroup key={formEl.id} row>
            <CCol md="3">
              <CLabel><strong>{t(formEl.config.title)}</strong></CLabel>
            </CCol>
            <CCol xs="12" md="8">
            {formEl.config.elementType === 'select' &&
            <CSelect className={validClass} onChange={event => onValueChange(event, formEl.id)}>
                <option value="null">{t(transKeys.selectOption)}</option>
                <option>AAA</option>
                <option>AAA</option>
                <option>AAA</option>
            </CSelect> }
            {formEl.config.elementType === 'p' && <p>AAA</p> }
            {formEl.config.elementType === 'input' && <CInput className={validClass} onChange={event => onValueChange(event, formEl.id)} /> }
            <p className="text-danger">{errorMessage}</p>            
        </CCol>
          </CFormGroup>
          )
      })

    return (
        <CCol md="8">
         {form}
         <CCardFooter className="d-flex justify-content-between mb-3">
          <CButton onClick={props.onSubmit} type="submit" variant="outline" size="sm" color="success"><CIcon name="cil-thumb-up" /> {t(transKeys.submit)}</CButton>
          <CButton onClick={props.onCancel} type="reset" variant="outline" size="sm" color="danger"><CIcon name="cil-thumb-down" /> {t(transKeys.cancel)}</CButton>
        </CCardFooter>
        </CCol>
    );
}

export default AddPositionForm;