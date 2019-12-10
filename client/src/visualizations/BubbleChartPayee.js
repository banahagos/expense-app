import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import chroma from 'chroma-js';


const height = 450;
const width = 450;
const radius = 10;
const fontSize = 14;
let totalPerPayee;


// d3 functions
let colorScale = chroma.scale(['rgba(83,195,172,0.8)', 'rgba(247, 232, 131, 0.8)', 'rgba(232,81,120,0.8)'])
let amountScale = d3.scaleLog()
const simulation = d3.forceSimulation()
  .force("charge", d3.forceManyBody().strength(-100).distanceMin(100).distanceMax(200))
  // .force("link", d3.forceLink().id(function (d) { return d.index }))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("y", d3.forceY(0.001))
  .force("x", d3.forceX(0.001))
  

class BubbleChartPayee extends Component {

  componentDidMount() {
    this.container = d3.select(this.refs.container)
  
    this.renderCircles();
    simulation.on('tick', this.forceTick)
  
    // this.container = d3.select(this.refs.container).append('g');
    this.hover = d3.select(this.refs.container).append('g');
    this.hover.append('text')
      // .attr('text-anchor', 'right')
      .attr('dy', '.90em') // .35
      .attr('dx', '12em')
      .attr('fill', 'grey')
      .style('font-size', fontSize)
      .style('pointer-events', 'none');
  }

  componentDidUpdate() {

    this.renderCircles();
    simulation.on('tick', this.forceTick)
    simulation.nodes(totalPerPayee).alpha(0.9).restart()
  }


  renderCircles = () => {
      // get total sum per payee & calculate extent
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
  
      totalPerPayee = values.map(e => {
        return {
          payee: e[0],
          amount: Math.round(e[1] * 100)/100
        }
      })

      //  define min + max amount
    let amountExtent = d3.extent(totalPerPayee, d => d.amount);
    amountScale = amountScale.domain(amountExtent)

    // draw circles  
    this.circles = this.container.selectAll('circle')
      .data(totalPerPayee, d => d.payee)
                 

    // exit
    this.circles.exit().remove();

    // enter+update
    this.circles = this.circles.enter().append('circle')
      .merge(this.circles)
      .attr('r', radius)
      .attr('fill', d => colorScale(amountScale(d.amount)))
      .attr('class', 'transaction')
      .on('mouseover', this.mouseOver)
      .on('mouseleave', () => this.hover.style('display', 'none'))
      .style('cursor', 'move')
      .call(d3.drag()
      .on("start", this.dragstarted)
      .on("drag", this.dragged)
      .on("end", this.dragended));
  }

  mouseOver = (d) => {
    this.hover.style('display', 'block');

    const { payee, amount } = d;
    // this.hover.attr('transform', 'translate(' + [x, y + d.radius + fontSize] + ')');
    this.hover.select('text')
      .text(_.map(payee.split(' '), _.capitalize).join(' ') + " " + amount + "€")
    const width = this.hover.select('text').node().getBoundingClientRect().width;
    this.hover.select('rect')
      .attr('width', width + 6)
      .attr('x', -width / 2 - 3);
  }


  dragstarted = (d) => {
    if (!d3.event.active) simulation.alphaTarget(0.5).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended = (d) => {
    if (!d3.event.active) simulation.alphaTarget(0.5);
    d.fx = null;
    d.fy = null;
  }

  forceTick = () => {
    this.circles.attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }


  render() {
    return (
      <div>
        <h5 style={{textAlign: 'center', padding: '10px'}}>Total per Payee</h5>
        <svg width={width} height={height} ref='container' />
      </div>
    );
  }
}

export default BubbleChartPayee;