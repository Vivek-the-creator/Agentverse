export const mockCases = [
  {
    id: "case_001",
    caseNumber: "CS/2026/8941",
    title: "Sharma vs. Apex Realty Developers",
    type: "Property Dispute",
    status: "In Progress",
    riskScore: 24,
    riskLevel: "Low",
    successProbability: 88,
    settlementChance: 75,
    courtName: "Maharashtra Real Estate Regulatory Authority (MahaRERA)",
    jurisdiction: "Mumbai Urban District",
    filingDate: "2026-01-14",
    nextHearingDate: "2026-08-12",
    lawyerName: "Adv. Rajesh Sharma",
    clientName: "Ramesh Sharma & Anr.",
    opposingParty: "Apex Realty Private Limited",
    judgeAssigned: "Justice S. K. Mahajan (Retd.)",
    summary: "Petition seeking immediate possession of 3BHK flat in Apex Heights, Bandra West, along with 10.5% interest for 24 months of delayed possession beyond promised occupancy date under RERA Section 18.",
    applicableLaws: [
      "Real Estate (Regulation and Development) Act, 2016 - Section 18",
      "Specific Relief Act, 1963 - Section 10",
      "Indian Contract Act, 1872 - Section 73 (Compensation for Loss)"
    ],
    importantDates: [
      { date: "2022-03-10", event: "Allotment Letter & Agreement for Sale Executed" },
      { date: "2024-03-31", event: "Promised Date of Possession" },
      { date: "2025-11-15", event: "Final Pre-Litigation Legal Notice Issued" },
      { date: "2026-01-14", event: "Case Formally Filed in MahaRERA Tribunal" },
      { date: "2026-08-12", event: "Scheduled Final Evidence Hearing" }
    ],
    parties: {
      petitioner: { name: "Ramesh Sharma", advocate: "Adv. Rajesh Sharma", role: "Flat Buyer / Allottee" },
      respondent: { name: "Apex Realty Developers Ltd.", advocate: "Adv. Mehta & Associates", role: "Real Estate Promoter" }
    },
    evidence: [
      { id: "ev_1", title: "Registered Agreement for Sale", type: "PDF Document", score: "High Relevance (98%)", date: "2022-03-10" },
      { id: "ev_2", title: "Bank Wire Transfer Receipts (INR 1.45 Cr)", type: "Financial Record", score: "Conclusive Evidence", date: "2022-03-15" },
      { id: "ev_3", title: "Site Inspection Report & Geo-Tagged Photographs", type: "Technical Audit", score: "High Relevance (94%)", date: "2025-12-01" },
      { id: "ev_4", title: "WhatsApp & Email Communications regarding delay", type: "Digital Communication", score: "Corroborative", date: "2024-09-10" }
    ],
    generatedNotice: `LEGAL NOTICE UNDER SECTION 18 OF RERA ACT 2016

TO: Apex Realty Private Limited, Bandra Kurla Complex, Mumbai.

TAKE NOTICE that on behalf of my client Ramesh Sharma, you are hereby called upon to hand over physical possession of Flat No. 1402, Apex Heights with Occupancy Certificate, along with INR 18,50,000/- towards interest for delayed possession within 15 days of receipt of this notice, failing which legal proceedings in RERA Tribunal and Consumer Forum shall commence at your sole risk as to costs and consequences.`,
    defenseStrategy: [
      "Invoke RERA Section 18 mandatory refund/interest provision.",
      "Rebut force majeure clause cited by builder due to lack of municipal delay proof.",
      "Submit bank interest statements establishing financial loss to buyer.",
      "Seek interim injunction restricting third-party rights on unsold inventory."
    ],
    tags: ["Real Estate", "RERA", "Delayed Possession", "High Success Rate"]
  },
  {
    id: "case_002",
    caseNumber: "CC/2026/3310",
    title: "Verma vs. Global Tech Online Retail",
    type: "Consumer Complaint",
    status: "Completed",
    riskScore: 12,
    riskLevel: "Low",
    successProbability: 95,
    settlementChance: 90,
    courtName: "District Consumer Disputes Redressal Commission, South Delhi",
    jurisdiction: "New Delhi",
    filingDate: "2025-11-20",
    nextHearingDate: "Disposed",
    lawyerName: "Dr. Ananya Roy",
    clientName: "Sunil Verma",
    opposingParty: "Global Tech Retail India Pvt Ltd",
    judgeAssigned: "President P. C. Joshi",
    summary: "Complaint regarding delivery of refurbished laptop sold as brand new high-end workstation valued at INR 2,20,000. Refund plus INR 50,000 punitive compensation granted.",
    applicableLaws: [
      "Consumer Protection Act, 2019 - Section 2(47) (Unfair Trade Practice)",
      "Consumer Protection (E-Commerce) Rules, 2020",
      "Sale of Goods Act, 1930 - Section 16"
    ],
    importantDates: [
      { date: "2025-10-01", event: "Order placed and paid online" },
      { date: "2025-10-05", event: "Device delivered with broken seal & pre-existing serial number" },
      { date: "2025-11-20", event: "Consumer Forum complaint filed" },
      { date: "2026-02-18", event: "Final Order passed in favor of Complainant" }
    ],
    parties: {
      petitioner: { name: "Sunil Verma", advocate: "Dr. Ananya Roy", role: "Consumer" },
      respondent: { name: "Global Tech Online Retail", advocate: "Adv. K. G. Menon", role: "E-Commerce Seller" }
    },
    evidence: [
      { id: "ev_10", title: "Unboxing Video Recording", type: "Video Evidence", score: "Undeniable Proof (100%)", date: "2025-10-05" },
      { id: "ev_11", title: "Authorized Service Center Diagnostic Report", type: "Technical Certificate", score: "High Relevance", date: "2025-10-08" }
    ],
    generatedNotice: "DEMAND NOTICE FOR UNFAIR TRADE PRACTICE & REFUND OF INR 2,20,000 WITH PUNITIVE DAMAGES.",
    defenseStrategy: [
      "Demonstrate clear violation of E-commerce Rules 2020.",
      "Leverage OEM official service report verifying pre-activation date."
    ],
    tags: ["Consumer Protection", "E-Commerce", "Unfair Trade", "Won"]
  },
  {
    id: "case_003",
    caseNumber: "CR/2026/1029",
    title: "State of Maharashtra vs. Cyber Ransom Syndicate",
    type: "Cyber Crime",
    status: "In Progress",
    riskScore: 68,
    riskLevel: "High",
    successProbability: 72,
    settlementChance: 20,
    courtName: "Sessions & Special Cyber Court, BKC Mumbai",
    jurisdiction: "State Cyber Cell Mumbai",
    filingDate: "2026-02-01",
    nextHearingDate: "2026-08-25",
    lawyerName: "Adv. Vikram Sethi",
    clientName: "Nexus Financial Technologies Corp.",
    opposingParty: "Unknown Cyber Attackers / Accused No. 1 to 4",
    judgeAssigned: "Additional Sessions Judge H. R. Deshmukh",
    summary: "Investigation and prosecution of illegal data exfiltration, ransomware extortion demand of $1.5M in cryptocurrency, and system manipulation under Information Technology Act.",
    applicableLaws: [
      "Information Technology Act, 2000 - Sections 43, 66, 66C, 66D",
      "Indian Penal Code (IPC) / Bharatiya Nyaya Sanhita (BNS) - Extortion & Criminal Conspiracy",
      "Digital Personal Data Protection Act, 2023"
    ],
    importantDates: [
      { date: "2026-01-20", event: "Ransomware intrusion detected on cloud servers" },
      { date: "2026-01-22", event: "FIR registered with Cyber Crime Branch" },
      { date: "2026-02-01", event: "Charge sheet filed and forensic log submitted" }
    ],
    parties: {
      petitioner: { name: "Nexus Financial Technologies / State", advocate: "Adv. Vikram Sethi", role: "Complainant Victim" },
      respondent: { name: "Syndicate / Accused Persons", advocate: "Public Defender", role: "Accused" }
    },
    evidence: [
      { id: "ev_20", title: "Server Forensic Memory Dump Analysis", type: "Digital Logs", score: "High Forensic Accuracy", date: "2026-01-25" },
      { id: "ev_21", title: "Crypto Wallet Blockchain Trace Logs", type: "Financial Trail", score: "91% Confidence", date: "2026-01-28" }
    ],
    generatedNotice: "NOTICE OF CYBER FORENSIC COMPLIANCE & FREEZING ORDERS UNDER SECTION 91 CrPC.",
    defenseStrategy: [
      "Establish chain of custody for digital evidence under Section 65B.",
      "Coordinate with Interpol and CERT-In for cross-border IP tracking."
    ],
    tags: ["Cyber Crime", "Ransomware", "IT Act", "High Complexity"]
  },
  {
    id: "case_004",
    caseNumber: "EMP/2026/0411",
    title: "Kulkarni vs. NovaSoft Systems India",
    type: "Employment Issue",
    status: "Under Review",
    riskScore: 35,
    riskLevel: "Medium",
    successProbability: 81,
    settlementChance: 65,
    courtName: "Industrial Court & Labor Commissionerate, Pune",
    jurisdiction: "Pune Industrial Zone",
    filingDate: "2026-03-05",
    nextHearingDate: "2026-08-18",
    lawyerName: "Pooja Malhotra",
    clientName: "Amit Kulkarni",
    opposingParty: "NovaSoft Systems India Pvt Ltd",
    judgeAssigned: "Labor Commissioner V. B. Shinde",
    summary: "Challenge against wrongful termination, non-payment of severance package worth INR 14.5 Lakhs, and illegal enforcement of non-compete clause post tech layoff.",
    applicableLaws: [
      "Industrial Disputes Act, 1947 - Section 2A",
      "Indian Contract Act, 1872 - Section 27 (Agreement in Restraint of Trade Void)",
      "Maharashtra Shops and Establishments Act, 2017"
    ],
    importantDates: [
      { date: "2026-02-15", event: "Abrupt termination notice delivered" },
      { date: "2026-03-05", event: "Conciliation petition filed with Labor Officer" }
    ],
    parties: {
      petitioner: { name: "Amit Kulkarni", advocate: "Pooja Malhotra", role: "Ex-Employee" },
      respondent: { name: "NovaSoft Systems", advocate: "Adv. R. K. Wagle", role: "Employer" }
    },
    evidence: [
      { id: "ev_30", title: "Employment Contract & Appraisal Letters", type: "Contract Document", score: "Direct Proof", date: "2023-01-10" },
      { id: "ev_31", title: "Termination Email & HR Call Recording", type: "Audio / Email", score: "High Relevance", date: "2026-02-15" }
    ],
    generatedNotice: "NOTICE DEMANDING REINSTATEMENT & FULL PAYMENT OF UNPAID DUES AND SEVERANCE.",
    defenseStrategy: [
      "Invoke Section 27 of Contract Act to declare non-compete void.",
      "Challenge termination without notice period compensation."
    ],
    tags: ["Employment Law", "Wrongful Termination", "Non-Compete", "Labor Court"]
  },
  {
    id: "case_005",
    caseNumber: "REN/2026/10721",
    title: "Desai vs. Mehta",
    type: "Rental Agreement",
    status: "In Progress",
    riskScore: 18,
    riskLevel: "Low",
    successProbability: 92,
    settlementChance: 85,
    courtName: "Small Causes Court, South Mumbai",
    jurisdiction: "Mumbai Metro",
    filingDate: "2026-04-10",
    nextHearingDate: "2026-08-30",
    lawyerName: "Adv. Rajesh Sharma",
    clientName: "Sanjay Desai (Landlord)",
    opposingParty: "Suresh Mehta (Tenant)",
    judgeAssigned: "Judge A. R. Bhosale",
    summary: "Eviction suit and recovery of arrears of rent amounting to INR 6.8 Lakhs along with damages for unauthorized commercial alteration in residential premises.",
    applicableLaws: [
      "Maharashtra Rent Control Act, 1999 - Section 16(1)(g) & Section 15",
      "Transfer of Property Act, 1882 - Section 106"
    ],
    importantDates: [
      { date: "2024-05-01", event: "Leave & License Agreement Executed" },
      { date: "2025-12-31", event: "License Period Expired" },
      { date: "2026-04-10", event: "Eviction petition filed in Rent Court" }
    ],
    parties: {
      petitioner: { name: "Sanjay Desai", advocate: "Adv. Rajesh Sharma", role: "Licensor / Owner" },
      respondent: { name: "Suresh Mehta", advocate: "Adv. N. S. Rao", role: "Licensee / Tenant" }
    },
    evidence: [
      { id: "ev_40", title: "Registered Leave & License Agreement", type: "Legal Instrument", score: "Conclusive", date: "2024-05-01" },
      { id: "ev_41", title: "Rent Default Bank Statements", type: "Financial Record", score: "High Accuracy", date: "2026-03-31" }
    ],
    generatedNotice: "EVICTION & MESNE PROFITS DEMAND NOTICE UNDER RENT CONTROL ACT.",
    defenseStrategy: [
      "Establish expiry of registered license period.",
      "Demolish claims of oral extension through bank payment records."
    ],
    tags: ["Rental Agreement", "Eviction", "Property Law", "High Win Rate"]
  },
  {
    id: "case_006",
    caseNumber: "MACT/2026/1104",
    title: "Subramanian vs. Royal Cargo Transport Ltd.",
    type: "Traffic Violation",
    status: "Under Review",
    riskScore: 28,
    riskLevel: "Low",
    successProbability: 89,
    settlementChance: 80,
    courtName: "Motor Accident Claims Tribunal (MACT), Chennai",
    jurisdiction: "Chennai Metro",
    filingDate: "2026-02-14",
    nextHearingDate: "2026-09-02",
    lawyerName: "Rohan Deshmukh",
    clientName: "Meera Subramanian",
    opposingParty: "Royal Cargo Transport & Star Health Insurance Co.",
    judgeAssigned: "Member Tribunal K. Swaminathan",
    summary: "Claim for compensation of INR 35 Lakhs arising from severe vehicular accident caused by rash and negligent driving of commercial heavy transport vehicle.",
    applicableLaws: [
      "Motor Vehicles Act, 1988 - Section 166 & 168",
      "Indian Penal Code - Section 279, 338 (Rash Driving)"
    ],
    importantDates: [
      { date: "2025-12-10", event: "Accident occurred on NH-48" },
      { date: "2025-12-11", event: "Police FIR registered against truck driver" },
      { date: "2026-02-14", event: "MACT claim petition presented" }
    ],
    parties: {
      petitioner: { name: "Meera Subramanian", advocate: "Rohan Deshmukh", role: "Claimant / Victim" },
      respondent: { name: "Royal Cargo & Insurer", advocate: "Adv. G. Ramanathan", role: "Vehicle Owner & Insurer" }
    },
    evidence: [
      { id: "ev_50", title: "Police FIR & Spot Panchnama", type: "Police Record", score: "High Probative Value", date: "2025-12-11" },
      { id: "ev_51", title: "Hospital Medical Board Permanent Disability Certificate", type: "Medical Record", score: "Critical Proof", date: "2026-01-20" }
    ],
    generatedNotice: "MACT STATUTORY CLAIM NOTICE FOR ACCIDENT COMPENSATION.",
    defenseStrategy: [
      "Establish strict liability and rash driving via police charge sheet.",
      "Calculate multiplier method as per Supreme Court Sarla Verma judgment."
    ],
    tags: ["Traffic Accident", "MACT", "Insurance Claim", "High Compensation"]
  },
  {
    id: "case_007",
    caseNumber: "INS/2026/5520",
    title: "Apex Logistics vs. Oriental Shield Insurance",
    type: "Insurance Claim",
    status: "In Progress",
    riskScore: 42,
    riskLevel: "Medium",
    successProbability: 79,
    settlementChance: 70,
    courtName: "Insurance Ombudsman & State Consumer Commission",
    jurisdiction: "Hyderabad Zone",
    filingDate: "2026-01-30",
    nextHearingDate: "2026-08-20",
    lawyerName: "Rohan Deshmukh",
    clientName: "Apex Logistics Private Ltd",
    opposingParty: "Oriental Shield General Insurance Co.",
    judgeAssigned: "Ombudsman Ombudsman V. K. Reddy",
    summary: "Arbitrary repudiation of marine cargo insurance policy claim worth INR 82 Lakhs post cargo damage due to sea storm inundation.",
    applicableLaws: [
      "Insurance Act, 1938 - Section 45",
      "Marine Insurance Act, 1963 - Section 55",
      "Consumer Protection Act, 2019"
    ],
    importantDates: [
      { date: "2025-09-15", event: "Marine Transit Policy Issued" },
      { date: "2025-11-04", event: "Cyclone damage to cargo vessel at Port" },
      { date: "2026-01-10", event: "Repudiation letter issued by insurer" }
    ],
    parties: {
      petitioner: { name: "Apex Logistics Ltd", advocate: "Rohan Deshmukh", role: "Insured Company" },
      respondent: { name: "Oriental Shield Insurance", advocate: "Adv. S. K. Naidu", role: "Insurance Provider" }
    },
    evidence: [
      { id: "ev_60", title: "Independent Marine Surveyor Report", type: "Technical Audit", score: "High Impact (95%)", date: "2025-11-20" },
      { id: "ev_61", title: "Meteorological Department Storm Warning Logs", type: "Government Record", score: "Conclusive Force Majeure Proof", date: "2025-11-05" }
    ],
    generatedNotice: "LEGAL DEMAND NOTICE REJECTING UNJUST REPUDIATION OF INSURANCE CLAIM.",
    defenseStrategy: [
      "Prove surveyor report bias.",
      "Show storm conditions fell strictly within peril of sea coverage."
    ],
    tags: ["Insurance", "Marine Transit", "Claim Recovery", "Commercial"]
  },
  {
    id: "case_008",
    caseNumber: "FRD/2026/0099",
    title: "Financial Intelligence Bureau vs. Skyline Infra Pvt Ltd",
    type: "Fraud Investigation",
    status: "Drafting",
    riskScore: 78,
    riskLevel: "Critical",
    successProbability: 68,
    settlementChance: 15,
    courtName: "Special PMLA & Economic Offences Court, Mumbai",
    jurisdiction: "Enforcement Directorate / EOW",
    filingDate: "2026-05-02",
    nextHearingDate: "2026-08-14",
    lawyerName: "Adv. Vikram Sethi",
    clientName: "Investor Consortium (42 Victim Investors)",
    opposingParty: "Skyline Infra Developers & Directors",
    judgeAssigned: "Special Judge M. M. Kulkarni",
    summary: "Multi-crore Ponzi scheme and shell company money laundering investigation involving fraudulent real estate bond notes promising 24% annual returns.",
    applicableLaws: [
      "Prevention of Money Laundering Act (PMLA), 2002 - Section 3 & 4",
      "Companies Act, 2013 - Section 447 (Fraud Punishment)",
      "Banning of Unregulated Deposit Schemes Act, 2019"
    ],
    importantDates: [
      { date: "2023-04-01", event: "Fraudulent Investment Scheme Launched" },
      { date: "2025-10-12", event: "Default in monthly payout distributions" },
      { date: "2026-05-02", event: "Consortium complaint registered in EOW" }
    ],
    parties: {
      petitioner: { name: "Investor Consortium", advocate: "Adv. Vikram Sethi", role: "Complainants" },
      respondent: { name: "Skyline Infra Directors", advocate: "Adv. Grover & Partners", role: "Accused Promoters" }
    },
    evidence: [
      { id: "ev_70", title: "Forensic Forensic Bank Statement Audit", type: "Audited Ledger", score: "Solid Proof of Siphoning", date: "2026-04-15" },
      { id: "ev_71", title: "Registrar of Companies (ROC) Shell Entity filings", type: "Public Record", score: "High Relevance", date: "2026-04-20" }
    ],
    generatedNotice: "CRIMINAL INITIATION NOTICE UNDER PMLA & SECTION 447 COMPANIES ACT.",
    defenseStrategy: [
      "Freeze promoter bank accounts and attached real property under PMLA.",
      "Initiate corporate insolvency / SFIO probe."
    ],
    tags: ["Financial Fraud", "PMLA", "EOW", "High Risk"]
  },
  {
    id: "case_009",
    caseNumber: "DV/2026/4102",
    title: "Kapur vs. Kapur",
    type: "Domestic Violence",
    status: "In Progress",
    riskScore: 30,
    riskLevel: "Low",
    successProbability: 91,
    settlementChance: 50,
    courtName: "Metropolitan Magistrate Court, New Delhi",
    jurisdiction: "South Delhi District",
    filingDate: "2026-02-22",
    nextHearingDate: "2026-08-22",
    lawyerName: "Adv. Sunita Kulkarni",
    clientName: "Priya Kapur",
    opposingParty: "Tarun Kapur & In-laws",
    judgeAssigned: "Judicial Magistrate First Class S. Gupta",
    summary: "Protection application under PWDVA seeking interim maintenance of INR 75,000/month, protection orders, and residence order in shared matrimonial household.",
    applicableLaws: [
      "Protection of Women from Domestic Violence Act, 2005 - Sections 12, 18, 19, 20",
      "Hindu Marriage Act, 1955 - Section 24 (Maintenance pendente lite)"
    ],
    importantDates: [
      { date: "2020-11-18", event: "Marriage Solemnized" },
      { date: "2025-12-05", event: "Incident of physical expulsion from matrimonial house" },
      { date: "2026-02-22", event: "DV Case & DIR Report filed in Court" }
    ],
    parties: {
      petitioner: { name: "Priya Kapur", advocate: "Adv. Sunita Kulkarni", role: "Aggrieved Person" },
      respondent: { name: "Tarun Kapur", advocate: "Adv. D. P. Singh", role: "Respondent Husband" }
    },
    evidence: [
      { id: "ev_80", title: "Domestic Incident Report (DIR) by Protection Officer", type: "Official Statutory Report", score: "Mandatory Proof", date: "2026-02-20" },
      { id: "ev_81", title: "Medical Injury Certificate from AIIMS Hospital", type: "Medical Record", score: "High Credibility", date: "2025-12-06" }
    ],
    generatedNotice: "NOTICE FOR PROTECTION ORDER & INTERIM MAINTENANCE UNDER DV ACT.",
    defenseStrategy: [
      "Secure immediate interim maintenance based on husband's ITR statements.",
      "Obtain ex-parte protection order preventing dispossess from house."
    ],
    tags: ["Domestic Violence", "PWDVA", "Maintenance", "Family Law"]
  },
  {
    id: "case_010",
    caseNumber: "COMM/2026/9012",
    title: "Global Energy Systems vs. National Power Grid Corp",
    type: "Contract Breach",
    status: "In Progress",
    riskScore: 45,
    riskLevel: "Medium",
    successProbability: 84,
    settlementChance: 70,
    courtName: "Commercial Division, High Court of Judicature at Bombay",
    jurisdiction: "Commercial Appeals Bench",
    filingDate: "2026-03-18",
    nextHearingDate: "2026-09-10",
    lawyerName: "Justice Vikramaditya Verma (Retd.)",
    clientName: "Global Energy Systems LLC",
    opposingParty: "National Power Grid Infrastructure Ltd",
    judgeAssigned: "Justice R. D. Dhanuka & Bench",
    summary: "Arbitration appeal under Section 34 challenging wrongful termination of solar EPC turn-key contract worth INR 140 Crores and illegal encashment of Bank Guarantee.",
    applicableLaws: [
      "Arbitration and Conciliation Act, 1996 - Section 9 & Section 34",
      "Commercial Courts Act, 2015",
      "Indian Contract Act, 1872 - Section 74"
    ],
    importantDates: [
      { date: "2021-08-15", event: "EPC Turnkey Solar Agreement Signed" },
      { date: "2025-10-30", event: "Work Completion Certificate Issued for 90% Grid" },
      { date: "2026-03-10", event: "Arbitrary Bank Guarantee Encashment Notice" },
      { date: "2026-03-18", event: "Section 9 Urgent Injunction Petition Filed" }
    ],
    parties: {
      petitioner: { name: "Global Energy Systems", advocate: "Justice Vikramaditya Verma (Retd.)", role: "Contractor" },
      respondent: { name: "National Power Grid Corp", advocate: "Adv. General / Senior Counsel", role: "Employer PSU" }
    },
    evidence: [
      { id: "ev_90", title: "Joint Inspection Protocol & Milestone Signoffs", type: "Technical Agreement", score: "Conclusive Proof (97%)", date: "2025-10-30" },
      { id: "ev_91", title: "Irrevocable Performance Bank Guarantee (PBG)", type: "Financial Instrument", score: "High Relevance", date: "2021-08-20" }
    ],
    generatedNotice: "URGENT ARBITRATION NOTICE UNDER SECTION 21 & INJUNCTION UNDER SECTION 9.",
    defenseStrategy: [
      "Stay bank guarantee encashment establishing fraud / irretrievable injury.",
      "Fast-track appointment of Sole Arbitrator under Section 11(6)."
    ],
    tags: ["Arbitration", "Contract Breach", "High Value", "Commercial Court"]
  },
  {
    id: "case_011",
    caseNumber: "CS/2026/9100",
    title: "Choudhury vs. BlueSky Housing Trust",
    type: "Property Dispute",
    status: "Completed",
    riskScore: 15,
    riskLevel: "Low",
    successProbability: 96,
    settlementChance: 95,
    courtName: "City Civil Court, Kolkata",
    jurisdiction: "West Bengal Civil Bench",
    filingDate: "2025-08-12",
    nextHearingDate: "Disposed",
    lawyerName: "Adv. Rajesh Sharma",
    clientName: "Arup Choudhury",
    opposingParty: "BlueSky Housing Cooperative",
    judgeAssigned: "Judge B. K. Ganguly",
    summary: "Partition suit declaring 1/3rd undivided share in ancestral estate in Salt Lake Sector V along with mesne profits.",
    applicableLaws: ["Hindu Succession Act, 1956 - Section 6", "Code of Civil Procedure, 1908 - Order 20 Rule 18"],
    importantDates: [{ date: "2025-08-12", event: "Partition suit registered" }, { date: "2026-01-20", event: "Decree passed declaring 33.3% title" }],
    parties: { petitioner: { name: "Arup Choudhury", advocate: "Adv. Rajesh Sharma", role: "Co-sharer" }, respondent: { name: "BlueSky Housing", advocate: "Adv. S. Roy", role: "Co-sharer" } },
    evidence: [{ id: "ev_101", title: "Original Mutation Certificate 1974", type: "Land Title", score: "High Probative", date: "1974-06-10" }],
    generatedNotice: "LEGAL DEMAND NOTICE FOR PARTITION BY METES AND BOUNDS.",
    defenseStrategy: ["Rely on 2005 Supreme Court Vineeta Sharma judgment for coparcenary rights."],
    tags: ["Property", "Partition Suit", "Won"]
  },
  {
    id: "case_012",
    caseNumber: "CC/2026/4409",
    title: "Nair vs. SwiftAir Aviation Ltd",
    type: "Consumer Complaint",
    status: "In Progress",
    riskScore: 22,
    riskLevel: "Low",
    successProbability: 90,
    settlementChance: 80,
    courtName: "State Consumer Disputes Redressal Commission, Ernakulam",
    jurisdiction: "Kerala State",
    filingDate: "2026-03-01",
    nextHearingDate: "2026-08-28",
    lawyerName: "Dr. Ananya Roy",
    clientName: "Gopinath Nair",
    opposingParty: "SwiftAir Aviation Ltd",
    judgeAssigned: "Justice K. T. Thomas (Retd.)",
    summary: "Compensation petition for lost baggage containing critical medical diagnostic equipment valued at INR 9.5 Lakhs during international transit.",
    applicableLaws: ["Carriage by Air Act, 1972 (Montreal Convention)", "Consumer Protection Act, 2019"],
    importantDates: [{ date: "2026-01-10", event: "Flight from Frankfurt to Kochi" }, { date: "2026-03-01", event: "State Commission complaint filed" }],
    parties: { petitioner: { name: "Gopinath Nair", advocate: "Dr. Ananya Roy", role: "Passenger" }, respondent: { name: "SwiftAir Aviation", advocate: "Adv. Menon & Associates", role: "Airline" } },
    evidence: [{ id: "ev_110", title: "Property Irregularity Report (PIR)", type: "Aviation Form", score: "Direct Proof", date: "2026-01-10" }],
    generatedNotice: "STATUTORY CLAIM NOTICE UNDER MONTREAL CONVENTION FOR BAGGAGE LOSS.",
    defenseStrategy: ["Establish special declaration of value made at check-in."],
    tags: ["Consumer Protection", "Aviation", "Baggage Loss"]
  },
  {
    id: "case_013",
    caseNumber: "CR/2026/8812",
    title: "State vs. DeepFake Identity Fraud Ring",
    type: "Cyber Crime",
    status: "Drafting",
    riskScore: 75,
    riskLevel: "High",
    successProbability: 70,
    settlementChance: 10,
    courtName: "Cyber Crime Tribunal, High Court of Karnataka",
    jurisdiction: "Bengaluru Cyber Command",
    filingDate: "2026-06-01",
    nextHearingDate: "2026-08-16",
    lawyerName: "Adv. Vikram Sethi",
    clientName: "FinTech BioAuth Ltd",
    opposingParty: "Unknown DeepFake Syndicate",
    judgeAssigned: "Bench of Cyber Law Experts",
    summary: "AI generated real-time video deepfake spoofing executive identity to authorize unauthorized wire transfer of $850,000.",
    applicableLaws: ["IT Act 2000 Section 66D", "BNS Cyber Extortion Provisions"],
    importantDates: [{ date: "2026-05-15", event: "Deepfake video call fraud executed" }, { date: "2026-06-01", event: "Forensic complaint registered" }],
    parties: { petitioner: { name: "FinTech BioAuth", advocate: "Adv. Vikram Sethi", role: "Victim Company" }, respondent: { name: "Syndicate", advocate: "Public Defender", role: "Accused" } },
    evidence: [{ id: "ev_120", title: "Neural Deepfake Audio-Visual Spectrogram Analysis", type: "AI Forensic Audit", score: "High AI Detection Score", date: "2026-05-20" }],
    generatedNotice: "EMERGENCY CYBER INTERCEPT & SEIZURE NOTICE UNDER IT ACT.",
    defenseStrategy: ["Utilize AI deepfake artifact detection parameters in court."],
    tags: ["DeepFake", "AI Crime", "Cyber Fraud"]
  },
  {
    id: "case_014",
    caseNumber: "EMP/2026/9901",
    title: "Singhania vs. Apex Health Systems",
    type: "Employment Issue",
    status: "Completed",
    riskScore: 19,
    riskLevel: "Low",
    successProbability: 94,
    settlementChance: 90,
    courtName: "Labor Court, Gurugram",
    jurisdiction: "Haryana Labor Division",
    filingDate: "2025-09-10",
    nextHearingDate: "Disposed",
    lawyerName: "Pooja Malhotra",
    clientName: "Dr. Radhika Singhania",
    opposingParty: "Apex Health Systems Ltd",
    judgeAssigned: "Labor Judge M. L. Rao",
    summary: "Recovery of maternity benefits, unpaid bonus, and reinstatement order following illegal termination during maternity leave.",
    applicableLaws: ["Maternity Benefit Act, 1961 - Section 12", "Industrial Disputes Act, 1947"],
    importantDates: [{ date: "2025-06-01", event: "Maternity leave notice served" }, { date: "2025-09-10", event: "Court order in favor with full pay" }],
    parties: { petitioner: { name: "Dr. Radhika Singhania", advocate: "Pooja Malhotra", role: "Doctor / Employee" }, respondent: { name: "Apex Health", advocate: "Adv. R. K. Gupta", role: "Hospital Employer" } },
    evidence: [{ id: "ev_130", title: "Maternity Leave Sanction Letter & Hospital Discharge Summary", type: "Medical & HR", score: "Conclusive", date: "2025-06-01" }],
    generatedNotice: "NOTICE DEMANDING COMPLIANCE WITH MATERNITY BENEFIT ACT.",
    defenseStrategy: ["Section 12 of Maternity Benefit Act strictly prohibits dismissal during leave."],
    tags: ["Maternity Rights", "Employment Law", "Won"]
  },
  {
    id: "case_015",
    caseNumber: "REN/2026/1144",
    title: "Joshi vs. Rao",
    type: "Rental Agreement",
    status: "Under Review",
    riskScore: 25,
    riskLevel: "Low",
    successProbability: 87,
    settlementChance: 75,
    courtName: "Rent Control Tribunal, Hyderabad",
    jurisdiction: "Telangana Urban",
    filingDate: "2026-03-25",
    nextHearingDate: "2026-09-05",
    lawyerName: "Adv. Rajesh Sharma",
    clientName: "Anand Joshi",
    opposingParty: "P. V. Rao",
    judgeAssigned: "Rent Controller T. S. Reddy",
    summary: "Recovery of INR 3.2 Lakhs security deposit withheld without justification upon peaceful vacation of commercial office space.",
    applicableLaws: ["Telangana Buildings (Lease, Rent and Eviction) Control Act", "Indian Contract Act, 1872"],
    importantDates: [{ date: "2026-02-28", event: "Premises handed over with key handover receipt" }, { date: "2026-03-25", event: "Deposit recovery suit filed" }],
    parties: { petitioner: { name: "Anand Joshi", advocate: "Adv. Rajesh Sharma", role: "Vacating Tenant" }, respondent: { name: "P. V. Rao", advocate: "Adv. V. N. Sharma", role: "Landlord" } },
    evidence: [{ id: "ev_140", title: "Handover Receipt & Premises Inspection Video", type: "Receipt & Video", score: "High Relevance", date: "2026-02-28" }],
    generatedNotice: "LEGAL NOTICE FOR IMMEDIATE REFUND OF SECURITY DEPOSIT WITH 18% INTEREST.",
    defenseStrategy: ["Rely on clean inspection video proving zero property damage."],
    tags: ["Security Deposit", "Rental Agreement", "Commercial Property"]
  },
  {
    id: "case_016",
    caseNumber: "MACT/2026/8833",
    title: "Patil vs. Western State Express Lines",
    type: "Traffic Violation",
    status: "In Progress",
    riskScore: 33,
    riskLevel: "Medium",
    successProbability: 86,
    settlementChance: 75,
    courtName: "MACT Court, Pune",
    jurisdiction: "Pune Rural Tribunal",
    filingDate: "2026-04-02",
    nextHearingDate: "2026-08-26",
    lawyerName: "Rohan Deshmukh",
    clientName: "Sambhaji Patil",
    opposingParty: "Western State Express & National Insurance Co",
    judgeAssigned: "Member Tribunal S. P. Kulkarni",
    summary: "Claim for INR 18 Lakhs for permanent disability resulting from state transport bus driving on wrong side of highway.",
    applicableLaws: ["Motor Vehicles Act 1988", "BNS Section 281"],
    importantDates: [{ date: "2026-01-05", event: "Highway collision" }, { date: "2026-04-02", event: "MACT claim registered" }],
    parties: { petitioner: { name: "Sambhaji Patil", advocate: "Rohan Deshmukh", role: "Victim" }, respondent: { name: "Western Express", advocate: "Adv. D. S. Patil", role: "Bus Company & Insurer" } },
    evidence: [{ id: "ev_150", title: "Dashcam Footage & Traffic Police CCTV Capture", type: "Video Evidence", score: "100% Unassailable Proof", date: "2026-01-05" }],
    generatedNotice: "NOTICE OF MACT PETITION FOR PERMANENT DISABILITY COMPENSATORY DAMAGES.",
    defenseStrategy: ["Use dashcam footage proving wrong-side driving by bus driver."],
    tags: ["MACT", "Dashcam Proof", "Traffic Accident"]
  },
  {
    id: "case_017",
    caseNumber: "INS/2026/10788",
    title: "MedTech Innovations vs. HealthGuard Insurance",
    type: "Insurance Claim",
    status: "Completed",
    riskScore: 16,
    riskLevel: "Low",
    successProbability: 93,
    settlementChance: 88,
    courtName: "State Consumer Commission, Mumbai",
    jurisdiction: "Maharashtra State",
    filingDate: "2025-10-15",
    nextHearingDate: "Disposed",
    lawyerName: "Rohan Deshmukh",
    clientName: "MedTech Innovations India",
    opposingParty: "HealthGuard General Insurance Ltd",
    judgeAssigned: "Justice S. P. Tavade",
    summary: "Repudiation of keyman insurance policy claim worth INR 1.2 Crores post cardiac event of Chief Technology Officer. Full payout ordered with 9% interest.",
    applicableLaws: ["Insurance Regulatory and Development Authority (IRDAI) Regulations", "Consumer Protection Act 2019"],
    importantDates: [{ date: "2025-05-10", event: "Medical emergency hospital admission" }, { date: "2026-02-10", event: "Full award decreed in favor of complainant" }],
    parties: { petitioner: { name: "MedTech Innovations", advocate: "Rohan Deshmukh", role: "Corporate Policyholder" }, respondent: { name: "HealthGuard Insurance", advocate: "Adv. V. K. Shah", role: "Insurer" } },
    evidence: [{ id: "ev_160", title: "Pre-Policy Medical Checkup Certificates", type: "Medical Records", score: "Conclusive Proof of No Pre-existing Condition", date: "2024-01-10" }],
    generatedNotice: "LEGAL NOTICE DEMANDING HONORING OF KEYMAN INSURANCE POLICY.",
    defenseStrategy: ["Show clear pre-policy health check clearance from insurer's panel doctors."],
    tags: ["Insurance", "Keyman Policy", "Won"]
  },
  {
    id: "case_018",
    caseNumber: "FRD/2026/4910",
    title: "State of Gujarat vs. BioPharm Fake Lab Syndicate",
    type: "Fraud Investigation",
    status: "In Progress",
    riskScore: 82,
    riskLevel: "Critical",
    successProbability: 76,
    settlementChance: 10,
    courtName: "Special CID Court, Ahmedabad",
    jurisdiction: "Gujarat CID Crime Branch",
    filingDate: "2026-04-18",
    nextHearingDate: "2026-08-21",
    lawyerName: "Adv. Vikram Sethi",
    clientName: "State / Consumer Protection Council",
    opposingParty: "BioPharm Fake Labs & Directors",
    judgeAssigned: "Special Sessions Judge H. J. Trivedi",
    summary: "Criminal trial involving manufacturing and distribution of counterfeit life-saving oncology drugs valued at INR 45 Crores.",
    applicableLaws: ["Drugs and Cosmetics Act, 1940 - Section 17B (Spurious Drugs)", "BNS Counterfeiting & Forgery"],
    importantDates: [{ date: "2026-03-20", event: "Raid on illegal manufacturing unit in Changodar" }, { date: "2026-04-18", event: "CID Charge sheet submitted" }],
    parties: { petitioner: { name: "State of Gujarat", advocate: "Adv. Vikram Sethi", role: "Prosecution" }, respondent: { name: "BioPharm Directors", advocate: "Adv. Z. M. Yagnik", role: "Accused" } },
    evidence: [{ id: "ev_170", title: "Government Central Drug Laboratory Chemical Testing Report", type: "Lab Certificate", score: "100% Spurious Drug Finding", date: "2026-04-01" }],
    generatedNotice: "NOTICE OF PROSECUTION UNDER SECTION 17B DRUGS & COSMETICS ACT.",
    defenseStrategy: ["Rely on Government Analyst Report confirming zero active API in seized drugs."],
    tags: ["Counterfeit Fraud", "Drugs Act", "High Priority"]
  },
  {
    id: "case_019",
    caseNumber: "DV/2026/8821",
    title: "Roy vs. Roy",
    type: "Domestic Violence",
    status: "Under Review",
    riskScore: 27,
    riskLevel: "Low",
    successProbability: 90,
    settlementChance: 60,
    courtName: "Family Court, Bengaluru",
    jurisdiction: "Bengaluru Urban",
    filingDate: "2026-05-10",
    nextHearingDate: "2026-09-01",
    lawyerName: "Adv. Sunita Kulkarni",
    clientName: "Deepa Roy",
    opposingParty: "Subhash Roy",
    judgeAssigned: "Principal Judge Family Court B. M. Prasad",
    summary: "Petition under DV Act for custody of minor daughter aged 6 years and restraining order preventing unlawful removal from jurisdiction.",
    applicableLaws: ["PWDVA 2005 - Section 21 (Custody Orders)", "Guardians and Wards Act, 1890"],
    importantDates: [{ date: "2026-04-28", event: "Attempt to take child out of state without consent" }, { date: "2026-05-10", event: "Emergency custody application filed" }],
    parties: { petitioner: { name: "Deepa Roy", advocate: "Adv. Sunita Kulkarni", role: "Mother" }, respondent: { name: "Subhash Roy", advocate: "Adv. N. K. Hegde", role: "Father" } },
    evidence: [{ id: "ev_180", title: "Child Welfare School & Psychological Evaluation Report", type: "Expert Report", score: "High Welfare Weight", date: "2026-05-05" }],
    generatedNotice: "EMERGENCY NOTICE FOR RESTRAINING REMOVAL OF MINOR CHILD.",
    defenseStrategy: ["Establish primary caregiver status and child's educational continuity in Bengaluru."],
    tags: ["Child Custody", "DV Act", "Family Court"]
  },
  {
    id: "case_020",
    caseNumber: "COMM/2026/1199",
    title: "Vanguard Tech vs. Horizon Telecom Networks",
    type: "Contract Breach",
    status: "Completed",
    riskScore: 20,
    riskLevel: "Low",
    successProbability: 95,
    settlementChance: 90,
    courtName: "Commercial Division, Delhi High Court",
    jurisdiction: "Delhi High Court Bench",
    filingDate: "2025-11-01",
    nextHearingDate: "Disposed",
    lawyerName: "Justice Vikramaditya Verma (Retd.)",
    clientName: "Vanguard Tech Solutions Ltd",
    opposingParty: "Horizon Telecom Networks Ltd",
    judgeAssigned: "Justice Sanjeev Sachdeva",
    summary: "Suit for recovery of INR 12.8 Crores for 5G network equipment supply contract breach and non-payment of milestone invoices.",
    applicableLaws: ["Commercial Courts Act 2015", "Indian Contract Act 1872 Section 73"],
    importantDates: [{ date: "2024-02-10", event: "Master Service Agreement signed" }, { date: "2026-01-15", event: "Consent Decree passed for INR 12.8 Cr full settlement" }],
    parties: { petitioner: { name: "Vanguard Tech", advocate: "Justice Vikramaditya Verma (Retd.)", role: "Supplier" }, respondent: { name: "Horizon Telecom", advocate: "Adv. P. S. Narasimha", role: "Telecom Buyer" } },
    evidence: [{ id: "ev_190", title: "Network Commissioning Acceptance Certificates", type: "Technical Signoff", score: "Direct Proof of Performance", date: "2025-05-20" }],
    generatedNotice: "SUMMARY SUIT NOTICE UNDER ORDER 37 CPC FOR COMMERCIAL DEBT RECOVERY.",
    defenseStrategy: ["Use Order 37 summary suit procedure to prevent frivolous defense leave."],
    tags: ["Commercial Dispute", "Contract Breach", "Won"]
  }
];
