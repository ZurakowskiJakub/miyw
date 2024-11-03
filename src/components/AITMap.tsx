"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface INodes {
    id: number;
    name: string;
}

interface ILinks {
    source: number;
    target: number;
}

interface IData {
    nodes: Array<INodes>;
    links: Array<ILinks>;
}

export const AITMap = () => {
    const ref = useRef(null);

    useEffect(() => {
        // set the dimensions and margins of the graph
        const margin = { top: 10, right: 30, bottom: 30, left: 40 },
            width = 400 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3
            .select("#aitMap")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        d3.json(
            "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json"
        ).then(
            // @ts-expect-error d3 doesn't provide great typing
            (data: IData) => {
                // Initialize the links
                const link = svg
                    .selectAll("line")
                    .data(data.links)
                    .join("line")
                    .style("stroke", "#aaa");

                // Initialize the nodes
                const node = svg
                    .selectAll("circle")
                    .data(data.nodes)
                    .join("circle")
                    .attr("r", 20)
                    .style("fill", "#69b3a2");

                // Let's list the force we wanna apply on the network
                d3
                    // @ts-expect-error d3 doesn't provide great typing
                    .forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
                    .force(
                        "link",
                        d3
                            .forceLink() // This force provides links between nodes
                            .id((d: d3.SimulationNodeDatum) => {
                                return d.id;
                            }) // This provide  the id of a node
                            .links(data.links) // and this the list of links
                    )
                    .force("charge", d3.forceManyBody().strength(-400)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
                    .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
                    .on("end", ticked);

                // This function is run at each iteration of the force algorithm, updating the nodes position.
                function ticked() {
                    link.attr("x1", function (d) {
                        return d.source.x;
                    })
                        .attr("y1", function (d) {
                            return d.source.y;
                        })
                        .attr("x2", function (d) {
                            return d.target.x;
                        })
                        .attr("y2", function (d) {
                            return d.target.y;
                        });

                    node.attr("cx", function (d) {
                        return d.x + 6;
                    }).attr("cy", function (d) {
                        return d.y - 6;
                    });
                }
            }
        );
    }, []);

    return <svg width={460} height={400} id="aitMap" ref={ref} />;
};
