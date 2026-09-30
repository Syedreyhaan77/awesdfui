/**
 * SMART AM LAB — AI-Powered Additive Manufacturing Laboratory Monitoring & Management Platform
 * Complete Prototype JavaScript Application State & Logic Engine
 */

// ==========================================
// 1. GLOBAL SYSTEM DATABASE & STATE
// ==========================================

let currentUser = {
  id: "2026-AM-042",
  name: "Alex Rivera",
  role: "student", // 'student' or 'admin'
  department: "Mechanical & Aerospace Engineering"
};

let currentView = 'dashboard';
let isSimulationMode = true;
let isPresentationMode = false;
let isDemoRunning = false;
let demoStep = 0;
let demoTimer = null;
let demoPaused = false;
let activeDetailPrinterId = 'AM-02';

// 8 Simulated 3D Printers
let printers = [
  {
    id: "AM-01",
    name: "Prusa i3 MK3S+",
    model: "Prusa i3 MK3S+",
    manufacturer: "Prusa Research",
    buildVolume: "250 x 210 x 210 mm",
    materials: ["PLA", "PETG", "TPU"],
    maxTemp: "300°C",
    status: "AVAILABLE", // AVAILABLE, PRINTING, MAINTENANCE, OFFLINE
    currentUser: "None",
    currentJob: "None",
    material: "PLA",
    nozzleTemp: 22,
    targetNozzleTemp: 0,
    bedTemp: 22,
    targetBedTemp: 0,
    progress: 0,
    remainingMinutes: 0,
    currentLayer: 0,
    totalLayers: 0,
    infillDensity: "0%",
    infillAngle: "45°",
    infillPattern: "None",
    layerHeight: "0.20 mm",
    printSpeed: "0 mm/s",
    operatingHours: 1420,
    completedPrints: 184,
    healthScore: 94,
    lastMaintenance: "2026-09-12",
    nextMaintenance: "2026-10-15",
    errorCount: 2,
    issue: "None"
  },
  {
    id: "AM-02",
    name: "Bambu Lab X1-Carbon",
    model: "X1-Carbon Combo",
    manufacturer: "Bambu Lab",
    buildVolume: "256 x 256 x 256 mm",
    materials: ["PLA", "ABS", "PETG", "TPU", "Carbon Fiber"],
    maxTemp: "300°C",
    status: "PRINTING",
    currentUser: "Student 24",
    currentJob: "Gear Housing V3",
    material: "PLA",
    nozzleTemp: 205,
    targetNozzleTemp: 205,
    bedTemp: 60,
    targetBedTemp: 60,
    progress: 67,
    remainingMinutes: 42,
    currentLayer: 214,
    totalLayers: 320,
    infillDensity: "35%",
    infillAngle: "45°",
    infillPattern: "Gyroid",
    layerHeight: "0.20 mm",
    printSpeed: "120 mm/s",
    operatingHours: 980,
    completedPrints: 240,
    healthScore: 98,
    lastMaintenance: "2026-09-20",
    nextMaintenance: "2026-11-01",
    errorCount: 1,
    issue: "None"
  },
  {
    id: "AM-03",
    name: "Ultimaker S5 Dual",
    model: "Ultimaker S5",
    manufacturer: "Ultimaker",
    buildVolume: "330 x 240 x 300 mm",
    materials: ["PLA", "ABS", "PETG", "PVA"],
    maxTemp: "280°C",
    status: "PRINTING",
    currentUser: "Student 09",
    currentJob: "Robotic Arm Joint",
    material: "ABS",
    nozzleTemp: 242,
    targetNozzleTemp: 240,
    bedTemp: 91,
    targetBedTemp: 90,
    progress: 34,
    remainingMinutes: 75,
    currentLayer: 120,
    totalLayers: 350,
    infillDensity: "40%",
    infillAngle: "45°",
    infillPattern: "Grid",
    layerHeight: "0.15 mm",
    printSpeed: "50 mm/s",
    operatingHours: 1650,
    completedPrints: 195,
    healthScore: 88,
    lastMaintenance: "2026-08-30",
    nextMaintenance: "2026-10-05",
    errorCount: 4,
    issue: "Minor bed level tilt recorded"
  },
  {
    id: "AM-04",
    name: "Creality Ender 3 Max",
    model: "Ender 3 Max Neo",
    manufacturer: "Creality",
    buildVolume: "300 x 300 x 320 mm",
    materials: ["PLA", "PETG"],
    maxTemp: "260°C",
    status: "MAINTENANCE",
    currentUser: "None",
    currentJob: "Extruder Nozzle Cleaning",
    material: "PLA",
    nozzleTemp: 24,
    targetNozzleTemp: 0,
    bedTemp: 23,
    targetBedTemp: 0,
    progress: 0,
    remainingMinutes: 0,
    currentLayer: 0,
    totalLayers: 0,
    infillDensity: "0%",
    infillAngle: "0°",
    infillPattern: "None",
    layerHeight: "0.20 mm",
    printSpeed: "0 mm/s",
    operatingHours: 2100,
    completedPrints: 310,
    healthScore: 82,
    lastMaintenance: "2026-09-01",
    nextMaintenance: "2026-09-28",
    errorCount: 9,
    issue: "Nozzle clog & PTFE bowden tube wear detected by AI"
  },
  {
    id: "AM-05",
    name: "Voron 2.4 Custom",
    model: "Voron 2.4 300",
    manufacturer: "Voron Design",
    buildVolume: "300 x 300 x 300 mm",
    materials: ["PLA", "ABS", "PETG", "TPU", "ASA"],
    maxTemp: "350°C",
    status: "AVAILABLE",
    currentUser: "None",
    currentJob: "None",
    material: "PETG",
    nozzleTemp: 25,
    targetNozzleTemp: 0,
    bedTemp: 24,
    targetBedTemp: 0,
    progress: 0,
    remainingMinutes: 0,
    currentLayer: 0,
    totalLayers: 0,
    infillDensity: "0%",
    infillAngle: "45°",
    infillPattern: "None",
    layerHeight: "0.20 mm",
    printSpeed: "0 mm/s",
    operatingHours: 890,
    completedPrints: 140,
    healthScore: 96,
    lastMaintenance: "2026-09-18",
    nextMaintenance: "2026-11-15",
    errorCount: 1,
    issue: "None"
  },
  {
    id: "AM-06",
    name: "Formlabs Form 3+ SLA",
    model: "Form 3+ Stereolithography",
    manufacturer: "Formlabs",
    buildVolume: "145 x 145 x 185 mm",
    materials: ["Resin PLA", "Tough Resin", "Flexible Resin"],
    maxTemp: "35°C",
    status: "PRINTING",
    currentUser: "Student 15",
    currentJob: "Pump Impeller Prototype",
    material: "PLA",
    nozzleTemp: 210,
    targetNozzleTemp: 210,
    bedTemp: 60,
    targetBedTemp: 60,
    progress: 89,
    remainingMinutes: 12,
    currentLayer: 445,
    totalLayers: 500,
    infillDensity: "50%",
    infillAngle: "60°",
    infillPattern: "Honeycomb",
    layerHeight: "0.10 mm",
    printSpeed: "60 mm/s",
    operatingHours: 720,
    completedPrints: 110,
    healthScore: 91,
    lastMaintenance: "2026-09-10",
    nextMaintenance: "2026-10-20",
    errorCount: 3,
    issue: "Thermal fluctuation check active"
  },
  {
    id: "AM-07",
    name: "Prusa MINI+",
    model: "Prusa MINI+",
    manufacturer: "Prusa Research",
    buildVolume: "180 x 180 x 180 mm",
    materials: ["PLA", "PETG"],
    maxTemp: "280°C",
    status: "AVAILABLE",
    currentUser: "None",
    currentJob: "None",
    material: "PLA",
    nozzleTemp: 23,
    targetNozzleTemp: 0,
    bedTemp: 22,
    targetBedTemp: 0,
    progress: 0,
    remainingMinutes: 0,
    currentLayer: 0,
    totalLayers: 0,
    infillDensity: "0%",
    infillAngle: "45°",
    infillPattern: "None",
    layerHeight: "0.20 mm",
    printSpeed: "0 mm/s",
    operatingHours: 620,
    completedPrints: 98,
    healthScore: 97,
    lastMaintenance: "2026-09-15",
    nextMaintenance: "2026-10-30",
    errorCount: 0,
    issue: "None"
  },
  {
    id: "AM-08",
    name: "Bambu Lab P1P",
    model: "P1P High Speed",
    manufacturer: "Bambu Lab",
    buildVolume: "256 x 256 x 256 mm",
    materials: ["PLA", "PETG", "TPU"],
    maxTemp: "300°C",
    status: "PRINTING",
    currentUser: "Student 31",
    currentJob: "Drone Frame Mount",
    material: "PETG",
    nozzleTemp: 236,
    targetNozzleTemp: 235,
    bedTemp: 71,
    targetBedTemp: 70,
    progress: 21,
    remainingMinutes: 125,
    currentLayer: 65,
    totalLayers: 310,
    infillDensity: "30%",
    infillAngle: "45°",
    infillPattern: "Cubic",
    layerHeight: "0.20 mm",
    printSpeed: "150 mm/s",
    operatingHours: 540,
    completedPrints: 86,
    healthScore: 99,
    lastMaintenance: "2026-09-22",
    nextMaintenance: "2026-11-20",
    errorCount: 0,
    issue: "None"
  }
];

