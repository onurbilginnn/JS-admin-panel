import React from 'react'
import { CFooter } from '@coreui/react';
import { useTranslation } from 'react-i18next';

import * as transKeys from '../../../shared/transKeys';

const TheFooter = () => {
  const { t } = useTranslation();

  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://www.darphane.gov.tr/" target="_blank" rel="noopener noreferrer">{t(transKeys.mint)}</a>
        <span className="ml-1">&copy; 2020</span>
      </div>
      {/* <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://www.sicpaturkey.com.tr/" target="_blank" rel="noopener noreferrer">Sicpa Turkey</a>
      </div> */}
    </CFooter>
  )
}

export default React.memo(TheFooter)
