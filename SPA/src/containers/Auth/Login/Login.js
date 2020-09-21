import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';

import * as actions from '../../../store/actions/index';
import * as transKeys from '../../../shared/transKeys';
import ReactFlagsSelect from 'react-flags-select';
import Spinner from '../../../components/UI/Spinner/Spinner';

const Login = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState('');

  const dispatch = useDispatch();
  const onSetAuthRedirectPath = dispatch(actions.setAuthRedirectPath('/'));
  const loading = useSelector(state => state.auth.loading);
  const appLanguage = useSelector(state => state.appConfig.language);
  const error = useSelector(state => state.auth.error);
  const token = useSelector(state => state.auth.token);
  let isAuthenticated = false;
  if (token) {
    isAuthenticated = true;
  }
  const authRedirectPath = useSelector(state => state.auth.authRedirectPath);
  const { t, i18n } = useTranslation();
  
  let mainError = null;
  let usernameError = null;
  let passwordError = null;

  if (error) {
    mainError = t(error.main);
    usernameError = t(error.username);
    passwordError = t(error.password);
  }

  useEffect(() => {
    if (authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [onSetAuthRedirectPath, authRedirectPath]);

  const handleInputChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'username':
        if (value)
          setIsUsernameValid('is-valid');
        else
          setIsUsernameValid('is-invalid');
        setUsername(value);
        break;
      case 'password':
        if (value)
          setIsPasswordValid('is-valid');
        else
          setIsPasswordValid('is-invalid');
        setPassword(value);
        break;
      default:
        break;
    }
  }


  const submitHandler = event => {
    event.preventDefault();
    dispatch(actions.login(username, password, appLanguage));
    dispatch(actions.setAppLngLocalStore(i18n.language.toUpperCase()));
  }

  let disableBtn = false;

  if (isUsernameValid !== 'is-valid' || isPasswordValid !== 'is-valid')
    disableBtn = true;



  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  
  let form = (
    <>
      <CIcon
        className="c-sidebar-brand-minimized"
        name="darphane-altyazi"
        height={130}
      />
      <p className="text-muted">{t(transKeys.login)}</p>
      <CInputGroup className={isUsernameValid !== 'is-valid' && usernameError ? null : "mb-3"}>
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cil-user" />
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput
          type="text"
          placeholder={t('auth.login.username')}
          name="username"
          value={username}
          autoComplete="username"
          className={isUsernameValid}
          onChange={handleInputChange} />
        {isUsernameValid !== 'is-valid' && usernameError ? <p className="text text-danger w-100">{usernameError}</p> : null}
      </CInputGroup>
      <CInputGroup className="mb-4" >
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cil-lock-locked" />
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput
          type="password"
          placeholder={t(transKeys.password)}
          name="password"
          onChange={handleInputChange}
          autoComplete="current-password"
          className={isPasswordValid}
          value={password}
        />
        {isPasswordValid !== 'is-valid' && passwordError ? <p className="text text-danger w-100 mb-0">{passwordError}</p> : null}
      </CInputGroup>
      <CRow>
        <CCol xs="6" className="text-left">
          <CButton type="submit" color="info" className="px-4" disabled={disableBtn} >{t(transKeys.signIn)}</CButton>
        </CCol>
        <CCol xs="6" className="text-right">
          <CButton className="px-0 text-dark">{t(transKeys.forgotPassword)}</CButton>
        </CCol>
      </CRow>
    </>
  )

  if (loading) {
    form = <Spinner />
  }

  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">

      <CContainer className="menu-flags">
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
              <CRow>            
              <ReactFlagsSelect className="ml-4"
              onSelect={changeLanguage}
                defaultCountry={appLanguage}                
                placeholder="Select Language"
                countries={["TR", "GB"]}   
                customLabels={{"GB": "EN","TR":"TR"}}
                selectedSize={14}     
                /> 
              </CRow>
                <CCardBody>
                  <CForm onSubmit={submitHandler} className="text-center">
                    {authRedirect}
                    {mainError ? <p className="alert alert-danger">{mainError}</p> : null}
                    {form}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login;
