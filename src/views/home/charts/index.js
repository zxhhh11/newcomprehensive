import React from 'react';
import { Row, Col } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

const Charts = () => {
  // 数据源
  const data = [
    { genre: 'Sports', sold: 275, income: 2300 },
    { genre: 'Strategy', sold: 115, income: 667 },
    { genre: 'Action', sold: 120, income: 982 },
    { genre: 'Shooter', sold: 350, income: 5271 },
    { genre: 'Other', sold: 150, income: 3710 }
  ];

  // 定义度量
  const cols = {
    sold: { alias: '销售量' },
    genre: { alias: '游戏种类' }
  };
  const str = ['we', 'are', 'the', 'black', 'gold', 'team'];
  const mockData = () => {
    const result = [];

    for (let i = 0, len = 6; i < len; i += 1) {
      result.push({
        xAxis: str[i], // x轴数据
        yAxis: Math.floor(Math.random() * 100 + 10) // y轴数据
      });
    }
    return result;
  };
  // 渲染图表
  return (
    <div className='charts-container'>
      <div className='h-charts'>
        <div className='h-charts-part' id='charts1'>
          <Chart data={data} height={400} scale={cols} width={600}>
            <Axis name='genre' title />
            <Axis name='sold' title />
            <Legend dy={-20} position='top' />
            <Tooltip />
            <Geom color='genre' position='genre*sold' type='interval' />
          </Chart>
        </div>
        <div className='h-charts-part'>charts1</div>
        <div className='h-charts-part'>charts1</div>
      </div>
      <Row>
        <Col span={6}>
          <Chart data={mockData()} height={400} width={600}>
            {/* x轴，横轴，以data数据的xAxis属性值为柱子的值 */}
            <Axis name='xAxis' />
            {/* y轴，纵轴，以data数据的yAxis属性值为柱子的值 */}
            <Axis name='yAxis' />
            <Legend dy={-20} position='top' />
            {/* 鼠标hover直方图柱子的时候，tooltip显示的值 */}
            <Tooltip />
            {/* 几何标记对象，主要用以描述你要画的是什么图形（直方图、折线图、饼状图、区域图）：interval是直方图 */}
            <Geom position='xAxis*yAxis' type='interval' />
          </Chart>
        </Col>
        <Col span={8}>col-6</Col>
        <Col span={8}>col-6</Col>
      </Row>
    </div>
  );
};

export default Charts;
