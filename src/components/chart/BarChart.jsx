import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import "./barChart.css";

const BarChart = ({ data }) => {
  const barRef = useRef();

  useEffect(() => {
    renderBarChart(data);
  }, [data]);

  const renderBarChart = (data) => {
    // D3 Bar Chart implementation
    // Visualize employee salary distribution
    const margin = { top: 25, right: 5, bottom: 25, left: 10 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.bottom - margin.top;

    const svg = d3
      .select(barRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("overflow", "visible")

      // .style("overflow", "visible")
      .style("margin-top", "75px");
    svg.selectAll("*").remove();

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.employee_name))
      .range([margin.left, width - margin.right])
      .padding(0.1);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.employee_salary)])
      .nice()
      .range([height - margin.bottom, margin.top]);
    svg.append("g").attr("class", "myYaxis").call(d3.axisLeft(y));

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.employee_name))
      .transition()
      .ease(d3.easeCircleInOut)
      .duration(500)

      .attr("y", (d) => y(d.employee_salary))
      .attr("height", (d) => height - margin.bottom - y(d.employee_salary))
      .attr("width", x.bandwidth())
      .attr("fill", "#3498db");
  };

  return (
    <div className="barContainer">
      <h3>Name vs Salary chart</h3>
      <svg ref={barRef}></svg>
    </div>
  );
};

export default BarChart;