// 15 Sample Print Jobs
let jobs = [
  { id: "JOB-101", student: "Student 24", model: "Gear Housing V3", printer: "AM-02", material: "PLA", infill: "35%", infillAngle: "45°", layerHeight: "0.20 mm", estTime: "1h 45m", status: "Printing", timeSubmitted: "10:15 AM" },
  { id: "JOB-102", student: "Student 09", model: "Robotic Arm Joint", printer: "AM-03", material: "ABS", infill: "40%", infillAngle: "45°", layerHeight: "0.15 mm", estTime: "2h 30m", status: "Printing", timeSubmitted: "09:40 AM" },
  { id: "JOB-103", student: "Student 15", model: "Pump Impeller Prototype", printer: "AM-06", material: "PLA", infill: "50%", infillAngle: "60°", layerHeight: "0.10 mm", estTime: "3h 10m", status: "Printing", timeSubmitted: "08:30 AM" },
  { id: "JOB-104", student: "Student 31", model: "Drone Frame Mount", printer: "AM-08", material: "PETG", infill: "30%", infillAngle: "45°", layerHeight: "0.20 mm", estTime: "2h 40m", status: "Printing", timeSubmitted: "11:05 AM" },
  { id: "JOB-105", student: "Student 12", model: "Quadcopter Chassis", printer: "AM-05", material: "PETG", infill: "35%", infillAngle: "45°", layerHeight: "0.20 mm", estTime: "1h 50m", status: "Queued", timeSubmitted: "11:30 AM" },
  { id: "JOB-106", student: "Student 18", model: "Phone Stand Ergonomic", printer: "AM-01", material: "PLA", infill: "20%", infillAngle: "45°", layerHeight: "0.28 mm", estTime: "45m", status: "Queued", timeSubmitted: "11:45 AM" },
  { id: "JOB-107", student: "Student 21", model: "Automotive Mount Bracket", printer: "AM-05", material: "ABS", infill: "45%", infillAngle: "45°", layerHeight: "0.20 mm", estTime: "2h 10m", status: "Queued", timeSubmitted: "12:00 PM" },
  { id: "JOB-108", student: "Student 05", model: "Miniature Engine Cylinder", printer: "AM-07", material: "PLA", infill: "25%", infillAngle: "45°", layerHeight: "0.15 mm", estTime: "1h 15m", status: "Queued", timeSubmitted: "12:10 PM" },
  { id: "JOB-109", student: "Student 29", model: "Sensor Enclosure Box", printer: "AM-01", material: "PETG", infill: "30%", infillAngle: "45°", layerHeight: "0.20 mm", estTime: "1h 05m", status: "Queued", timeSubmitted: "12:25 PM" },
  { id: "JOB-110", student: "Student 14", model: "Custom Spool Holder", printer: "AM-07", material: "PLA", infill: "20%", infillAngle: "45°", layerHeight: "0.24 mm", estTime: "50m", status: "Queued", timeSubmitted: "12:40 PM" },
  { id: "JOB-111", student: "Student 33", model: "Cable Drag Chain Links", printer: "AM-08", material: "PETG", infill: "35%", infillAngle: "45°", layerHeight: "0.20 mm", estTime: "1h 30m", status: "Queued", timeSubmitted: "01:00 PM" },
  { id: "JOB-112", student: "Student 02", model: "Test Tensile Specimen Bar", printer: "AM-02", material: "PLA", infill: "100%", infillAngle: "0°", layerHeight: "0.15 mm", estTime: "1h 10m", status: "Completed", timeSubmitted: "Yesterday" },
  { id: "JOB-113", student: "Student 08", model: "Turbine Blade Prototype", printer: "AM-05", material: "PETG", infill: "40%", infillAngle: "45°", layerHeight: "0.15 mm", estTime: "3h 45m", status: "Completed", timeSubmitted: "Yesterday" },
  { id: "JOB-114", student: "Student 19", model: "Prosthetic Hand Finger Joint", printer: "AM-06", material: "TPU", infill: "25%", infillAngle: "45°", layerHeight: "0.20 mm", estTime: "2h 00m", status: "Completed", timeSubmitted: "Yesterday" },
  { id: "JOB-115", student: "Student 27", model: "Fluidic Nozzle Injector", printer: "AM-04", material: "PLA", infill: "50%", infillAngle: "45°", layerHeight: "0.12 mm", estTime: "2h 20m", status: "Failed", timeSubmitted: "Yesterday" }
];

// Material Inventory Data
let materials = [
  { type: "PLA", name: "Polylactic Acid (Standard)", stockKg: 3.8, maxKg: 5.0, usedTodayG: 420, costPerGram: 2.0, estPrintsRemaining: 28, lowStock: false, color: "#38bdf8" },
  { type: "ABS", name: "Acrylonitrile Butadiene Styrene", stockKg: 1.2, maxKg: 5.0, usedTodayG: 310, costPerGram: 2.5, estPrintsRemaining: 8, lowStock: true, color: "#a855f7" },
  { type: "PETG", name: "Polyethylene Terephthalate Glycol", stockKg: 4.5, maxKg: 5.0, usedTodayG: 180, costPerGram: 2.8, estPrintsRemaining: 35, lowStock: false, color: "#10b981" },
  { type: "TPU", name: "Thermoplastic Polyurethane", stockKg: 0.8, maxKg: 3.0, usedTodayG: 90, costPerGram: 3.5, estPrintsRemaining: 5, lowStock: true, color: "#f59e0b" }
];

// Machine Bookings
let bookings = [
  { id: "BK-901", printer: "AM-05", user: "Student 12 (Alex Rivera)", project: "Robotics Arm Bracket V3", date: "2026-09-29", time: "10:00 - 12:00", duration: "2 Hours", material: "PETG", status: "Confirmed" },
  { id: "BK-902", printer: "AM-02", user: "Student 18", project: "Aerodynamics Winglet", date: "2026-09-29", time: "13:00 - 15:00", duration: "2 Hours", material: "PLA", status: "Confirmed" },
  { id: "BK-903", printer: "AM-08", user: "Student 21", project: "Quadcopter Motor Mount", date: "2026-09-29", time: "15:30 - 17:30", duration: "2 Hours", material: "PETG", status: "Confirmed" }
];

// Notifications Log
let notifications = [
  { id: 1, title: "Print Completed", desc: "Student 02's print 'Test Tensile Specimen' on AM-02 completed cleanly.", time: "10m ago", icon: "check-circle-2", color: "text-emerald-400" },
  { id: 2, title: "AI Anomaly Warning", desc: "Printer AM-06 nozzle temperature fluctuated during layer 142.", time: "18m ago", icon: "alert-triangle", color: "text-rose-400" },
  { id: 3, title: "Material Stock Alert", desc: "ABS stock fell below 1.5 kg (1.2 kg remaining). Order refill.", time: "45m ago", icon: "layers", color: "text-amber-400" },
  { id: 4, title: "Maintenance Reminder", desc: "AM-04 scheduled for nozzle replacement & bed calibration.", time: "2h ago", icon: "wrench", color: "text-purple-400" }
];

// Telemetry Chart Instances
let chartTempInstance = null;
let chartSpeedInstance = null;
let chartUtilInstance = null;
let chartMatInstance = null;
let toolpathAnimationId = null;

// ==========================================
// 2. INITIALIZATION & NAVIGATION ENGINE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) lucide.createIcons();

  // Render initial views
  renderAllViews();

  // Start Real-Time Telemetry Simulation Interval
  setInterval(runSimulationStep, 2000);

  // Initialize Canvas 3D Extruder Toolpath
  initToolpathCanvas();

  console.log("Smart AM Lab Portal initialized in SIMULATION MODE.");
});

