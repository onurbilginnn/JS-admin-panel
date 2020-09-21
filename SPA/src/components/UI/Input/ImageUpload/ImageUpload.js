import React from 'react';

import ImageUploading from 'react-images-uploading';

import {
  CButton,
  CCardImg,
  CInputGroup
} from '@coreui/react';
import { useTranslation } from 'react-i18next';

import * as transKeys from '../../../../shared/transKeys';

const ImageUpload = props => {
  const { t } = useTranslation();

  return (
    <ImageUploading
      onChange={props.change}
      maxFileSize={props.maxFS}
      acceptType={["jpg", "gif", "png", "jpeg"]}
      onError={props.error}
    >
      {({ imageList, onImageUpload, onImageRemoveAll }) => (
        <CInputGroup>
          {imageList.length === 0 && <CButton color="info"
            variant="outline" className="ml-2" onClick={onImageUpload}>{t(transKeys.uploadImage)}</CButton>}
          {imageList.map((image) => (
            <div className="text-left" key={image.key}>
              <CCardImg className="w-25 m-2" src={image.dataURL} />
              <CButton variant="ghost" className="btn-ghost m-2" color="info" onClick={image.onUpdate}>{t(transKeys.update)}</CButton>
              <CButton variant="ghost" className="btn-ghost" color="danger" onClick={image.onRemove}>{t(transKeys.remove)}</CButton>
              {props.removeAll && onImageRemoveAll()}
            </div>
          ))}
        </CInputGroup>
      )}
    </ImageUploading>
  )
}

export default ImageUpload;