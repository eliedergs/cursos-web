import { Typography } from '@mui/material';

import './index.scss';

type Props = {
    title: any;
    subtitle: any;
};

export const DataItem = ({ title, subtitle }: Props) => {
    return (
        <div className="data-item-container">
            <Typography fontSize={14} fontWeight="bold">
                {title}
            </Typography>
            <Typography fontSize={14}>{subtitle}</Typography>
        </div>
    );
};