function navigateTo(pageId) {
  // Hide all page views
  document.querySelectorAll('.page-view').forEach(el => el.classList.add('hidden'));

  // Show selected view
  const target = document.getElementById(`view-${pageId}`);
  if (target) {
    target.classList.remove('hidden');
    currentView = pageId;
  }

  // Update Navigation Active State
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.getElementById(`nav-${pageId}`);
  if (activeNav) activeNav.classList.add('active');

  // Trigger page specific renders
  if (pageId === 'dashboard') updateDashboardMetrics();
  if (pageId === 'printers') renderPrinterCards();
  if (pageId === 'availability') renderFloorplan();
  if (pageId === 'jobs') renderFullJobsTable();
  if (pageId === 'queue') renderQueueTable();
  if (pageId === 'materials') renderMaterialsGrid();
  if (pageId === 'maintenance') renderMaintenanceCards();
  if (pageId === 'analytics') renderAnalyticsCharts();
  if (pageId === 'machine-rec') renderMachineRecommendations();
  if (pageId === 'optimizer') runAIOptimizer();
  if (pageId === 'risk') runAIRiskAnalysis();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderAllViews() {
  updateDashboardMetrics();
  renderPrinterCards();
  renderFullJobsTable();
  renderQueueTable();
  renderMaterialsGrid();
  renderNotifications();
}

// ==========================================
// 3. ROLE & CREDENTIAL MANAGERS
// ==========================================

function toggleRoleDropdown() {
  const dd = document.getElementById('role-dropdown');
  dd.classList.toggle('hidden');
}

function switchRole(role) {
  currentUser.role = role;
  if (role === 'admin') {
    currentUser.name = "Dr. H. Vance";
    currentUser.id = "ADMIN-001";
    document.getElementById('user-name-display').innerText = "Dr. H. Vance";
    document.getElementById('user-role-display').innerText = "Lab Administrator";
    document.getElementById('user-avatar-initial').innerText = "V";
    document.getElementById('role-check-student').classList.add('hidden');
    document.getElementById('role-check-admin').classList.remove('hidden');
    document.querySelectorAll('.admin-only').forEach(el => el.classList.remove('hidden'));
    showToast("Switched to Lab Administrator Mode", "success");
  } else {
    currentUser.name = "Alex Rivera";
    currentUser.id = "2026-AM-042";
    document.getElementById('user-name-display').innerText = "Alex Rivera";
    document.getElementById('user-role-display').innerText = "Student";
    document.getElementById('user-avatar-initial').innerText = "S";
    document.getElementById('role-check-admin').classList.add('hidden');
    document.getElementById('role-check-student').classList.remove('hidden');
    document.querySelectorAll('.admin-only').forEach(el => el.classList.add('hidden'));
    showToast("Switched to Student Mode", "info");
  }
  document.getElementById('role-dropdown').classList.add('hidden');
}

function showLoginModal() {
  document.getElementById('modal-login').classList.remove('hidden');
}

function closeLoginModal() {
  document.getElementById('modal-login').classList.add('hidden');
}

function loginAs(role) {
  switchRole(role);
  closeLoginModal();
}

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  showToast("Theme Toggled", "info");
}

function togglePresentationMode() {
  isPresentationMode = !isPresentationMode;
  if (isPresentationMode) {
    document.body.classList.add('presentation-mode');
    showToast("Presentation Mode Activated (High Visibility for Judges)", "info");
  } else {
    document.body.classList.remove('presentation-mode');
    showToast("Standard Mode Restored", "info");
  }
}

// ==========================================
// 4. REAL-TIME SIMULATION ENGINE
// ==========================================

function runSimulationStep() {
  if (!isSimulationMode) return;

  printers.forEach(printer => {
    if (printer.status === 'PRINTING') {
      // Advance progress
      if (printer.progress < 99) {
        printer.progress += 1;
        printer.currentLayer = Math.min(printer.totalLayers, Math.floor((printer.progress / 100) * printer.totalLayers));
        printer.remainingMinutes = Math.max(1, printer.remainingMinutes - 1);
      } else {
        // Complete print
        printer.progress = 100;
        printer.status = 'AVAILABLE';
        printer.targetNozzleTemp = 0;
        printer.targetBedTemp = 0;
        
        // Notify
        addNotification(`Print Completed on ${printer.id}`, `Job '${printer.currentJob}' for ${printer.currentUser} finished successfully!`, "check-circle-2", "text-emerald-400");
        showToast(`🎉 Printer ${printer.id} completed print job '${printer.currentJob}'!`, "success");

        printer.currentJob = "None";
        printer.currentUser = "None";
      }

      // Fluctuate temperatures slightly around target
      printer.nozzleTemp = Math.round(printer.targetNozzleTemp + (Math.random() * 3 - 1.5));
      printer.bedTemp = Math.round(printer.targetBedTemp + (Math.random() * 1.5 - 0.75));
    } else if (printer.status === 'AVAILABLE') {
      // Cool down
      if (printer.nozzleTemp > 24) printer.nozzleTemp -= 2;
      if (printer.bedTemp > 24) printer.bedTemp -= 1;
    }
  });

  // Update telemetry charts if viewing printer details
  if (currentView === 'view-printer-detail' || currentView === 'printers' || currentView === 'dashboard') {
    updateDashboardMetrics();
    if (currentView === 'printers') renderPrinterCards();
  }
}

// ==========================================
// 5. DASHBOARD & MONITORING RENDERERS
// ==========================================

function updateDashboardMetrics() {
  const total = printers.length;
  const avail = printers.filter(p => p.status === 'AVAILABLE').length;
  const print = printers.filter(p => p.status === 'PRINTING').length;
  const maint = printers.filter(p => p.status === 'MAINTENANCE').length;
  const activeJ = jobs.filter(j => j.status === 'Printing').length;
  const queueL = jobs.filter(j => j.status === 'Queued').length;
  const todaysP = jobs.filter(j => j.status === 'Completed').length + 12;

  document.getElementById('stat-total-printers').innerText = total;
  document.getElementById('stat-available-printers').innerText = avail;
  document.getElementById('stat-printing-printers').innerText = print;
  document.getElementById('stat-maint-printers').innerText = maint;
  document.getElementById('stat-active-jobs').innerText = activeJ;
  document.getElementById('stat-queue-length').innerText = queueL;
  document.getElementById('queue-badge').innerText = queueL;
  document.getElementById('stat-todays-prints').innerText = todaysP;

  // Render Dashboard Quick Printer Status List (🟢 Printer 01 - Available, 🔴 Printer 02 - Printing - 67%)
  const listContainer = document.getElementById('dashboard-printer-status-list');
  if (listContainer) {
    listContainer.innerHTML = printers.map(p => {
      let statusDot = '🟢';
      let statusBadge = `<span class="text-emerald-400 font-bold">Available</span>`;
      let progressText = '';

      if (p.status === 'PRINTING') {
        statusDot = '🔴';
        statusBadge = `<span class="text-cyan-400 font-bold">Printing — ${p.progress}%</span>`;
        progressText = `
          <div class="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div class="bg-cyan-400 h-1.5 transition-all duration-300" style="width: ${p.progress}%"></div>
          </div>
        `;
      } else if (p.status === 'MAINTENANCE') {
        statusDot = '🟡';
        statusBadge = `<span class="text-amber-400 font-bold">Maintenance</span>`;
      }

      return `
        <div onclick="inspectPrinterDetails('${p.id}')" class="p-3 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition">
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-2 font-mono">
              <span>${statusDot}</span>
              <strong class="text-white">${p.id}</strong>
              <span class="text-slate-400 font-sans">(${p.name})</span>
            </div>
            ${statusBadge}
          </div>
          ${p.status === 'PRINTING' ? `
            <div class="mt-2 text-[11px] text-slate-300 flex justify-between font-mono">
              <span>Job: <strong>${p.currentJob}</strong></span>
              <span class="text-cyan-400">${p.remainingMinutes}m rem</span>
            </div>
            ${progressText}
          ` : ''}
        </div>
      `;
    }).join('');
  }

  // Dashboard Recent Jobs Table
  const tableBody = document.getElementById('dashboard-jobs-table-body');
  if (tableBody) {
    tableBody.innerHTML = jobs.slice(0, 5).map(j => `
      <tr class="hover:bg-slate-800/40 transition">
        <td class="p-3 text-cyan-400 font-bold">${j.id}</td>
        <td class="p-3 text-white font-sans">${j.model}</td>
        <td class="p-3 text-slate-300 font-sans">${j.student}</td>
        <td class="p-3">${j.printer}</td>
        <td class="p-3">${j.material}</td>
        <td class="p-3">${j.infill}</td>
        <td class="p-3">${j.estTime}</td>
        <td class="p-3">${getStatusBadgeHTML(j.status)}</td>
        <td class="p-3 text-right">
          <button onclick="inspectPrinterDetails('${j.printer}')" class="text-[11px] text-cyan-400 hover:underline">Monitor</button>
        </td>
      </tr>
    `).join('');
  }

  // Dashboard Material Quick Inventory
  const matList = document.getElementById('dashboard-material-quick-list');
  if (matList) {
    matList.innerHTML = materials.map(m => `
      <div>
        <div class="flex justify-between text-xs mb-1 font-mono">
          <span class="text-slate-200 font-bold">${m.type} Stock</span>
          <span class="${m.lowStock ? 'text-amber-400 font-bold' : 'text-slate-400'}">${m.stockKg} kg / ${m.maxKg} kg</span>
        </div>
        <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div class="h-2 rounded-full transition-all duration-300" style="width: ${(m.stockKg / m.maxKg)*100}%; background-color: ${m.color}"></div>
        </div>
      </div>
    `).join('');
  }

  if (window.lucide) lucide.createIcons();
}

