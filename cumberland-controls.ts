// Cumberland LEP 2021 Controls
export const lepControls = [
  {
    category: 'Land Use Zoning',
    controls: [
      { 
        clause: '2.3', 
        name: 'Zone Objectives and Land Use Table',
        zones: ['R2 Low Density Residential', 'R3 Medium Density Residential', 'R4 High Density Residential', 'B2 Local Centre', 'B4 Mixed Use', 'B6 Enterprise Corridor', 'IN1 General Industrial', 'SP2 Infrastructure', 'RE1 Public Recreation'],
        requirement: 'Development must be permissible in the zone',
        checkRequired: true
      }
    ]
  },
  {
    category: 'Development Standards',
    controls: [
      {
        clause: '4.3',
        name: 'Height of Buildings',
        requirement: 'Must not exceed maximum height shown on Height of Buildings Map',
        typical: '8.5m, 9.5m, 12m, 15m, 18m, 21m, 24m, or as specified',
        checkRequired: true,
        variation: 'Clause 4.6 variation possible (up to 10% in certain circumstances)'
      },
      {
        clause: '4.4',
        name: 'Floor Space Ratio',
        requirement: 'Must not exceed maximum FSR shown on Floor Space Ratio Map',
        typical: '0.4:1, 0.5:1, 0.6:1, 0.75:1, 1:1, 1.5:1, 2:1, 2.5:1, 3:1 or as specified',
        checkRequired: true,
        variation: 'Clause 4.6 variation possible (up to 10% in certain circumstances)'
      },
      {
        clause: '4.1',
        name: 'Minimum Lot Size',
        requirement: 'Subdivision must meet minimum lot size requirements',
        typical: '450sqm (R2), 300sqm (R3), or as specified on Lot Size Map',
        checkRequired: false
      },
      {
        clause: '4.1C',
        name: 'Minimum Lot Width',
        requirement: 'New lots must meet minimum frontage width',
        typical: '15m (R2), 12m (R3)',
        checkRequired: false
      }
    ]
  },
  {
    category: 'Heritage',
    controls: [
      {
        clause: '5.10',
        name: 'Heritage Conservation',
        requirement: 'Heritage impact statement required for items/conservation areas listed in Schedule 5',
        checkRequired: true,
        triggers: 'Development affecting heritage item or within heritage conservation area'
      },
      {
        clause: '5.10(4)',
        name: 'Aboriginal Heritage',
        requirement: 'Assessment of impact on Aboriginal objects and places',
        checkRequired: true,
        triggers: 'Development in areas of aboriginal heritage significance'
      }
    ]
  },
  {
    category: 'Environmental',
    controls: [
      {
        clause: '5.9',
        name: 'Preservation of Trees or Vegetation',
        requirement: 'Approval required to remove/damage trees on Schedule or with trunk circumference >600mm at 1m height',
        checkRequired: true,
        triggers: 'Tree removal/pruning proposed'
      },
      {
        clause: '5.21',
        name: 'Flood Planning',
        requirement: 'Development must consider flood planning levels and evacuation requirements',
        checkRequired: true,
        triggers: 'Development on flood prone land'
      },
      {
        clause: '6.1',
        name: 'Acid Sulfate Soils',
        requirement: 'Acid sulfate soils management plan required for Class 1-4 land',
        checkRequired: true,
        triggers: 'Works below natural ground level on ASS mapped land'
      },
      {
        clause: '6.2',
        name: 'Earthworks',
        requirement: 'Assessment of impact on drainage, adjoining properties, heritage, trees',
        checkRequired: true,
        triggers: 'Cut/fill earthworks proposed'
      },
      {
        clause: '6.4',
        name: 'Stormwater Management',
        requirement: 'On-site stormwater detention/management required',
        checkRequired: true,
        triggers: 'All development increasing impervious area'
      },
      {
        clause: '7.1',
        name: 'Essential Services',
        requirement: 'Adequate water, electricity, sewerage, drainage, and telecommunications',
        checkRequired: true,
        triggers: 'All development'
      }
    ]
  },
  {
    category: 'Special Provisions',
    controls: [
      {
        clause: '5.4',
        name: 'Development on Sloping Land',
        requirement: 'Geotechnical assessment for slopes >18 degrees',
        checkRequired: true,
        triggers: 'Development on land with slope >18 degrees'
      },
      {
        clause: '5.11',
        name: 'Bush Fire Prone Land',
        requirement: 'Bush fire safety assessment and compliance with Planning for Bush Fire Protection',
        checkRequired: true,
        triggers: 'Development on bush fire prone land'
      },
      {
        clause: '5.19',
        name: 'Demolition Requires Consent',
        requirement: 'DA required for demolition of buildings',
        checkRequired: false,
        triggers: 'Demolition proposed'
      },
      {
        clause: '6.3',
        name: 'Aircraft Noise',
        requirement: 'Acoustic treatment for development in ANEF 20+ areas',
        checkRequired: true,
        triggers: 'Residential development near Sydney Airport'
      }
    ]
  }
];

