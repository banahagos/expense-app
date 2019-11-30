import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import chroma from 'chroma-js';


const height = 450;
const width = 450;
const radius = 10;
const fontSize = 14;


// d3 functions
let colorScale = chroma.scale(['rgba(83,195,172,0.8)', 'rgba(247, 232, 131, 0.8)', 'rgba(232,81,120,0.8)'])
let amountScale = d3.scaleLog()
const simulation = d3.forceSimulation()
  .force("charge", d3.forceManyBody().strength(-100).distanceMin(100).distanceMax(200))
  // .force("link", d3.forceLink().id(function (d) { return d.index }))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("y", d3.forceY(0.001))
  .force("x", d3.forceX(0.001))
  
              
// // .force('charge', d3.forceManyBody(-1))
// .force('collide', d3.forceCollide(radius))



class BubbleChart extends Component {

  componentDidMount() {
    this.container = d3.select(this.refs.container)

    let amountExtent = d3.extent(this.props.expenses, d => d.amount)
    amountScale.domain(amountExtent)

    this.renderCircles();
    // this.renderLinks()
    simulation.on('tick', this.forceTick)
    simulation.nodes(this.props.expenses).alpha(0.9).restart()



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
    let amountExtent = d3.extent(this.props.expenses, d => d.amount)
    amountScale.domain(amountExtent)

    this.renderCircles();
    // this.renderLinks()
    simulation.on('tick', this.forceTick)
    simulation.nodes(this.props.expenses).alpha(0.9).restart()
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

    const { x, y, payee, amount } = d;
    // this.hover.attr('transform', 'translate(' + [x, y + d.radius + fontSize] + ')');
    this.hover.select('text')
      .text(_.map(payee.split(' '), _.capitalize).join(' ') + " " + amount + "€")
    const width = this.hover.select('text').node().getBoundingClientRect().width;
    this.hover.select('rect')
      .attr('width', width + 6)
      .attr('x', -width / 2 - 3);
  }


  // renderLinks = () => {
  //   // draw the links
  //   this.links = this.container.selectAll('.link')
  //     .data(this.props.expenses, d => d.payee)

  //    // exit
  //    this.links.exit().remove();

  //    this.links = this.links.enter().append('line')
  //    .merge(this.links)
  //    .attr("class", "link")
  // }


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

      // this.links.attr('cx', d => d.x)
      // .attr('cy', d => d.y)

  }


  render() {
    return (
      <div>
        <h5>Transactions</h5>
        <svg width={width} height={height} ref='container' />
      </div>
    );
  }
}

export default BubbleChart;