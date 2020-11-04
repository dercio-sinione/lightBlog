import React from 'react';

import {Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined  style={{fontSize: 30}}/>

const PageLoading = () => {
    return (
        <div className='Loadingcenter'>
            <Spin indicator={antIcon} className='LoadingcenterMT'/>
        </div>
    )
}


export default PageLoading;