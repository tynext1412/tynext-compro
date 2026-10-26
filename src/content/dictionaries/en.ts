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
      projects: "Projects",
      certifications: "HSE & Quality",
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
      title: "Renewable Energy EPC",
      body: "Construction of rooftop PV, floating PV, and hybrid microgrids, plus supply of BESS (energy storage).",
      scope: ["Rooftop PV", "Floating PV", "Hybrid microgrid", "Battery Energy Storage System (BESS)"],
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
      title: "Certified Experts",
      body: "Internationally experienced engineers with high-level technical qualifications in electrical and automation fields.",
    },
    {
      title: "End-to-End Solution",
      body: "We handle the entire project lifecycle, from initial consultation, engineering design, and procurement to construction and maintenance.",
    },
    {
      title: "Proven Track Record",
      body: "A record of strategic projects delivered with PLN, state-owned enterprises (BUMN), and leading manufacturing groups.",
    },
  ],

  projects: {
    microgrid: {
      category: "Hybrid Microgrid",
      title: "Hybrid Solar & Battery System",
      body: "Development of a hybrid solar-battery microgrid for a remote island to secure a 24/7 power supply.",
      status: "Completed & Operational",
    },
    scada: {
      category: "Monitoring & Control",
      title: "SCADA Upgrade & RTU Integration",
      body: "SCADA system upgrade and RTU integration across a 20 kV distribution network to improve main grid reliability.",
      status: "Completed & Integrated",
    },
    "pv-om": {
      category: "Operation & Maintenance",
      title: "Floating & Rooftop PV O&M",
      body: "Scheduled maintenance, troubleshooting, and performance monitoring for industrial rooftop PV and floating PV plants.",
      status: "Ongoing Service Contract",
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
    projectsEyebrow: "Project Portfolio",
    projectsTitle: "Featured Project Experience",
    allProjects: "All projects",
    complianceEyebrow: "Compliance & Quality",
    complianceTitle: "Certifications & Safety Standards",
    complianceLink: "Certification & HSE details",
    status: "Status",
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
      "Engineering & design, system integration, renewable energy EPC, and operation & maintenance for electrical and automation systems.",
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
      "TYNEXT project portfolio: hybrid solar-battery microgrid, 20 kV SCADA & RTU upgrade, and solar PV O&M.",
    title: "Featured Project Experience",
    intro: "Microgrid, SCADA, and solar PV maintenance projects that are already running or currently in our hands.",
    status: "Status",
    serviceLine: "Service line",
  },

  certificationsPage: {
    metaTitle: "HSE & Quality",
    metaDescription: "ISO 9001:2015, ISO 45001:2018, and BUJK certifications, and the TYNEXT Zero Harm policy.",
    title: "Certifications & Safety Standards",
    intro: "The quality management, occupational safety, and licensing systems behind every piece of our field work.",
    sectionLabel: "Compliance & Quality",
  },

  contactPage: {
    metaTitle: "Contact",
    office: "Head Office",
    email: "Email Inquiries",
    phone: "Phone",
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
    submit: "Compose an Email to Our Team",
    submitHint: "This button opens your email app with the message already filled in.",
    sent: "Your email app should now be open. If it isn't, send your message directly to",
    errors: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email.",
      emailInvalid: "That email address doesn't look right.",
      messageShort: "Please describe your needs in at least 10 characters.",
    },
    mail: {
      subject: "Project discussion",
      name: "Name",
      company: "Company",
      email: "Email",
    },
  },

  notFound: {
    title: "Page not found",
    body: "The page you opened doesn't exist or has moved. Go back to the home page or browse our services.",
    home: "Back to Home",
    services: "View services",
  },
};
