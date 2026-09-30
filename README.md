# AI-Powered Smart Additive Manufacturing Lab Monitoring & Management System

> **Engineering College Project Prototype — Version 2.4 IoT + AI Engine**

---

## 📌 Project Overview

The **Smart Additive Manufacturing Lab Monitoring & Management System** is a professional industrial web application designed for college 3D printing and additive manufacturing laboratories. 

It eliminates the requirement for students and faculty to physically visit the laboratory to check machine availability, print progress, parameter configurations (infill density, layer height, material), and machine queues.

---

## 🚀 Key Modules & Architecture

```
3D Printers (AM-01 to AM-08)
         ↓
IoT Machine Telemetry Layer (Virtual Sensor Stream / OctoPrint API)
         ↓
Central State Database
         ↓
AI Analysis Engine (Optimizer + Defect Risk + Machine Recommendation + Predictive Health)
         ↓
Web Application (Responsive Industrial Dashboard)
         ↓
Students & Laboratory Administrators
```

---

## 🌟 Core Features Included

1. **Smart AM Lab Control Center (Dashboard)**:
   - Summary cards: Total Printers (8), Available (3), Printing (4), Maintenance (1), Active Jobs (4), Queue Length (7), Today's Prints (18), AI Alerts (3).
   - Real-time printer status list (🟢 AM-01 Available, 🔴 AM-02 Printing 67%, 🟡 AM-04 Maintenance, etc.).

2. **Live Printer Monitoring**:
   - Interactive card grid for every printer (AM-01 to AM-08) with real-time temperature, material loaded, nozzle/bed temperatures, progress %, remaining minutes, current layer / total layers, infill %, infill angle, pattern, layer height, and extrusion speed.

3. **Printer Detail Telemetry Page**:
   - Real-time Chart.js telemetry charts for Nozzle & Bed temperature streams and Extrusion Speed per layer.
   - Interactive 3D Toolpath Extruder Visualizer simulating real-time layer-by-layer G-Code toolpath extrusion.

4. **Print Job Management & Smart Queue**:
   - Table of all 15 sample print jobs with filtering by Printer, Status, Material, and Search query.
   - **AI Queue Optimizer**: Re-orders pending jobs based on material batching (e.g. PETG grouping) and priority to reduce cleanup downtime.

5. **AI Print Parameter Optimizer**:
   - Dynamic recommendation of Infill Density %, Infill Angle, Pattern, Layer Height, Speed, Nozzle Temp, Print Time (e.g., 2h 18m), Material Weight (e.g., 86g), Cost (₹172), and AI rationale explanation.

6. **AI Print Failure Risk Analyzer**:
   - Visual defect risk meter % gauge (e.g., 18% LOW RISK vs 68% HIGH RISK) with check findings and actionable AI recommendations.

7. **AI Smart Printer Selection Engine**:
   - Recommends optimal machine (AM-05) based on current wait time, material specs, and build volume.

8. **AI Predictive Maintenance & Machine Health**:
   - Machine health score % meters, operating hours, error counts, and predictive maintenance advisories.

9. **AM Copilot (Floating AI Chatbot Assistant)**:
   - Context-aware chatbot answering queries like "Which printer is free for PETG?", "What infill should I use for a gear?", and "Why is AM-04 under maintenance?".

10. **Automated ▶ START AI DEMO**:
    - 17-step automated presentation walkthrough with play/pause/skip/exit controls and celebratory confetti.

11. **Presentation Mode**:
    - High-visibility fullscreen presentation mode designed for demonstrating to project judges on a projector.

---

## 🛠️ How to Launch & Demonstrate

1. Open `index.html` directly in any web browser (Chrome, Edge, Firefox, Safari).
2. Click **`▶ START AI DEMO`** at the top right of the navigation header for an automated 2-minute project walkthrough.
3. Switch roles between **Student** (Alex Rivera) and **Lab Administrator** (Dr. H. Vance) using the top-right profile selector.
4. Click **Presentation Mode** for projector viewing.

---

## 🔌 Future Physical IoT Integration Roadmap

To connect this prototype to real physical 3D printers in the laboratory:

```
[ 3D Printers (Creality/Prusa/Bambu) ]
                ↓ (USB / Serial / Klipper G-Code)
[ Raspberry Pi / ESP32 running OctoPrint / Moonraker ]
                ↓ (REST API / WebSocket Telemetry)
[ Cloud Node.js / Python MQTT Broker ]
                ↓
[ Smart AM Lab Web Portal & AI Engine ]
```

---

## 🎓 Academic Presentation Summary

- **Domain**: Additive Manufacturing, Industrial IoT, AI Decision Systems.
- **Technology Stack**: HTML5, Tailwind CSS, JavaScript (ES6+), Chart.js, Lucide Icons, Canvas API, Confetti.js.
- **Simulation Badge**: All live telemetry streams are clearly labeled with `SIMULATION MODE`.