// Cumberland DCP 2021 Controls
export const dcpControls = [
  {
    category: 'Part 2 - General Requirements',
    sections: [
      {
        section: '2.1',
        name: 'Site Analysis',
        controls: [
          { control: 'Site analysis plan required', requirement: 'Context analysis, constraints, opportunities', mandatory: true },
          { control: 'Heritage context assessment', requirement: 'Where relevant', mandatory: false }
        ]
      },
      {
        section: '2.2',
        name: 'Demolition',
        controls: [
          { control: 'Asbestos survey required', requirement: 'For buildings pre-1987', mandatory: true },
          { control: 'Waste management plan', requirement: 'Min 80% recycling target', mandatory: true }
        ]
      },
      {
        section: '2.3',
        name: 'Construction Management',
        controls: [
          { control: 'Traffic management plan', requirement: 'For developments with construction >6 months', mandatory: true },
          { control: 'Hours of work', requirement: 'Mon-Fri 7am-6pm, Sat 8am-1pm, No Sun/Public Holidays', mandatory: true }
        ]
      }
    ]
  },
  {
    category: 'Part 3 - Residential Development',
    sections: [
      {
        section: '3.1',
        name: 'Dwelling Houses',
        controls: [
          { control: 'Front setback', requirement: '6m minimum (or streetscape average)', mandatory: true, typical: '6m' },
          { control: 'Side setback', requirement: '0.9m (single storey), 1.2m (two storey)', mandatory: true },
          { control: 'Rear setback', requirement: '6m minimum', mandatory: true },
          { control: 'Private open space', requirement: 'Min 80sqm with min dimension 5m', mandatory: true },
          { control: 'Fencing - front', requirement: 'Max 1.2m height, 50% transparent', mandatory: true },
          { control: 'Landscaping', requirement: 'Min 40% of site area', mandatory: true }
        ]
      },
      {
        section: '3.2',
        name: 'Multi-Dwelling Housing',
        controls: [
          { control: 'Front setback', requirement: '6m minimum', mandatory: true },
          { control: 'Side/rear setback', requirement: '3m minimum', mandatory: true },
          { control: 'Building separation', requirement: '12m between habitable rooms', mandatory: true },
          { control: 'Private open space', requirement: '25sqm per dwelling, min dimension 3m', mandatory: true },
          { control: 'Communal open space', requirement: '20sqm per dwelling (for 4+ dwellings)', mandatory: true },
          { control: 'Deep soil zone', requirement: 'Min 20% of site area, min dimension 6m', mandatory: true },
          { control: 'Landscaping', requirement: 'Min 30% of site area', mandatory: true }
        ]
      },
      {
        section: '3.3',
        name: 'Residential Flat Buildings',
        controls: [
          { control: 'Front setback', requirement: '6m minimum', mandatory: true },
          { control: 'Side setback', requirement: '6m minimum', mandatory: true },
          { control: 'Rear setback', requirement: '6m minimum', mandatory: true },
          { control: 'Building separation', requirement: '12m (habitable), 9m (non-habitable)', mandatory: true },
          { control: 'Private open space - ground', requirement: '35sqm, min dimension 4m', mandatory: true },
          { control: 'Private open space - above ground', requirement: '15sqm, min dimension 2.5m', mandatory: true },
          { control: 'Communal open space', requirement: 'Min 25sqm per dwelling', mandatory: true },
          { control: 'Deep soil zone', requirement: 'Min 25% of site area, min dimension 6m', mandatory: true },
          { control: 'Landscaping', requirement: 'Min 30% of site area', mandatory: true },
          { control: 'Solar access', requirement: '70% of units receive 3hrs midwinter sun to living areas', mandatory: true },
          { control: 'Cross ventilation', requirement: '60% of units naturally cross ventilated', mandatory: true }
        ]
      },
      {
        section: '3.4',
        name: 'Secondary Dwellings',
        controls: [
          { control: 'Floor area', requirement: 'Max 60sqm GFA', mandatory: true },
          { control: 'Height', requirement: 'Max 5m (single storey preferred)', mandatory: true },
          { control: 'Setbacks', requirement: 'As per principal dwelling requirements', mandatory: true }
        ]
      }
    ]
  },
  {
    category: 'Part 4 - Mixed Use and Commercial',
    sections: [
      {
        section: '4.1',
        name: 'Mixed Use Development',
        controls: [
          { control: 'Ground floor commercial', requirement: 'Min 4m floor-to-ceiling height', mandatory: true },
          { control: 'Active frontage', requirement: 'Min 60% glazing on ground floor street frontage', mandatory: true },
          { control: 'Residential entry separation', requirement: 'Separate entry from commercial uses', mandatory: true },
          { control: 'Acoustic separation', requirement: 'Compliance with relevant acoustic standards', mandatory: true },
          { control: 'Waste management', requirement: 'Separate commercial and residential waste', mandatory: true }
        ]
      },
      {
        section: '4.2',
        name: 'Retail and Commercial',
        controls: [
          { control: 'Floor-to-ceiling height', requirement: 'Min 3.6m ground floor, 3m upper floors', mandatory: true },
          { control: 'Active street frontage', requirement: '60% transparent glazing, no blank walls >4m', mandatory: true },
          { control: 'Loading/service areas', requirement: 'Screened from public domain', mandatory: true }
        ]
      }
    ]
  },
  {
    category: 'Part 5 - Parking and Access',
    sections: [
      {
        section: '5.1',
        name: 'Car Parking Rates',
        controls: [
          { control: 'Dwelling houses', requirement: '2 spaces per dwelling', mandatory: true },
          { control: 'Units - 1 bed', requirement: '1 space per unit', mandatory: true },
          { control: 'Units - 2 bed', requirement: '1.25 spaces per unit', mandatory: true },
          { control: 'Units - 3+ bed', requirement: '1.5 spaces per unit', mandatory: true },
          { control: 'Visitor parking', requirement: '1 space per 5 units', mandatory: true },
          { control: 'Retail/commercial', requirement: '1 space per 40sqm GFA', mandatory: true },
          { control: 'Accessible parking', requirement: 'Min 1 space, then 1 per 50 spaces thereafter', mandatory: true }
        ]
      },
      {
        section: '5.2',
        name: 'Bicycle Parking',
        controls: [
          { control: 'Residential', requirement: '1 space per unit + 1 visitor per 10 units', mandatory: true },
          { control: 'Commercial', requirement: '1 space per 300sqm GFA + 1 visitor per 1000sqm', mandatory: true }
        ]
      },
      {
        section: '5.3',
        name: 'Vehicular Access and Driveways',
        controls: [
          { control: 'Driveway width', requirement: '3m (single), 5.5m (double)', mandatory: true },
          { control: 'Crossover width', requirement: 'Max 6m', mandatory: true },
          { control: 'Distance from intersection', requirement: 'Min 6m from kerb return', mandatory: true },
          { control: 'Gradient', requirement: 'Max 1:4 (25%) transition slope at street', mandatory: true }
        ]
      }
    ]
  },
  {
    category: 'Part 6 - Sustainability',
    sections: [
      {
        section: '6.1',
        name: 'Energy Efficiency',
        controls: [
          { control: 'BASIX Certificate', requirement: 'All residential development', mandatory: true },
          { control: 'Solar access', requirement: 'Living areas oriented north where possible', mandatory: false },
          { control: 'Natural ventilation', requirement: 'Min 60% units cross ventilated', mandatory: true }
        ]
      },
      {
        section: '6.2',
        name: 'Water Management',
        controls: [
          { control: 'BASIX Certificate', requirement: 'All residential development', mandatory: true },
          { control: 'Rainwater tanks', requirement: 'Encouraged for garden irrigation', mandatory: false },
          { control: 'On-site detention (OSD)', requirement: 'Required for developments increasing impervious area', mandatory: true },
          { control: 'Stormwater quality', requirement: 'Gross pollutant traps for commercial/industrial', mandatory: true }
        ]
      },
      {
        section: '6.3',
        name: 'Waste Management',
        controls: [
          { control: 'Waste management plan', requirement: 'For all multi-unit and commercial development', mandatory: true },
          { control: 'Bin storage area', requirement: '3 bins per unit (garbage, recycling, green waste)', mandatory: true },
          { control: 'Collection point access', requirement: 'Max 10m to street, accessible path', mandatory: true }
        ]
      }
    ]
  },
  {
    category: 'Part 7 - Amenity and Design',
    sections: [
      {
        section: '7.1',
        name: 'Privacy',
        controls: [
          { control: 'Windows to windows', requirement: 'Min 9m separation to habitable room windows', mandatory: true },
          { control: 'Windows to boundaries', requirement: 'Min 3m from side/rear boundaries', mandatory: true },
          { control: 'Balconies to boundaries', requirement: 'Min 4m from side/rear boundaries', mandatory: true },
          { control: 'Privacy screening', requirement: '1.6m height, max 25% transparent', mandatory: true }
        ]
      },
      {
        section: '7.2',
        name: 'Solar Access and Overshadowing',
        controls: [
          { control: 'Living areas', requirement: 'Min 3hrs midwinter sun (9am-3pm) to 70% of units', mandatory: true },
          { control: 'Private open space', requirement: 'Min 3hrs midwinter sun to 50% of required POS', mandatory: true },
          { control: 'Neighbouring properties', requirement: 'Min 3hrs midwinter sun to 50% of POS', mandatory: true }
        ]
      },
      {
        section: '7.3',
        name: 'Visual Privacy',
        controls: [
          { control: 'Ground floor elevated', requirement: 'Min 0.5m above natural ground for privacy', mandatory: true },
          { control: 'Screening required', requirement: 'Where privacy separation cannot be met', mandatory: true }
        ]
      },
      {
        section: '7.4',
        name: 'Acoustic Privacy',
        controls: [
          { control: 'Residential development', requirement: 'Compliance with State Environmental Planning Policy (Infrastructure) 2007', mandatory: true },
          { control: 'Mixed-use development', requirement: 'Acoustic report required', mandatory: true }
        ]
      }
    ]
  },
  {
    category: 'Part 8 - Landscaping',
    sections: [
      {
        section: '8.1',
        name: 'Landscaping Requirements',
        controls: [
          { control: 'Canopy tree planting', requirement: '1 large tree per 200sqm of site area', mandatory: true },
          { control: 'Deep soil planting', requirement: 'Min depth 1m for large trees', mandatory: true },
          { control: 'Native species', requirement: 'Min 75% of plant species to be native', mandatory: false },
          { control: 'Landscape plan', requirement: 'Prepared by qualified landscape architect', mandatory: true }
        ]
      }
    ]
  }
];