function getStatusBadgeHTML(status) {
  switch (status) {
    case 'Printing': return `<span class="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold text-[10px]">🔴 Printing</span>`;
    case 'Queued': return `<span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-[10px]">Queued</span>`;
    case 'Completed': return `<span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold text-[10px]">🟢 Completed</span>`;
    case 'Maintenance': return `<span class="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 font-semibold text-[10px]">🟡 Maintenance</span>`;
    case 'Failed': return `<span class="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-semibold text-[10px]">✖ Failed</span>`;
    default: return `<span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">${status}</span>`;
  }
}

function renderPrinterCards() {
  const grid = document.getElementById('printers-cards-grid');
  if (!grid) return;

  const filter = document.getElementById('printer-filter-status')?.value || 'all';

  const filtered = printers.filter(p => filter === 'all' || p.status === filter);

  grid.innerHTML = filtered.map(p => {
    let statusClass = 'border-slate-800';
    let statusHeader = `<span class="status-dot-available"></span> <span class="text-emerald-400 font-bold">AVAILABLE</span>`;

    if (p.status === 'PRINTING') {
      statusClass = 'border-cyan-500/50 bg-cyan-950/10 shadow-lg shadow-cyan-500/10';
      statusHeader = `<span class="status-dot-printing"></span> <span class="text-cyan-400 font-bold">PRINTING</span>`;
    } else if (p.status === 'MAINTENANCE') {
      statusClass = 'border-amber-500/50 bg-amber-950/10';
      statusHeader = `<span class="status-dot-maint"></span> <span class="text-amber-400 font-bold">MAINTENANCE</span>`;
    }

    return `
      <div class="bg-slate-900 rounded-2xl border ${statusClass} p-5 flex flex-col justify-between space-y-4 hover:border-cyan-400/80 transition duration-300">
        <div>
          <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div>
              <h3 class="font-extrabold text-base text-white flex items-center gap-2">
                ${p.id}
                <span class="text-xs font-normal text-slate-400">(${p.name})</span>
              </h3>
              <p class="text-[11px] text-slate-400">${p.manufacturer} • ${p.buildVolume}</p>
            </div>
            <div class="flex items-center gap-1.5 text-xs font-mono">
              ${statusHeader}
            </div>
          </div>

          ${p.status === 'PRINTING' ? `
            <div class="space-y-2 text-xs font-mono">
              <div class="flex justify-between">
                <span class="text-slate-400">Current Job:</span>
                <strong class="text-white font-sans">${p.currentJob}</strong>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Current User:</span>
                <span class="text-cyan-300 font-sans">${p.currentUser}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Material:</span>
                <span class="text-emerald-400">${p.material}</span>
              </div>
              
              <!-- Thermal stats -->
              <div class="grid grid-cols-2 gap-2 p-2 bg-slate-950 rounded-lg text-center mt-2">
                <div>
                  <span class="text-[10px] text-slate-400 block">Nozzle Temp</span>
                  <span class="font-bold text-rose-400">${p.nozzleTemp}°C</span>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 block">Bed Temp</span>
                  <span class="font-bold text-amber-400">${p.bedTemp}°C</span>
                </div>
              </div>

              <!-- Printing Parameter Matrix -->
              <div class="grid grid-cols-2 gap-1.5 text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
                <span>Infill: <strong class="text-slate-200">${p.infillDensity}</strong></span>
                <span>Angle: <strong class="text-slate-200">${p.infillAngle}</strong></span>
                <span>Pattern: <strong class="text-slate-200">${p.infillPattern}</strong></span>
                <span>Layer Height: <strong class="text-slate-200">${p.layerHeight}</strong></span>
              </div>

              <!-- Progress bar -->
              <div class="pt-2">
                <div class="flex justify-between text-[11px] mb-1">
                  <span class="text-slate-400">Progress: <strong class="text-cyan-400">${p.progress}%</strong></span>
                  <span class="text-slate-400">Remaining: <strong class="text-cyan-400">${p.remainingMinutes}m</strong></span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div class="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 transition-all duration-300" style="width: ${p.progress}%"></div>
                </div>
              </div>
            </div>
          ` : p.status === 'MAINTENANCE' ? `
            <div class="p-3 rounded-xl bg-amber-950/30 border border-amber-800/50 text-xs text-amber-300 space-y-1 font-mono">
              <span class="font-bold block">Issue:</span>
              <p class="text-[11px] text-amber-200 font-sans">${p.issue}</p>
              <span class="text-[10px] text-amber-400 block mt-2">Scheduled finish: Today 4:00 PM</span>
            </div>
          ` : `
            <div class="p-4 bg-slate-950/60 rounded-xl border border-slate-850 text-center space-y-2">
              <span class="text-xs text-emerald-400 font-bold block">🟢 Ready for Print Jobs</span>
              <p class="text-[11px] text-slate-400">Supported Materials: ${p.materials.join(', ')}</p>
              <button onclick="openNewJobModalForPrinter('${p.id}')" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md">
                Assign Job to ${p.id}
              </button>
            </div>
          `}
        </div>

        <button onclick="inspectPrinterDetails('${p.id}')" class="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-1">
          <span>View Details & Live Telemetry</span> ➔
        </button>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function inspectPrinterDetails(printerId) {
  activeDetailPrinterId = printerId;
  const p = printers.find(x => x.id === printerId) || printers[1];

  navigateTo('printer-detail');

  const container = document.getElementById('printer-detail-header-card');
  if (container) {
    container.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-extrabold text-white">${p.id} — ${p.name}</h1>
            <span class="px-2.5 py-1 rounded-full text-xs font-mono font-bold ${p.status === 'PRINTING' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : p.status === 'AVAILABLE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}">
              ${p.status}
            </span>
          </div>
          <p class="text-xs text-slate-400 mt-1">${p.manufacturer} • Model: ${p.model} • Build Volume: ${p.buildVolume}</p>
        </div>

        <div class="flex items-center gap-3">
          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono">
            <span class="text-[10px] text-slate-400 block">Health Score</span>
            <span class="text-lg font-bold text-emerald-400">${p.healthScore}%</span>
          </div>
          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono">
            <span class="text-[10px] text-slate-400 block">Total Runtime</span>
            <span class="text-lg font-bold text-cyan-400">${p.operatingHours} hrs</span>
          </div>
        </div>
      </div>

      <!-- Live Job Breakdown -->
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-4 border-t border-slate-800 text-xs font-mono">
        <div>
          <span class="text-slate-400 text-[10px] block">Current Job</span>
          <strong class="text-white font-sans">${p.currentJob}</strong>
        </div>
        <div>
          <span class="text-slate-400 text-[10px] block">Material Loaded</span>
          <span class="text-emerald-400 font-bold">${p.material}</span>
        </div>
        <div>
          <span class="text-slate-400 text-[10px] block">Infill Density / Pattern</span>
          <span class="text-cyan-300 font-bold">${p.infillDensity} (${p.infillPattern})</span>
        </div>
        <div>
          <span class="text-slate-400 text-[10px] block">Layer Height</span>
          <span class="text-slate-200">${p.layerHeight}</span>
        </div>
        <div>
          <span class="text-slate-400 text-[10px] block">Current Layer</span>
          <span class="text-slate-200">${p.currentLayer} / ${p.totalLayers}</span>
        </div>
        <div>
          <span class="text-slate-400 text-[10px] block">Extrusion Speed</span>
          <span class="text-sky-400 font-bold">${p.printSpeed}</span>
        </div>
      </div>
    `;
  }

  // Render Charts for Printer Telemetry
  initPrinterDetailCharts(p);
}

function initPrinterDetailCharts(printer) {
  // Temperature Chart
  const ctxTemp = document.getElementById('printer-temp-chart')?.getContext('2d');
  if (ctxTemp) {
    if (chartTempInstance) chartTempInstance.destroy();
    
    const labels = Array.from({length: 12}, (_, i) => `${i*5}s ago`).reverse();
    const nozzleData = Array.from({length: 12}, () => printer.nozzleTemp + (Math.random()*4 - 2));
    const bedData = Array.from({length: 12}, () => printer.bedTemp + (Math.random()*2 - 1));

    chartTempInstance = new Chart(ctxTemp, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          { label: 'Nozzle Temp (°C)', data: nozzleData, borderColor: '#f43f5e', backgroundColor: 'rgba(244, 63, 94, 0.1)', fill: true, tension: 0.3 },
          { label: 'Bed Temp (°C)', data: bedData, borderColor: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.1)', fill: true, tension: 0.3 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } } } },
        scales: {
          x: { ticks: { color: '#64748b' }, grid: { color: '#1e293b' } },
          y: { ticks: { color: '#64748b' }, grid: { color: '#1e293b' } }
        }
      }
    });
  }

  // Speed & Layer Chart
  const ctxSpeed = document.getElementById('printer-speed-chart')?.getContext('2d');
  if (ctxSpeed) {
    if (chartSpeedInstance) chartSpeedInstance.destroy();

    const labels = Array.from({length: 10}, (_, i) => `L${printer.currentLayer - 10 + i}`);
    const speedData = Array.from({length: 10}, () => parseInt(printer.printSpeed) + (Math.random()*10 - 5));

    chartSpeedInstance = new Chart(ctxSpeed, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          { label: 'Extrusion Speed (mm/s)', data: speedData, backgroundColor: '#38bdf8', borderRadius: 4 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#94a3b8' } } },
        scales: {
          x: { ticks: { color: '#64748b' }, grid: { color: '#1e293b' } },
          y: { ticks: { color: '#64748b' }, grid: { color: '#1e293b' } }
        }
      }
    });
  }
}

