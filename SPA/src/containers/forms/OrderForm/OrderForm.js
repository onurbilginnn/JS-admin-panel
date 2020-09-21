import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CRow,
  CSelect,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';

import { checkValidity, updateObject } from '../../../shared/utility';
import * as transKeys from '../../../shared/transKeys';
import OrderTable from './OrderTable';
import AddPositionForm from './AddPositionForm';

const OrderForm = () => {

  const { t } = useTranslation();
  const [showAddPosForm, setShowAddPosForm] = useState(false);
  const [siteSelect, setSiteSelect] = useState({
    value: '',
    validation: {
      notNullString: true,
    },
    errorMessage: [],
    isValid: false,
    isTouched: false,
    validClass: ''
  });

  const [infoFields, setInfoFields] = useState({
    orderInfo: {
      title: transKeys.orderInfo,
      fields: [
        { label: transKeys.delQty, type: 'p', value: '', validClass: '', validation: {}, errorMessage: [], isValid: false, isTouched: false },
        { label: transKeys.totalQty, type: 'p', value: '', validClass: '', validation: {}, errorMessage: [], isValid: false, isTouched: false },
        { label: transKeys.totalPrice, type: 'p', value: '', validClass: '', validation: {}, errorMessage: [], isValid: false, isTouched: false },
      ]
    },
    siteInfo: {
      title: transKeys.siteInfo,
      fields: [
        { label: transKeys.site, type: 'p', value: '', validClass: '', validation: {}, errorMessage: [], isValid: false, isTouched: false },
        { label: transKeys.siteAddress, type: 'p', value: '', validClass: '', validation: {}, errorMessage: [], isValid: false, isTouched: false },
      ]
    },
    pickupInfo: {
      title: transKeys.pickupInfo,
      fields: [
        { label: transKeys.delSite, type: 'select', value: '', validClass: '', validation: { notNullString: true }, errorMessage: [], isValid: false, isTouched: false },
        { label: transKeys.desDelDate, type: 'input', value: '', validClass: '', validation: { required: true }, errorMessage: [], isValid: false, isTouched: false },
        { label: transKeys.comments, type: 'textarea', value: '', validClass: '', validation: { required: true }, errorMessage: [], isValid: false, isTouched: false },
      ]
    }
  })

  const labelStyles = 'bg-light text-dark';

  const selectOpts = [
    (<option key={0} value="null">{t(transKeys.selectOption)}</option>),
    (<option key={1} value="1">site 1</option>),
    (<option key={2} value="2">site 2</option>),
    (<option key={3} value="3">site 3</option>)
  ];

  const infoFormSelectOpts = [
    (<option key="sehirsiz" value="null">{t(transKeys.selectOption)}</option>),
    (<option key="ankara" value="ankara">{t(transKeys.ankaraWare)}</option>),
    (<option key="denizli" value="denizli">{t(transKeys.denizliWare)}</option>),
    (<option key="istanbul" value="istanbul">{t(transKeys.istanbulWare)}</option>),
    (<option key="izmir" value="izmir">{t(transKeys.izmirWare)}</option>),
    (<option key="mersin" value="mersin">{t(transKeys.mersinWare)}</option>),
    (<option key="tekirdag" value="tekirdag">{t(transKeys.tekirdagWare)}</option>),
  ];

  const infoFormArray = [];
  for (let key in infoFields) {
    infoFormArray.push({
      id: key,
      config: infoFields[key]
    })
  }

  const infoForm = infoFormArray.map(formEl => {
    const title = formEl.config.title;
    const fieldsArr = [];

    for (let key in formEl.config.fields) {
      fieldsArr.push({
        id: key.replace(/\s+/g, ''),
        config: formEl.config.fields[key]
      })
    }

    const updateFieldArray = (id, value) => {

      let updatedInfoSelect = {};
      let validationObj = checkValidity(value, infoFields.pickupInfo.fields[id].validation);
      const validClass = validationObj.isValid ? 'is-valid' : 'is-invalid';
      let pickFieldsArr = [...infoFields.pickupInfo.fields];

      if (id === 0) {
        pickFieldsArr[id] = {
          label: transKeys.delSite,
          type: 'select',
          value: value,
          validClass: validClass,
          validation: { notNullString: true },
          errorMessage: validationObj.errorArr,
          isValid: validationObj.isValid,
          isTouched: true
        }
      } else if (id === 1) {
        pickFieldsArr[id] = {
          label: transKeys.desDelDate,
          type: 'input',
          value: value,
          validClass: validClass,
          validation: { required: true },
          errorMessage: validationObj.errorArr,
          isValid: validationObj.isValid,
          isTouched: true
        };
      } else {
        pickFieldsArr[id] = {
          label: transKeys.comments,
          type: 'textarea',
          value: value,
          validClass: validClass,
          validation: { required: true },
          errorMessage: validationObj.errorArr,
          isValid: validationObj.isValid,
          isTouched: true
        };
      }

      updatedInfoSelect = updateObject(infoFields, {
        pickupInfo: updateObject(infoFields.pickupInfo, {
          fields: [...pickFieldsArr]
        })
      })

      setInfoFields(updatedInfoSelect);

    }

    const infoSelectChange = event => {
      const value = event.target.value;
      updateFieldArray(0, value);

    }
    const infoInputChange = event => {
      const value = event.target.value;
      updateFieldArray(1, value);
    }

    const infoTextAreaChange = event => {
      const value = event.target.value;
      updateFieldArray(2, value);
    }

    const fields = fieldsArr.map(field => {
      const value = field.config.value;
      const label = field.config.label;
      const type = field.config.type;
      let errorMessage = '';

      for (let err in field.config.errorMessage) {    
        const maxLength = field.config.validation.maxLength;
        const minLength = field.config.validation.minLength;
        if(minLength) {
          errorMessage += t(field.config.errorMessage[err], {length: minLength}) + ' ';
        } else if(maxLength) {
          errorMessage += t(field.config.errorMessage[err], {length: maxLength}) + ' ';            
        } else {
          errorMessage += t(field.config.errorMessage[err]) + ' ';
        }
    }

      return (
        <CFormGroup key={field.id} row>
          <CCol md="3">
            <CLabel><small><b>{t(label)}</b></small></CLabel>
          </CCol>
          <CCol xs="12" md="9">
            {type === 'p' && <p className="form-control-static">{value}</p>}
            {type === 'select' && <CSelect onChange={infoSelectChange} className={field.config.validClass} >{infoFormSelectOpts}</CSelect>}
            {type === 'input' && <CInput onChange={infoInputChange} className={field.config.validClass} value={value} />}
            {type === 'textarea' && <CTextarea onChange={infoTextAreaChange} className={field.config.validClass} defaultValue={value}></CTextarea>}
            <p className="text-danger">{errorMessage}</p>
          </CCol>
        </CFormGroup>
      )
    })

    return (
      <CCol key={formEl.id} xs="12" sm="6">
        <CCard>
          <CCardHeader className={labelStyles}>
            {t(title)}
          </CCardHeader>
          <CCardBody>
            {fields}
          </CCardBody>
        </CCard>
      </CCol>
    )
  })

  const toggleForm = (event) => {
    let updatedSiteSelect = {};
    const value = event.target.value;
    const validationObj = checkValidity(value, siteSelect.validation);

    if (event.target.value !== 'null') {
      updatedSiteSelect = updateObject(siteSelect, {
        isValid: validationObj.isValid,
        value: value,
        isTouched: true,
        validClass: 'is-valid',
        errorMessage: validationObj.errorArr
      })
    }
    else {
      updatedSiteSelect = updateObject(siteSelect, {
        isValid: validationObj.isValid,
        value: value,
        isTouched: true,
        validClass: 'is-invalid',
        errorMessage: validationObj.errorArr
      })
    }
    setSiteSelect(updatedSiteSelect);
  }

  const toggleAddPosForm = () => {
    setShowAddPosForm(!showAddPosForm);
  }

  const closeAddPosForm = () => {
    setShowAddPosForm(false);
  }

  const createOrder = () => {
    setShowAddPosForm(false);

  }

  return (
    <CCol xs="12">
      <CCard>
        <CCardHeader className="bg-dark">
          {t(transKeys.orderForm)}
            </CCardHeader>
        <CCardBody>
          <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <CFormGroup key="header" row>
              <CCol md="3">
                <CLabel>{t(transKeys.username)}</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <p className="form-control-static">{localStorage.getItem('username')}</p>
              </CCol>
            </CFormGroup>
            <CFormGroup key="select" row>
              <CCol md="3">
                <CLabel htmlFor="select">{t(transKeys.site)}</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect onChange={toggleForm} className={siteSelect.validClass}>
                  {selectOpts}
                </CSelect>
            <p className="text-danger">{t(siteSelect.errorMessage[0])}</p>                
              </CCol>
            </CFormGroup>
            {siteSelect.isValid &&
              <>
                <CRow>
                  {infoForm}
                </CRow>
                <CRow>
                  <CCol >
                    <CCard>
                      <CCardHeader className={labelStyles}>
                        {t(transKeys.orderDetails)}                    </CCardHeader>
                      <OrderTable />
                      <hr />
                      <CCardBody>
                        {showAddPosForm && <AddPositionForm onSubmit={createOrder} onCancel={closeAddPosForm}/>}
                        {!showAddPosForm && <CButton onClick={toggleAddPosForm} className="btn btn-info">{t(transKeys.addPosition)}</CButton> }
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </>
            }
          </CForm>
        </CCardBody>
 
      </CCard>
    </CCol>
  )
}

export default OrderForm;