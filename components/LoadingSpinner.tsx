
import React from 'react';

// FIX: Changed component type from React.FC to `() => JSX.Element` to resolve an error
// where the `children` prop was being incorrectly required. This component does not take children.
const LoadingSpinner = (): JSX.Element => {
  return (
    <svg
      className="animate-spin h-10 w-10 text-secondary-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default LoadingSpinner;
