import React, { useState, useEffect, useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CSelect,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ImageUpload from '../../../components/UI/Input/ImageUpload/ImageUpload';
import { checkValidity, updateObject } from '../../../shared/utility';
import Spinner from '../../../components/UI/Spinner/Spinner'
import * as actions from '../../../store/actions/index';
import * as transKeys from '../../../shared/transKeys';

const Register = props => {

  const initialState = {
    username: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: transKeys.username,
        icon: 'cil-user'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        isAlphanumeric: true,
      },
      errorMessage: [],
      isValid: false,
      isTouched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
        icon: 'cil-envelope-closed'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      errorMessage: [],
      isValid: false,
      isTouched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: transKeys.password,
        icon: 'cil-lock-unlocked'
      },
      value: '',
      validation: {
        required: true,
        isPassword: true,
        minLength: 8,
        maxLength: 20,
      },
      errorMessage: [],
      isValid: false,
      isTouched: false
    },
    repPass: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: transKeys.repPassword,
        icon: 'cil-lock-locked'
      },
      value: '',
      validation: {
        required: true,
        compareWith: true,
      },
      errorMessage: [],
      isValid: false,
      isTouched: false
    },
    role: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: transKeys.chooseARole,
        validClass: '',
        icon: 'cil-voice-over-record'
      },
      value: '',
      validation: {
        notNullString: true,
      },
      errorMessage: [],
      isValid: false,
      isTouched: false
    },
    company: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: transKeys.company,
        icon: 'cil-industry'
      },
      value: '',
      validation: {
        required: true,
      },
      errorMessage: [],
      isValid: false,
      isTouched: false
    },
    image: {
      imageObj: {},
      validation: {},
      elementConfig: {
        type: 'file',
        placeholder: '',
        icon: 'cil-image'
      },
      errorMessage: [],
      isValid: true,
      isTouched: false
    }
  };
  const [controls, setControls] = useState({
    username: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: transKeys.username,
        icon: 'cil-user'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        isAlphanumeric: true,
      },
      errorMessage: [],
      isValid: false,
      isTouched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
        icon: 'cil-envelope-closed'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      errorMessage: [],
      isValid: false,
      isTouched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: transKeys.password,
        icon: 'cil-lock-unlocked'
      },
      value: '',
      validation: {
        required: true,
        minLength: 8,
        maxLength: 20,
      },
      errorMessage: [],
      isValid: false,
      isTouched: false
    },
    repPass: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: transKeys.repPassword,
        icon: 'cil-lock-locked'
      },
      value: '',
      validation: {
        required: true,
        compareWith: true,
      },
      errorMessage: [],
      isValid: false,
      isTouched: false
    },
    role: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: transKeys.chooseARole,
        validClass: '',
        icon: 'cil-voice-over-record'
      },
      value: '',
      validation: {
        notNullString: true,
      },
      errorMessage: [],
      isValid: false,
      isTouched: false
    },
    company: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: transKeys.company,
        icon: 'cil-industry'
      },
      value: '',
      validation: {
        required: true,
      },
      errorMessage: [],
      isValid: false,
      isTouched: false
    },
    image: {
      imageObj: {},
      validation: {},
      elementConfig: {
        type: 'file',
        placeholder: '',
        icon: 'cil-image'
      },
      errorMessage: [],
      isValid: true,
      isTouched: false
    }
  });
  const dispatch = useDispatch();
  const onSetAuthRedirectPath = dispatch(actions.setAuthRedirectPath('/'));
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const userRegistered = useSelector(state => state.auth.dataSent);
  const authRedirectPath = useSelector(state => state.auth.authRedirectPath);
  const isFirstRender = useRef(true);
  const [removeAllImages, setRemoveAllImages] = useState(false);
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState({
    type: '',
    isOpen: false,
    msg: ''
  });
  const maxImageSize = 3 * 1024 * 1024;

  let errors = [];
  let i = 0;
  if (error) {
    for (let key in error) {
      errors[i] = t(error[key]) + ' ';
      ++i;
    }
  }

  useEffect(() => {
    if (authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    };
  }, [onSetAuthRedirectPath, authRedirectPath]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (userRegistered) {
        const updateModalState = updateObject(openModal, {
          type: 'success',
          isOpen: true,
          msg: 'User Saved'
        });
        setOpenModal(updateModalState);
        setControls({ ...initialState });
        setRemoveAllImages(true);
      }
    }
  }, [userRegistered, controls, openModal, initialState]);


  const handleInputChange = (event, controlName) => {
    const value = event.target.value;
    let updatedControls = {};
    let validationObj = {};

    if (controlName !== 'repPass') {
      validationObj = checkValidity(value, controls[controlName].validation);
    } else {
      validationObj = checkValidity(value, controls[controlName].validation, {
        name: 'Passwords',
        value: controls.password.value
      })
    }
    updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: value,
        isTouched: true,
        isValid: validationObj.isValid,
        errorMessage: validationObj.errorArr
      })
    });
    setControls(updatedControls);
  }

  const handleImgChange = (img) => {
    let updatedControls = {};
    if (img.length > 0) {
      updatedControls = updateObject(controls, {
        image: updateObject(controls.image, {
          imageObj: img[0].file,
          isTouched: true,
        })
      });
      setControls(updatedControls);
    }
  };
  const handleImgChangeError = (errors, files) => {
    let errorMsg = [];
    for (let err in errors) {
      if (errors[err]) {
        switch (err) {
          case 'acceptType':
            errorMsg.push('Image type must be jpg, gif, png or jpeg! ');
            break;
          case 'maxFileSize':
            errorMsg.push('Image must be max ' + (maxImageSize % (1024 * 1024)) + ' MB! ');
            break;
          default:
            break;
        }
      }
    }
    if (errorMsg.length > 0) {
      const updateModalState = updateObject(openModal, {
        type: 'danger',
        isOpen: true,
        msg: errorMsg
      });
      setOpenModal(updateModalState);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const userData = {
      username: controls.username.value,
      email: controls.email.value,
      password: controls.password.value,
      repPass: controls.repPass.value,
      role: controls.role.value,
      company: controls.company.value,
      image: controls.image.imageObj
    }
    dispatch(actions.register(userData));
  }

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    })
  }

  let form = formElementsArray.map(formElement => {
    const touched = formElement.config.isTouched;
    const valid = formElement.config.isValid;
    let validClass = '';
    let errorMessage = '';
    if (!touched) {
      validClass = '';
    } else if (touched && valid) {
      validClass = 'is-valid';
    } else if (touched && !valid) {
      validClass = 'is-invalid'
      for (let err in formElement.config.errorMessage) {    
          const maxLength = formElement.config.validation.maxLength;
          const minLength = formElement.config.validation.minLength;
          if(minLength) {
            errorMessage += t(formElement.config.errorMessage[err], {length: minLength}) + ' ';
          } else if(maxLength) {
            errorMessage += t(formElement.config.errorMessage[err], {length: maxLength}) + ' ';            
          } else {
            errorMessage += t(formElement.config.errorMessage[err]) + ' ';
          }
      }
    }

    if (formElement.id !== 'role' && formElement.id !== 'image') {
      return (
        <CInputGroup key={formElement.id} className={!errorMessage ? "mb-3" : ""}>
          <CInputGroupPrepend>
            <CInputGroupText>
              <CIcon name={formElement.config.elementConfig.icon} />
            </CInputGroupText>
          </CInputGroupPrepend>
          <CInput
            type={formElement.config.elementConfig.type}
            value={formElement.config.value}
            placeholder={t(formElement.config.elementConfig.placeholder)}
            className={validClass}
            onChange={event => handleInputChange(event, formElement.id)} />
          {errorMessage && <p className="text text-danger w-100">{errorMessage}</p>}
        </CInputGroup>
      )
    } else if (formElement.id === 'role' && formElement.id !== 'image') {
      return (
        <CInputGroup key={formElement.id} className={!formElement.config.errorMessage ? "mb-3" : ""}>
          <CInputGroupPrepend>
            <CInputGroupText>
              <CIcon name={formElement.config.elementConfig.icon} />
            </CInputGroupText>
          </CInputGroupPrepend>
          <CSelect
            onChange={event => handleInputChange(event, formElement.id)}
            className={validClass} value={formElement.config.value}>
            <option value="null">{t(transKeys.chooseARole)}</option>
            <option value="admin">Admin</option>
            <option value="gib">Gib</option>
            <option value="darphane">{t(transKeys.mint)}</option>
            <option value="mass">{t(transKeys.serialProducer)}</option>
            <option value="export">{t(transKeys.exporter)}</option>
          </CSelect>
          {formElement.config.errorMessage && <p className="text text-danger w-100">{errorMessage}</p>}
        </CInputGroup>
      )
    } else {
      return <div key="uniq"></div>
    }
  })

  if (loading) {
    form = <Spinner />
  }

  let disableBtn = false;
  for (let ctrl in controls) {
    if (!controls[ctrl].isValid) {
      disableBtn = true;
      break;
    }
  }


  const closeModalHandler = () => {
    const updateModalState = updateObject(openModal, {
      type: '',
      isOpen: false
    })
    setOpenModal(updateModalState);
    if (openModal.type === 'success') {
      setRemoveAllImages(false);      
    }
  }
  return (
    <div className="flex-row">
      <CContainer >
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={submitHandler} className="text-center">
                  <p className="text-muted mt-2">{t(transKeys.createUser)}</p>
                  {errors.length > 0 && <p className="alert alert-danger w-100">{errors}</p>}
                  {form}
                  <CInputGroup className={"mb-3"}>
                    <ImageUpload
                      change={handleImgChange}
                      maxFS={maxImageSize}
                      error={handleImgChangeError}
                      removeAll={removeAllImages} />
                  </CInputGroup>
                  <CButton color="success" type="submit" disabled={disableBtn} block >{t(transKeys.create)}</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      <CModal show={openModal.isOpen} onClose={closeModalHandler} color={openModal.type} >
        <CModalHeader closeButton>
          <CModalTitle>{openModal.type.toUpperCase()}</CModalTitle>
        </CModalHeader>
        <CModalBody className={"font-weight-bold text text-" + openModal.type}>
          {openModal.msg}
        </CModalBody>
      </CModal>

    </div>
  )
}

export default Register
