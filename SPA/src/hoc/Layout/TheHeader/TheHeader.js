import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useTranslation } from 'react-i18next';
import ReactFlagsSelect from 'react-flags-select';

import * as actions from '../../../store/actions/index';
import { routes } from '../../../routes';

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks
} from '../index';
import * as transKeys from '../../../shared/transKeys';

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.coreui.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
    dispatch(actions.toggleSideBar(val));
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch(actions.toggleSideBar(val));
  }

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    .then(response => {
      return dispatch(actions.setAppLngLocalStore(lng));        
    })
    .catch(err => console.log(err));
  }

  let updatedRoutes = routes.map(route => {return {
    name: t(route.name),
    path: route.path,
    exact: route.exact,
    component:  route.component
  }})

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />

      <CToggler
        inHeader
        className="ml-2 mr-2 d-md-down-none"
        onClick={toggleSidebar}
      />
           <ReactFlagsSelect className="mt-2"
          onSelect={changeLanguage}
          defaultCountry={localStorage.getItem('appLng')}
          countries={["TR", "GB"]}
          customLabels={{ "GB": "EN", "TR": "TR" }}
          selectedSize={14}
        />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="darphane-koyu-yazi"
          height={35}
        />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">

        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/users">{t(transKeys.users)}</CHeaderNavLink>
        </CHeaderNavItem>
       
      </CHeaderNav>

      <CHeaderNav className="px-3">

        <TheHeaderDropdownNotif />
        <TheHeaderDropdownTasks />
        <TheHeaderDropdownMssg />
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={updatedRoutes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />&nbsp;{t(transKeys.dashboard)}
            </CLink>
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-settings" alt="Settings" />&nbsp;{t(transKeys.settings)}
          </CLink>
        </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
