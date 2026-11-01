import type { Dictionary } from "./id";

// English dictionary. Must have exactly the same keys as id.ts (enforced by the Dictionary type).
export const en: Dictionary = {
  meta: {
    defaultTitle: "TYNEXT Energy and Control | Integrated Power & Control Systems",
    description:
      "Industrial automation, integrated power control systems, SCADA, solar PV, and BESS solutions for industry and infrastructure in Indonesia.",
    ogLocale: "en_US",
  },

  nav: {
    labels: {
      home: "Home",
      about: "About",
      services: "Services",
      ipc: "IPC Solution",
      projects: "Projects",
      platform: "Cloud Platform",
      contact: "Contact",
    },
    cta: "Contact Us",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    currentPage: "current page",
    mainNav: "Main navigation",
    footerNav: "Pages",
    homeLink: "TYNEXT Energy and Control, home",
    skipToContent: "Skip to content",
    language: "Choose language",
  },

  hero: {
    eyebrow: "Pioneering Smart Energy & Automation",
    title: "Integrated Power & Control Systems",
    description:
      "A leading provider of industrial automation, integrated power control systems, and renewable energy technology in Indonesia.",
    primaryCta: "Discuss Your Project",
    secondaryCta: "View services",
  },

  map: {
    heading: "Service map",
    loading: "Loading system map…",
    failed: "The 3D map cannot be displayed on this device. Use the service list to see the details.",
  },

  about: {
    lead: "TYNEXT Energy and Control is a team of professionals, engineers, and expert technicians dedicated to delivering modern automation and energy systems.",
    body: "We integrate SCADA, Industrial IoT, solar PV, and smart power management to help industry and infrastructure reach peak operational efficiency and energy sustainability.",
    stats: ["Years of Experience", "Projects Completed", "Client Satisfaction"],
    photoAlt:
      "Battery Energy Storage System facility: rows of battery containers next to a substation and a solar panel field",
    photoCaption: "Battery Energy Storage System (BESS)",
  },

  vision: {
    label: "Our Vision",
    title: "To Be the Leading Partner in Industrial Automation & Clean Energy Solutions",
    body: "Bringing next-generation technology into national industry to improve productivity and environmental sustainability.",
  },

  missions: [
    {
      title: "Continuous Innovation",
      body: "Developing high-precision engineering in electrical systems and control instrumentation.",
    },
    {
      title: "World-Class Quality",
      body: "Delivering EPC (Engineering, Procurement, Construction) services with no compromise on safety.",
    },
    {
      title: "Long-Term Partnership",
      body: "Putting customer satisfaction first through reliable Operation & Maintenance services.",
    },
  ],

  services: {
    engineering: {
      code: "01 / Engineering",
      title: "Engineering & Design",
      body: "Electrical feasibility studies, interconnection studies, DED, and control system design to SNI/IEC standards.",
      scope: [
        "Electrical feasibility studies",
        "Interconnection studies",
        "Detail Engineering Design (DED)",
        "Control system design to SNI/IEC standards",
      ],
      role: "Studies and design cover the whole system, from generation to load.",
    },
    integration: {
      code: "02 / Integration",
      title: "System Integration",
      body: "SCADA integration, PLC migration, RTU installation, telemetry, and 20 kV distribution network automation.",
      scope: [
        "SCADA integration",
        "PLC migration",
        "RTU installation & telemetry",
        "20 kV distribution network automation",
      ],
      role: "Substations, SCADA, and RTUs control the 20 kV distribution network.",
    },
    renewable: {
      code: "03 / Renewables",
      title: "Energy Solutions & Infrastructure",
      body: "Development and supply of renewable energy systems, BESS, hybrid microgrids, EV charging infrastructure, and energy infrastructure solutions.",
      scope: ["EV Charging", "Hybrid & BESS"],
      role: "Solar PV generates the energy; BESS stores it for use at any time.",
    },
    maintenance: {
      code: "04 / Services",
      title: "Operation & Maintenance",
      body: "Testing & commissioning, energy audits, preventive maintenance, and remote asset performance monitoring.",
      scope: [
        "Testing & commissioning",
        "Energy audits",
        "Preventive maintenance",
        "Remote asset performance monitoring",
      ],
      role: "Inspection, maintenance, and performance monitoring for every field asset.",
    },
  },

  pillars: [
    {
      code: "Pillar 01",
      title: "Next-Gen Control Systems",
      body: "Focused on modern control systems and real-time monitoring for efficient industrial facilities.",
      items: [
        "Industrial Internet of Things (IIoT)",
        "SCADA & Substation Automation",
        "PLC Migration & System Refurbishment",
        "Plant Asset Management & Telemetry",
      ],
    },
    {
      code: "Pillar 02",
      title: "New Energy Solutions",
      body: "Driving the clean energy transition through solar infrastructure and energy storage systems.",
      items: [
        "Solar PV & Smart Grid EPC",
        "Hybrid Microgrid (Solar-Diesel-Biogas)",
        "Battery Energy Storage Systems (BESS)",
        "EV Charging Infrastructure & Power Panel",
      ],
    },
  ],

  advantages: [
    {
      title: "Expert Team",
      body: "Experienced engineers with high-level technical qualifications in electrical and automation fields.",
    },
    {
      title: "End-to-End Solution",
      body: "We handle the entire project lifecycle, from initial consultation, engineering design, and procurement to integration and maintenance.",
    },
    {
      title: "IPC-Based Solution",
      body: "Control and monitoring systems built on Industrial PCs (IPC), running SCADA, HMI, and data acquisition reliably in industrial environments.",
    },
  ],

  projects: {
    "solar-bess-control": {
      category: "Solar & BESS · Power Plant Control",
      title: "Solar & BESS Control System",
      body: "Beckhoff provides a decentralised PC-based control platform (CX series + TwinCAT) for the BCI and PPC of Power Electronics' solar and battery plants (120 GW of capacity worldwide). Using Modbus TCP and ADS communication, the system coordinates 160 power blocks at once and delivers a 330 MW dynamic response in just 110 ms, meeting strict grid ancillary service requirements.",
      company: "Power Electronics",
      technology: "Beckhoff CX series, TwinCAT, Modbus TCP, ADS",
      imageAlt: "Beckhoff CX2033 and CX2100 Embedded PCs installed in a solar and battery control panel",
    },
    "ev-charging": {
      category: "EV Charging · Energy Management",
      title: "Smart EV Charging & Energy Integration",
      body: "German electrical contractor Elektro Beckhoff integrated the reev energy management software, bringing PV, battery storage, and EV chargers together in one smart platform. This hardware-independent solution enables scalable power management (up to 600 kW DC stations) and supports dynamic electricity tariffs for more efficient charging.",
      company: "Elektro Beckhoff",
      technology: "reev energy management, PV, BESS, DC chargers up to 600 kW",
      imageAlt: "Solar-roofed EV charging station with an Elektro Beckhoff van charging",
    },
    "grid-test-rig": {
      category: "Grid scenario & fault condition simulation",
      title: "Grid Converter Test Rig",
      body: "Beckhoff provides a PC-based real-time control and simulation platform (C6030 & CX2043) with EtherCAT for Siemens Gamesa's wind turbine converter test rig. The system enables microsecond-level grid simulation and automated testing, ensuring accurate validation of wind turbine performance before certification.",
      company: "Siemens Gamesa",
      technology: "Beckhoff C6030, CX2043, EtherCAT",
      imageAlt: "Test rig panel with two Beckhoff CX2043 Embedded PCs labelled GEN and GRID",
    },
  },

  values: [
    { title: "Excellence", body: "Best-in-class execution grounded in data and precise analysis." },
    { title: "Innovation", body: "Always learning and bringing in the latest technology." },
    { title: "Integrity", body: "Open, honest, and accountable communication." },
    { title: "Agility", body: "Adapting quickly as a team to reach shared goals." },
    { title: "Solution Oriented", body: "Proactively delivering real solutions for our stakeholders." },
  ],

  certifications: [
    "Internationally standardised Quality Management System",
    "Occupational Health & Safety Management System",
    "Construction Services Business Entity. Official licence for electrical power & industrial automation work",
  ],

  safety: {
    title: "Zero Harm Policy",
    body: "Our full commitment to occupational safety at every project site. Worker safety and the protection of client assets are TYNEXT's top priorities.",
  },

  cta: {
    title: "Let's Collaborate with TYNEXT",
    body: "Talk to our experts about your industrial automation, power control system, and renewable energy project needs.",
    button: "Contact Our Team",
  },

  home: {
    aboutEyebrow: "About Us",
    aboutLink: "Full company profile",
    servicesEyebrow: "Core Services",
    servicesTitle: "Services & Engineering Specialisations",
    serviceDetail: "Service details",
    projectsEyebrow: "Project References",
    projectsTitle: "Technology at Work in Energy Projects Worldwide",
    allProjects: "All projects",
    complianceEyebrow: "Compliance & Quality",
    complianceTitle: "Certifications & Safety Standards",
  },

  aboutPage: {
    metaTitle: "About Us",
    title: "Company Profile & Capabilities",
    missionEyebrow: "Vision & Mission",
    missionTitle: "Our Mission",
    missionTagline: "Driven by Engineering Excellence",
    advantagesEyebrow: "Why TYNEXT",
    advantagesTitle: "Why Choose TYNEXT?",
    valuesEyebrow: "Company Culture",
    valuesTitle: "TYNEXT Core Values",
  },

  servicesPage: {
    metaTitle: "Services",
    metaDescription:
      "Engineering & design, system integration, energy solutions & infrastructure, and operation & maintenance for electrical and automation systems.",
    title: "Services & Engineering Specialisations",
    intro:
      "From feasibility studies to asset maintenance, one team covers electrical engineering, control systems, and renewable energy.",
    relatedProject: "Related project:",
    pillarsEyebrow: "Solution Ecosystem",
    pillarsTitle: "The Two Pillars of TYNEXT Solutions",
    solarCaption: "Illustration: solar PV with single-axis trackers following the sun",
  },

  projectsPage: {
    metaTitle: "Projects",
    metaDescription:
      "Project references: solar & BESS control, EV charging integration, and a wind turbine grid converter test rig built on Beckhoff PC-based control.",
    title: "Project References",
    intro:
      "PC-based Beckhoff control platforms at work in solar & battery plants, EV charging, and wind turbine testing.",
    company: "Company",
    technology: "Technology",
    serviceLine: "Service line",
  },

  ipcPage: {
    metaTitle: "IPC Solution",
    metaDescription:
      "Embedded PC (IPC) catalogue for control and automation systems: search, sort, and compare CPUs, operating systems, TwinCAT levels, and communication protocols.",
    title: "IPC Solution",
    intro:
      "Embedded PCs for control, automation, and monitoring systems. Search, sort, and compare their specifications, then discuss your project needs with our team.",
    finderTitle: "Product finder IPC",
    searchLabel: "Search products",
    searchPlaceholder: "Search product, CPU, protocol...",
    columnsButton: "Show/hide columns",
    showAllColumns: "Show all columns",
    compare: "Compare",
    clearSelection: "Clear selection",
    compareColumn: "Compare",
    selectRow: "Select to compare",
    download: "Download Excel",
    downloadPdf: "Download PDF Catalogue",
    // {shown} and {total} are replaced with numbers.
    count: "{shown} of {total} products",
    empty: "No products match. Try another keyword or show all products.",
    showAll: "Show all products",
    source: "Data source: Beckhoff Automation product catalogue.",
    columns: {
      product: "Product",
      productCategory: "Product category",
      numberOfCores: "Number of cores",
      cpuType: "CPU type",
      twincat3PlatformLevel: "TwinCAT 3 platform level",
      twincat2Support: "TwinCAT 2 support",
      operatingSystem: "Operating system",
      protectionRating: "Protection rating",
      fan: "Fan",
      productStatus: "Product status",
      useInHazardousAreas: "Use in hazardous areas",
      interfaces: "Interfaces",
      ups: "UPS",
      tpm: "TPM",
      moduleType: "Module type",
      communication: "Communication",
      masterSlaveFunctionality: "Master/slave functionality",
      memoryMedium: "Memory medium",
    },
    // The Excel values are already English; listed so the keys match id.ts.
    values: {
      yes: "yes",
      no: "no",
      "regular delivery": "available",
      "regular delivery (not recommended for new projects)": "available (not recommended for new projects)",
      "product announcement": "coming soon",
      "1-second UPS": "1-second UPS",
      "1-second UPS, integrated": "1-second UPS, integrated",
      "Basic CPU module": "Basic CPU module",
    },
  },

  platformPage: {
    metaTitle: "Cloud Platform",
    metaDescription:
      "TYNEXT Solar: a cloud monitoring platform to monitor and manage multiple solar PV and BESS sites from one dashboard.",
    title: "TYNEXT Solar",
    intro:
      "TYNEXT's cloud monitoring platform brings all your energy assets together in one clear, fast, and easy-to-access dashboard.",
    featuresLabel: "Key Features",
    features: [
      {
        title: "Multiple Sites Control",
        body: "Monitor and manage multiple solar PV and BESS sites from one centralised dashboard.",
      },
      {
        title: "Interactive & Real-Time Tools",
        body: "Interactive maps and real-time data to respond to asset conditions quickly.",
      },
      {
        title: "Easy Reporting",
        body: "Performance and energy production reports, ready to share with stakeholders.",
      },
    ],
    screenshotAlt:
      "TYNEXT Solar dashboard: a map of solar PV and BESS sites across Indonesia with installed capacity, energy generation, environmental benefits, and BESS performance.",
    open: "Open TYNEXT Solar",
  },

  contactPage: {
    metaTitle: "Contact",
    office: "Head Office",
    email: "Email Inquiries",
    whatsapp: "WhatsApp",
    formTitle: "Tell us about your project",
  },

  form: {
    name: "Name",
    company: "Company",
    optional: "(optional)",
    email: "Email",
    emailPlaceholder: "name@company.com",
    service: "Service needed",
    otherService: "Other",
    message: "Message",
    messagePlaceholder: "Tell us the location, capacity, or system you want to build.",
    submit: "Send Message",
    sending: "Sending...",
    submitHint: "Our team will reply to the email address you enter.",
    sent: "Thank you, your message has been sent. Our team will be in touch soon.",
    errors: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email.",
      emailInvalid: "That email address doesn't look right.",
      serviceRequired: "Please choose a service.",
      messageShort: "Please describe your needs in at least 10 characters.",
      // {seconds} is replaced with the Retry-After value.
      rateLimited: "Too many messages from your network. Try again in {seconds} seconds, or email us directly at",
      failed: "Your message wasn't sent. Please try again shortly, or email us directly at",
    },
  },

  notFound: {
    title: "Page not found",
    body: "The page you opened doesn't exist or has moved. Go back to the home page or browse our services.",
    home: "Back to Home",
    services: "View services",
  },
};
