import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

const height = 450;
const width = 450;
const fontSize = 14;

// d3 functions
let totalPerCategory;
let amountExtent;
const radiusScale = d3.scaleSqrt().range([10, 50])
const simulation = d3.forceSimulation()
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('charge', d3.forceManyBody(20))
  .force('collide', d3.forceCollide(d => radiusScale.domain(amountExtent)(d.amount)))

class BubbleCategory extends Component {

  componentDidMount() {
    this.container = d3.select(this.refs.container)
    this.renderCircles();
    simulation.on('tick', this.forceTick)
    simulation.nodes(totalPerCategory).alpha(0.9).restart()

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
    simulation.nodes(totalPerCategory).alpha(0.9).restart()
  }

  renderCircles = () => {
    // get total sum per category & calculate extent
    const expenses = new Map();
    for (let expense of this.props.expenses) {
      const current = expenses.get(expense.category);
      if (typeof current !== 'undefined') {
        expenses.set(expense.category, current + expense.amount);
      } else {
        expenses.set(expense.category, expense.amount);
      }
    }
    const values = [...expenses.entries()].sort((a, b) => {
      return b[1] - a[1];
    })

    totalPerCategory = values.map(e => {
      return {
        category: e[0],
        amount: e[1]
      }
    })

    // define min + max amount
    amountExtent = d3.extent(totalPerCategory, d => d.amount);
    // const radiusScale = d3.scaleSqrt().domain(amountExtent).range([10, 80])

    // draw payee circles  
    this.circles = this.container.selectAll('circle')
      .data(totalPerCategory, d => d.payee)

    // exit
    this.circles.exit().remove();

    // enter+update
    this.circles = this.circles.enter().append('circle')
      .merge(this.circles)
      .attr('r', d => radiusScale.domain(amountExtent)(d.amount))
      .attr('fill', 'red')
      .attr('opacity', 0.05)
      .attr('class', 'category')
      .on('click', d => console.log(d))
      .on('mouseover', this.mouseOver)
      .on('mouseleave', () => this.hover.style('display', 'none'))
      .style('cursor', 'move')
  }

  mouseOver = (d) => {
    this.hover.style('display', 'block');

    const {category, amount } = d;
    // this.hover.attr('transform', 'translate(' + [x, y + d.radius + fontSize] + ')');
    this.hover.select('text')
      .text(_.map(category.split(' '), _.capitalize).join(' ') + " " + amount + "€")
    const width = this.hover.select('text').node().getBoundingClientRect().width;
    this.hover.select('rect')
      .attr('width', width + 6)
      .attr('x', -width / 2 - 3);
  }

  forceTick = () => {
    this.circles.attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }

  render() {
    return (
      <div>
        <h5>Categories</h5>
        <svg width={width} height={height} ref='container' />
      </div>
    );
  }
}


export default BubbleCategory;