import React from 'react'
import {
  CCol,
  CContainer,
  CRow,
  CButton,
} from '@coreui/react'
import { useTranslation } from 'react-i18next';

import * as transKeys from '../../../shared/transKeys';

const Page404 = props => {
  const { t } = useTranslation();
  const goHome = () => props.history.push('/');
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <div className="text-center">
          <CButton variant="outline"
           className="btn btn-outline-dark"
           onClick={goHome}
           >{t(transKeys.home)}</CButton>
        </div>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">{t(transKeys.oops)}</h4>
              <p className="text-muted float-left">{t(transKeys.notFound)}</p>
            </div>       
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