// ==========================================
// 6. FLOORPLAN AVAILABILITY RENDERER
// ==========================================

function renderFloorplan() {
  const container = document.getElementById('floorplan-grid');
  if (!container) return;

  container.innerHTML = printers.map(p => {
    let cardClass = 'floor-card-available';
    let statusDot = 'status-dot-available';
    let statusText = '🟢 AVAILABLE';

    if (p.status === 'PRINTING') {
      cardClass = 'floor-card-printing';
      statusDot = 'status-dot-printing';
      statusText = `🔴 PRINTING (${p.progress}%)`;
    } else if (p.status === 'MAINTENANCE') {
      cardClass = 'floor-card-maint';
      statusDot = 'status-dot-maint';
      statusText = '🟡 MAINTENANCE';
    }

    return `
      <div onclick="inspectPrinterDetails('${p.id}')" class="floor-card ${cardClass} p-4 rounded-xl border shadow-lg cursor-pointer space-y-3">
        <div class="flex items-center justify-between">
          <span class="font-extrabold text-sm text-white font-mono">${p.id}</span>
          <span class="${statusDot}"></span>
        </div>
        <div class="text-xs font-semibold text-slate-200">${p.name}</div>
        
        <div class="text-[11px] font-mono text-slate-400 space-y-1">
          <div>Status: <strong class="text-slate-200">${statusText}</strong></div>
          ${p.status === 'PRINTING' ? `
            <div>Job: <span class="text-cyan-300 font-sans">${p.currentJob}</span></div>
            <div>Temp: <span class="text-rose-400">${p.nozzleTemp}°C</span> / <span class="text-amber-400">${p.bedTemp}°C</span></div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 mt-2">
              <div class="bg-cyan-400 h-1.5 rounded-full" style="width: ${p.progress}%"></div>
            </div>
          ` : `
            <div>Materials: ${p.materials.slice(0, 2).join(', ')}</div>
            <div>Health: <span class="text-emerald-400 font-bold">${p.healthScore}%</span></div>
          `}
        </div>

        <button class="w-full py-1 text-[11px] rounded bg-slate-800/80 hover:bg-slate-750 text-cyan-300 border border-slate-700">
          Inspect Node →
        </button>
      </div>
    `;
  }).join('');
}

