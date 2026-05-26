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
  LogOut, RefreshCw, ArrowRight, Layers, Home
} from "lucide-react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  bg:        "#05111f",
  sidebar:   "#030d18",
  card:      "#0b1e32",
  cardHigh:  "#0f2540",
  hover:     "#122a44",
  active:    "#163350",
  border:    "rgba(148,196,255,0.07)",
  borderMid: "rgba(148,196,255,0.14)",
  gold:      "#f0a31a",
  goldB:     "#ffbe4a",
  goldBg:    "rgba(240,163,26,0.10)",
  green:     "#12d49a",
  greenBg:   "rgba(18,212,154,0.09)",
  red:       "#f44f70",
  redBg:     "rgba(244,79,112,0.09)",
  blue:      "#4d9af8",
  blueBg:    "rgba(77,154,248,0.09)",
  purple:    "#a78bfa",
  purpleBg:  "rgba(167,139,250,0.09)",
  orange:    "#ff7f41",
  orangeBg:  "rgba(255,127,65,0.09)",
  pink:      "#f472b6",
  pinkBg:    "rgba(244,114,182,0.09)",
  t1:        "#ddeeff",
  t2:        "#5a8db0",
  t3:        "#243d56",
};

// ─── DATA ──────────────────────────────────────────────────────────────────────
const prodWeek = [
  { day:"Mon", bread:1240, water:480, sachet:1850, chips:280 },
  { day:"Tue", bread:1180, water:510, sachet:2100, chips:320 },
  { day:"Wed", bread:1350, water:445, sachet:1920, chips:295 },
  { day:"Thu", bread:1290, water:530, sachet:2200, chips:340 },
  { day:"Fri", bread:1420, water:495, sachet:2050, chips:310 },
  { day:"Sat", bread:1580, water:560, sachet:2400, chips:380 },
  { day:"Sun", bread:900,  water:320, sachet:1400, chips:190 },
];
const revMonths = [
  { month:"Oct", rev:1840000, exp:980000  },
  { month:"Nov", rev:2100000, exp:1050000 },
  { month:"Dec", rev:2650000, exp:1200000 },
  { month:"Jan", rev:2280000, exp:1100000 },
  { month:"Feb", rev:2490000, exp:1180000 },
  { month:"Mar", rev:2840000, exp:1240000 },
];
const salesPie = [
  { name:"Bread",        value:42, color: T.gold   },
  { name:"Bottled Water",value:28, color: T.blue   },
  { name:"Sachet Water", value:18, color: T.green  },
  { name:"Chips/Snacks", value:12, color: T.orange },
];
const stockItems = [
  { item:"Flour",         unit:"kg",    qty:450,  max:500,  status:"ok"       },
  { item:"Sugar",         unit:"kg",    qty:45,   max:200,  status:"low"      },
  { item:"Margarine",     unit:"kg",    qty:30,   max:100,  status:"low"      },
  { item:"Baking Soda",   unit:"kg",    qty:8,    max:50,   status:"critical" },
  { item:"PET Bottles",   unit:"pcs",   qty:1200, max:5000, status:"low"      },
  { item:"Sachet Rolls",  unit:"rolls", qty:8,    max:20,   status:"watch"    },
  { item:"Groundnut Oil", unit:"L",     qty:25,   max:100,  status:"low"      },
  { item:"Seasoning Mix", unit:"kg",    qty:3,    max:20,   status:"critical" },
  { item:"Pkg. Nylon",    unit:"m",     qty:200,  max:500,  status:"ok"       },
  { item:"Salt",          unit:"kg",    qty:80,   max:100,  status:"ok"       },
  { item:"Yeast",         unit:"kg",    qty:15,   max:40,   status:"watch"    },
  { item:"Plantain",      unit:"kg",    qty:120,  max:200,  status:"ok"       },
];
const employees = [
  { id:"EMP001", name:"Chukwuemeka Obi",  dept:"Production", role:"Production Manager",  status:"present",  time:"07:48", salary:85000  },
  { id:"EMP002", name:"Ngozi Eze",        dept:"Sales",      role:"Sales Officer",       status:"present",  time:"08:02", salary:65000  },
  { id:"EMP003", name:"Ifeanyi Nwosu",    dept:"Logistics",  role:"Driver",              status:"on-route", time:"08:30", salary:55000  },
  { id:"EMP004", name:"Amaka Okafor",     dept:"Finance",    role:"Cashier",             status:"present",  time:"07:55", salary:70000  },
  { id:"EMP005", name:"Obiora Dim",       dept:"Production", role:"Baker",               status:"present",  time:"07:40", salary:52000  },
  { id:"EMP006", name:"Chidinma Ilo",     dept:"Admin",      role:"Receptionist",        status:"present",  time:"08:00", salary:48000  },
  { id:"EMP007", name:"Kenneth Nnadi",    dept:"Security",   role:"Security Guard",      status:"present",  time:"06:00", salary:45000  },
  { id:"EMP008", name:"Precious Okeke",   dept:"Production", role:"Water Operator",      status:"late",     time:"09:15", salary:52000  },
  { id:"EMP009", name:"Sunday Onuoha",    dept:"Logistics",  role:"Driver",              status:"on-route", time:"08:45", salary:55000  },
  { id:"EMP010", name:"Blessing Ani",     dept:"Sales",      role:"Sales Rep",           status:"absent",   time:"—",     salary:60000  },
  { id:"EMP011", name:"Emeka Uzoma",      dept:"Production", role:"Snacks Operator",     status:"present",  time:"07:55", salary:52000  },
  { id:"EMP012", name:"Grace Anyanwu",    dept:"HR",         role:"HR Manager",          status:"present",  time:"08:10", salary:90000  },
];
const dispatches = [
  { id:"DSP001", driver:"Ifeanyi Nwosu",  vehicle:"KJA-422-AA", loaded:240, sold:198, returned:24, outstanding:18, amount:89400,  status:"active"      },
  { id:"DSP002", driver:"Sunday Onuoha",  vehicle:"LND-817-BB", loaded:180, sold:162, returned:18, outstanding:0,  amount:72900,  status:"reconciled"  },
  { id:"DSP003", driver:"Emeka Chukwu",   vehicle:"ABJ-304-CC", loaded:300, sold:245, returned:30, outstanding:25, amount:110250, status:"active"      },
];
const transactions = [
  { id:"TRX001", type:"income",  desc:"Bread Sales — Walk-in",             amount:48500, time:"08:32", by:"Amaka Okafor"  },
  { id:"TRX002", type:"income",  desc:"Water Dispatch Remittance — Ifeanyi",amount:89400, time:"09:15", by:"Amaka Okafor"  },
  { id:"TRX003", type:"expense", desc:"Flour Purchase — Nweze Ventures",   amount:62000, time:"10:00", by:"Amaka Okafor"  },
  { id:"TRX004", type:"income",  desc:"Chips Sales — Retailer Batch",      amount:22500, time:"10:45", by:"Amaka Okafor"  },
  { id:"TRX005", type:"expense", desc:"Generator Fuel",                    amount:18000, time:"11:20", by:"Amaka Okafor"  },
  { id:"TRX006", type:"income",  desc:"Sachet Water — Wholesale Order",    amount:35000, time:"12:05", by:"Amaka Okafor"  },
  { id:"TRX007", type:"income",  desc:"Bread Retailer — Nkemjika Stores",  amount:31000, time:"13:40", by:"Amaka Okafor"  },
  { id:"TRX008", type:"expense", desc:"Staff Transport Allowance",         amount:12000, time:"14:00", by:"Amaka Okafor"  },
];

