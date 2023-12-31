import { useState, ChangeEvent } from 'react';
import Compressor from 'compressorjs';
import defaultAvatar from '../assets/defaultavatar.png';

interface ImageCompressionOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

const useChangeImage = (options: ImageCompressionOptions = {}) => {
  const [imagePreview, setImagePreview] = useState<string>(defaultAvatar);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);

  const compressImage = (file: File) => {
    new Compressor(file, {
      quality: options.quality || 0.6,
      maxWidth: options.maxWidth || 800,
      maxHeight: options.maxHeight || 800,
      success(result) {
        const compressedFile = new File([result], file.name, { type: file.type });
        setImagePreview(URL.createObjectURL(compressedFile));
        setCompressedImage(compressedFile);
      },
      error(err: Error) {
        console.error('Image compression error:', err);
      },
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'avatar') {
      const file = e.target.files && e.target.files[0];
      if (file) {
        compressImage(file);
      }
    }
  };

  return {
    imagePreview,
    compressedImage,
    handleImageChange,
  };
};

export default useChangeImage;