function filterFloorplan(status) {
  const cards = document.querySelectorAll('.floor-card');
  cards.forEach(card => {
    if (status === 'all') {
      card.style.display = 'block';
    } else {
      if (card.innerText.includes(status)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    }
  });
}

// ==========================================
// 7. PRINT JOBS & QUEUE MANAGEMENT
// ==========================================

function renderFullJobsTable() {
  const body = document.getElementById('full-jobs-table-body');
  if (!body) return;

  body.innerHTML = jobs.map(j => `
    <tr class="hover:bg-slate-800/40 transition">
      <td class="p-3 text-cyan-400 font-bold">${j.id}</td>
      <td class="p-3 text-white font-sans">${j.student}</td>
      <td class="p-3 text-slate-200 font-sans font-semibold">${j.model}</td>
      <td class="p-3 font-bold">${j.printer}</td>
      <td class="p-3">${j.material}</td>
      <td class="p-3">${j.infill}</td>
      <td class="p-3">${j.infillAngle}</td>
      <td class="p-3">${j.layerHeight}</td>
      <td class="p-3 text-slate-300">${j.estTime}</td>
      <td class="p-3">${getStatusBadgeHTML(j.status)}</td>
      <td class="p-3 text-right">
        <button onclick="inspectPrinterDetails('${j.printer}')" class="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded text-[11px] border border-slate-700">
          View
        </button>
      </td>
    </tr>
  `).join('');
}

function filterJobsTable() {
  const search = document.getElementById('job-search-input')?.value.toLowerCase() || '';
  const filterPrinter = document.getElementById('job-filter-printer')?.value || 'all';
  const filterStatus = document.getElementById('job-filter-status')?.value || 'all';
  const filterMat = document.getElementById('job-filter-material')?.value || 'all';

  const rows = document.querySelectorAll('#full-jobs-table-body tr');
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    const matchesSearch = !search || text.includes(search);
    const matchesPrinter = filterPrinter === 'all' || text.includes(filterPrinter.toLowerCase());
    const matchesStatus = filterStatus === 'all' || text.includes(filterStatus.toLowerCase());
    const matchesMat = filterMat === 'all' || text.includes(filterMat.toLowerCase());

    if (matchesSearch && matchesPrinter && matchesStatus && matchesMat) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function resetJobFilters() {
  if (document.getElementById('job-search-input')) document.getElementById('job-search-input').value = '';
  if (document.getElementById('job-filter-printer')) document.getElementById('job-filter-printer').value = 'all';
  if (document.getElementById('job-filter-status')) document.getElementById('job-filter-status').value = 'all';
  if (document.getElementById('job-filter-material')) document.getElementById('job-filter-material').value = 'all';
  filterJobsTable();
}

function renderQueueTable() {
  const body = document.getElementById('queue-table-body');
  if (!body) return;

  const queuedJobs = jobs.filter(j => j.status === 'Queued');

  body.innerHTML = queuedJobs.map((j, index) => `
    <tr class="hover:bg-slate-800/40 transition">
      <td class="p-3 font-bold text-cyan-400">${index + 1}</td>
      <td class="p-3 text-slate-300 font-bold">${j.id}</td>
      <td class="p-3 text-white font-sans font-semibold">${j.model}</td>
      <td class="p-3 text-slate-300 font-sans">${j.student}</td>
      <td class="p-3 font-bold text-slate-200">${j.printer}</td>
      <td class="p-3"><span class="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-emerald-400 font-bold">${j.material}</span></td>
      <td class="p-3 text-slate-300">${j.estTime}</td>
      <td class="p-3"><span class="px-2 py-0.5 rounded ${index === 0 ? 'bg-rose-950 text-rose-400 border border-rose-800' : 'bg-slate-800 text-slate-300'} font-bold">${index === 0 ? 'High Priority' : 'Normal'}</span></td>
      <td class="p-3 text-right">
        <button onclick="prioritizeQueueJob('${j.id}')" class="text-[11px] text-cyan-400 hover:underline mr-2">Move Up ⬆</button>
      </td>
    </tr>
  `).join('');
}

function aiOptimizeQueue() {
  // Sort queue by material batching then est duration
  const queued = jobs.filter(j => j.status === 'Queued');
  queued.sort((a, b) => (a.material > b.material ? 1 : -1));

  showToast("🤖 AI Engine optimized queue for material batching & minimal cleanup downtime!", "success");

  const notice = document.getElementById('queue-ai-notice');
  if (notice) notice.classList.remove('hidden');

  renderQueueTable();
}

function prioritizeQueueJob(jobId) {
  showToast(`Moved ${jobId} to top priority!`, "info");
}

// ==========================================
// 8. AI PARAMETER OPTIMIZER ENGINE
// ==========================================

function setOptStrength(level) {
  document.querySelectorAll('#opt-strength-buttons button').forEach(btn => {
    btn.classList.remove('active', 'bg-cyan-950', 'text-cyan-400', 'border-cyan-800');
    btn.classList.add('bg-slate-800', 'text-slate-400', 'border-slate-700');
  });

  event.target.classList.remove('bg-slate-800', 'text-slate-400', 'border-slate-700');
  event.target.classList.add('active', 'bg-cyan-950', 'text-cyan-400', 'border-cyan-800');

  runAIOptimizer();
}

function runAIOptimizer() {
  const partType = document.getElementById('opt-part-type')?.value || 'Mechanical Part';
  const strengthBtn = document.querySelector('#opt-strength-buttons button.active');
  const strength = strengthBtn ? strengthBtn.innerText : 'High';
  const priority = document.getElementById('opt-priority')?.value || 'Balanced';
  const material = document.getElementById('opt-material')?.value || 'PETG';

  let infill = "35%";
  let angle = "45°";
  let pattern = "Gyroid";
  let layerHeight = "0.20 mm";
  let speed = "50 mm/s";
  let temp = "235°C";
  let estTime = "2h 18m";
  let weight = "86 g";
  let cost = "₹172";
  let explanation = "";

  if (strength === 'Very High') {
    infill = "60%";
    pattern = "Honeycomb / Cubic";
    layerHeight = "0.15 mm";
    speed = "40 mm/s";
    estTime = "3h 40m";
    weight = "140 g";
    cost = "₹280";
    explanation = `For very high strength applications in ${material}, AI selects a dense 60% Honeycomb/Cubic infill matrix with thin 0.15mm layers to maximize layer-to-layer adhesion and prevent shear failure under high mechanical stress.`;
  } else if (strength === 'Low' || priority === 'Minimum Print Time') {
    infill = "15%";
    pattern = "Grid";
    layerHeight = "0.28 mm";
    speed = "80 mm/s";
    estTime = "45m";
    weight = "38 g";
    cost = "₹76";
    explanation = `Minimum print time optimized. AI reduces infill density to 15% Grid pattern with thick 0.28mm layers and 80 mm/s speed for rapid prototyping.`;
  } else if (partType === 'Flexible Part') {
    infill = "25%";
    pattern = "Concentric";
    layerHeight = "0.20 mm";
    speed = "25 mm/s";
    temp = "220°C";
    estTime = "2h 05m";
    weight = "72 g";
    cost = "₹252";
    explanation = `Flexible part detected. AI configures 25% Concentric pattern to allow elastic deformation under load without tearing wall perimeters.`;
  } else {
    explanation = `Based on the selected ${partType.toLowerCase()} application and ${strength.toLowerCase()} strength requirement, AI recommends 35% Gyroid infill with ${material} filament. This provides an optimal strength-to-weight ratio while maintaining reasonable print duration.`;
  }

  // Update UI Elements
  if (document.getElementById('rec-infill-density')) document.getElementById('rec-infill-density').innerText = infill;
  if (document.getElementById('rec-infill-angle')) document.getElementById('rec-infill-angle').innerText = angle;
  if (document.getElementById('rec-infill-pattern')) document.getElementById('rec-infill-pattern').innerText = pattern;
  if (document.getElementById('rec-layer-height')) document.getElementById('rec-layer-height').innerText = layerHeight;
  if (document.getElementById('rec-print-speed')) document.getElementById('rec-print-speed').innerText = speed;
  if (document.getElementById('rec-nozzle-temp')) document.getElementById('rec-nozzle-temp').innerText = temp;
  if (document.getElementById('rec-est-time')) document.getElementById('rec-est-time').innerText = estTime;
  if (document.getElementById('rec-est-weight')) document.getElementById('rec-est-weight').innerText = weight;
  if (document.getElementById('rec-est-cost')) document.getElementById('rec-est-cost').innerText = cost;
  if (document.getElementById('rec-explanation')) document.getElementById('rec-explanation').innerText = `"${explanation}"`;
}

// ==========================================
// 9. AI FAILURE RISK ANALYZER
// ==========================================

function runAIRiskAnalysis() {
  const container = document.getElementById('risk-findings-list');
  if (!container) return;

  container.innerHTML = `
    <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-emerald-400 font-bold">✓</span>
        <span>Material Compatibility (${document.getElementById('opt-material')?.value || 'PETG'})</span>
      </div>
      <span class="text-emerald-400 font-mono">PASSED</span>
    </div>
    
    <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-emerald-400 font-bold">✓</span>
        <span>Extrusion Temperature & Thermal Stability</span>
      </div>
      <span class="text-emerald-400 font-mono">PASSED</span>
    </div>

    <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between border-amber-500/40">
      <div class="flex items-center gap-2">
        <span class="text-amber-400 font-bold">⚠</span>
        <span>Print Speed Dynamics (70 mm/s high for overhangs)</span>
      </div>
      <span class="text-amber-400 font-mono">WARNING</span>
    </div>

    <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between border-amber-500/40">
      <div class="flex items-center gap-2">
        <span class="text-amber-400 font-bold">⚠</span>
        <span>Overhang Geometry (>45° angle detected on layer 88)</span>
      </div>
      <span class="text-amber-400 font-mono">WARNING</span>
    </div>

    <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-emerald-400 font-bold">✓</span>
        <span>Infill Structural Load Suitability</span>
      </div>
      <span class="text-emerald-400 font-mono">PASSED</span>
    </div>
  `;
}

// ==========================================
// 10. AI MACHINE RECOMMENDATION ENGINE
// ==========================================

function renderMachineRecommendations() {
  const container = document.getElementById('machine-recommendation-cards');
  if (!container) return;

  container.innerHTML = `
    <!-- Top Recommendation -->
    <div class="bg-slate-900 rounded-2xl border-2 border-emerald-500/80 p-6 shadow-2xl space-y-4 relative overflow-hidden">
      <div class="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase font-mono px-3 py-1 rounded-bl-xl">
        ★ BEST AI MATCH
      </div>

      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl">
          AM-05
        </div>
        <div>
          <h2 class="font-extrabold text-lg text-white">AM-05 — Voron 2.4 Custom</h2>
          <p class="text-xs text-slate-400">High-Temp Enclosed CoreXY • Build Vol: 300x300x300 mm</p>
        </div>
      </div>

      <div class="space-y-2 text-xs font-mono pt-2 border-t border-slate-800">
        <div class="flex items-center gap-2 text-emerald-400">
          <span>✓</span> <span>Available Immediately (0 min wait time)</span>
        </div>
        <div class="flex items-center gap-2 text-emerald-400">
          <span>✓</span> <span>Full PETG & ABS material compatibility</span>
        </div>
        <div class="flex items-center gap-2 text-emerald-400">
          <span>✓</span> <span>High machine reliability rating (96% Health Score)</span>
        </div>
        <div class="flex items-center gap-2 text-emerald-400">
          <span>✓</span> <span>Low Queue Backlog (0 pending jobs)</span>
        </div>
      </div>

      <button onclick="openNewJobModalForPrinter('AM-05')" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg transition">
        Select Printer AM-05 & Submit Job ➔
      </button>
    </div>

    <!-- Alternative Match -->
    <div class="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xl">
          AM-02
        </div>
        <div>
          <h2 class="font-extrabold text-lg text-white">AM-02 — Bambu Lab X1-Carbon</h2>
          <p class="text-xs text-slate-400">High-Speed Multi-Color • Build Vol: 256x256x256 mm</p>
        </div>
      </div>

      <div class="space-y-2 text-xs font-mono pt-2 border-t border-slate-800">
        <div class="flex items-center gap-2 text-amber-400">
          <span>⏳</span> <span>Currently Printing — Est. Wait: 42 minutes</span>
        </div>
        <div class="flex items-center gap-2 text-emerald-400">
          <span>✓</span> <span>Ultra fast extrusion speed (120 mm/s)</span>
        </div>
        <div class="flex items-center gap-2 text-emerald-400">
          <span>✓</span> <span>Automated Flow Calibration & Lidar Inspection</span>
        </div>
      </div>

      <button onclick="openNewJobModalForPrinter('AM-02')" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs border border-slate-700 transition">
        Reserve Next in Queue for AM-02
      </button>
    </div>
  `;
}

// ==========================================
// 11. MATERIAL INVENTORY RENDERER
// ==========================================

function renderMaterialsGrid() {
  const container = document.getElementById('materials-grid');
  if (!container) return;

  container.innerHTML = materials.map(m => `
    <div class="bg-slate-900 rounded-2xl border ${m.lowStock ? 'border-amber-500/60 bg-amber-950/10' : 'border-slate-800'} p-5 shadow-xl space-y-4">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 class="font-extrabold text-base text-white" style="color: ${m.color}">${m.type}</h3>
          <p class="text-[11px] text-slate-400 font-mono">${m.name}</p>
        </div>
        ${m.lowStock ? `<span class="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 font-mono font-bold text-[10px] animate-pulse">LOW STOCK</span>` : `<span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono font-bold text-[10px]">OK</span>`}
      </div>

      <div class="space-y-2 text-xs font-mono">
        <div class="flex justify-between">
          <span class="text-slate-400">Current Stock:</span>
          <strong class="text-white">${m.stockKg} kg</strong>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Used Today:</span>
          <span class="text-cyan-400">${m.usedTodayG} g</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Est. Remaining Prints:</span>
          <span class="text-emerald-400">${m.estPrintsRemaining} prints</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Cost per Gram:</span>
          <span class="text-slate-200">₹${m.costPerGram.toFixed(1)} / g</span>
        </div>

        <div class="w-full bg-slate-800 rounded-full h-2 mt-2">
          <div class="h-2 rounded-full transition-all duration-300" style="width: ${(m.stockKg / m.maxKg)*100}%; background-color: ${m.color}"></div>
        </div>
      </div>

      <button onclick="showRefillModal('${m.type}')" class="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700">
        Refill Stock Spool
      </button>
    </div>
  `).join('');
}

function showRefillModal(materialType = 'PLA') {
  const m = materials.find(x => x.type === materialType);
  if (m) {
    m.stockKg = Math.min(m.maxKg, m.stockKg + 1.0);
    m.lowStock = m.stockKg < 1.5;
    showToast(`Added 1.0 kg refill spool for ${m.type}!`, "success");
    renderMaterialsGrid();
    updateDashboardMetrics();
  }
}

// ==========================================
// 12. PREDICTIVE MAINTENANCE RENDERER
// ==========================================

function renderMaintenanceCards() {
  const container = document.getElementById('maintenance-cards-grid');
  if (!container) return;

  container.innerHTML = printers.map(p => `
    <div class="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-3">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 class="font-bold text-sm text-white font-mono">${p.id} — ${p.name}</h3>
          <p class="text-[11px] text-slate-400 font-sans">Op Hours: ${p.operatingHours} hrs • Errors: ${p.errorCount}</p>
        </div>
        <div class="text-right">
          <span class="text-xs font-mono font-bold ${p.healthScore > 90 ? 'text-emerald-400' : 'text-amber-400'}">Health: ${p.healthScore}%</span>
        </div>
      </div>

      <div class="space-y-1.5 text-xs">
        <div class="flex justify-between text-slate-400 font-mono text-[11px]">
          <span>Last Maintenance: ${p.lastMaintenance}</span>
          <span>Next Scheduled: ${p.nextMaintenance}</span>
        </div>

        <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
          <span class="font-bold text-cyan-300 block">AI Maintenance Prediction:</span>
          <p class="text-slate-300 text-[11px] leading-relaxed">
            "${p.healthScore > 90 ? 'Machine operating within normal parameters. No immediate intervention required.' : 'Nozzle temperature variance detected. Inspect extruder assembly & perform Z-offset bed calibration.'}"
          </p>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 13. ANALYTICS CHARTS RENDERER
// ==========================================

function renderAnalyticsCharts() {
  // Fleet Utilization Chart
  const ctxUtil = document.getElementById('analytics-utilization-chart')?.getContext('2d');
  if (ctxUtil) {
    if (chartUtilInstance) chartUtilInstance.destroy();

    chartUtilInstance = new Chart(ctxUtil, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          { label: 'Lab Utilization Rate (%)', data: [65, 78, 85, 92, 88, 70, 60], borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.15)', fill: true, tension: 0.4 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#94a3b8' } } },
        scales: { x: { ticks: { color: '#64748b' } }, y: { ticks: { color: '#64748b' } } }
      }
    });
  }

  // Material Breakdown Chart
  const ctxMat = document.getElementById('analytics-material-chart')?.getContext('2d');
  if (ctxMat) {
    if (chartMatInstance) chartMatInstance.destroy();

    chartMatInstance = new Chart(ctxMat, {
      type: 'doughnut',
      data: {
        labels: ['PLA', 'ABS', 'PETG', 'TPU'],
        datasets: [{ data: [420, 310, 180, 90], backgroundColor: ['#38bdf8', '#a855f7', '#10b981', '#f59e0b'] }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right', labels: { color: '#94a3b8' } } }
      }
    });
  }
}

