import * as React from 'react';

type ChangeParameterType = {
  changeParameter: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  index: number;
  parameterName: string;
};

export const ChangeParameter: React.FC<ChangeParameterType> = ({
  changeParameter,
  index,
  parameterName,
}) => {
  return (
    <>
      <label>{parameterName}</label>

      <input
        min={0}
        max={10}
        step={0.1}
        type="range"
        // value={value}
        onChange={(e) => changeParameter(e, index)}
      />
    </>
  );
};
