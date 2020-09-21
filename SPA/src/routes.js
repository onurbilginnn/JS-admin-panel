import React from 'react';
import * as transKeys from './shared/transKeys';

const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'));
const wasteForm = React.lazy(() => import('./containers/forms/WasteForm/WasteForm'));
const orderForm = React.lazy(() => import('./containers/forms/OrderForm/OrderForm'));
const register = React.lazy(() => import('./containers/forms/Register/Register'));

export const routes = [
    { path: '/', exact: true, name: transKeys.home, component: Dashboard },
    { path: '/dashboard', name: transKeys.dashboard, component: Dashboard } ,
    { path: '/forms/waste_form', name: transKeys.wasteForm, component: wasteForm } ,
    { path: '/forms/order_form', name: transKeys.orderForm, component: orderForm } ,
    { path: '/forms/register_form', name: transKeys.createUser, component: register }   
  ];

