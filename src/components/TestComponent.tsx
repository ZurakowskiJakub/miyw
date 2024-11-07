"use client";

import ForceGraph from "@/components/ForceGraph";
import { miserables } from "@/data/miserables";
import { useEffect, useRef } from "react";

export const TestComponent = () => {
    const svgRef = useRef(null);

    const chart = ForceGraph(miserables, {
        nodeId: (d) => d.id,
        nodeGroup: (d) => d.group,
        nodeTitle: (d) => `${d.id}\n${d.group}`,
        linkStrokeWidth: (l) => Math.sqrt(l.value),
        width: 1200,
        height: 600,
        invalidation: null, // a promise to stop the simulation when the cell is re-run
    });

    useEffect(() => {
        if (svgRef.current) {
            if (svgRef.current.firstChild) {
                svgRef.current.replaceChild(chart, svgRef.current.firstChild);
            } else {
                svgRef.current.appendChild(chart);
            }
        }
    }, []);

    return <div ref={svgRef}></div>;
};
