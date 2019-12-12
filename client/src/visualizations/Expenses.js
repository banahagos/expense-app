import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

const height = 650;
const dayHeight = 75;
const margin = { left: 40, top: 20, right: 40, bottom: 20 };
const topPadding = 150;
const radius = 8;
const fontSize = 14;

// d3 functions
const xScale = d3.scaleLinear().domain([0, 6]);
const yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);
const amountScale = d3.scaleLinear().range([radius, 3 * radius]);
const simulation = d3.forceSimulation()
  .alphaDecay(0.001) // 0.001
  .velocityDecay(0.6) // 0.3
  .force('collide', d3.forceCollide(d => d.radius + 2))
  .force('x', d3.forceX(d => d.focusX))
  .force('y', d3.forceY(d => d.focusY))
  // .stop();


class Expenses extends Component {

  componentDidMount() {
    xScale.range([margin.left, this.props.width - margin.right]);
    simulation.on('tick', this.forceTick);

    this.container = d3.select(this.refs.container).append('g');
    this.hover = d3.select(this.refs.container).append('g');
    this.hover.append('rect')
      .attr('height', fontSize + 4)
      .attr('y', -fontSize / 2 - 2)
      .attr('opacity', 0.85)
      .attr('fill', this.props.colors.white);
    this.hover.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', this.props.colors.black)
      .style('font-size', fontSize)
      .style('pointer-events', 'none');

    this.calculateData();
    this.renderCircles();

    simulation.nodes(this.props.expenses).alpha(0.9).restart();
  }

  componentDidUpdate() {
    this.calculateData();
    this.renderCircles();

    simulation.nodes(this.props.expenses).alpha(0.9).restart();
  }

  calculateData = () => {
    const weeksExtent = d3.extent(this.props.expenses,
      d => d3.timeWeek.floor(new Date(d.dateOfExpense))); // return min & max date
    yScale.domain(weeksExtent);
    const amountExtent = d3.extent(this.props.expenses, d => d.amount);
    amountScale.domain(amountExtent);


    this.expenses = _.chain(this.props.expenses)
      .groupBy(d => d3.timeWeek.floor(new Date(d.dateOfExpense)))
      // .filter((d) => d3.timeWeek.floor(new Date(d[0].dateOfExpense)).getTime() === this.props.selectedWeek.getTime())
      .map((expenses, week) => {
        week = new Date(week);
        return _.map(expenses, exp => {
          const { x, y } = this.calculateDayPosition(new Date(exp.dateOfExpense), true);
          return Object.assign(exp, {
            radius: amountScale(exp.amount),
            focusX: x,
            focusY: y,
            x: exp.x || x,
            y: exp.y || y,
            dateOfExpense: new Date(exp.dateOfExpense)
          });
        });
      }).flatten().value()

    // get min+max dates
    // const [minDate, maxDate] = d3.extent(this.props.expenses,
    //   d => d3.timeDay.floor(new Date(d.dateOfExpense)));
    // calculate all potential dates to drag expenses into
    // const selectedWeek = d3.timeDay.range(this.props.selectedWeek,
    //   d3.timeWeek.offset(this.props.selectedWeek, 1));
    // this.days = _.chain(selectedWeek)
    //   .map(date => Object.assign(this.calculateDayPosition(date, true), { date }))
    //   .union(_.map(d3.timeDay.range(minDate, maxDate),
    //     (date) => Object.assign(this.calculateDayPosition(date), { date })))
    //   .value();
  }

  calculateDayPosition = (date, shouldSelectedWeekCurve) => {
    const dayOfWeek = date.getDay();
    const week = d3.timeWeek.floor(date);
    const x = xScale(dayOfWeek);
    let y = yScale(week) + height + 2 * dayHeight;


    if (shouldSelectedWeekCurve &&
      week.getTime() === this.props.selectedWeek.getTime()) {
      const offset = Math.abs(3 - dayOfWeek);
      y = height - 2 * dayHeight - 0.5 * offset * dayHeight;
    }
    y += topPadding;

    return { x, y };
  }

  renderCircles = () => {
    // draw expenses circles   
    this.circles = this.container.selectAll('.expense')
      .data(this.expenses, d => d._id);

    // exit
    this.circles.exit().remove();

    // enter+update
    this.circles = this.circles.enter().append('circle')
      .classed('expense', true)
      .attr('id', this.props.expenses._id) 
      .attr('fill', 'white')
      .style('cursor', 'move')
      .on('mouseover', this.mouseOver)
      .on('mouseleave', () => this.hover.style('display', 'none'))
      .on('click', this.clickExpense )
      .merge(this.circles)
      .attr('r', d => d.radius)
      .attr('stroke', d => d.categories ? this.props.colors.black : '');
  }

  forceTick = () => {
    this.circles.attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }


  mouseOver = (d) => {
    // if (this.dragging) return;
    this.hover.style('display', 'block');

    const { x, y, payee, amount } = d;
    this.hover.attr('transform', 'translate(' + [x, y + d.radius + fontSize] + ')');
    this.hover.select('text')
      .text(_.map(payee.split(' '), _.capitalize).join(' ') + " " + amount.toFixed(2) + "€");
    const width = this.hover.select('text').node().getBoundingClientRect().width;
    this.hover.select('rect')
      .attr('width', width + 6)
      .attr('x', -width / 2 - 3);
  }

  clickExpense = d => {
    this.props.getEditObject(d)
    this.props.handleEditFormVisibility()
  }

  render() {
    return (
      <g ref='container' />
    );
  }
}

export default Expenses;
