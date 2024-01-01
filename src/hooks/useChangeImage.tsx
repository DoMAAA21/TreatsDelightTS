import { useState, ChangeEvent } from 'react';
import Compressor from 'compressorjs';



const useChangeImage = ( img:string) => {
  const [imagePreview, setImagePreview] = useState<string>(img);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);

  const compressImage = (file: File) => {
    new Compressor(file, {
      quality:  0.6,
      maxWidth:  800,
      maxHeight: 800,
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
    if (e.target.name === 'image') {
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
    setImagePreview
  };
};

export default useChangeImage;
