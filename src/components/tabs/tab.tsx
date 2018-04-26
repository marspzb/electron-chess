import * as React from 'react';
export const Tab = (props: { default?: boolean; children: any; title: string; onSelect: () => {} }) => {
  return <div className="tab-content">{props.children}</div>;
};
