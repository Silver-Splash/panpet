import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  LayoutDashboard, Package, Factory, ShoppingCart, Truck,
  DollarSign, Users, Clock, Bell, AlertTriangle, CheckCircle,
  TrendingUp, TrendingDown, Plus, ChevronDown, Shield,
  FileText, Calendar, BarChart2, User, Eye, Settings,
  LogOut, RefreshCw, ArrowRight, Layers, Home, Sun, Moon,
  ArrowUpRight,
  LayoutDashboardIcon
} from "lucide-react";
import "./index.css";
import { Link } from "react-router";

/* ===================== DATA (unchanged) ===================== */
const prodWeek = [
  { day: "Mon", bread: 1240, water: 480, sachet: 1850, chips: 280 },
  { day: "Tue", bread: 1180, water: 510, sachet: 2100, chips: 320 },
  { day: "Wed", bread: 1350, water: 445, sachet: 1920, chips: 295 },
  { day: "Thu", bread: 1290, water: 530, sachet: 2200, chips: 340 },
  { day: "Fri", bread: 1420, water: 495, sachet: 2050, chips: 310 },
  { day: "Sat", bread: 1580, water: 560, sachet: 2400, chips: 380 },
  { day: "Sun", bread: 900, water: 320, sachet: 1400, chips: 190 },
];
const revMonths = [
  { month: "Oct", rev: 1840000, exp: 980000 },
  { month: "Nov", rev: 2100000, exp: 1050000 },
  { month: "Dec", rev: 2650000, exp: 1200000 },
  { month: "Jan", rev: 2280000, exp: 1100000 },
  { month: "Feb", rev: 2490000, exp: 1180000 },
  { month: "Mar", rev: 2840000, exp: 1240000 },
];
const salesPie = [
  { name: "Bread", value: 42, color: "#f0a31a" },
  { name: "Bottled Water", value: 28, color: "#4d9af8" },
  { name: "Sachet Water", value: 18, color: "#12d49a" },
  { name: "Chips/Snacks", value: 12, color: "#ff7f41" },
];
const stockItems = [
  { item: "Flour", unit: "kg", qty: 450, max: 500, status: "ok" },
  { item: "Sugar", unit: "kg", qty: 45, max: 200, status: "low" },
  { item: "Margarine", unit: "kg", qty: 30, max: 100, status: "low" },
  { item: "Baking Soda", unit: "kg", qty: 8, max: 50, status: "critical" },
  { item: "PET Bottles", unit: "pcs", qty: 1200, max: 5000, status: "low" },
  { item: "Sachet Rolls", unit: "rolls", qty: 8, max: 20, status: "watch" },
  { item: "Groundnut Oil", unit: "L", qty: 25, max: 100, status: "low" },
  { item: "Seasoning Mix", unit: "kg", qty: 3, max: 20, status: "critical" },
  { item: "Pkg. Nylon", unit: "m", qty: 200, max: 500, status: "ok" },
  { item: "Salt", unit: "kg", qty: 80, max: 100, status: "ok" },
  { item: "Yeast", unit: "kg", qty: 15, max: 40, status: "watch" },
  { item: "Plantain", unit: "kg", qty: 120, max: 200, status: "ok" },
];
const employees = [
  { id: "EMP001", name: "Chukwuemeka Obi", dept: "Production", role: "Production Manager", status: "present", time: "07:48", salary: 85000 },
  { id: "EMP002", name: "Ngozi Eze", dept: "Sales", role: "Sales Officer", status: "present", time: "08:02", salary: 65000 },
  { id: "EMP003", name: "Ifeanyi Nwosu", dept: "Logistics", role: "Driver", status: "on-route", time: "08:30", salary: 55000 },
  { id: "EMP004", name: "Amaka Okafor", dept: "Finance", role: "Cashier", status: "present", time: "07:55", salary: 70000 },
  { id: "EMP005", name: "Obiora Dim", dept: "Production", role: "Baker", status: "present", time: "07:40", salary: 52000 },
  { id: "EMP006", name: "Chidinma Ilo", dept: "Admin", role: "Receptionist", status: "present", time: "08:00", salary: 48000 },
  { id: "EMP007", name: "Kenneth Nnadi", dept: "Security", role: "Security Guard", status: "present", time: "06:00", salary: 45000 },
  { id: "EMP008", name: "Precious Okeke", dept: "Production", role: "Water Operator", status: "late", time: "09:15", salary: 52000 },
  { id: "EMP009", name: "Sunday Onuoha", dept: "Logistics", role: "Driver", status: "on-route", time: "08:45", salary: 55000 },
  { id: "EMP010", name: "Blessing Ani", dept: "Sales", role: "Sales Rep", status: "absent", time: "—", salary: 60000 },
  { id: "EMP011", name: "Emeka Uzoma", dept: "Production", role: "Snacks Operator", status: "present", time: "07:55", salary: 52000 },
  { id: "EMP012", name: "Grace Anyanwu", dept: "HR", role: "HR Manager", status: "present", time: "08:10", salary: 90000 },
];
const dispatches = [
  { id: "DSP001", driver: "Ifeanyi Nwosu", vehicle: "KJA-422-AA", loaded: 240, sold: 198, returned: 24, outstanding: 18, amount: 89400, status: "active" },
  { id: "DSP002", driver: "Sunday Onuoha", vehicle: "LND-817-BB", loaded: 180, sold: 162, returned: 18, outstanding: 0, amount: 72900, status: "reconciled" },
  { id: "DSP003", driver: "Emeka Chukwu", vehicle: "ABJ-304-CC", loaded: 300, sold: 245, returned: 30, outstanding: 25, amount: 110250, status: "active" },
];
const transactions = [
  { id: "TRX001", type: "income", desc: "Bread Sales — Walk-in", amount: 48500, time: "08:32", by: "Amaka Okafor" },
  { id: "TRX002", type: "income", desc: "Water Dispatch Remittance — Ifeanyi", amount: 89400, time: "09:15", by: "Amaka Okafor" },
  { id: "TRX003", type: "expense", desc: "Flour Purchase — Nweze Ventures", amount: 62000, time: "10:00", by: "Amaka Okafor" },
  { id: "TRX004", type: "income", desc: "Chips Sales — Retailer Batch", amount: 22500, time: "10:45", by: "Amaka Okafor" },
  { id: "TRX005", type: "expense", desc: "Generator Fuel", amount: 18000, time: "11:20", by: "Amaka Okafor" },
  { id: "TRX006", type: "income", desc: "Sachet Water — Wholesale Order", amount: 35000, time: "12:05", by: "Amaka Okafor" },
  { id: "TRX007", type: "income", desc: "Bread Retailer — Nkemjika Stores", amount: 31000, time: "13:40", by: "Amaka Okafor" },
  { id: "TRX008", type: "expense", desc: "Staff Transport Allowance", amount: 12000, time: "14:00", by: "Amaka Okafor" },
];

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "OVERVIEW" },
  { id: "stock", label: "Stock Management", icon: Package, group: "OPERATIONS" },
  { id: "production", label: "Production", icon: Factory, group: "OPERATIONS" },
  { id: "sales", label: "Sales & Marketing", icon: ShoppingCart, group: "OPERATIONS" },
  { id: "logistics", label: "Logistics", icon: Truck, group: "OPERATIONS" },
  { id: "finance", label: "Finance & Cashier", icon: DollarSign, group: "FINANCE" },
  { id: "hr", label: "HR Management", icon: Users, group: "PEOPLE" },
  { id: "attendance", label: "Attendance", icon: Clock, group: "PEOPLE" },
  { id: "reports", label: "Reports", icon: FileText, group: "SYSTEM" },
  { id: "users", label: "User Management", icon: Shield, group: "SYSTEM" },
];
const ROLES = [
  { id: "ceo", label: "CEO / Super Admin", color: "#f0a31a" },
  { id: "gm", label: "General Manager", color: "#4d9af8" },
  { id: "production", label: "Production Manager", color: "#12d49a" },
  { id: "cashier", label: "Cashier / Finance", color: "#ff7f41" },
  { id: "stock", label: "Stock Manager", color: "#a78bfa" },
  { id: "hr", label: "HR Manager", color: "#f472b6" },
  { id: "driver", label: "Driver", color: "#5a8db0" },
];
const ACCESS = {
  ceo: ["dashboard", "stock", "production", "sales", "logistics", "finance", "hr", "attendance", "reports", "users"],
  gm: ["dashboard", "stock", "production", "sales", "logistics", "finance", "hr", "attendance", "reports"],
  production: ["production", "stock"],
  cashier: ["finance", "sales"],
  stock: ["stock"],
  hr: ["hr", "attendance"],
  driver: ["logistics"],
};

