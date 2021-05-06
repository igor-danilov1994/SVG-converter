import * as React from 'react';

type ShowIconType = {
  svgHTML: string;
};

export const ShowIcon: React.FC<ShowIconType> = ({ svgHTML }) => (
  <div style={{ marginLeft: '20px' }} dangerouslySetInnerHTML={{ __html: svgHTML }} />
);