function setAnalyticsTimeframe(tf) {
  showToast(`Analytics timeframe set to ${tf}`, "info");
  renderAnalyticsCharts();
}

// ==========================================
// 14. 3D EXTRUDER TOOLPATH CANVAS VISUALIZER
// ==========================================

function initToolpathCanvas() {
  const canvas = document.getElementById('toolpath-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let angle = 0;
  let layerLine = 0;

  function drawFrame() {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid Bed
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw Simulated 3D Toolpath Extrusion (Gyroid / Gear shape)
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;

    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = 0; i <= angle; i += 0.05) {
      const r = radius + Math.sin(i * 8) * 15;
      const x = centerX + Math.cos(i) * r;
      const y = centerY + Math.sin(i) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw Nozzle Head Indicator
    const headX = centerX + Math.cos(angle) * (radius + Math.sin(angle * 8) * 15);
    const headY = centerY + Math.sin(angle) * (radius + Math.sin(angle * 8) * 15);

    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(headX, headY, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(headX, headY, 3, 0, Math.PI * 2);
    ctx.fill();

    angle += 0.03;
    if (angle > Math.PI * 2) angle = 0;

    toolpathAnimationId = requestAnimationFrame(drawFrame);
  }

  drawFrame();
}

// ==========================================
// 15. FLOATING AI ASSISTANT (AM COPILOT)
// ==========================================

function toggleCopilot() {
  const box = document.getElementById('copilot-box');
  box.classList.toggle('hidden');
}

function sendCopilotMsg() {
  const input = document.getElementById('copilot-input');
  const query = input?.value.trim();
  if (!query) return;

  addCopilotMessage('user', query);
  input.value = '';

  // Process AI answer based on current live lab state
  setTimeout(() => {
    const answer = generateCopilotResponse(query);
    addCopilotMessage('ai', answer);
  }, 500);
}

function askCopilotPrompt(promptText) {
  document.getElementById('copilot-box').classList.remove('hidden');
  addCopilotMessage('user', promptText);
  setTimeout(() => {
    const answer = generateCopilotResponse(promptText);
    addCopilotMessage('ai', answer);
  }, 400);
}

function addCopilotMessage(sender, text) {
  const body = document.getElementById('copilot-messages');
  if (!body) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `flex items-start gap-2 ${sender === 'user' ? 'justify-end' : ''}`;

  if (sender === 'user') {
    msgDiv.innerHTML = `
      <div class="p-2.5 rounded-xl bg-cyan-600 text-slate-950 font-medium max-w-[85%] leading-relaxed">
        ${text}
      </div>
    `;
  } else {
    msgDiv.innerHTML = `
      <div class="w-6 h-6 rounded bg-cyan-950 text-cyan-400 flex items-center justify-center shrink-0">🤖</div>
      <div class="p-2.5 rounded-xl bg-slate-800 text-slate-200 max-w-[85%] leading-relaxed">
        ${text}
      </div>
    `;
  }

  body.appendChild(msgDiv);
  body.scrollTop = body.scrollHeight;
}

function generateCopilotResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('available') || q.includes('free')) {
    const freePrinters = printers.filter(p => p.status === 'AVAILABLE').map(p => p.id);
    return `Currently, <strong>${freePrinters.length} printers</strong> are available: <strong>${freePrinters.join(', ')}</strong>. AM-05 (Voron 2.4) is ideal for PETG/ABS jobs!`;
  }
  if (q.includes('petg')) {
    return `For PETG material, <strong>AM-05 (Voron 2.4)</strong> and <strong>AM-01 (Prusa i3)</strong> are optimal. AM-05 has zero queue right now!`;
  }
  if (q.includes('infill') || q.includes('strong') || q.includes('gear')) {
    return `For structural mechanical parts like gears, I recommend <strong>35% to 45% Infill Density</strong> with a <strong>Gyroid pattern</strong> at a 45° angle.`;
  }
  if (q.includes('cost') || q.includes('price')) {
    return `Standard PLA costs ₹2.0/g, PETG costs ₹2.8/g, and ABS costs ₹2.5/g. An average 86g job costs approx <strong>₹172</strong>.`;
  }
  if (q.includes('maintenance') || q.includes('am-04')) {
    return `AM-04 (Ender 3 Max) is undergoing PTFE bowden tube maintenance. Health score is 82%. Service completion expected today at 4:00 PM.`;
  }

  return `Based on live telemetry: We have 8 total printers, 3 available, 4 active prints, and 7 jobs in queue. Let me know if you want me to recommend optimal parameters for your 3D model!`;
}

// ==========================================
// 16. AUTOMATED AI DEMO ENGINE (2-3 MINUTE WALKTHROUGH)
// ==========================================

