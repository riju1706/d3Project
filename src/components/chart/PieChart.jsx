import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import DropdownComp from "../dropdownComp/DropdownComp";
import "./pieChart.css";

export default function PieChart({ allData }) {
  const [ageGroup, setAgeGroup] = useState("");
  const [data, setData] = useState(allData);
  const [selectValue, setSelectValue] = useState();

  const pieRef = useRef();

  useEffect(() => {
    if (!selectValue) {
      setData(allData);
    }
    renderPieChart(data);
  }, [selectValue, allData, data]);
  // handeler
  const ageGroupHandeler = (e) => {
    setSelectValue(e.target.value);
    if (e.target.value == "20-30") {
      const res = allData.filter((el) => {
        return Number(el.employee_age) <= 30;
      });
      setData(res);
    } else if (e.target.value == "31-40") {
      const res = allData.filter((el) => {
        return Number(el.employee_age) >= 31 && Number(el.employee_age) <= 40;
      });
      setData(res);
    } else if (e.target.value == "41-50") {
      const res = allData.filter((el) => {
        return Number(el.employee_age) >= 41 && Number(el.employee_age) <= 50;
      });
      setData(res);
    } else if (e.target.value == "51-60") {
      const res = allData.filter((el) => {
        return Number(el.employee_age) >= 51 && Number(el.employee_age) <= 60;
      });
      setData(res);
    } else {
      setData(allData);
    }
  };

  const renderPieChart = (data) => {
    const width = 200;
    const height = 200;
    const margin = { top: 5, right: 5, bottom: 5, left: 5 };

    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(pieRef.current)
      .style("overflow", "visible")
      .style("margin-top", "75px");
    svg.attr("transform", `translate(100, 100)`);

    const pie = d3.pie().value((d) => d.employee_age);

    const arc = d3.arc().innerRadius(50).outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arcs = pie(data);

    var path = svg.selectAll("path").data(arcs);
    path
      .join("path")
      .attr("d", arc)
      .transition()
      .attr("fill", (d, i) => color(i));
  };
  return (
    <div>
      <h3 style={{ marginBottom: "2rem" }}>Name vs age pie chart</h3>
      <div className="pieChartContainer">
        <div className="pieChart">
          <select onChange={ageGroupHandeler} value={selectValue}>
            <option value="all">All</option>
            <option value={"20-30"}>20-30</option>
            <option value="31-40">31-40</option>
            <option value="41-50">41-50</option>
            <option value="51-60">51-60</option>
          </select>
          <svg ref={pieRef}></svg>
        </div>
        <DropdownComp user={data} />
      </div>
    </div>
  );
}
