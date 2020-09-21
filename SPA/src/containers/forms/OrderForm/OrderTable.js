import React from 'react';

import {
    CBadge,
    CDataTable
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import * as transKeys from '../../../shared/transKeys';

const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}

const OrderTable = () => {
    const { t } = useTranslation();

    const tableFields = [t(transKeys.action),
        'GTIP',
        t(transKeys.prodBandRef),
        t(transKeys.packType),
        t(transKeys.bandType),
        t(transKeys.initialQty),
        t(transKeys.unAppBandStockQty),
        t(transKeys.bandAppProdStockQtyProdSite),
        t(transKeys.bandAppProdQtyConsin),
        t(transKeys.bandAppProdQtyMarkSales),
        t(transKeys.bandAppProdQtyKVK),
        t(transKeys.codesQty),
        t(transKeys.price)];
        
    return (
        <CDataTable items={[{Action: "AAA", GTIP: "RRR"}]}
            fields={tableFields}
            hover
            striped
            bordered
            size="sm"
            scopedSlots={{
                'status':
                    (item) => (
                        <td>
                            <CBadge color={getBadge(item.status)}>
                                {item.status}
                            </CBadge>
                        </td>
                    )
            }}
        />
    )
}

export default OrderTable;