const demoSequence = [
  { step: 1, nav: 'dashboard', text: "Step 1/17: Welcome to the AI-Powered Smart AM Lab Portal. Viewing live laboratory control center metrics." },
  { step: 2, nav: 'printers', text: "Step 2/17: Live Printer Monitoring. 4 printers active, 3 available, 1 under maintenance." },
  { step: 3, nav: 'availability', text: "Step 3/17: Viewing floorplan availability map. AM-05 is identified as free." },
  { step: 4, nav: 'optimizer', text: "Step 4/17: Opening AI Parameter Optimizer. Selecting PETG Mechanical Part with High Strength." },
  { step: 5, action: () => runAIOptimizer(), text: "Step 5/17: AI calculates optimal parameters: 35% Gyroid infill, 45° angle, 0.20mm layer height." },
  { step: 6, action: () => {}, text: "Step 6/17: AI estimates print duration: 2h 18m, material weight: 86g, cost: ₹172." },
  { step: 7, nav: 'risk', text: "Step 7/17: Running AI Print Failure Risk Analysis. Risk score evaluated at 18% (LOW RISK)." },
  { step: 8, nav: 'machine-rec', text: "Step 8/17: AI Smart Machine Selection recommends Printer AM-05 based on zero wait time & volume." },
  { step: 9, nav: 'queue', text: "Step 9/17: Viewing current Print Queue. 7 pending student jobs waiting." },
  { step: 10, action: () => aiOptimizeQueue(), text: "Step 10/17: Clicked 'AI Optimize Queue'. Jobs re-ordered by PETG material batching!" },
  { step: 11, action: () => simulateJobDispatch(), text: "Step 11/17: Job assigned to AM-05. Printer transitions to PRINTING status!" },
  { step: 12, nav: 'printers', text: "Step 12/17: Live Printer Monitoring updated. AM-05 actively extruding layer 1." },
  { step: 13, action: () => inspectPrinterDetails('AM-05'), text: "Step 13/17: Inspecting live telemetry stream & 3D toolpath visualizer for AM-05." },
  { step: 14, action: () => triggerSimulatedAnomaly(), text: "Step 14/17: Simulated AI thermal anomaly alert triggered on AM-06!" },
  { step: 15, action: () => resolveAnomaly('AM-06'), text: "Step 15/17: Applying AI automated re-calibration to resolve thermistor fluctuation." },
  { step: 16, nav: 'analytics', text: "Step 16/17: Reviewing AM Lab operational analytics and fleet utilization rate (88%)." },
  { step: 17, action: () => completeDemoSequence(), text: "Step 17/17: AI Demo Complete! All 17 operational steps verified." }
];

function startAIDemo() {
  isDemoRunning = true;
  demoStep = 0;
  document.getElementById('demo-controller-bar').classList.remove('hidden');
  runNextDemoStep();
}

function runNextDemoStep() {
  if (!isDemoRunning || demoPaused) return;

  if (demoStep >= demoSequence.length) {
    completeDemoSequence();
    return;
  }

  const item = demoSequence[demoStep];
  document.getElementById('demo-step-counter').innerText = `Step ${item.step} / ${demoSequence.length}`;
  document.getElementById('demo-step-desc').innerText = item.text;
  document.getElementById('demo-progress-fill').style.width = `${((item.step) / demoSequence.length) * 100}%`;

  if (item.nav) navigateTo(item.nav);
  if (item.action) item.action();

  demoStep++;
  demoTimer = setTimeout(runNextDemoStep, 4500); // 4.5s per step (~2 minutes total)
}

function nextDemoStep() {
  clearTimeout(demoTimer);
  runNextDemoStep();
}

function prevDemoStep() {
  clearTimeout(demoTimer);
  demoStep = Math.max(0, demoStep - 2);
  runNextDemoStep();
}

function togglePauseDemo() {
  demoPaused = !demoPaused;
  const btn = document.getElementById('demo-pause-btn');
  if (demoPaused) {
    btn.innerHTML = `<i data-lucide="play" class="w-4 h-4 text-emerald-400"></i> Resume`;
    clearTimeout(demoTimer);
  } else {
    btn.innerHTML = `<i data-lucide="pause" class="w-4 h-4 text-amber-400"></i> Pause`;
    runNextDemoStep();
  }
  if (window.lucide) lucide.createIcons();
}

function exitAIDemo() {
  isDemoRunning = false;
  clearTimeout(demoTimer);
  document.getElementById('demo-controller-bar').classList.add('hidden');
  showToast("Exited AI Demo Mode", "info");
}

function completeDemoSequence() {
  isDemoRunning = false;
  clearTimeout(demoTimer);
  showToast("🎉 AI Demo Sequence Completed Successfully!", "success");
  if (window.confetti) confetti();
}

function simulateJobDispatch() {
  const am05 = printers.find(p => p.id === 'AM-05');
  if (am05) {
    am05.status = 'PRINTING';
    am05.currentJob = "Robotics Arm Bracket V3";
    am05.currentUser = "Alex Rivera (Student)";
    am05.material = "PETG";
    am05.progress = 5;
    am05.remainingMinutes = 138;
    am05.nozzleTemp = 235;
    am05.targetNozzleTemp = 235;
    am05.bedTemp = 70;
    am05.targetBedTemp = 70;
    am05.infillDensity = "35%";
    am05.infillPattern = "Gyroid";
    am05.layerHeight = "0.20 mm";
    am05.printSpeed = "50 mm/s";
  }
}

function triggerSimulatedAnomaly() {
  const banner = document.getElementById('anomaly-alert-banner');
  if (banner) banner.classList.remove('hidden');
  showToast("⚠️ AI Anomaly Warning: Thermal fluctuation detected on AM-06!", "warning");
}

function resolveAnomaly(printerId) {
  dismissAnomalyBanner();
  showToast(`✓ AI Auto-Calibrated thermal sensor on ${printerId}. Temperature stabilized!`, "success");
}

function dismissAnomalyBanner() {
  const banner = document.getElementById('anomaly-alert-banner');
  if (banner) banner.classList.add('hidden');
}

// ==========================================
// 17. MODAL JOB SUBMISSION & NOTIFICATIONS
// ==========================================

function openNewJobModal() {
  document.getElementById('modal-new-job').classList.remove('hidden');
}

function openNewJobModalForPrinter(printerId) {
  openNewJobModal();
}

function closeNewJobModal() {
  document.getElementById('modal-new-job').classList.add('hidden');
}

function applyAIModalRecommendations() {
  document.getElementById('new-job-infill').value = "35";
  document.getElementById('new-job-angle').value = "45°";
  document.getElementById('new-job-pattern').value = "Gyroid";
  document.getElementById('new-job-layer').value = "0.20 mm";
  showToast("AI Recommendations Applied to Job Parameters", "success");
}

function submitNewJobFromModal() {
  const name = document.getElementById('new-job-name')?.value || 'New Print Job';
  const mat = document.getElementById('new-job-material')?.value || 'PLA';
  const infill = document.getElementById('new-job-infill')?.value || '35';

  const newJob = {
    id: `JOB-${Math.floor(100 + Math.random()*900)}`,
    student: currentUser.name,
    model: name,
    printer: "AM-05",
    material: mat,
    infill: `${infill}%`,
    infillAngle: "45°",
    layerHeight: "0.20 mm",
    estTime: "2h 15m",
    status: "Queued",
    timeSubmitted: "Just now"
  };

  jobs.unshift(newJob);
  closeNewJobModal();
  showToast(`Print job '${name}' submitted to queue!`, "success");
  updateDashboardMetrics();
  renderFullJobsTable();
  renderQueueTable();
}

function submitBooking() {
  const printer = document.getElementById('book-printer-select')?.value || 'AM-05';
  const proj = document.getElementById('book-project-name')?.value || 'Project';
  const bkId = `BK-${Math.floor(900 + Math.random()*99)}`;

  showToast(`🎉 Reservation confirmed! Booking ID: ${bkId}`, "success");
  if (window.confetti) confetti();
}

function toggleNotifDrawer() {
  const drawer = document.getElementById('notif-drawer');
  drawer.classList.toggle('hidden');
}

function renderNotifications() {
  const list = document.getElementById('notif-list');
  if (!list) return;

  list.innerHTML = notifications.map(n => `
    <div class="p-2.5 hover:bg-slate-800/60 transition flex items-start gap-2.5">
      <i data-lucide="${n.icon}" class="w-4 h-4 ${n.color} shrink-0 mt-0.5"></i>
      <div>
        <div class="font-bold text-slate-200 text-xs">${n.title}</div>
        <p class="text-[11px] text-slate-400 mt-0.5">${n.desc}</p>
        <span class="text-[9px] text-slate-500 font-mono">${n.time}</span>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function addNotification(title, desc, icon, color) {
  notifications.unshift({ id: Date.now(), title, desc, time: "Just now", icon, color });
  renderNotifications();
}

function clearNotifications() {
  notifications = [];
  renderNotifications();
  document.getElementById('notif-badge').classList.add('hidden');
}

// Toast Notification System
function showToast(msg, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `fixed top-16 right-5 z-50 px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 transition-all duration-300 transform translate-y-[-10px] opacity-0 ${type === 'success' ? 'bg-emerald-950 border border-emerald-500 text-emerald-200' : type === 'warning' ? 'bg-amber-950 border border-amber-500 text-amber-200' : 'bg-slate-900 border border-cyan-500 text-cyan-200'}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'warning' ? '⚠' : 'ℹ'}</span> <span>${msg}</span>`;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-[-10px]', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-[-10px]');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
