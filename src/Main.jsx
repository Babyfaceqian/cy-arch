import React from 'react';
import { Button } from 'antd';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
TweenOne.plugins.push(Children);

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 12
        };
        this._current = [

        ];
        this.onClick = this.onClick.bind(this);
        this.changeNum = this.changeNum.bind(this);
    }
    componentDidMount() {
        // this.renderTriangle();
        this.renderRing([0, 0]);
    }

    onClick() {
        this.renderRing([Math.random() * 20, Math.random() * 20]);
    }

    changeNum() {
        this.setState({ value: Math.random() * 100 });
    }

    renderTriangle() {
        d3.select('#rect').append('rect')
            .attr('id', 'myrect')
            .attr('width', '100px')
            .attr('height', '100px');
        d3.select('#myrect')
            .style('border-radius', '10px');
    }
    renderRing(dataset) {
        d3.selectAll('svg').remove();
        //(1)转化数据为适合生成饼图的对象数组
        var pie = d3.pie(dataset).sort(null);
        console.log(pie);
        var h = 300;
        var w = 300;

        var outerRadius = w / 2;//外半径

        //(7)圆环内半径
        var innerRadius = w / 2 - 30;

        //(2)用svg的path绘制弧形的内置方法
        var arc = d3.arc()//设置弧度的内外径，等待传入的数据生成弧度
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)
            .cornerRadius(50)
            .padAngle(0.1);

        var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

        //(3)颜色函数
        var color = ['blue', 'red'];//创建序数比例尺和包括10中颜色的输出范围

        //(4)准备分组,把每个分组移到图表中心
        var arcs = svg.selectAll('g.arc')
            .data(pie(dataset))
            .enter()
            .append('g')
            .attr('class', 'arc')
            //移到图表中心
            .attr('transform', 'translate(' + outerRadius + ',' + outerRadius + ')');//translate(a,b)a表示横坐标起点，b表示纵坐标起点

        //(5)为组中每个元素绘制弧形路路径
        let _this = this;
        arcs.append('path')//每个g元素都追加一个path元素用绑定到这个g的数据d生成路径信息
            .attr('fill', function (d, i) {//填充颜色
                return color[i];
            })
            .transition()
            .duration(1000)
            .attrTween('d', (d, key) => {
                _this._current[key] = _this._current[key] || d;
                let i = d3.interpolate(_this._current[key], d);
                _this._current[key] = d;
                return (t) => {
                    d = i(t);
                    return arc(d);
                };
            });//将角度转为弧度（d3使用弧度绘制）

        //(6)为组中每个元素添加文本
        arcs.append('text')//每个g元素都追加一个path元素用绑定到这个g的数据d生成路径信息
            .attr('transform', function (d) {
                return 'translate(' + arc.centroid(d) + ')';//计算每个弧形的中心点（几何中心）
            })
            .attr('text-anchor', 'middle')
            .text(function (d) {
                return d.value;//这里已经转为对象了
            });
    }
    render() {

        return (
            <div className='bg'>
                <TweenOne animation={{
                    Children: { value: this.state.value || 10000, floatLength: 0 },
                    duration: 1000
                }}

                >0</TweenOne>
                <button onClick={this.changeNum}>Change Number</button>
                <button onClick={this.onClick}>Change</button>
            </div>
        );
    };
}