/* ===================== HELPERS ===================== */
const fmt = (n) => new Intl.NumberFormat("en-NG").format(n);
const fmtN = (n) => `₦${fmt(n)}`;

/* ===================== SHARED COMPONENTS ===================== */
const Badge = ({ status }) => {
  const map = {
    ok: "bg-greenBg text-green",
    low: "bg-goldBg text-gold",
    critical: "bg-redBg text-red",
    watch: "bg-orangeBg text-orange",
    present: "bg-greenBg text-green",
    absent: "bg-redBg text-red",
    late: "bg-goldBg text-gold",
    "on-route": "bg-blueBg text-blue",
    active: "bg-blueBg text-blue",
    reconciled: "bg-greenBg text-green",
    income: "bg-greenBg text-green",
    expense: "bg-redBg text-red",
  };
  const cls = map[status] || "bg-border text-t2";
  return (
    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider whitespace-nowrap ${cls}`}>
      {status}
    </span>
  );
};

const Pct = ({ val, max, status }) => {
  const p = Math.min(Math.round((val / max) * 100), 100);
  const col = { ok: "bg-green", low: "bg-gold", critical: "bg-red", watch: "bg-orange" }[status] || "bg-blue";
  return (
    <div className="flex items-center gap-2 min-w-[110px]">
      <div className="flex-1 h-1.5 bg-border rounded">
        <div className={`h-full rounded transition-all duration-300 ${col}`} style={{ width: `${p}%` }} />
      </div>
      <span className="text-[11px] text-t2 font-mono min-w-[28px]">{p}%</span>
    </div>
  );
};

const KpiCard = ({ title, value, sub, icon: Icon, color, trend, trendVal, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-card border border-border rounded-xl p-[18px_20px] flex-1 transition-colors min-w-0 ${onClick ? "cursor-pointer hover:border-borderMid" : ""}`}
  >
    <div className="flex justify-between items-start mb-3">
      <span className="text-t2 text-[11px] font-semibold tracking-wider uppercase">{title}</span>
      <div className="p-1.5 rounded-lg flex" style={{ backgroundColor: `${color}22` }}>
        <Icon size={15} color={color} />
      </div>
    </div>
    <div className="text-[26px] font-extrabold text-t1 font-mono tracking-tight mb-1.5">{value}</div>
    <div className="flex items-center gap-1.5">
      {trend && (
        <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${trend === "up" ? "text-green" : "text-red"}`}>
          {trend === "up" ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {trendVal}
        </span>
      )}
      <span className="text-t3 text-[11px]">{sub}</span>
    </div>
  </div>
);

const SectionHeader = ({ title, sub, action, actionLabel }) => (
  <div className="flex justify-between items-center mb-4">
    <div>
      <div className="text-t1 font-bold text-[15px]">{title}</div>
      {sub && <div className="text-t2 text-xs mt-0.5">{sub}</div>}
    </div>
    {actionLabel && (
      <button onClick={action} className="bg-gold text-black border-none rounded-lg px-3.5 py-1.5 text-xs font-bold cursor-pointer flex items-center gap-1.5">
        <Plus size={13} /> {actionLabel}
      </button>
    )}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-card border border-border rounded-xl p-5 ${className}`}>{children}</div>
);

const THead = ({ cols }) => (
  <thead>
    <tr className="border-b border-border">
      {cols.map(c => (
        <th key={c} className="text-left px-3 py-2 text-t3 text-[10px] font-bold tracking-widest uppercase">{c}</th>
      ))}
    </tr>
  </thead>
);

/* ===================== VIEWS (all modules) ===================== */

// Dashboard
const DashboardView = ({ setModule }) => {
  const alerts = stockItems.filter(s => s.status !== "ok");
  return (
    <div>
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3.5 mb-5">
        <KpiCard title="Monthly Revenue" value="₦2.84M" sub="vs last month" icon={DollarSign} color="#f0a31a" trend="up" trendVal="+14.1%" onClick={() => setModule("finance")} />
        <KpiCard title="Today's Output" value="5,965" sub="units across all lines" icon={Factory} color="#12d49a" trend="up" trendVal="+8.3%" onClick={() => setModule("production")} />
        <KpiCard title="Stock Alerts" value={String(alerts.length)} sub="items need attention" icon={AlertTriangle} color="#f44f70" onClick={() => setModule("stock")} />
        <KpiCard title="Staff Present" value="18 / 24" sub="75% attendance today" icon={Users} color="#4d9af8" onClick={() => setModule("hr")} />
      </div>
      {/* Charts */}
      <div className="grid grid-cols-[3fr_1.4fr] gap-3.5 mb-3.5">
        <Card>
          <SectionHeader title="Revenue vs. Expenses" sub="Last 6 months" />
          <div className="flex gap-4 mb-2.5">
            {[{ l: "Revenue", c: "#f0a31a" }, { l: "Expenses", c: "#f44f70" }].map(i => (
              <span key={i.l} className="flex items-center gap-1.5 text-[11px]" style={{ color: i.c }}>
                <span className="w-2.5 h-0.5 rounded inline-block" style={{ background: i.c }} /> {i.l}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={revMonths}>
              <defs>
                <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f0a31a" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#f0a31a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gE" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f44f70" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#f44f70" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "var(--color-t3)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "var(--color-hover)", border: "1px solid var(--color-border)", borderRadius: 8, color: "var(--color-t1)", fontSize: 11 }} formatter={v => `₦${(v / 1000000).toFixed(2)}M`} />
              <Area type="monotone" dataKey="rev" stroke="#f0a31a" strokeWidth={2} fill="url(#gR)" />
              <Area type="monotone" dataKey="exp" stroke="#f44f70" strokeWidth={2} fill="url(#gE)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionHeader title="Sales Mix" sub="March 2025" />
          <ResponsiveContainer width="100%" height={110}>
            <PieChart>
              <Pie data={salesPie} cx="50%" cy="50%" innerRadius={28} outerRadius={50} paddingAngle={2} dataKey="value">
                {salesPie.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={v => `${v}%`} contentStyle={{ background: "var(--color-hover)", border: "1px solid var(--color-border)", borderRadius: 8, color: "var(--color-t1)", fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-2.5 mt-1.5">
            {salesPie.map(p => (
              <div key={p.name} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                <span className="text-t2 text-[10px] flex-1">{p.name}</span>
                <span className="text-t1 text-[11px] font-mono font-bold">{p.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      {/* Production chart */}
      <Card className="mb-3.5">
        <SectionHeader title="Weekly Production Output" sub="All lines — current week" />
        <div className="flex gap-3.5 mb-2">
          {[{ l: "Bread", c: "#f0a31a" }, { l: "Bottles", c: "#4d9af8" }, { l: "Sachet", c: "#12d49a" }, { l: "Chips", c: "#ff7f41" }].map(i => (
            <span key={i.l} className="flex items-center gap-1.5 text-[11px]" style={{ color: i.c }}>
              <span className="w-2.5 h-0.5 rounded inline-block" style={{ background: i.c }} /> {i.l}
            </span>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={prodWeek} barGap={2} barCategoryGap="30%">
            <XAxis dataKey="day" tick={{ fill: "var(--color-t3)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={{ background: "var(--color-hover)", border: "1px solid var(--color-border)", borderRadius: 8, color: "var(--color-t1)", fontSize: 11 }} />
            <Bar dataKey="bread" fill="#f0a31a" radius={[2, 2, 0, 0]} />
            <Bar dataKey="water" fill="#4d9af8" radius={[2, 2, 0, 0]} />
            <Bar dataKey="sachet" fill="#12d49a" radius={[2, 2, 0, 0]} />
            <Bar dataKey="chips" fill="#ff7f41" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      {/* Alerts & Transactions */}
      <div className="grid grid-cols-2 gap-3.5">
        <Card>
          <SectionHeader title="Active Stock Alerts" sub={`${alerts.length} items require attention`} />
          {alerts.map(s => (
            <div key={s.item} className="flex items-center gap-2.5 mb-2.5 p-2 rounded-lg bg-hover">
              <AlertTriangle size={13} color={s.status === "critical" ? "var(--color-red)" : "var(--color-gold)"} />
              <span className="text-t1 text-xs flex-1 font-medium">{s.item}</span>
              <span className="font-mono text-[11px] text-t2">{s.qty} {s.unit}</span>
              <Badge status={s.status} />
            </div>
          ))}
        </Card>
        <Card>
          <SectionHeader title="Today's Finance Log" sub="Cashier activity" />
          {transactions.slice(0, 5).map((t, i) => (
            <div key={t.id} className={`flex items-center gap-2 ${i < 4 ? "pb-2.5 border-b border-border mb-2.5" : ""}`}>
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${t.type === "income" ? "bg-green" : "bg-red"}`} />
              <span className="text-t1 text-xs flex-1 leading-tight">{t.desc}</span>
              <span className={`font-mono text-xs font-bold whitespace-nowrap ${t.type === "income" ? "text-green" : "text-red"}`}>
                {t.type === "income" ? "+" : "-"}₦{fmt(t.amount)}
              </span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// Stock
const StockView = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = stockItems.filter(s => {
    const matchSearch = s.item.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });
  return (
    <div>
      <div className="grid grid-cols-4 gap-3.5 mb-5">
        <KpiCard title="Total SKUs" value="12" sub="active items" icon={Package} color="#4d9af8" />
        <KpiCard title="Low Stock" value={String(stockItems.filter(s => s.status === "low").length)} sub="below reorder level" icon={AlertTriangle} color="#f0a31a" />
        <KpiCard title="Critical Items" value={String(stockItems.filter(s => s.status === "critical").length)} sub="urgent restock" icon={AlertTriangle} color="#f44f70" />
        <KpiCard title="Last Sync" value="09:42" sub="this morning" icon={RefreshCw} color="#12d49a" />
      </div>
      <Card>
        <SectionHeader title="Raw Material Inventory" sub="Live stock levels across all warehouses" actionLabel="Record Inflow" />
        <div className="flex gap-2.5 mb-4">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search material..." className="bg-hover border border-borderMid rounded-lg py-1.5 px-3 text-t1 text-xs flex-1 outline-none" />
          {["all", "ok", "low", "critical", "watch"].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-lg py-1.5 px-3 text-[11px] font-semibold cursor-pointer capitalize border ${filter === f ? "bg-active border-borderMid text-t1" : "bg-hover border-border text-t2"}`}>
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <THead cols={["Material", "Unit", "Qty On Hand", "Max Cap.", "Stock Level", "Status", "Action"]} />
            <tbody>
              {filtered.map(s => (
                <tr key={s.item} className="border-b border-border">
                  <td className="p-2.5 text-t1 text-[13px] font-medium">{s.item}</td>
                  <td className="p-2.5 text-t2 text-xs">{s.unit}</td>
                  <td className="p-2.5 text-t1 text-[13px] font-mono">{fmt(s.qty)}</td>
                  <td className="p-2.5 text-t2 text-xs font-mono">{fmt(s.max)}</td>
                  <td className="p-2.5 min-w-[130px]"><Pct val={s.qty} max={s.max} status={s.status} /></td>
                  <td className="p-2.5"><Badge status={s.status} /></td>
                  <td className="p-2.5"><button className="bg-hover text-t2 border border-border rounded-md px-2.5 py-1 text-[11px] cursor-pointer">Restock</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Production
const ProductionView = () => {
  const lines = [
    { name: "Bread Production", emoji: "🍞", today: 1420, target: 1500, batches: 8, staff: 4, status: "active" },
    { name: "Bottled Water", emoji: "🫙", today: 495, target: 500, batches: 12, staff: 3, status: "active" },
    { name: "Sachet Water", emoji: "💧", today: 2050, target: 2000, batches: 5, staff: 2, status: "over" },
    { name: "Snacks / Chips", emoji: "🥔", today: 310, target: 400, batches: 6, staff: 3, status: "watch" },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 gap-3.5 mb-3.5">
        <KpiCard title="Total Output Today" value="5,965" sub="units across all lines" icon={Factory} color="#f0a31a" />
        <KpiCard title="Active Batches" value="31" sub="in production now" icon={Layers} color="#12d49a" />
        <KpiCard title="Production Staff" value="12" sub="operators on shift" icon={Users} color="#4d9af8" />
        <KpiCard title="Avg Efficiency" value="91%" sub="vs last week 84%" icon={BarChart2} color="#ff7f41" trend="up" trendVal="+7%" />
      </div>
      <div className="grid grid-cols-2 gap-3.5 mb-3.5">
        {lines.map(l => {
          const pct = Math.min(Math.round((l.today / l.target) * 100), 100);
          const col = l.status === "watch" ? "var(--color-gold)" : l.status === "over" ? "var(--color-green)" : "var(--color-blue)";
          return (
            <Card key={l.name} className="border-l-4" style={{ borderLeftColor: col }}>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{l.emoji}</span>
                  <div>
                    <div className="text-t1 font-bold text-sm">{l.name}</div>
                    <div className="text-t2 text-[11px] mt-0.5">{l.batches} batches · {l.staff} operators</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${col}22`, color: col }}>
                  {l.status === "watch" ? "Behind" : l.status === "over" ? "Exceeded" : "On Track"}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-t2 text-[11px]">Today's output</span>
                <span className="text-t1 font-mono text-[13px] font-extrabold">{fmt(l.today)} / {fmt(l.target)}</span>
              </div>
              <div className="bg-border rounded-md h-2.5">
                <div className="h-full rounded-md transition-all" style={{ width: `${pct}%`, background: col }} />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-t3 text-[10px]">0</span>
                <span className="text-[10px] font-bold" style={{ color: col }}>{pct}%</span>
                <span className="text-t3 text-[10px]">{fmt(l.target)}</span>
              </div>
            </Card>
          );
        })}
      </div>
      <Card>
        <SectionHeader title="7-Day Production Trend" sub="All production lines" />
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={prodWeek} barGap={2} barCategoryGap="25%">
            <XAxis dataKey="day" tick={{ fill: "var(--color-t3)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--color-t3)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <Tooltip contentStyle={{ background: "var(--color-hover)", border: "1px solid var(--color-border)", borderRadius: 8, color: "var(--color-t1)", fontSize: 11 }} />
            <Bar dataKey="bread" fill="#f0a31a" radius={[3, 3, 0, 0]} />
            <Bar dataKey="water" fill="#4d9af8" radius={[3, 3, 0, 0]} />
            <Bar dataKey="sachet" fill="#12d49a" radius={[3, 3, 0, 0]} />
            <Bar dataKey="chips" fill="#ff7f41" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

// Sales
const SalesView = () => (
  <div>
    <div className="grid grid-cols-4 gap-3.5 mb-5">
      <KpiCard title="Today's Revenue" value="₦257K" sub="from all channels" icon={DollarSign} color="#f0a31a" trend="up" trendVal="+12.4%" />
      <KpiCard title="Active Dispatches" value="3" sub="drivers on route" icon={Truck} color="#4d9af8" />
      <KpiCard title="Outstanding Bal." value="₦18K" sub="pending reconciliation" icon={AlertTriangle} color="#f0a31a" />
      <KpiCard title="Walk-in Sales" value="₦48.5K" sub="direct today" icon={ShoppingCart} color="#12d49a" />
    </div>
    <Card className="mb-3.5">
      <SectionHeader title="Driver Dispatch Accountability" sub="Daily load, sold, returned, and outstanding per driver" />
      <table className="w-full border-collapse">
        <THead cols={["ID", "Driver", "Vehicle", "Loaded", "Sold", "Returned", "Outstanding", "Amount", "Status"]} />
        <tbody>
          {dispatches.map(d => (
            <tr key={d.id} className="border-b border-border">
              <td className="p-2.5 text-t3 text-[11px] font-mono">{d.id}</td>
              <td className="p-2.5 text-t1 text-[13px] font-semibold">{d.driver}</td>
              <td className="p-2.5 text-t2 text-[11px] font-mono">{d.vehicle}</td>
              <td className="p-2.5 text-t1 text-[13px] font-mono">{d.loaded}</td>
              <td className="p-2.5 text-green text-[13px] font-mono font-bold">{d.sold}</td>
              <td className="p-2.5 text-blue text-[13px] font-mono">{d.returned}</td>
              <td className={`p-2.5 text-[13px] font-mono font-extrabold ${d.outstanding > 0 ? "text-red" : "text-green"}`}>{d.outstanding}</td>
              <td className="p-2.5 text-gold text-[13px] font-mono font-bold">{fmtN(d.amount)}</td>
              <td className="p-2.5"><Badge status={d.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    <Card>
      <SectionHeader title="Sales by Product Line" sub="7-day performance" />
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={prodWeek}>
          <XAxis dataKey="day" tick={{ fill: "var(--color-t3)", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <Tooltip contentStyle={{ background: "var(--color-hover)", border: "1px solid var(--color-border)", borderRadius: 8, color: "var(--color-t1)", fontSize: 11 }} />
          <Line type="monotone" dataKey="bread" stroke="#f0a31a" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="water" stroke="#4d9af8" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="sachet" stroke="#12d49a" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="chips" stroke="#ff7f41" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  </div>
);

// Finance
const FinanceView = () => {
  const income = transactions.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);
  return (
    <div>
      <div className="grid grid-cols-4 gap-3.5 mb-5">
        <KpiCard title="Monthly Revenue" value="₦2.84M" sub="total income" icon={TrendingUp} color="#12d49a" trend="up" trendVal="+14.1%" />
        <KpiCard title="Total Expenses" value="₦1.24M" sub="operational costs" icon={TrendingDown} color="#f44f70" />
        <KpiCard title="Net Profit" value="₦1.60M" sub="this month" icon={DollarSign} color="#f0a31a" trend="up" trendVal="+18.2%" />
        <KpiCard title="Today's Balance" value={`+₦${fmt(income - expense)}`} sub="net today" icon={BarChart2} color="#4d9af8" />
      </div>
      <div className="grid grid-cols-[3fr_1fr] gap-3.5 mb-3.5">
        <Card>
          <SectionHeader title="Transaction Log" sub="Today — all cashier activity" actionLabel="Record Payment" />
          <table className="w-full border-collapse">
            <THead cols={["ID", "Description", "Type", "Amount", "Time", "Officer"]} />
            <tbody>
              {transactions.map(t => (
                <tr key={t.id} className="border-b border-border">
                  <td className="p-2.5 text-t3 text-[11px] font-mono">{t.id}</td>
                  <td className="p-2.5 text-t1 text-xs">{t.desc}</td>
                  <td className="p-2.5"><Badge status={t.type} /></td>
                  <td className={`p-2.5 text-xs font-mono font-bold ${t.type === "income" ? "text-green" : "text-red"}`}>
                    {t.type === "income" ? "+" : "-"}₦{fmt(t.amount)}
                  </td>
                  <td className="p-2.5 text-t2 text-[11px] font-mono">{t.time}</td>
                  <td className="p-2.5 text-t2 text-[11px]">{t.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <div className="flex flex-col gap-3.5">
          <Card>
            <div className="text-t2 text-[11px] font-semibold tracking-wider uppercase mb-3.5">Today's Summary</div>
            {[
              { label: "Total Income", val: income, color: "text-green" },
              { label: "Total Expenses", val: expense, color: "text-red" },
              { label: "Net Balance", val: income - expense, color: "text-gold" },
            ].map(r => (
              <div key={r.label} className="flex justify-between items-center mb-3 pb-3 border-b border-border">
                <span className="text-t2 text-xs">{r.label}</span>
                <span className={`font-mono text-[13px] font-bold ${r.color}`}>₦{fmt(r.val)}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div className="text-t2 text-[11px] font-semibold tracking-wider uppercase mb-3.5">Monthly KPIs</div>
            {[
              { label: "Revenue", val: "₦2.84M", color: "text-gold" },
              { label: "Expenses", val: "₦1.24M", color: "text-red" },
              { label: "Profit", val: "₦1.60M", color: "text-green" },
              { label: "Outstanding", val: "₦320K", color: "text-orange" },
            ].map(r => (
              <div key={r.label} className="flex justify-between mb-2.5">
                <span className="text-t2 text-xs">{r.label}</span>
                <span className={`font-mono text-xs font-bold ${r.color}`}>{r.val}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

// HR
const HRView = () => {
  const [tab, setTab] = useState("directory");
  const present = employees.filter(e => e.status === "present" || e.status === "on-route").length;
  const absent = employees.filter(e => e.status === "absent").length;
  const late = employees.filter(e => e.status === "late").length;
  const depts = [...new Set(employees.map(e => e.dept))];
  return (
    <div>
      <div className="grid grid-cols-4 gap-3.5 mb-5">
        <KpiCard title="Total Employees" value="24" sub="active staff" icon={Users} color="#4d9af8" />
        <KpiCard title="Present Today" value={String(present)} sub="clocked in" icon={CheckCircle} color="#12d49a" />
        <KpiCard title="Late Arrivals" value={String(late)} sub="after 08:00" icon={Clock} color="#f0a31a" />
        <KpiCard title="Absent Today" value={String(absent)} sub="unexcused/leave" icon={AlertTriangle} color="#f44f70" />
      </div>
      <div className="flex gap-2 mb-4">
        {["directory", "payroll", "departments"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-lg py-1.5 px-4 text-xs font-semibold cursor-pointer capitalize border ${tab === t ? "bg-gold text-black border-gold" : "bg-hover text-t2 border-border"}`}>
            {t}
          </button>
        ))}
      </div>
      {tab === "directory" && (
        <Card>
          <SectionHeader title="Staff Directory" sub="Today's attendance status" actionLabel="Add Employee" />
          <table className="w-full border-collapse">
            <THead cols={["ID", "Employee", "Department", "Role", "Clock-In", "Status", "Action"]} />
            <tbody>
              {employees.map(e => (
                <tr key={e.id} className="border-b border-border">
                  <td className="p-2.5 text-t3 text-[11px] font-mono">{e.id}</td>
                  <td className="p-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-goldBg border border-gold/50 flex items-center justify-center text-gold text-[10px] font-extrabold flex-shrink-0">
                        {e.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-t1 text-[13px] font-semibold">{e.name}</span>
                    </div>
                  </td>
                  <td className="p-2.5 text-t2 text-xs">{e.dept}</td>
                  <td className="p-2.5 text-t2 text-xs">{e.role}</td>
                  <td className="p-2.5 text-t1 text-xs font-mono">{e.time}</td>
                  <td className="p-2.5"><Badge status={e.status} /></td>
                  <td className="p-2.5"><button className="bg-hover text-t2 border border-border rounded-md px-2.5 py-1 text-[10px] cursor-pointer">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      {tab === "payroll" && (
        <Card>
          <SectionHeader title="Payroll Summary" sub="March 2025" actionLabel="Run Payroll" />
          <table className="w-full border-collapse">
            <THead cols={["Employee", "Department", "Role", "Basic Salary", "Tax (7.5%)", "Net Pay", "Status"]} />
            <tbody>
              {employees.map(e => {
                const tax = Math.round(e.salary * 0.075);
                const net = e.salary - tax;
                return (
                  <tr key={e.id} className="border-b border-border">
                    <td className="p-2.5 text-t1 text-[13px] font-semibold">{e.name}</td>
                    <td className="p-2.5 text-t2 text-xs">{e.dept}</td>
                    <td className="p-2.5 text-t2 text-xs">{e.role}</td>
                    <td className="p-2.5 text-t1 text-[13px] font-mono">₦{fmt(e.salary)}</td>
                    <td className="p-2.5 text-red text-xs font-mono">-₦{fmt(tax)}</td>
                    <td className="p-2.5 text-gold text-[13px] font-mono font-bold">₦{fmt(net)}</td>
                    <td className="p-2.5"><span className="bg-greenBg text-green text-[10px] font-bold px-2 py-0.5 rounded-full">Pending</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
      {tab === "departments" && (
        <div className="grid grid-cols-3 gap-3.5">
          {depts.map(d => {
            const staff = employees.filter(e => e.dept === d);
            const here = staff.filter(e => e.status !== "absent").length;
            return (
              <Card key={d}>
                <div className="text-t1 font-bold text-sm mb-1">{d}</div>
                <div className="text-t2 text-xs mb-3.5">{staff.length} employees</div>
                <div className="flex justify-between mb-2">
                  <span className="text-t2 text-[11px]">Present today</span>
                  <span className="text-green font-mono font-bold text-[13px]">{here}/{staff.length}</span>
                </div>
                <div className="bg-border rounded h-1.5">
                  <div className="h-full rounded bg-green" style={{ width: `${Math.round((here / staff.length) * 100)}%` }} />
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {staff.map(e => (
                    <div key={e.id} className="w-7 h-7 rounded-full bg-hover border border-border flex items-center justify-center text-t2 text-[9px] font-bold" title={e.name}>
                      {e.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Attendance
const AttendanceView = () => {
  const [clockInName, setClockInName] = useState("");
  const [clockLog, setClockLog] = useState([
    { name: "Obiora Dim", time: "07:40", action: "Clock In" },
    { name: "Chukwuemeka Obi", time: "07:48", action: "Clock In" },
    { name: "Amaka Okafor", time: "07:55", action: "Clock In" },
    { name: "Chidinma Ilo", time: "08:00", action: "Clock In" },
    { name: "Ngozi Eze", time: "08:02", action: "Clock In" },
  ]);
  const handleClock = () => {
    if (!clockInName.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setClockLog(prev => [{ name: clockInName, time: timeStr, action: "Clock In" }, ...prev]);
    setClockInName("");
  };
  return (
    <div>
      <div className="grid grid-cols-4 gap-3.5 mb-5">
        <KpiCard title="Present Today" value="18" sub="clocked in" icon={CheckCircle} color="#12d49a" />
        <KpiCard title="Absent" value="2" sub="not in yet" icon={AlertTriangle} color="#f44f70" />
        <KpiCard title="Late (>08:00)" value="1" sub="Precious Okeke" icon={Clock} color="#f0a31a" />
        <KpiCard title="On Route" value="2" sub="drivers dispatched" icon={Truck} color="#4d9af8" />
      </div>
      <div className="grid grid-cols-[1fr_1.8fr] gap-3.5">
        <Card>
          <div className="text-t1 font-bold text-[15px] mb-1">Clock In / Out</div>
          <div className="text-t2 text-xs mb-4">Manual attendance entry</div>
          <input value={clockInName} onChange={e => setClockInName(e.target.value)} placeholder="Employee name..." className="w-full bg-hover border border-borderMid rounded-lg py-2 px-3 text-t1 text-xs outline-none mb-2.5" />
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button onClick={handleClock} className="bg-greenBg text-green border border-green/40 rounded-lg py-2 text-xs font-bold">✓ Clock In</button>
            <button className="bg-redBg text-red border border-red/40 rounded-lg py-2 text-xs font-bold">✕ Clock Out</button>
          </div>
          <div className="text-t2 text-[11px] font-semibold tracking-wider uppercase mb-2.5">Recent Activity</div>
          {clockLog.slice(0, 6).map((l, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green flex-shrink-0" />
              <span className="text-t1 text-xs flex-1">{l.name}</span>
              <span className="text-t2 text-[11px] font-mono">{l.time}</span>
              <span className="text-green text-[10px] font-semibold">{l.action}</span>
            </div>
          ))}
        </Card>
        <Card>
          <div className="text-t1 font-bold text-[15px] mb-1">Today's Attendance Register</div>
          <div className="text-t2 text-xs mb-3.5">Monday, 25 March 2025</div>
          <table className="w-full border-collapse">
            <THead cols={["Employee", "Department", "Clock In", "Status"]} />
            <tbody>
              {employees.map(e => (
                <tr key={e.id} className="border-b border-border">
                  <td className="p-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-hover border border-border flex items-center justify-center text-t2 text-[9px] font-bold flex-shrink-0">
                        {e.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-t1 text-xs font-medium">{e.name}</span>
                    </div>
                  </td>
                  <td className="p-2.5 text-t2 text-[11px]">{e.dept}</td>
                  <td className="p-2.5 text-t1 text-xs font-mono">{e.time}</td>
                  <td className="p-2.5"><Badge status={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// Logistics
const LogisticsView = () => (
  <div>
    <div className="grid grid-cols-4 gap-3.5 mb-5">
      <KpiCard title="Active Drivers" value="3" sub="on route now" icon={Truck} color="#4d9af8" />
      <KpiCard title="Dispatched Today" value="720" sub="total units loaded" icon={Package} color="#f0a31a" />
      <KpiCard title="Delivered" value="605" sub="units confirmed" icon={CheckCircle} color="#12d49a" />
      <KpiCard title="Pending Returns" value="43" sub="awaiting reconciliation" icon={AlertTriangle} color="#ff7f41" />
    </div>
    <Card>
      <SectionHeader title="Driver Dispatch Status" sub="Live tracking — today" actionLabel="New Dispatch" />
      <table className="w-full border-collapse">
        <THead cols={["ID", "Driver", "Vehicle", "Route", "Loaded", "Sold", "Returned", "Amount", "Status"]} />
        <tbody>
          {dispatches.map(d => (
            <tr key={d.id} className="border-b border-border">
              <td className="p-2.5 text-t3 text-[11px] font-mono">{d.id}</td>
              <td className="p-2.5 text-t1 text-[13px] font-semibold">{d.driver}</td>
              <td className="p-2.5 text-t2 text-[11px] font-mono">{d.vehicle}</td>
              <td className="p-2.5 text-t2 text-xs">Onitsha — Awka</td>
              <td className="p-2.5 text-t1 text-[13px] font-mono">{d.loaded}</td>
              <td className="p-2.5 text-green text-[13px] font-mono font-bold">{d.sold}</td>
              <td className="p-2.5 text-blue text-[13px] font-mono">{d.returned}</td>
              <td className="p-2.5 text-gold text-[13px] font-mono font-bold">{fmtN(d.amount)}</td>
              <td className="p-2.5"><Badge status={d.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

// Users & Reports placeholder
const UsersView = () => (
  <div>
    <div className="grid grid-cols-4 gap-3.5 mb-5">
      <KpiCard title="Total Users" value="11" sub="system accounts" icon={Users} color="#4d9af8" />
      <KpiCard title="Active Sessions" value="4" sub="currently online" icon={Eye} color="#12d49a" />
      <KpiCard title="Roles Defined" value="10" sub="RBAC configurations" icon={Shield} color="#f0a31a" />
      <KpiCard title="Audit Logs" value="482" sub="events today" icon={FileText} color="#ff7f41" />
    </div>
    <Card>
      <SectionHeader title="Role-Based Access Control" sub="System user roles and permissions" actionLabel="Add User" />
      <table className="w-full border-collapse">
        <THead cols={["Role", "Label", "Accessible Modules", "Color"]} />
        <tbody>
          {ROLES.map(r => (
            <tr key={r.id} className="border-b border-border">
              <td className="p-2.5 text-t2 text-[11px] font-mono">{r.id}</td>
              <td className="p-2.5 text-t1 text-[13px] font-semibold">{r.label}</td>
              <td className="p-2.5">
                <div className="flex flex-wrap gap-1">
                  {(ACCESS[r.id] || []).map(m => (
                    <span key={m} className="bg-hover text-t2 text-[10px] px-2 py-0.5 rounded-md border border-border">{m}</span>
                  ))}
                </div>
              </td>
              <td className="p-2.5"><span className="inline-block w-3 h-3 rounded-full" style={{ background: r.color }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

const ReportsView = () => (
  <div className="flex flex-col items-center justify-center h-96 text-t2">
    <FileText size={48} className="text-t3 mb-4" />
    <div className="text-t1 font-bold text-lg mb-2">Reports</div>
    <div className="text-t2 text-sm">Module accessible based on your current role.</div>
  </div>
);

/* ===================== MAIN APP ===================== */
export default function App() {
  const [module, setModule] = useState("dashboard");
  const [role, setRole] = useState("ceo");
  const [roleOpen, setRoleOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifCount] = useState(7);
  const [dark, setDark] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => setDark(prev => !prev);

  // Close dropdowns on outside click
  useEffect(() => {
    const clickHandler = () => {
      if (roleOpen) setRoleOpen(false);
      if (notifOpen) setNotifOpen(false);
    };
    window.addEventListener("click", clickHandler);
    return () => window.removeEventListener("click", clickHandler);
  }, [roleOpen, notifOpen]);

  const currentRole = ROLES.find(r => r.id === role);
  const accessible = ACCESS[role] || [];

  const navGroups = ["OVERVIEW", "OPERATIONS", "FINANCE", "PEOPLE", "SYSTEM"];

  const getView = () => {
    if (!accessible.includes(module)) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <Shield size={52} className="text-t3 mb-4" />
          <div className="text-t1 font-bold text-lg mb-2">Access Restricted</div>
          <div className="text-t2 text-sm">Your role ({currentRole?.label}) cannot access this module.</div>
        </div>
      );
    }
    switch (module) {
      case "dashboard": return <DashboardView setModule={setModule} />;
      case "stock": return <StockView />;
      case "production": return <ProductionView />;
      case "sales": return <SalesView />;
      case "logistics": return <LogisticsView />;
      case "finance": return <FinanceView />;
      case "hr": return <HRView />;
      case "attendance": return <AttendanceView />;
      case "users": return <UsersView />;
      case "reports": return <ReportsView />;
      default: return <ReportsView />;
    }
  };

  const notifs = [
    { msg: "Baking Soda stock critically low", color: "red", time: "09:15" },
    { msg: "Seasoning Mix below reorder threshold", color: "red", time: "09:02" },
    { msg: "Sugar stock running low (22%)", color: "gold", time: "08:45" },
    { msg: "Precious Okeke clocked in late", color: "gold", time: "09:15" },
    { msg: "DSP001 — ₦18K outstanding balance", color: "orange", time: "10:00" },
    { msg: "Sunday Onuoha dispatch reconciled", color: "green", time: "10:30" },
    { msg: "Sachet water exceeded daily target", color: "green", time: "11:00" },
  ];

  return (
    <div className={`flex h-[800px] bg-bg font-outfit overflow-hidden text-[13px] ${dark ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="w-[222px] bg-sidebar border-r border-border flex flex-col flex-shrink-0 overflow-hidden">
        {/* Logo */}
        <div className="p-[18px_20px_16px] border-b border-border flex-shrink-0">
          <div className="flex items-center gap-[11px]">
            <div className="w-[34px] h-[34px] bg-gradient-to-br from-gold to-yellow-800 rounded-[10px] flex items-center justify-center font-black text-base text-black flex-shrink-0 tracking-tight">P</div>
            <div>
              <div className="text-t1 font-extrabold text-[15px] tracking-wider">PANPET</div>
              <div className="text-t3 text-[9px] tracking-widest mt-px">ENTERPRISE ERP</div>
            </div>
          </div>
        </div>
        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-2.5">
          {navGroups.map(grp => {
            const items = NAV.filter(n => n.group === grp);
            return (
              <div key={grp} className="mb-1.5">
                <div className="px-5 py-1.5 text-t3 text-[9px] font-extrabold tracking-[0.1em]">{grp}</div>
                {items.map(item => {
                  const isActive = module === item.id;
                  const hasAccess = accessible.includes(item.id);
                  return (
                    <button key={item.id}
                      onClick={(e) => { e.stopPropagation(); hasAccess && setModule(item.id); }}
                      className={`w-full flex items-center gap-2.5 py-2 px-5 border-none cursor-pointer 
                        ${isActive ? 'bg-goldBg border-l-2 border-gold text-gold font-bold' : 'bg-transparent border-l-2 border-transparent'}
                        ${hasAccess ? 'text-t2' : 'text-t3 opacity-35 cursor-not-allowed'}
                        text-xs text-left transition-all duration-150`}>
                      <item.icon size={14} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
        {/* User footer & Dark mode toggle */}
        <div className="p-3 border-t border-border flex-shrink-0">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-[30px] h-[30px] rounded-full bg-goldBg border border-gold/50 flex items-center justify-center text-goldB text-[11px] font-extrabold flex-shrink-0">
              {role === "ceo" ? "CE" : role.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-t1 text-[11px] font-bold whitespace-nowrap overflow-hidden text-ellipsis">{currentRole?.label}</div>
              <div className="text-t3 text-[9px]">panpet.ng · v2.5.0</div>
            </div>
            <Settings size={13} className="text-t3 cursor-pointer flex-shrink-0" />
          </div>
          {/* Dark mode toggle button */}
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-center gap-2 py-1.5 rounded-lg bg-hover border border-border text-t2 text-[11px] font-semibold hover:border-borderMid transition-colors"
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <div className="h-[54px] bg-card border-b border-border flex items-center px-6 gap-3.5 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <div className="text-t3 text-[9px] tracking-[0.06em] uppercase">Panpet Global Enterprise Ltd.</div>
            <div className="text-t1 text-sm font-bold mt-px">{NAV.find(n => n.id === module)?.label || "Dashboard"}</div>
          </div>
          <div className="flex items-center gap-1.5 text-t2 text-[11px]">
            <Calendar size={12} />
            <span>Mon, 25 March 2025</span>
          </div>
          {/* Link to Original Template */}
          <div className="flex items-center gap-1.5 text-t2 text-[11px]">
            <LayoutDashboardIcon size={12} />
            <Link to="/original-template" className="underline">Original Template</Link>
          </div>
          {/* Notifications */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => { setNotifOpen(!notifOpen); setRoleOpen(false); }} className="bg-transparent border border-border rounded-lg p-1.5 cursor-pointer relative flex">
              <Bell size={15} color={notifOpen ? "var(--color-gold)" : "var(--color-t2)"} />
              {notifCount > 0 && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red rounded-full border border-card" />}
            </button>
            {notifOpen && (
              <div className="absolute top-10 right-0 w-80 bg-card border border-border rounded-xl shadow-2xl z-50">
                <div className="p-3.5 border-b border-border flex justify-between items-center">
                  <span className="text-t1 font-bold text-sm">Notifications</span>
                  <span className="bg-redBg text-red text-[10px] font-bold px-2 py-0.5 rounded-full">{notifCount}</span>
                </div>
                {notifs.map((n, i) => (
                  <div key={i} className={`flex items-start gap-2.5 p-2.5 border-b border-border ${i === 0 ? "bg-hover" : "bg-transparent"}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 bg-${n.color}`} />
                    <div className="flex-1">
                      <div className="text-t1 text-xs leading-relaxed">{n.msg}</div>
                      <div className="text-t3 text-[10px] mt-0.5">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Role switcher */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => { setRoleOpen(!roleOpen); setNotifOpen(false); }} className="flex items-center gap-2 bg-hover border border-borderMid rounded-lg py-1.5 px-3 cursor-pointer text-[11px] font-bold" style={{ color: currentRole?.color }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: currentRole?.color }} />
              {currentRole?.label}
              <ChevronDown size={11} className="text-t2" />
            </button>
            {roleOpen && (
              <div className="absolute top-10 right-0 w-56 bg-card border border-border rounded-lg shadow-2xl z-50 p-1.5">
                <div className="px-3 py-1.5 text-t3 text-[9px] font-extrabold tracking-widest border-b border-border mb-1">SWITCH ROLE (DEMO)</div>
                {ROLES.map(r => (
                  <button key={r.id}
                    onClick={() => {
                      setRole(r.id);
                      setRoleOpen(false);
                      if (!(ACCESS[r.id] || []).includes(module)) {
                        setModule((ACCESS[r.id] || ["dashboard"])[0]);
                      }
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 border-none cursor-pointer text-left text-xs font-semibold rounded ${role === r.id ? 'bg-current/10' : 'bg-transparent'}`}
                    style={{ color: role === r.id ? r.color : 'var(--color-t2)' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: r.color }} />
                    {r.label}
                    {role === r.id && <CheckCircle size={12} className="ml-auto" style={{ color: r.color }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-5 bg-bg">
          {getView()}
        </div>
      </div>
    </div>
  );
}