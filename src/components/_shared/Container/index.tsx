import React from 'react';

import Props from '@/interfaces/DefaultProps';

import './index.scss';

export const Container: React.FC<Props> = ({ children }) => {
    return <div className="container">{children}</div>;
};
