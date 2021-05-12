import * as React from 'react';

type ShowIconType = {
  svgHTML: string;
};

export const ShowIcon: React.FC<ShowIconType> = ({ svgHTML }) => (
  <div dangerouslySetInnerHTML={{ __html: svgHTML }} />
);