// ─── NAV ───────────────────────────────────────────────────────────────────────
const NAV = [
  { id:"dashboard",  label:"Dashboard",        icon:LayoutDashboard, group:"OVERVIEW"    },
  { id:"stock",      label:"Stock Management", icon:Package,         group:"OPERATIONS"  },
  { id:"production", label:"Production",       icon:Factory,         group:"OPERATIONS"  },
  { id:"sales",      label:"Sales & Marketing",icon:ShoppingCart,    group:"OPERATIONS"  },
  { id:"logistics",  label:"Logistics",        icon:Truck,           group:"OPERATIONS"  },
  { id:"finance",    label:"Finance & Cashier",icon:DollarSign,      group:"FINANCE"     },
  { id:"hr",         label:"HR Management",   icon:Users,           group:"PEOPLE"      },
  { id:"attendance", label:"Attendance",       icon:Clock,           group:"PEOPLE"      },
  { id:"reports",    label:"Reports",          icon:FileText,        group:"SYSTEM"      },
  { id:"users",      label:"User Management", icon:Shield,          group:"SYSTEM"      },
];
const ROLES = [
  { id:"ceo",        label:"CEO / Super Admin",    color: T.gold   },
  { id:"gm",         label:"General Manager",      color: T.blue   },
  { id:"production", label:"Production Manager",   color: T.green  },
  { id:"cashier",    label:"Cashier / Finance",    color: T.orange },
  { id:"stock",      label:"Stock Manager",        color: T.purple },
  { id:"hr",         label:"HR Manager",           color: T.pink   },
  { id:"driver",     label:"Driver",               color: T.t2     },
];
const ACCESS = {
  ceo:        ["dashboard","stock","production","sales","logistics","finance","hr","attendance","reports","users"],
  gm:         ["dashboard","stock","production","sales","logistics","finance","hr","attendance","reports"],
  production: ["production","stock"],
  cashier:    ["finance","sales"],
  stock:      ["stock"],
  hr:         ["hr","attendance"],
  driver:     ["logistics"],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt  = (n) => new Intl.NumberFormat("en-NG").format(n);
const fmtN = (n) => `₦${fmt(n)}`;

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const map = {
    ok:         { label:"Normal",     bg:T.greenBg,  color:T.green  },
    low:        { label:"Low Stock",  bg:T.goldBg,   color:T.gold   },
    critical:   { label:"Critical",   bg:T.redBg,    color:T.red    },
    watch:      { label:"Watch",      bg:T.orangeBg, color:T.orange },
    present:    { label:"Present",    bg:T.greenBg,  color:T.green  },
    absent:     { label:"Absent",     bg:T.redBg,    color:T.red    },
    late:       { label:"Late",       bg:T.goldBg,   color:T.gold   },
    "on-route": { label:"On Route",   bg:T.blueBg,   color:T.blue   },
    active:     { label:"Active",     bg:T.blueBg,   color:T.blue   },
    reconciled: { label:"Reconciled", bg:T.greenBg,  color:T.green  },
    income:     { label:"Income",     bg:T.greenBg,  color:T.green  },
    expense:    { label:"Expense",    bg:T.redBg,    color:T.red    },
  };
  const s = map[status] || { label:status, bg:T.border, color:T.t2 };
  return (
    <span style={{ background:s.bg, color:s.color, fontSize:10, fontWeight:700,
      padding:"2px 8px", borderRadius:20, letterSpacing:"0.03em", whiteSpace:"nowrap" }}>
      {s.label}
    </span>
  );
};

const Pct = ({ val, max, status }) => {
  const p = Math.min(Math.round((val/max)*100), 100);
  const col = {ok:T.green, low:T.gold, critical:T.red, watch:T.orange}[status] || T.blue;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, minWidth:110 }}>
      <div style={{ flex:1, height:5, background:T.border, borderRadius:4 }}>
        <div style={{ width:`${p}%`, height:"100%", background:col, borderRadius:4, transition:"width .4s" }} />
      </div>
      <span style={{ fontSize:11, color:T.t2, fontFamily:"monospace", minWidth:28 }}>{p}%</span>
    </div>
  );
};

const KpiCard = ({ title, value, sub, icon:Icon, color, trend, trendVal, onClick }) => (
  <div onClick={onClick} style={{ background:T.card, border:`1px solid ${T.border}`,
    borderRadius:12, padding:"18px 20px", flex:1, cursor:onClick?"pointer":"default",
    transition:"border-color .2s", minWidth:0 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
      <span style={{ color:T.t2, fontSize:11, fontWeight:600, letterSpacing:"0.05em", textTransform:"uppercase" }}>{title}</span>
      <div style={{ background:color+"22", borderRadius:8, padding:"7px", display:"flex" }}>
        <Icon size={15} color={color} />
      </div>
    </div>
    <div style={{ fontSize:26, fontWeight:800, color:T.t1, letterSpacing:"-0.02em",
      fontFamily:"'DM Mono', monospace", marginBottom:6 }}>{value}</div>
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      {trend && (
        <span style={{ color:trend==="up"?T.green:T.red, fontSize:11, display:"flex", alignItems:"center", gap:2, fontWeight:600 }}>
          {trend==="up"?<TrendingUp size={11}/>:<TrendingDown size={11}/>} {trendVal}
        </span>
      )}
      <span style={{ color:T.t3, fontSize:11 }}>{sub}</span>
    </div>
  </div>
);

const SectionHeader = ({ title, sub, action, actionLabel }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
    <div>
      <div style={{ color:T.t1, fontWeight:700, fontSize:15 }}>{title}</div>
      {sub && <div style={{ color:T.t2, fontSize:12, marginTop:2 }}>{sub}</div>}
    </div>
    {actionLabel && (
      <button onClick={action} style={{ background:T.gold, color:"#000", border:"none",
        borderRadius:8, padding:"7px 14px", fontSize:12, fontWeight:700, cursor:"pointer",
        display:"flex", alignItems:"center", gap:5 }}>
        <Plus size={13}/> {actionLabel}
      </button>
    )}
  </div>
);

const Card = ({ children, style={} }) => (
  <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12,
    padding:"20px 24px", ...style }}>{children}</div>
);

