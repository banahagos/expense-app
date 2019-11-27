import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import chroma from 'chroma-js'

const height = 450;
const width = 450;
const radius = 10;
const fontSize = 14;


// d3 functions
let colorScale = chroma.scale(['rgba(83,195,172,0.8)', 'rgba(247, 232, 131, 0.8)', 'rgba(232,81,120,0.8)'])
let amountScale = d3.scaleLog()
const simulation = d3.forceSimulation()
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('charge', d3.forceManyBody(-10))
  .force('collide', d3.forceCollide(radius))
  .stop()

class BubbleChart extends Component {

  componentDidMount() {
    this.container = d3.select(this.refs.container)
    this.renderCircles();
    simulation.on('tick', this.forceTick)
    simulation.nodes(this.props.expenses).alpha(0.9).restart()

    let amountExtent = d3.extent(this.props.expenses, d => d.amount)
    amountScale.domain(amountExtent)

    // this.container = d3.select(this.refs.container).append('g');
    this.hover = d3.select(this.refs.container).append('g');
    this.hover.append('rect')
      .attr('height', fontSize + 4)
      .attr('y', -fontSize / 2 - 2)
      .attr('opacity', 0.85)
      .attr('fill', 'white');
    this.hover.append('text')
      .attr('text-anchor', 'right')
      .attr('dy', '.90em') // .35
      .attr('fill', 'black')
      .style('font-size', fontSize)
      .style('pointer-events', 'none');
  }

  componentDidUpdate() {
    this.renderCircles();
    simulation.on('tick', this.forceTick)
    simulation.nodes(this.props.expenses).alpha(0.9).restart()

    let amountExtent = d3.extent(this.props.expenses, d => d.amount)
    amountScale.domain(amountExtent)
  }


  renderCircles = () => {
    // draw payee circles  
    this.circles = this.container.selectAll('circle')
      .data(this.props.expenses, d => d.payee)

    // exit
    this.circles.exit().remove();

    // enter+update
    this.circles = this.circles.enter().append('circle')
      .merge(this.circles)
      .attr('r', radius)
      .attr('fill', d => colorScale(amountScale(d.amount)))
      .on('mouseover', this.mouseOver)
  }

  mouseOver = (d) => {
    this.hover.style('display', 'block');

    const { x, y, payee, amount } = d;
    this.hover.attr('transform', 'translate(' + [x, y + d.radius + fontSize] + ')');
    this.hover.select('text')
      .text(_.map(payee.split(' '), _.capitalize).join(' ') + " " + amount + "€")
    const width = this.hover.select('text').node().getBoundingClientRect().width;
    this.hover.select('rect')
      .attr('width', width + 6)
      .attr('x', -width / 2 - 3);


  }

  forceTick = () => {
    this.circles.attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }

  getTotalPayee = () => {
    const expenses = new Map();
    for (let expense of this.props.expenses) {
      const current = expenses.get(expense.payee);
      if (typeof current !== 'undefined') {
        expenses.set(expense.payee, current + expense.amount);
      } else {
        expenses.set(expense.payee, expense.amount);
      }
    }
    const values = [...expenses.entries()].sort((a, b) => {
      return b[1] - a[1];
    });

    const valuesObj = values.map(e => {
      return { payee: e[0], amount: e[1] }
    })
    return valuesObj
  }



  // getExtent = () => {
  //   const amountExtent = d3.extent(this.getTotalPayee(), d => d.amount)
  //   colorScale.domain(amountExtent)
  // }


  render() {
    return (
      <svg width={width} height={height} ref='container' />
    );
  }
}

export default BubbleChart;
