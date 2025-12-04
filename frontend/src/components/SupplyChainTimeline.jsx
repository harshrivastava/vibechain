import React from "react";

export default function SupplyChainTimeline({ stages }) {
    if (!stages || stages.length === 0) return null;

    return (
        <div style={{ marginTop: "30px", textAlign: "left" }}>
            <h3>📦 Supply Chain Journey</h3>
            <div style={{
                borderLeft: "2px solid #0f62fe",
                paddingLeft: "20px",
                marginLeft: "10px",
                marginTop: "15px"
            }}>
                {stages.map((stage, index) => (
                    <div key={index} style={{ position: "relative", marginBottom: "20px" }}>
                        {/* Dot */}
                        <div style={{
                            position: "absolute",
                            left: "-26px",
                            top: "0",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: "#0f62fe",
                            border: "2px solid white"
                        }}></div>

                        <h4 style={{ margin: "0 0 5px 0" }}>{stage.title}</h4>
                        <p style={{ margin: "0", fontSize: "0.9em", color: "#666" }}>{stage.date}</p>
                        <p style={{ margin: "5px 0 0 0", fontSize: "0.95em" }}>{stage.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
