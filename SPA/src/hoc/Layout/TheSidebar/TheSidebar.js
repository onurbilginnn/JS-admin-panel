import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

// sidebar nav config
import CIcon from '@coreui/icons-react';
import { useTranslation } from 'react-i18next';

import * as actions from '../../../store/actions/index';
import * as transKeys from '../../../shared/transKeys';

const TheSidebar = props => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.coreui.sidebarShow);
  const { t } = useTranslation();

  const navigation = [
    {
      _tag: 'CSidebarNavItem',
      name: t(transKeys.dashboard),
      to: '/dashboard',
      icon: 'cil-speedometer',
      badge: {
        color: 'info',
        // text: 'NEW',
      }
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: [t(transKeys.forms)]
    },
    {
      _tag: 'CSidebarNavItem',
      name: t(transKeys.createUser),
      to: '/forms/register_form',
      icon: 'cil-user-plus',
    },
    {
      _tag: 'CSidebarNavItem',
      name: t(transKeys.wasteForm),
      to: '/forms/waste_form',
      icon: 'cil-drop',
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: t(transKeys.orders),
      route: '/forms/order',
      icon: 'cil-pencil',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: t(transKeys.createOrder),
          to: '/forms/order_form',
        },
        {
          _tag: 'CSidebarNavItem',
          name: t(transKeys.myOrders),
          to: '/forms/my_orders',
        }   
      ],
    }  
  ]

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch(actions.toggleSideBar(val))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="darphane-acik-yazi"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="darphane-logo"
          height={35}
        />

      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"
      />
    </CSidebar>
  )
}


export default React.memo(TheSidebar);
