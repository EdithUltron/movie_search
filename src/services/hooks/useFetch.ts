import { useState, useEffect } from 'react';

function useLazyFetchImage(url:string,id:string) {
  const [imageData, setImageData] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    const handleLoading = (val:boolean) => {
        setIsLoading(val);
    }

    const handleImageData = (data:string) => {
        setImageData(data);
    }
    
  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
        handleLoading(true);

      try {
        const imageUrl = new URL(url+id);
        const response = await fetch(imageUrl);

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64data = reader.result as string;
          handleImageData(base64data);
        };

        reader.readAsDataURL(blob);
      } catch (error:any) {
        setError(error.message);
      } finally {
        handleLoading(false);
      }
    };

    if (isMounted && id) {
      fetchImage();
    }

    return () => {
      isMounted = false;
    };
  }, [url,id]);

  return { imageData, isLoading, error };
}

export default useLazyFetchImage;