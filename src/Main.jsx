import React from 'react';
import { Table } from 'antd';
import * as styles from './Main.less';

// import d3 from 'd3';
const COLUMNS = [
    {
        key: 'a',
        title: 'a',
        dataIndex: 'a'
    },
    {
        key: 'b',
        title: 'b',
        dataIndex: 'a'
    }
];
export default class Main extends React.Component {

    render() {
        const data = [
            {
                id: 1,
                a: 111111,
                b: 22222
            },
            {
                id: 2,
                a: 111111,
                b: 22222
            }
        ];
        return (
            <div className={styles.bg}>
                <Table
                    columns={COLUMNS}
                    rowKey={(record) => record.id}
                    dataSource={data}
                />
            </div>
        );
    };
}