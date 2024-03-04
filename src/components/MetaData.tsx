import { FC } from 'react';
import { Helmet } from 'react-helmet-async';


const MetaData: FC<{ title: string }> = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} | 1128 TUPT `}</title>
        </Helmet>
    );
};

export default MetaData;
