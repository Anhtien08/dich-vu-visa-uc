import { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [retryStage, setRetryStage] = useState(0);

  // Sync state if src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setRetryStage(0);
  }, [src]);

  const handleError = () => {
    // Stage 1: If URL has /src/assets/images/, fallback to /assets/images/
    if (retryStage === 0 && currentSrc.includes('/src/assets/images/')) {
      setRetryStage(1);
      setCurrentSrc(currentSrc.replace('/src/assets/images/', '/assets/images/'));
      return;
    }

    // Stage 2: If URL has /assets/aistudio/, try /images/ with simple filename
    if (retryStage === 0 && currentSrc.includes('/assets/aistudio/')) {
      setRetryStage(1);
      const filename = currentSrc.split('/').pop() || '';
      setCurrentSrc(`/images/${filename}`);
      return;
    }

    // Stage 3: If still failing and relative path is missing leading dot or slash
    if (retryStage === 1 && currentSrc.startsWith('/')) {
      setRetryStage(2);
      setCurrentSrc(currentSrc.slice(1));
      return;
    }

    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-[#EEF2FF] to-slate-200 text-slate-600 p-6 text-center ${className}`}
      >
        <Building2 className="w-8 h-8 text-[#1B1E78] mb-2" strokeWidth={1.75} />
        <span className="text-sm font-semibold text-slate-800">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
    />
  );
}
