import React, { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EFE9DF] via-[#E5DCCD] to-[#D6C8B4] text-[#6E563E] p-4 text-center ${className}`}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70 mb-1.5"
        >
          <path d="M18 3a3 3 0 0 0-3 3v1a2 2 0 0 1-2 2H9.5a4.5 4.5 0 0 0-4.5 4.5V19h14v-6a7 7 0 0 0-1-3.6V6a3 3 0 0 0-3-3Z" />
          <path d="M9 19v2" />
          <path d="M15 19v2" />
        </svg>
        {fallbackLabel && (
          <span className="text-[11px] font-medium leading-tight opacity-80">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
