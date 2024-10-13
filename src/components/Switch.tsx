import React from 'react';

interface SwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ enabled, onChange }) => {
  return (
    <button
      className={`${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
      onClick={() => onChange(!enabled)}
    >
      <span className="sr-only">Enable setting</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </button>
  );
};