const THead = ({ cols }) => (
  <thead>
    <tr style={{ borderBottom:`1px solid ${T.border}` }}>
      {cols.map(c => (
        <th key={c} style={{ textAlign:"left", padding:"8px 12px", color:T.t3,
          fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase" }}>{c}</th>
      ))}
    </tr>
  </thead>
);

// ─── MODULE VIEWS ─────────────────────────────────────────────────────────────

const DashboardView = ({ setModule }) => {
  const todayRev = transactions.filter(t=>t.type==="income").reduce((a,b)=>a+b.amount,0);
  const alerts   = stockItems.filter(s=>s.status!=="ok");
  return (
    <div>
      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <KpiCard title="Monthly Revenue"    value="₦2.84M"  sub="vs last month"          icon={DollarSign}  color={T.gold}   trend="up" trendVal="+14.1%" onClick={()=>setModule("finance")}/>
        <KpiCard title="Today's Output"     value="5,965"   sub="units across all lines"  icon={Factory}     color={T.green}  trend="up" trendVal="+8.3%"  onClick={()=>setModule("production")}/>
        <KpiCard title="Stock Alerts"       value={String(alerts.length)} sub="items need attention" icon={AlertTriangle} color={T.red} onClick={()=>setModule("stock")}/>
        <KpiCard title="Staff Present"      value="18 / 24" sub="75% attendance today"    icon={Users}       color={T.blue}   onClick={()=>setModule("hr")}/>
      </div>

      {/* Charts row */}
      <div style={{ display:"grid", gridTemplateColumns:"3fr 1.4fr", gap:14, marginBottom:14 }}>
        <Card>
          <SectionHeader title="Revenue vs. Expenses" sub="Last 6 months" />
          <div style={{ display:"flex", gap:16, marginBottom:10 }}>
            {[{l:"Revenue",c:T.gold},{l:"Expenses",c:T.red}].map(i=>(
              <span key={i.l} style={{ fontSize:11, color:i.c, display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ width:10, height:3, borderRadius:2, background:i.c, display:"inline-block" }}/>
                {i.l}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={revMonths}>
              <defs>
                <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={T.gold} stopOpacity={0.18}/>
                  <stop offset="95%" stopColor={T.gold} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gE" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={T.red}  stopOpacity={0.12}/>
                  <stop offset="95%" stopColor={T.red}  stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{fill:T.t3,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis hide/>
              <Tooltip contentStyle={{background:T.hover,border:`1px solid ${T.border}`,borderRadius:8,color:T.t1,fontSize:11}}
                formatter={v=>`₦${(v/1000000).toFixed(2)}M`}/>
              <Area type="monotone" dataKey="rev" stroke={T.gold} strokeWidth={2} fill="url(#gR)"/>
              <Area type="monotone" dataKey="exp" stroke={T.red}  strokeWidth={2} fill="url(#gE)"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="Sales Mix" sub="March 2025"/>
          <ResponsiveContainer width="100%" height={110}>
            <PieChart>
              <Pie data={salesPie} cx="50%" cy="50%" innerRadius={28} outerRadius={50} paddingAngle={2} dataKey="value">
                {salesPie.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip contentStyle={{background:T.hover,border:`1px solid ${T.border}`,borderRadius:8,color:T.t1,fontSize:11}}
                formatter={v=>`${v}%`}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 10px", marginTop:6 }}>
            {salesPie.map(p=>(
              <div key={p.name} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ width:7,height:7,borderRadius:"50%",background:p.color,flexShrink:0 }}/>
                <span style={{ color:T.t2, fontSize:10, flex:1 }}>{p.name}</span>
                <span style={{ color:T.t1, fontSize:11, fontFamily:"monospace", fontWeight:700 }}>{p.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Production chart */}
      <Card style={{ marginBottom:14 }}>
        <SectionHeader title="Weekly Production Output" sub="All lines — current week"/>
        <div style={{ display:"flex", gap:14, marginBottom:8 }}>
          {[{l:"Bread",c:T.gold},{l:"Bottles",c:T.blue},{l:"Sachet",c:T.green},{l:"Chips",c:T.orange}].map(i=>(
            <span key={i.l} style={{ fontSize:11, color:i.c, display:"flex", alignItems:"center", gap:5 }}>
              <span style={{ width:10,height:3,borderRadius:2,background:i.c,display:"inline-block" }}/>{i.l}
            </span>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={prodWeek} barGap={2} barCategoryGap="30%">
            <XAxis dataKey="day" tick={{fill:T.t3,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis hide/>
            <Tooltip contentStyle={{background:T.hover,border:`1px solid ${T.border}`,borderRadius:8,color:T.t1,fontSize:11}}/>
            <Bar dataKey="bread"  name="Bread"   fill={T.gold}   radius={[2,2,0,0]}/>
            <Bar dataKey="water"  name="Bottles" fill={T.blue}   radius={[2,2,0,0]}/>
            <Bar dataKey="sachet" name="Sachet"  fill={T.green}  radius={[2,2,0,0]}/>
            <Bar dataKey="chips"  name="Chips"   fill={T.orange} radius={[2,2,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Bottom: Alerts + Transactions */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <Card>
          <SectionHeader title="Active Stock Alerts" sub={`${alerts.length} items require attention`}/>
          {alerts.map(s=>(
            <div key={s.item} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10,
              padding:"8px 10px", background:T.hover, borderRadius:8 }}>
              <AlertTriangle size={13} color={s.status==="critical"?T.red:T.gold}/>
              <span style={{ color:T.t1, fontSize:12, flex:1, fontWeight:500 }}>{s.item}</span>
              <span style={{ fontFamily:"monospace", fontSize:11, color:T.t2 }}>{s.qty} {s.unit}</span>
              <Badge status={s.status}/>
            </div>
          ))}
        </Card>

        <Card>
          <SectionHeader title="Today's Finance Log" sub="Cashier activity"/>
          {transactions.slice(0,5).map((t,i)=>(
            <div key={t.id} style={{ display:"flex", alignItems:"center", gap:9, marginBottom:i<4?"10px":0,
              paddingBottom:i<4?"10px":0, borderBottom:i<4?`1px solid ${T.border}`:"none" }}>
              <div style={{ width:7,height:7,borderRadius:"50%",
                background:t.type==="income"?T.green:T.red, flexShrink:0 }}/>
              <span style={{ color:T.t1, fontSize:12, flex:1, lineHeight:1.35 }}>{t.desc}</span>
              <span style={{ fontFamily:"monospace", fontSize:12,
                color:t.type==="income"?T.green:T.red, fontWeight:700, whiteSpace:"nowrap" }}>
                {t.type==="income"?"+":"-"}₦{fmt(t.amount)}
              </span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

const StockView = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const critical = stockItems.filter(s=>s.status==="critical").length;
  const low      = stockItems.filter(s=>s.status==="low").length;
  const filtered = stockItems.filter(s=>{
    const matchSearch = s.item.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter==="all" || s.status===filter;
    return matchSearch && matchFilter;
  });
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <KpiCard title="Total SKUs"       value="12"          sub="active items"          icon={Package}       color={T.blue}  />
        <KpiCard title="Low Stock"        value={String(low)} sub="below reorder level"   icon={AlertTriangle} color={T.gold}  />
        <KpiCard title="Critical Items"   value={String(critical)} sub="urgent restock"  icon={AlertTriangle} color={T.red}   />
        <KpiCard title="Last Sync"        value="09:42"       sub="this morning"          icon={RefreshCw}     color={T.green} />
      </div>
      <Card>
        <SectionHeader title="Raw Material Inventory" sub="Live stock levels across all warehouses" actionLabel="Record Inflow"/>
        <div style={{ display:"flex", gap:10, marginBottom:16 }}>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search material..."
            style={{ background:T.hover, border:`1px solid ${T.borderMid}`, borderRadius:8,
              padding:"7px 12px", color:T.t1, fontSize:12, flex:1, outline:"none" }}/>
          {["all","ok","low","critical","watch"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{ background:filter===f?T.active:T.hover,
                border:`1px solid ${filter===f?T.borderMid:T.border}`,
                color:filter===f?T.t1:T.t2, borderRadius:8, padding:"7px 12px",
                fontSize:11, fontWeight:filter===f?600:400, cursor:"pointer",
                textTransform:"capitalize" }}>
              {f==="all"?"All":f}
            </button>
          ))}
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <THead cols={["Material","Unit","Qty On Hand","Max Cap.","Stock Level","Status","Action"]}/>
            <tbody>
              {filtered.map(s=>(
                <tr key={s.item} style={{ borderBottom:`1px solid ${T.border}` }}>
                  <td style={{ padding:"10px 12px", color:T.t1, fontSize:13, fontWeight:500 }}>{s.item}</td>
                  <td style={{ padding:"10px 12px", color:T.t2, fontSize:12 }}>{s.unit}</td>
                  <td style={{ padding:"10px 12px", color:T.t1, fontSize:13, fontFamily:"monospace" }}>{fmt(s.qty)}</td>
                  <td style={{ padding:"10px 12px", color:T.t2, fontSize:12, fontFamily:"monospace" }}>{fmt(s.max)}</td>
                  <td style={{ padding:"10px 12px", minWidth:130 }}><Pct val={s.qty} max={s.max} status={s.status}/></td>
                  <td style={{ padding:"10px 12px" }}><Badge status={s.status}/></td>
                  <td style={{ padding:"10px 12px" }}>
                    <button style={{ background:T.hover, color:T.t2, border:`1px solid ${T.border}`,
                      borderRadius:6, padding:"4px 10px", fontSize:11, cursor:"pointer" }}>
                      Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const ProductionView = () => {
  const lines = [
    { name:"Bread Production",  emoji:"🍞", today:1420, target:1500, batches:8,  staff:4, status:"active" },
    { name:"Bottled Water",     emoji:"🫙", today:495,  target:500,  batches:12, staff:3, status:"active" },
    { name:"Sachet Water",      emoji:"💧", today:2050, target:2000, batches:5,  staff:2, status:"over"   },
    { name:"Snacks / Chips",    emoji:"🥔", today:310,  target:400,  batches:6,  staff:3, status:"watch"  },
  ];
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:14 }}>
        <KpiCard title="Total Output Today" value="5,965"  sub="units across all lines" icon={Factory}      color={T.gold}  />
        <KpiCard title="Active Batches"     value="31"     sub="in production now"       icon={Layers}       color={T.green} />
        <KpiCard title="Production Staff"   value="12"     sub="operators on shift"      icon={Users}        color={T.blue}  />
        <KpiCard title="Avg Efficiency"     value="91%"    sub="vs last week 84%"        icon={BarChart2}    color={T.orange} trend="up" trendVal="+7%"/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
        {lines.map(l=>{
          const pct = Math.min(Math.round((l.today/l.target)*100),100);
          const col = l.status==="watch"?T.gold : l.status==="over"?T.green : T.blue;
          const lbl = l.status==="watch"?"Behind Target" : l.status==="over"?"Exceeded Target" : "On Track";
          return (
            <Card key={l.name} style={{ borderLeft:`3px solid ${col}` }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:22 }}>{l.emoji}</span>
                  <div>
                    <div style={{ color:T.t1, fontWeight:700, fontSize:14 }}>{l.name}</div>
                    <div style={{ color:T.t2, fontSize:11, marginTop:2 }}>
                      {l.batches} batches active · {l.staff} operators
                    </div>
                  </div>
                </div>
                <span style={{ background:col+"22", color:col, fontSize:10, fontWeight:700,
                  padding:"3px 10px", borderRadius:20 }}>{lbl}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ color:T.t2, fontSize:11 }}>Today's output</span>
                <span style={{ color:T.t1, fontFamily:"monospace", fontSize:13, fontWeight:800 }}>
                  {fmt(l.today)} / {fmt(l.target)}
                </span>
              </div>
              <div style={{ background:T.border, borderRadius:6, height:10 }}>
                <div style={{ width:`${pct}%`, height:"100%", background:col, borderRadius:6, transition:"width .6s" }}/>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
                <span style={{ color:T.t3, fontSize:10 }}>0</span>
                <span style={{ color:col, fontSize:10, fontWeight:700 }}>{pct}% of daily target</span>
                <span style={{ color:T.t3, fontSize:10 }}>{fmt(l.target)}</span>
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <SectionHeader title="7-Day Production Trend" sub="All production lines"/>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={prodWeek} barGap={2} barCategoryGap="25%">
            <XAxis dataKey="day" tick={{fill:T.t3,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:T.t3,fontSize:10}} axisLine={false} tickLine={false}/>
            <CartesianGrid stroke={T.border} vertical={false}/>
            <Tooltip contentStyle={{background:T.hover,border:`1px solid ${T.border}`,borderRadius:8,color:T.t1,fontSize:11}}/>
            <Bar dataKey="bread"  name="Bread"   fill={T.gold}   radius={[3,3,0,0]}/>
            <Bar dataKey="water"  name="Bottles" fill={T.blue}   radius={[3,3,0,0]}/>
            <Bar dataKey="sachet" name="Sachet"  fill={T.green}  radius={[3,3,0,0]}/>
            <Bar dataKey="chips"  name="Chips"   fill={T.orange} radius={[3,3,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

const SalesView = () => (
  <div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
      <KpiCard title="Today's Revenue"  value="₦257K" sub="from all channels"     icon={DollarSign} color={T.gold}   trend="up"   trendVal="+12.4%"/>
      <KpiCard title="Active Dispatches" value="3"   sub="drivers on route"       icon={Truck}      color={T.blue}  />
      <KpiCard title="Outstanding Bal."  value="₦18K" sub="pending reconciliation" icon={AlertTriangle} color={T.gold}/>
      <KpiCard title="Walk-in Sales"     value="₦48.5K" sub="direct today"        icon={ShoppingCart} color={T.green}/>
    </div>

    <Card style={{ marginBottom:14 }}>
      <SectionHeader title="Driver Dispatch Accountability" sub="Daily load, sold, returned, and outstanding per driver"/>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <THead cols={["Dispatch ID","Driver","Vehicle","Loaded","Sold","Returned","Outstanding","Amount","Status"]}/>
        <tbody>
          {dispatches.map(d=>(
            <tr key={d.id} style={{ borderBottom:`1px solid ${T.border}` }}>
              <td style={{ padding:"11px 12px", color:T.t3, fontSize:11, fontFamily:"monospace" }}>{d.id}</td>
              <td style={{ padding:"11px 12px", color:T.t1, fontSize:13, fontWeight:600 }}>{d.driver}</td>
              <td style={{ padding:"11px 12px", color:T.t2, fontSize:11, fontFamily:"monospace" }}>{d.vehicle}</td>
              <td style={{ padding:"11px 12px", color:T.t1, fontSize:13, fontFamily:"monospace" }}>{d.loaded}</td>
              <td style={{ padding:"11px 12px", color:T.green, fontSize:13, fontFamily:"monospace", fontWeight:700 }}>{d.sold}</td>
              <td style={{ padding:"11px 12px", color:T.blue,  fontSize:13, fontFamily:"monospace" }}>{d.returned}</td>
              <td style={{ padding:"11px 12px", color:d.outstanding>0?T.red:T.green, fontSize:13, fontFamily:"monospace", fontWeight:800 }}>{d.outstanding}</td>
              <td style={{ padding:"11px 12px", color:T.gold, fontSize:13, fontFamily:"monospace", fontWeight:700 }}>{fmtN(d.amount)}</td>
              <td style={{ padding:"11px 12px" }}><Badge status={d.status}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>

    <Card>
      <SectionHeader title="Sales by Product Line" sub="7-day performance"/>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={prodWeek}>
          <XAxis dataKey="day" tick={{fill:T.t3,fontSize:10}} axisLine={false} tickLine={false}/>
          <YAxis hide/>
          <CartesianGrid stroke={T.border} vertical={false}/>
          <Tooltip contentStyle={{background:T.hover,border:`1px solid ${T.border}`,borderRadius:8,color:T.t1,fontSize:11}}/>
          <Line type="monotone" dataKey="bread"  name="Bread"   stroke={T.gold}   strokeWidth={2} dot={false}/>
          <Line type="monotone" dataKey="water"  name="Bottles" stroke={T.blue}   strokeWidth={2} dot={false}/>
          <Line type="monotone" dataKey="sachet" name="Sachet"  stroke={T.green}  strokeWidth={2} dot={false}/>
          <Line type="monotone" dataKey="chips"  name="Chips"   stroke={T.orange} strokeWidth={2} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </Card>
  </div>
);

const FinanceView = () => {
  const income  = transactions.filter(t=>t.type==="income" ).reduce((a,b)=>a+b.amount,0);
  const expense = transactions.filter(t=>t.type==="expense").reduce((a,b)=>a+b.amount,0);
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <KpiCard title="Monthly Revenue"  value="₦2.84M"  sub="total income"         icon={TrendingUp}   color={T.green}  trend="up" trendVal="+14.1%"/>
        <KpiCard title="Total Expenses"   value="₦1.24M"  sub="operational costs"    icon={TrendingDown} color={T.red}    />
        <KpiCard title="Net Profit"       value="₦1.60M"  sub="this month"           icon={DollarSign}   color={T.gold}   trend="up" trendVal="+18.2%"/>
        <KpiCard title="Today's Balance"  value={`+₦${fmt(income-expense)}`} sub="net today" icon={BarChart2} color={T.blue}/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"3fr 1fr", gap:14, marginBottom:14 }}>
        <Card>
          <SectionHeader title="Transaction Log" sub="Today — all cashier activity" actionLabel="Record Payment"/>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <THead cols={["ID","Description","Type","Amount","Time","Officer"]}/>
            <tbody>
              {transactions.map(t=>(
                <tr key={t.id} style={{ borderBottom:`1px solid ${T.border}` }}>
                  <td style={{ padding:"10px 12px", color:T.t3, fontSize:11, fontFamily:"monospace" }}>{t.id}</td>
                  <td style={{ padding:"10px 12px", color:T.t1, fontSize:12 }}>{t.desc}</td>
                  <td style={{ padding:"10px 12px" }}><Badge status={t.type}/></td>
                  <td style={{ padding:"10px 12px", color:t.type==="income"?T.green:T.red,
                    fontSize:13, fontFamily:"monospace", fontWeight:700 }}>
                    {t.type==="income"?"+":"-"}₦{fmt(t.amount)}
                  </td>
                  <td style={{ padding:"10px 12px", color:T.t2, fontSize:11, fontFamily:"monospace" }}>{t.time}</td>
                  <td style={{ padding:"10px 12px", color:T.t2, fontSize:11 }}>{t.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Card style={{ flex:1 }}>
            <div style={{ color:T.t2, fontSize:11, fontWeight:600, letterSpacing:"0.05em",
              textTransform:"uppercase", marginBottom:14 }}>Today's Summary</div>
            {[
              { label:"Total Income",  val:income,       color:T.green },
              { label:"Total Expenses",val:expense,      color:T.red   },
              { label:"Net Balance",   val:income-expense,color:T.gold },
            ].map(r=>(
              <div key={r.label} style={{ display:"flex", justifyContent:"space-between",
                alignItems:"center", marginBottom:12, paddingBottom:12,
                borderBottom:`1px solid ${T.border}` }}>
                <span style={{ color:T.t2, fontSize:12 }}>{r.label}</span>
                <span style={{ color:r.color, fontFamily:"monospace", fontSize:13, fontWeight:700 }}>
                  ₦{fmt(r.val)}
                </span>
              </div>
            ))}
          </Card>
          <Card style={{ flex:1 }}>
            <div style={{ color:T.t2, fontSize:11, fontWeight:600, letterSpacing:"0.05em",
              textTransform:"uppercase", marginBottom:14 }}>Monthly KPIs</div>
            {[
              { label:"Revenue",    val:"₦2.84M", color:T.gold  },
              { label:"Expenses",   val:"₦1.24M", color:T.red   },
              { label:"Profit",     val:"₦1.60M", color:T.green },
              { label:"Outstanding",val:"₦320K",  color:T.orange},
            ].map(r=>(
              <div key={r.label} style={{ display:"flex", justifyContent:"space-between",
                marginBottom:10 }}>
                <span style={{ color:T.t2, fontSize:12 }}>{r.label}</span>
                <span style={{ color:r.color, fontFamily:"monospace", fontSize:12, fontWeight:700 }}>{r.val}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

const HRView = () => {
  const [tab, setTab] = useState("directory");
  const present   = employees.filter(e=>e.status==="present"||e.status==="on-route").length;
  const absent    = employees.filter(e=>e.status==="absent").length;
  const late      = employees.filter(e=>e.status==="late").length;
  const depts     = [...new Set(employees.map(e=>e.dept))];
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <KpiCard title="Total Employees" value="24"         sub="active staff"          icon={Users}       color={T.blue}  />
        <KpiCard title="Present Today"   value={String(present)} sub="clocked in" icon={CheckCircle} color={T.green} />
        <KpiCard title="Late Arrivals"   value={String(late)} sub="after 08:00"         icon={Clock}       color={T.gold}  />
        <KpiCard title="Absent Today"    value={String(absent)} sub="unexcused/leave"   icon={AlertTriangle} color={T.red}/>
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {["directory","payroll","departments"].map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            style={{ background:tab===t?T.gold:T.hover, color:tab===t?"#000":T.t2,
              border:`1px solid ${tab===t?T.gold:T.border}`, borderRadius:8,
              padding:"7px 16px", fontSize:12, fontWeight:tab===t?700:400, cursor:"pointer",
              textTransform:"capitalize" }}>
            {t}
          </button>
        ))}
      </div>

      {tab==="directory" && (
        <Card>
          <SectionHeader title="Staff Directory" sub="Today's attendance status" actionLabel="Add Employee"/>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <THead cols={["ID","Employee","Department","Role","Clock-In","Status","Action"]}/>
            <tbody>
              {employees.map(e=>(
                <tr key={e.id} style={{ borderBottom:`1px solid ${T.border}` }}>
                  <td style={{ padding:"10px 12px", color:T.t3, fontSize:11, fontFamily:"monospace" }}>{e.id}</td>
                  <td style={{ padding:"10px 12px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                      <div style={{ width:30,height:30,borderRadius:"50%",background:T.goldBg,
                        border:`1px solid ${T.gold}40`,display:"flex",alignItems:"center",
                        justifyContent:"center",color:T.gold,fontSize:10,fontWeight:800,flexShrink:0 }}>
                        {e.name.split(" ").map(n=>n[0]).join("")}
                      </div>
                      <span style={{ color:T.t1, fontSize:13, fontWeight:600 }}>{e.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:"10px 12px", color:T.t2, fontSize:12 }}>{e.dept}</td>
                  <td style={{ padding:"10px 12px", color:T.t2, fontSize:12 }}>{e.role}</td>
                  <td style={{ padding:"10px 12px", color:T.t1, fontSize:12, fontFamily:"monospace" }}>{e.time}</td>
                  <td style={{ padding:"10px 12px" }}><Badge status={e.status}/></td>
                  <td style={{ padding:"10px 12px" }}>
                    <button style={{ background:T.hover, color:T.t2, border:`1px solid ${T.border}`,
                      borderRadius:6, padding:"4px 10px", fontSize:10, cursor:"pointer" }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab==="payroll" && (
        <Card>
          <SectionHeader title="Payroll Summary" sub="March 2025" actionLabel="Run Payroll"/>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <THead cols={["Employee","Department","Role","Basic Salary","Tax (7.5%)","Net Pay","Status"]}/>
            <tbody>
              {employees.map(e=>{
                const tax = Math.round(e.salary*0.075);
                const net = e.salary - tax;
                return (
                  <tr key={e.id} style={{ borderBottom:`1px solid ${T.border}` }}>
                    <td style={{ padding:"10px 12px", color:T.t1, fontSize:13, fontWeight:600 }}>{e.name}</td>
                    <td style={{ padding:"10px 12px", color:T.t2, fontSize:12 }}>{e.dept}</td>
                    <td style={{ padding:"10px 12px", color:T.t2, fontSize:12 }}>{e.role}</td>
                    <td style={{ padding:"10px 12px", color:T.t1, fontSize:13, fontFamily:"monospace" }}>₦{fmt(e.salary)}</td>
                    <td style={{ padding:"10px 12px", color:T.red,  fontSize:12, fontFamily:"monospace" }}>-₦{fmt(tax)}</td>
                    <td style={{ padding:"10px 12px", color:T.gold, fontSize:13, fontFamily:"monospace", fontWeight:700 }}>₦{fmt(net)}</td>
                    <td style={{ padding:"10px 12px" }}>
                      <span style={{ background:T.greenBg,color:T.green,fontSize:10,fontWeight:700,
                        padding:"2px 8px",borderRadius:20 }}>Pending</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}

      {tab==="departments" && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
          {depts.map(d=>{
            const staff = employees.filter(e=>e.dept===d);
            const here  = staff.filter(e=>e.status!=="absent").length;
            return (
              <Card key={d}>
                <div style={{ color:T.t1, fontWeight:700, fontSize:14, marginBottom:4 }}>{d}</div>
                <div style={{ color:T.t2, fontSize:12, marginBottom:14 }}>{staff.length} employees</div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ color:T.t2, fontSize:11 }}>Present today</span>
                  <span style={{ color:T.green, fontFamily:"monospace", fontWeight:700, fontSize:13 }}>
                    {here}/{staff.length}
                  </span>
                </div>
                <div style={{ background:T.border, borderRadius:4, height:5 }}>
                  <div style={{ width:`${Math.round((here/staff.length)*100)}%`,
                    height:"100%", background:T.green, borderRadius:4 }}/>
                </div>
                <div style={{ marginTop:12, display:"flex", flexWrap:"wrap", gap:5 }}>
                  {staff.map(e=>(
                    <div key={e.id} style={{ width:28,height:28,borderRadius:"50%",background:T.hover,
                      border:`1px solid ${T.border}`,display:"flex",alignItems:"center",
                      justifyContent:"center",color:T.t2,fontSize:9,fontWeight:700 }}
                      title={e.name}>
                      {e.name.split(" ").map(n=>n[0]).join("")}
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

const AttendanceView = () => {
  const [clockInName, setClockInName] = useState("");
  const [clockLog, setClockLog]   = useState([
    { name:"Obiora Dim",       time:"07:40", action:"Clock In"  },
    { name:"Chukwuemeka Obi",  time:"07:48", action:"Clock In"  },
    { name:"Amaka Okafor",     time:"07:55", action:"Clock In"  },
    { name:"Chidinma Ilo",     time:"08:00", action:"Clock In"  },
    { name:"Ngozi Eze",        time:"08:02", action:"Clock In"  },
  ]);
  const handleClock = () => {
    if (!clockInName.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    setClockLog(prev=>[{ name:clockInName, time:timeStr, action:"Clock In" }, ...prev]);
    setClockInName("");
  };
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <KpiCard title="Present Today"  value="18" sub="clocked in"          icon={CheckCircle} color={T.green}/>
        <KpiCard title="Absent"         value="2"  sub="not in yet"           icon={AlertTriangle} color={T.red}/>
        <KpiCard title="Late (>08:00)"  value="1"  sub="Precious Okeke"       icon={Clock}       color={T.gold}/>
        <KpiCard title="On Route"       value="2"  sub="drivers dispatched"   icon={Truck}       color={T.blue}/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1.8fr", gap:14 }}>
        <Card>
          <div style={{ color:T.t1, fontWeight:700, fontSize:15, marginBottom:4 }}>Clock In / Out</div>
          <div style={{ color:T.t2, fontSize:12, marginBottom:16 }}>Manual attendance entry</div>
          <input value={clockInName} onChange={e=>setClockInName(e.target.value)}
            placeholder="Employee name..."
            style={{ width:"100%", background:T.hover, border:`1px solid ${T.borderMid}`,
              borderRadius:8, padding:"9px 12px", color:T.t1, fontSize:12, outline:"none",
              boxSizing:"border-box", marginBottom:10 }}/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
            <button onClick={handleClock}
              style={{ background:T.greenBg, color:T.green, border:`1px solid ${T.green}40`,
                borderRadius:8, padding:"9px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
              ✓ Clock In
            </button>
            <button style={{ background:T.redBg, color:T.red, border:`1px solid ${T.red}40`,
              borderRadius:8, padding:"9px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
              ✕ Clock Out
            </button>
          </div>
          <div style={{ color:T.t2, fontSize:11, fontWeight:600, letterSpacing:"0.05em",
            textTransform:"uppercase", marginBottom:10 }}>Recent Activity</div>
          {clockLog.slice(0,6).map((l,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:T.green,flexShrink:0 }}/>
              <span style={{ color:T.t1, fontSize:12, flex:1 }}>{l.name}</span>
              <span style={{ color:T.t2, fontSize:11, fontFamily:"monospace" }}>{l.time}</span>
              <span style={{ color:T.green, fontSize:10, fontWeight:600 }}>{l.action}</span>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ color:T.t1, fontWeight:700, fontSize:15, marginBottom:4 }}>Today's Attendance Register</div>
          <div style={{ color:T.t2, fontSize:12, marginBottom:14 }}>Monday, 25 March 2025</div>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <THead cols={["Employee","Department","Clock In","Status"]}/>
            <tbody>
              {employees.map(e=>(
                <tr key={e.id} style={{ borderBottom:`1px solid ${T.border}` }}>
                  <td style={{ padding:"10px 12px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:26,height:26,borderRadius:"50%",background:T.hover,
                        border:`1px solid ${T.border}`,display:"flex",alignItems:"center",
                        justifyContent:"center",color:T.t2,fontSize:9,fontWeight:700,flexShrink:0 }}>
                        {e.name.split(" ").map(n=>n[0]).join("")}
                      </div>
                      <span style={{ color:T.t1, fontSize:12, fontWeight:500 }}>{e.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:"10px 12px", color:T.t2, fontSize:11 }}>{e.dept}</td>
                  <td style={{ padding:"10px 12px", color:T.t1, fontSize:12, fontFamily:"monospace" }}>{e.time}</td>
                  <td style={{ padding:"10px 12px" }}><Badge status={e.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

const LogisticsView = () => (
  <div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
      <KpiCard title="Active Drivers"     value="3"      sub="on route now"         icon={Truck}       color={T.blue}  />
      <KpiCard title="Dispatched Today"   value="720"    sub="total units loaded"    icon={Package}     color={T.gold}  />
      <KpiCard title="Delivered"          value="605"    sub="units confirmed"       icon={CheckCircle} color={T.green} />
      <KpiCard title="Pending Returns"    value="43"     sub="awaiting reconciliation" icon={AlertTriangle} color={T.orange}/>
    </div>
    <Card>
      <SectionHeader title="Driver Dispatch Status" sub="Live tracking — today" actionLabel="New Dispatch"/>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <THead cols={["Dispatch ID","Driver","Vehicle","Route","Loaded","Sold","Returned","Amount","Status"]}/>
        <tbody>
          {dispatches.map(d=>(
            <tr key={d.id} style={{ borderBottom:`1px solid ${T.border}` }}>
              <td style={{ padding:"11px 12px", color:T.t3, fontSize:11, fontFamily:"monospace" }}>{d.id}</td>
              <td style={{ padding:"11px 12px", color:T.t1, fontSize:13, fontWeight:600 }}>{d.driver}</td>
              <td style={{ padding:"11px 12px", color:T.t2, fontSize:11, fontFamily:"monospace" }}>{d.vehicle}</td>
              <td style={{ padding:"11px 12px", color:T.t2, fontSize:12 }}>Onitsha — Awka</td>
              <td style={{ padding:"11px 12px", color:T.t1, fontSize:13, fontFamily:"monospace" }}>{d.loaded}</td>
              <td style={{ padding:"11px 12px", color:T.green, fontSize:13, fontFamily:"monospace", fontWeight:700 }}>{d.sold}</td>
              <td style={{ padding:"11px 12px", color:T.blue,  fontSize:13, fontFamily:"monospace" }}>{d.returned}</td>
              <td style={{ padding:"11px 12px", color:T.gold, fontSize:13, fontFamily:"monospace", fontWeight:700 }}>{fmtN(d.amount)}</td>
              <td style={{ padding:"11px 12px" }}><Badge status={d.status}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

const UsersView = () => (
  <div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
      <KpiCard title="Total Users"     value="11"   sub="system accounts"     icon={Users}  color={T.blue}  />
      <KpiCard title="Active Sessions" value="4"    sub="currently online"     icon={Eye}    color={T.green} />
      <KpiCard title="Roles Defined"   value="10"   sub="RBAC configurations"  icon={Shield} color={T.gold}  />
      <KpiCard title="Audit Logs"      value="482"  sub="events today"         icon={FileText} color={T.orange}/>
    </div>
    <Card>
      <SectionHeader title="Role-Based Access Control" sub="System user roles and permissions" actionLabel="Add User"/>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <THead cols={["Role","Label","Accessible Modules","Color"]}/>
        <tbody>
          {ROLES.map(r=>(
            <tr key={r.id} style={{ borderBottom:`1px solid ${T.border}` }}>
              <td style={{ padding:"11px 12px", color:T.t2, fontSize:11, fontFamily:"monospace" }}>{r.id}</td>
              <td style={{ padding:"11px 12px", color:T.t1, fontSize:13, fontWeight:600 }}>{r.label}</td>
              <td style={{ padding:"11px 12px" }}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {(ACCESS[r.id]||[]).map(m=>(
                    <span key={m} style={{ background:T.hover, color:T.t2, fontSize:10,
                      padding:"2px 8px", borderRadius:6, border:`1px solid ${T.border}` }}>
                      {m}
                    </span>
                  ))}
                </div>
              </td>
              <td style={{ padding:"11px 12px" }}>
                <span style={{ width:12,height:12,borderRadius:"50%",background:r.color,display:"inline-block" }}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

const PlaceholderView = ({ label }) => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
    justifyContent:"center", height:350, color:T.t2 }}>
    <FileText size={48} color={T.t3} style={{ marginBottom:16 }}/>
    <div style={{ fontSize:18, color:T.t1, fontWeight:700, marginBottom:8 }}>{label}</div>
    <div style={{ fontSize:13, color:T.t2 }}>Module accessible based on your current role.</div>
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [module, setModule]       = useState("dashboard");
  const [role, setRole]           = useState("ceo");
  const [roleOpen, setRoleOpen]   = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifCount]              = useState(7);

  useEffect(() => {
    // Load font from jsdelivr
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/@fontsource/outfit@5/index.css";
    document.head.appendChild(link);
    const link2 = document.createElement("link");
    link2.rel  = "stylesheet";
    link2.href = "https://cdn.jsdelivr.net/npm/@fontsource/dm-mono@5/400.css";
    document.head.appendChild(link2);
  }, []);

  const currentRole = ROLES.find(r=>r.id===role);
  const accessible  = ACCESS[role] || [];

  const navGroups = ["OVERVIEW","OPERATIONS","FINANCE","PEOPLE","SYSTEM"];

  const getView = () => {
    if (!accessible.includes(module)) {
      return (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
          justifyContent:"center", height:380 }}>
          <Shield size={52} color={T.t3} style={{ marginBottom:16 }}/>
          <div style={{ fontSize:18, color:T.t1, fontWeight:700, marginBottom:8 }}>Access Restricted</div>
          <div style={{ fontSize:13, color:T.t2 }}>
            Your role ({currentRole?.label}) cannot access this module.
          </div>
        </div>
      );
    }
    switch(module) {
      case "dashboard":  return <DashboardView setModule={setModule}/>;
      case "stock":      return <StockView/>;
      case "production": return <ProductionView/>;
      case "sales":      return <SalesView/>;
      case "logistics":  return <LogisticsView/>;
      case "finance":    return <FinanceView/>;
      case "hr":         return <HRView/>;
      case "attendance": return <AttendanceView/>;
      case "users":      return <UsersView/>;
      default:           return <PlaceholderView label={NAV.find(n=>n.id===module)?.label||module}/>;
    }
  };

  const notifs = [
    { msg:"Baking Soda stock critically low",     color:T.red,    time:"09:15" },
    { msg:"Seasoning Mix below reorder threshold",color:T.red,    time:"09:02" },
    { msg:"Sugar stock running low (22%)",        color:T.gold,   time:"08:45" },
    { msg:"Precious Okeke clocked in late",       color:T.gold,   time:"09:15" },
    { msg:"DSP001 — ₦18K outstanding balance",    color:T.orange, time:"10:00" },
    { msg:"Sunday Onuoha dispatch reconciled",    color:T.green,  time:"10:30" },
    { msg:"Sachet water exceeded daily target",   color:T.green,  time:"11:00" },
  ];

  return (
    <div style={{ display:"flex", height:800, background:T.bg,
      fontFamily:"'Outfit', system-ui, sans-serif", overflow:"hidden", fontSize:13 }}
      onClick={()=>{if(roleOpen)setRoleOpen(false);if(notifOpen)setNotifOpen(false);}}>

      {/* ── SIDEBAR ── */}
      <div style={{ width:222, background:T.sidebar, borderRight:`1px solid ${T.border}`,
        display:"flex", flexDirection:"column", flexShrink:0, overflow:"hidden" }}>

        {/* Logo */}
        <div style={{ padding:"18px 20px 16px", borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:11 }}>
            <div style={{ width:34,height:34,background:`linear-gradient(135deg, ${T.gold}, #e07700)`,
              borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",
              fontWeight:900,fontSize:16,color:"#000",flexShrink:0,letterSpacing:"-0.03em" }}>P</div>
            <div>
              <div style={{ color:T.t1, fontWeight:800, fontSize:15, letterSpacing:"0.06em" }}>PANPET</div>
              <div style={{ color:T.t3, fontSize:9,  letterSpacing:"0.08em", marginTop:1 }}>ENTERPRISE ERP</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex:1, overflowY:"auto", padding:"10px 0" }}>
          {navGroups.map(grp=>{
            const items = NAV.filter(n=>n.group===grp);
            return (
              <div key={grp} style={{ marginBottom:6 }}>
                <div style={{ padding:"6px 20px 4px", color:T.t3, fontSize:9,
                  fontWeight:800, letterSpacing:"0.1em" }}>{grp}</div>
                {items.map(item=>{
                  const isActive   = module===item.id;
                  const hasAccess  = accessible.includes(item.id);
                  return (
                    <button key={item.id}
                      onClick={e=>{ e.stopPropagation(); hasAccess&&setModule(item.id); }}
                      style={{ width:"100%", display:"flex", alignItems:"center", gap:10,
                        padding:"8px 20px", border:"none", cursor:hasAccess?"pointer":"not-allowed",
                        background:isActive?T.goldBg:"transparent",
                        borderLeft:`2px solid ${isActive?T.gold:"transparent"}`,
                        color:isActive?T.gold:hasAccess?T.t2:T.t3,
                        fontSize:12, fontWeight:isActive?700:400,
                        opacity:hasAccess?1:0.35, textAlign:"left", transition:"all .15s" }}>
                      <item.icon size={14}/>
                      {item.label}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* User footer */}
        <div style={{ padding:"12px 20px", borderTop:`1px solid ${T.border}`, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ width:30,height:30,borderRadius:"50%",background:T.goldBg,
              border:`1px solid ${T.gold}50`,display:"flex",alignItems:"center",
              justifyContent:"center",color:T.goldB,fontSize:11,fontWeight:800,flexShrink:0 }}>
              {role==="ceo"?"CE":role.slice(0,2).toUpperCase()}
            </div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ color:T.t1, fontSize:11, fontWeight:700, whiteSpace:"nowrap",
                overflow:"hidden", textOverflow:"ellipsis" }}>{currentRole?.label}</div>
              <div style={{ color:T.t3, fontSize:9 }}>panpet.ng · v2.5.0</div>
            </div>
            <Settings size={13} color={T.t3} style={{ cursor:"pointer", flexShrink:0 }}/>
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>

        {/* Top bar */}
        <div style={{ height:54, background:T.card, borderBottom:`1px solid ${T.border}`,
          display:"flex", alignItems:"center", padding:"0 24px", gap:14, flexShrink:0 }}>

          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ color:T.t3, fontSize:9, letterSpacing:"0.06em", textTransform:"uppercase" }}>
              Panpet Global Enterprise Ltd.
            </div>
            <div style={{ color:T.t1, fontSize:14, fontWeight:700, marginTop:1 }}>
              {NAV.find(n=>n.id===module)?.label || "Dashboard"}
            </div>
          </div>

          {/* Date */}
          <div style={{ display:"flex", alignItems:"center", gap:5, color:T.t2, fontSize:11 }}>
            <Calendar size={12}/>
            <span>Mon, 25 March 2025</span>
          </div>

          {/* Notification bell */}
          <div style={{ position:"relative" }} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>{setNotifOpen(!notifOpen);setRoleOpen(false);}}
              style={{ background:"transparent", border:`1px solid ${T.border}`, borderRadius:8,
                padding:"7px 10px", cursor:"pointer", position:"relative", display:"flex" }}>
              <Bell size={15} color={notifOpen?T.gold:T.t2}/>
              {notifCount>0 && (
                <span style={{ position:"absolute", top:4, right:4, width:7, height:7,
                  background:T.red, borderRadius:"50%", border:`1px solid ${T.card}` }}/>
              )}
            </button>
            {notifOpen && (
              <div style={{ position:"absolute", top:42, right:0, width:320, background:T.card,
                border:`1px solid ${T.border}`, borderRadius:12,
                boxShadow:"0 12px 32px rgba(0,0,0,0.5)", zIndex:200 }}>
                <div style={{ padding:"14px 16px", borderBottom:`1px solid ${T.border}`,
                  display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ color:T.t1, fontWeight:700, fontSize:13 }}>Notifications</span>
                  <span style={{ background:T.redBg, color:T.red, fontSize:10, fontWeight:700,
                    padding:"2px 8px", borderRadius:20 }}>{notifCount}</span>
                </div>
                {notifs.map((n,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10,
                    padding:"10px 16px", borderBottom:`1px solid ${T.border}`,
                    background:i===0?T.hover:"transparent" }}>
                    <div style={{ width:7,height:7,borderRadius:"50%",background:n.color,
                      marginTop:4,flexShrink:0 }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ color:T.t1, fontSize:12, lineHeight:1.4 }}>{n.msg}</div>
                      <div style={{ color:T.t3, fontSize:10, marginTop:2 }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Role switcher */}
          <div style={{ position:"relative" }} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>{setRoleOpen(!roleOpen);setNotifOpen(false);}}
              style={{ display:"flex", alignItems:"center", gap:8, background:T.hover,
                border:`1px solid ${T.borderMid}`, borderRadius:8, padding:"7px 12px",
                cursor:"pointer", color:currentRole?.color||T.gold, fontSize:11, fontWeight:700 }}>
              <div style={{ width:7,height:7,borderRadius:"50%",background:currentRole?.color||T.gold }}/>
              {currentRole?.label}
              <ChevronDown size={11} color={T.t2}/>
            </button>
            {roleOpen && (
              <div style={{ position:"absolute", top:42, right:0, width:230, background:T.card,
                border:`1px solid ${T.border}`, borderRadius:10,
                boxShadow:"0 12px 28px rgba(0,0,0,0.5)", zIndex:200, padding:"6px 0" }}>
                <div style={{ padding:"6px 14px 8px", color:T.t3, fontSize:9, fontWeight:800,
                  letterSpacing:"0.08em", borderBottom:`1px solid ${T.border}`, marginBottom:4 }}>
                  SWITCH ROLE (DEMO)
                </div>
                {ROLES.map(r=>(
                  <button key={r.id}
                    onClick={()=>{
                      setRole(r.id); setRoleOpen(false);
                      if(!(ACCESS[r.id]||[]).includes(module)){
                        setModule((ACCESS[r.id]||["dashboard"])[0]);
                      }
                    }}
                    style={{ width:"100%", display:"flex", alignItems:"center", gap:10,
                      padding:"9px 14px", border:"none", cursor:"pointer",
                      background:role===r.id?r.color+"18":"transparent",
                      color:role===r.id?r.color:T.t2,
                      fontSize:12, fontWeight:role===r.id?700:400, textAlign:"left" }}>
                    <div style={{ width:7,height:7,borderRadius:"50%",background:r.color,flexShrink:0 }}/>
                    {r.label}
                    {role===r.id && <CheckCircle size={12} style={{ marginLeft:"auto" }}/>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px", background:T.bg }}>
          {getView()}
        </div>
      </div>
    </div>
  );
}