// Document Templates
export interface DocumentTemplate {
  type: string;
  title: string;
  description: string;
  templateUrl?: string;
  required: boolean;
  stage: string;
}

export const documentTemplates: DocumentTemplate[] = [
  // Application Forms
  {
    type: 'Application Form',
    title: 'DA Application Form',
    description: 'Standard development application form',
    templateUrl: '/templates/da-application-form.pdf',
    required: true,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Application Form',
    title: 'Owner\'s Consent Form',
    description: 'Consent from property owner if applicant is not owner',
    templateUrl: '/templates/owners-consent.pdf',
    required: false,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Application Form',
    title: 'BASIX Certificate',
    description: 'Building Sustainability Index Certificate',
    templateUrl: 'https://basix.nsw.gov.au',
    required: true,
    stage: 'Pre-Lodgement'
  },
  
  // Architectural Plans
  {
    type: 'Architectural Plan',
    title: 'Site Plan (1:100 or 1:200)',
    description: 'Existing and proposed site layout',
    required: true,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Architectural Plan',
    title: 'Floor Plans (1:100)',
    description: 'All floor levels showing room layouts, dimensions',
    required: true,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Architectural Plan',
    title: 'Elevations (1:100)',
    description: 'All building elevations with materials and colors',
    required: true,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Architectural Plan',
    title: 'Sections (1:100)',
    description: 'Building cross-sections showing levels and heights',
    required: true,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Architectural Plan',
    title: 'Shadow Diagrams',
    description: '9am, 12pm, 3pm on June 21',
    required: true,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Architectural Plan',
    title: 'Landscape Plan',
    description: 'Detailed landscaping and planting schedule',
    required: true,
    stage: 'Pre-Lodgement'
  },
  
  // Technical Reports
  {
    type: 'Technical Report',
    title: 'Statement of Environmental Effects',
    description: 'Assessment of environmental impacts',
    templateUrl: '/templates/see-template.pdf',
    required: true,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Technical Report',
    title: 'Heritage Impact Statement',
    description: 'Required for heritage items/conservation areas',
    required: false,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Technical Report',
    title: 'Acoustic Assessment',
    description: 'Required for mixed-use or noise-sensitive development',
    required: false,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Technical Report',
    title: 'Traffic Impact Assessment',
    description: 'Required for developments generating >100 vehicle movements/day',
    required: false,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Technical Report',
    title: 'Geotechnical Report',
    description: 'Required for sloping sites or poor soil conditions',
    required: false,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Technical Report',
    title: 'Arborist Report',
    description: 'Required where tree removal/impact proposed',
    required: false,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Technical Report',
    title: 'Bushfire Assessment',
    description: 'Required for bushfire prone land',
    required: false,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Technical Report',
    title: 'Waste Management Plan',
    description: 'Required for multi-unit and commercial development',
    templateUrl: '/templates/waste-management-plan.pdf',
    required: true,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Technical Report',
    title: 'Accessibility Report',
    description: 'Compliance with DDA and relevant standards',
    required: false,
    stage: 'Pre-Lodgement'
  },
  
  // Engineering Plans
  {
    type: 'Engineering Plan',
    title: 'Stormwater Management Plan',
    description: 'Drainage design and on-site detention',
    required: true,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Engineering Plan',
    title: 'Civil Engineering Plans',
    description: 'Site works, levels, retaining walls',
    required: true,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Engineering Plan',
    title: 'Hydraulic Plans',
    description: 'Water and sewer connection details',
    required: true,
    stage: 'Pre-Lodgement'
  },
  {
    type: 'Engineering Plan',
    title: 'Basement/Structural Plans',
    description: 'Required for basement or complex structures',
    required: false,
    stage: 'Pre-Lodgement'
  }
];
