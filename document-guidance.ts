// Best practice guides and assessment criteria for each document type

export const documentGuidance = {
  'DA Application Form': {
    bestPracticeGuide: `
      <h3>Best Practice Submission Guide</h3>
      <h4>Essential Information Required:</h4>
      <ul>
        <li><strong>Applicant Details:</strong> Full legal name, contact information, ABN (if applicable)</li>
        <li><strong>Owner Details:</strong> Must match title documents exactly. Include all owners if multiple.</li>
        <li><strong>Property Description:</strong> Lot/DP numbers must match Section 10.7 certificate</li>
        <li><strong>Development Description:</strong> Be specific and comprehensive. Include:
          <ul>
            <li>Number of units/dwellings</li>
            <li>Gross Floor Area (GFA)</li>
            <li>Building height (in metres and storeys)</li>
            <li>Number of parking spaces</li>
            <li>Estimated cost of development</li>
          </ul>
        </li>
      </ul>
      
      <h4>Common Mistakes to Avoid:</h4>
      <ul>
        <li>❌ Incomplete owner consent (all owners must sign)</li>
        <li>❌ Incorrect Lot/DP numbers</li>
        <li>❌ Vague development description</li>
        <li>❌ Missing applicant/owner contact details</li>
      </ul>
      
      <h4>Pro Tips:</h4>
      <ul>
        <li>✓ Use legal names exactly as shown on title</li>
        <li>✓ Double-check all Lot/DP numbers against Section 10.7</li>
        <li>✓ Provide detailed development description</li>
        <li>✓ Include cost estimate based on quantity surveyor assessment</li>
      </ul>
    `,
    assessmentCriteria: [
      'All mandatory fields completed accurately',
      'Applicant and owner details match title documents',
      'Development description is comprehensive and specific',
      'Estimated cost is reasonable and justified',
      'All signatures and dates are provided',
      'Property identification (Lot/DP) is correct'
    ]
  },
  
  'Statement of Environmental Effects': {
    bestPracticeGuide: `
      <h3>Statement of Environmental Effects (SEE) - Best Practice Guide</h3>
      
      <h4>Required Structure:</h4>
      <ol>
        <li><strong>1. Introduction</strong>
          <ul>
            <li>Summary of proposal</li>
            <li>Site address and legal description</li>
            <li>Purpose of the SEE</li>
          </ul>
        </li>
        
        <li><strong>2. Site Analysis</strong>
          <ul>
            <li>Site dimensions and area</li>
            <li>Existing structures and vegetation</li>
            <li>Topography and orientation</li>
            <li>Surrounding development context</li>
            <li>Site photographs (12-16 images minimum)</li>
          </ul>
        </li>
        
        <li><strong>3. Description of Proposed Development</strong>
          <ul>
            <li>Detailed description of works</li>
            <li>Number of dwellings/units</li>
            <li>GFA, building height, FSR calculations</li>
            <li>Materials and finishes</li>
            <li>Landscaping proposal</li>
          </ul>
        </li>
        
        <li><strong>4. Planning Framework Assessment</strong>
          <ul>
            <li><strong>Cumberland LEP 2021:</strong> Assess each applicable clause
              <ul>
                <li>Zone objectives and permissibility</li>
                <li>Height of buildings (Clause 4.3)</li>
                <li>Floor space ratio (Clause 4.4)</li>
                <li>All other applicable clauses</li>
              </ul>
            </li>
            <li><strong>Cumberland DCP 2021:</strong> Assess each control
              <ul>
                <li>Setbacks and building envelope</li>
                <li>Parking and access</li>
                <li>Landscaping and deep soil</li>
                <li>Privacy and solar access</li>
              </ul>
            </li>
            <li><strong>State Environmental Planning Policies (SEPPs):</strong>
              <ul>
                <li>SEPP (Building Sustainability Index—BASIX) 2004</li>
                <li>SEPP (Resilience and Hazards) 2021</li>
                <li>Any other applicable SEPPs</li>
              </ul>
            </li>
          </ul>
        </li>
        
        <li><strong>5. Section 4.15 Assessment</strong>
          <p>Address each consideration under Section 4.15 of the Environmental Planning & Assessment Act:</p>
          <ul>
            <li>(a) Environmental planning instruments</li>
            <li>(b) Draft environmental planning instruments</li>
            <li>(c) Development control plans</li>
            <li>(d) Planning agreements</li>
            <li>(e) Public interest and likely impacts</li>
            <li>(f) Suitability of the site</li>
          </ul>
        </li>
        
        <li><strong>6. Conclusion</strong>
          <ul>
            <li>Summary of compliance</li>
            <li>Environmental merit of proposal</li>
            <li>Recommendation for approval</li>
          </ul>
        </li>
      </ol>
      
      <h4>Quality Standards:</h4>
      <ul>
        <li>✓ Minimum 15-25 pages for residential flat buildings</li>
        <li>✓ Professionally formatted with clear headings</li>
        <li>✓ Include table of contents</li>
        <li>✓ Site photos clearly labeled with location and direction</li>
        <li>✓ All claims supported by evidence or calculations</li>
        <li>✓ Reference specific clause numbers</li>
      </ul>
      
      <h4>Common RFI Triggers:</h4>
      <ul>
        <li>❌ Insufficient site analysis or photos</li>
        <li>❌ Missing assessment of applicable controls</li>
        <li>❌ No justification for non-compliances</li>
        <li>❌ Inadequate Section 4.15 assessment</li>
        <li>❌ No assessment of impacts on adjoining properties</li>
      </ul>
    `,
    assessmentCriteria: [
      'Comprehensive site analysis with minimum 12 site photographs',
      'Detailed description of proposal with GFA, height, and FSR calculations',
      'Complete assessment of Cumberland LEP 2021 applicable clauses',
      'Complete assessment of Cumberland DCP 2021 applicable controls',
      'Thorough Section 4.15 assessment addressing all sub-clauses',
      'Justification provided for any non-compliances or variations',
      'Assessment of impacts on adjoining properties',
      'Professional presentation with table of contents and clear structure'
    ]
  },
  
  'Architectural Plans - Floor Plans': {
    bestPracticeGuide: `
      <h3>Architectural Floor Plans - Best Practice Guide</h3>
      
      <h4>Scale and Format Requirements:</h4>
      <ul>
        <li>Scale: 1:100 (preferred) or 1:200 maximum</li>
        <li>Format: A3 or A1 sheets</li>
        <li>All plans must be to same scale</li>
        <li>Include scale bar on every sheet</li>
      </ul>
      
      <h4>Essential Information to Include:</h4>
      <ol>
        <li><strong>Title Block (every sheet):</strong>
          <ul>
            <li>Project name and address</li>
            <li>Drawing title and number</li>
            <li>Scale and date</li>
            <li>Revision number</li>
            <li>Architect/designer name and contact</li>
          </ul>
        </li>
        
        <li><strong>Each Floor Level Must Show:</strong>
          <ul>
            <li>All walls (existing shown dashed, new shown solid)</li>
            <li>Room names and functions</li>
            <li>Room dimensions (internal)</li>
            <li>Door swings and window locations</li>
            <li>Floor levels (RL in metres AHD)</li>
            <li>North point</li>
          </ul>
        </li>
        
        <li><strong>Residential-Specific Requirements:</strong>
          <ul>
            <li>Private Open Space (POS) areas marked and dimensioned</li>
            <li>Minimum POS dimension noted (e.g., "4.0m min dimension")</li>
            <li>All habitable room windows marked</li>
            <li>Solar access indicators to living rooms</li>
            <li>Cross-ventilation arrows for naturally ventilated rooms</li>
            <li>Clothes drying facilities location</li>
            <li>Storage areas identified</li>
          </ul>
        </li>
        
        <li><strong>Area Calculations (provide table on each plan):</strong>
          <ul>
            <li>Individual unit GFA</li>
            <li>Total GFA for level</li>
            <li>Private open space areas</li>
            <li>Balcony/terrace areas</li>
          </ul>
        </li>
        
        <li><strong>Setbacks and Building Envelope:</strong>
          <ul>
            <li>Show and dimension all setbacks to boundaries</li>
            <li>Note DCP requirement vs. proposed</li>
            <li>Show 3m and 9m privacy zones where applicable</li>
          </ul>
        </li>
      </ol>
      
      <h4>Common Deficiencies (RFI Triggers):</h4>
      <ul>
        <li>❌ Missing dimensions (especially room sizes and setbacks)</li>
        <li>❌ No area calculations</li>
        <li>❌ Private open space not clearly marked or dimensioned</li>
        <li>❌ Missing floor levels (RLs)</li>
        <li>❌ Door swings not shown</li>
        <li>❌ No north point</li>
        <li>❌ Inconsistent scales between drawings</li>
      </ul>
      
      <h4>Professional Standards:</h4>
      <ul>
        <li>✓ Prepared using CAD software (not hand-drawn)</li>
        <li>✓ Clear line weights (walls thicker than dimensions)</li>
        <li>✓ Consistent annotation style</li>
        <li>✓ All text legible when printed at stated scale</li>
        <li>✓ Coordinated with elevations and sections</li>
      </ul>
    `,
    assessmentCriteria: [
      'Plans drawn to correct scale (1:100 or 1:200) with scale bar shown',
      'Complete title block on every sheet with project details',
      'All walls, doors, windows clearly shown with dimensions',
      'Room names, functions, and dimensions provided',
      'Floor levels (RL) shown in AHD',
      'North point included on all plans',
      'Private open space clearly marked and dimensioned',
      'Area calculations table provided (GFA, POS, balconies)',
      'Setbacks to boundaries shown and dimensioned',
      'Solar access and cross-ventilation indicators shown',
      'Professional CAD presentation with clear line weights'
    ]
  },
  
  'Stormwater Management Plan': {
    bestPracticeGuide: `
      <h3>Stormwater Management Plan - Best Practice Guide</h3>
      
      <h4>Cumberland Council Requirements:</h4>
      <ul>
        <li>On-Site Detention (OSD) required for all developments that increase impervious area</li>
        <li>Must comply with Council's Stormwater Management Code</li>
        <li>Prepared by qualified hydraulic engineer</li>
      </ul>
      
      <h4>Required Plans and Calculations:</h4>
      <ol>
        <li><strong>Site Plan showing:</strong>
          <ul>
            <li>Existing and proposed contours</li>
            <li>Drainage catchment areas</li>
            <li>Existing and proposed stormwater infrastructure</li>
            <li>OSD tank location and size</li>
            <li>Pit and pipe locations with invert levels</li>
            <li>Connection point to Council system</li>
            <li>Overland flow paths</li>
          </ul>
        </li>
        
        <li><strong>OSD Calculations:</strong>
          <ul>
            <li>Pre-development flow rate (Q<sub>pre</sub>)</li>
            <li>Post-development flow rate (Q<sub>post</sub>)</li>
            <li>Permissible Site Discharge (PSD)</li>
            <li>Required detention volume</li>
            <li>Tank sizing calculations (5-year and 100-year ARI storms)</li>
          </ul>
        </li>
        
        <li><strong>Hydraulic Grade Line Analysis:</strong>
          <ul>
            <li>Pipe network calculations</li>
            <li>Minimum grades and velocities</li>
            <li>Surcharge levels</li>
          </ul>
        </li>
        
        <li><strong>Water Quality Treatment:</strong>
          <ul>
            <li>Gross Pollutant Traps (GPTs) for commercial/industrial</li>
            <li>Rainwater tanks (if proposed)</li>
            <li>Bioretention/infiltration systems (if proposed)</li>
          </ul>
        </li>
      </ol>
      
      <h4>Standard OSD Tank Specifications:</h4>
      <ul>
        <li>✓ Minimum 1.5m depth for cleaning access</li>
        <li>✓ Orifice plate with 12mm diameter holes (typical)</li>
        <li>✓ High flow bypass for major storms</li>
        <li>✓ Access manhole with lockable lid</li>
        <li>✓ Trash screen at inlet</li>
      </ul>
      
      <h4>Council Approval Requirements:</h4>
      <ul>
        <li>Section 68 Approval under Local Government Act</li>
        <li>Engineering drawings certified by practicing engineer</li>
        <li>Positive covenant on title (applied at subdivision or occupation certificate stage)</li>
      </ul>
      
      <h4>Common RFI Triggers:</h4>
      <ul>
        <li>❌ No OSD calculations provided</li>
        <li>❌ Tank size insufficient for calculated detention volume</li>
        <li>❌ No connection detail to Council system</li>
        <li>❌ Missing overland flow path</li>
        <li>❌ Invert levels not provided</li>
        <li>❌ No engineer's certification</li>
      </ul>
    `,
    assessmentCriteria: [
      'Site plan showing existing and proposed stormwater infrastructure',
      'OSD tank location, size, and specifications provided',
      'Pre and post-development flow calculations completed',
      'Permissible Site Discharge (PSD) calculated correctly',
      'Required detention volume calculated for 5-year and 100-year ARI',
      'Pit and pipe schedule with invert levels',
      'Connection point to Council system identified',
      'Overland flow paths shown',
      'Plans prepared and certified by qualified hydraulic engineer',
      'Compliance with Cumberland Council Stormwater Management Code demonstrated'
    ]
  },
  
  'Waste Management Plan': {
    bestPracticeGuide: `
      <h3>Waste Management Plan - Best Practice Guide</h3>
      
      <h4>Purpose:</h4>
      <p>Demonstrates how waste will be managed during construction and operation phases, with minimum 80% recycling target for construction waste.</p>
      
      <h4>Required Components:</h4>
      
      <h5>1. Construction Waste Management:</h5>
      <ul>
        <li><strong>Estimated Waste Volumes:</strong>
          <ul>
            <li>Demolition waste (if applicable)</li>
            <li>Excavation materials</li>
            <li>Construction waste by type (concrete, steel, timber, plasterboard, etc.)</li>
          </ul>
        </li>
        <li><strong>Recycling Strategy:</strong>
          <ul>
            <li>List materials to be recycled (target 80% by weight)</li>
            <li>Nominated recycling facilities</li>
            <li>Waste tracking procedures</li>
          </ul>
        </li>
        <li><strong>Waste Contractor Details:</strong>
          <ul>
            <li>Licensed waste contractors</li>
            <li>EPA license numbers</li>
          </ul>
        </li>
      </ul>
      
      <h5>2. Operational Waste Management (Multi-Unit Residential):</h5>
      <ul>
        <li><strong>Bin Storage:</strong>
          <ul>
            <li>3 bins per unit minimum (general waste, recycling, green waste)</li>
            <li>Bin storage room sized per Council requirements</li>
            <li>Minimum 1.2m width access paths</li>
            <li>Ventilation and drainage in bin room</li>
          </ul>
        </li>
        <li><strong>Collection Arrangements:</strong>
          <ul>
            <li>Collection point location (max 10m from street)</li>
            <li>Council collection vs. private contractor</li>
            <li>Collection frequency</li>
            <li>Waste management in strata by-laws</li>
          </ul>
        </li>
        <li><strong>Bulky Waste:</strong>
          <ul>
            <li>Storage area for bulky items</li>
            <li>Collection arrangements</li>
          </ul>
        </li>
      </ul>
      
      <h4>Bin Capacity Calculations:</h4>
      <p>Council standard: 80L garbage + 80L recycling + 80L green waste per unit per week</p>
      <ul>
        <li>6 units × 240L = 1,440L total per bin type</li>
        <li>= 6 × 240L bins (or 4 × 360L bulk bins)</li>
      </ul>
      
      <h4>Bin Storage Room Requirements (DCP):</h4>
      <ul>
        <li>Minimum 1.5m ceiling height</li>
        <li>Mechanical ventilation or natural ventilation to exterior</li>
        <li>Hose tap and floor waste</li>
        <li>Non-slip, impervious floor surface</li>
        <li>Doors minimum 1.2m wide</li>
        <li>Signage clearly identifying waste streams</li>
      </ul>
      
      <h4>Common RFI Triggers:</h4>
      <ul>
        <li>❌ No construction waste volumes or recycling targets</li>
        <li>❌ Bin storage area undersized</li>
        <li>❌ Collection point more than 10m from street</li>
        <li>❌ No ventilation in bin storage room</li>
        <li>❌ Access path less than 1.2m wide</li>
      </ul>
    `,
    assessmentCriteria: [
      'Construction waste volumes estimated for all material types',
      'Recycling strategy achieving minimum 80% target',
      'Licensed waste contractors and EPA numbers provided',
      'Bin storage room adequately sized (3 bins per unit)',
      'Bin storage room includes ventilation and drainage',
      'Collection point within 10m of street',
      'Access paths minimum 1.2m wide',
      'Operational waste management procedures detailed',
      'Compliance with Cumberland DCP waste management controls'
    ]
  },

  'BASIX Certificate': {
    bestPracticeGuide: `
      <h3>BASIX Certificate - Best Practice Guide</h3>
      
      <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <h4 style="color: #1e40af; margin-top: 0;">📋 MOCK – DEVELOPMENT APPLICATION (DA) FORM</h4>
        <p style="font-size: 13px; color: #64748b; margin: 0;"><em>Cumberland City Council – NSW Planning Portal equivalent (Training Use Only)</em></p>
      </div>

      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; font-family: sans-serif;">
        <h4 style="border-bottom: 2px solid #3b82f6; padding-bottom: 8px; color: #1e40af;">1. Site details</h4>
        <ul style="list-style: none; padding-left: 0;">
          <li>• Unit / Street No: __________</li>
          <li>• Street name: __________________________</li>
          <li>• Suburb: ___________________  Postcode: ______</li>
          <li>• Lot: ____  DP / SP: ______________</li>
          <li>• Local Government Area: <strong>Cumberland City Council</strong></li>
        </ul>

        <h4 style="border-bottom: 2px solid #3b82f6; padding-bottom: 8px; color: #1e40af; margin-top: 24px;">2. Applicant details</h4>
        <ul style="list-style: none; padding-left: 0;">
          <li>• Company name (if applicable): ______________________________</li>
          <li>• Contact person: __________________________  Position: __________</li>
          <li>• Postal address: ____________________________________________</li>
          <li>• Phone: __________________</li>
          <li>• Email: ___________________________</li>
        </ul>

        <h4 style="border-bottom: 2px solid #3b82f6; padding-bottom: 8px; color: #1e40af; margin-top: 24px;">3. Owner's consent</h4>
        <ul style="list-style: none; padding-left: 0;">
          <li>• Registered owner name(s): __________________________________</li>
          <li>• Address: _________________________________________________</li>
          <li>• Signature(s): _________________________  Date: ___ / ___ / _____</li>
          <li>• Capacity (e.g. individual / director): _________________________</li>
        </ul>

        <h4 style="border-bottom: 2px solid #3b82f6; padding-bottom: 8px; color: #1e40af; margin-top: 24px;">4. Proposal description</h4>
        <p><strong>Type of development (tick):</strong></p>
        <ul style="list-style: none; padding-left: 0;">
          <li>☐ New dwelling</li>
          <li>☐ Alterations & additions</li>
          <li>☐ Dual occupancy</li>
          <li>☐ Townhouses / units</li>
          <li>☐ Commercial / industrial</li>
          <li>☐ Other: _______________________</li>
        </ul>
        <p><strong>Brief description of works:</strong></p>
        <p>____________________________________________________________</p>
        <p>____________________________________________________________</p>

        <h4 style="border-bottom: 2px solid #3b82f6; padding-bottom: 8px; color: #1e40af; margin-top: 24px;">5. Estimated cost of works (ECW)</h4>
        <ul style="list-style: none; padding-left: 0;">
          <li>• Construction cost (excl. land): $________________</li>
          <li>• Method of calculation (e.g. QS report / builder's estimate): _______</li>
        </ul>

        <h4 style="border-bottom: 2px solid #3b82f6; padding-bottom: 8px; color: #1e40af; margin-top: 24px;">6. Related approvals / history</h4>
        <ul style="list-style: none; padding-left: 0;">
          <li>• Previous DA / CC / CDC numbers (if any): ________________________</li>
          <li>• Integrated or designated development?  ☐ Yes  ☐ No</li>
          <li style="margin-left: 20px;">If yes, specify relevant approvals / referrals: _________________</li>
        </ul>

        <h4 style="border-bottom: 2px solid #3b82f6; padding-bottom: 8px; color: #1e40af; margin-top: 24px;">7. Accompanying documentation checklist</h4>
        <ul style="list-style: none; padding-left: 0;">
          <li>☐ Statement of Environmental Effects (SEE)</li>
          <li>☐ Architectural plans (site plan, floor plans, elevations, sections)</li>
          <li>☐ Survey plan by registered surveyor</li>
          <li>☐ <strong>BASIX certificate (for relevant residential works)</strong></li>
          <li>☐ Stormwater / drainage plans</li>
          <li>☐ Waste Management Plan</li>
          <li>☐ Shadow diagrams / view / privacy analysis (if applicable)</li>
        </ul>

        <p style="margin-top: 16px;"><strong>Specialist reports (tick if attached):</strong></p>
        <ul style="list-style: none; padding-left: 0;">
          <li>☐ Arborist</li>
          <li>☐ Acoustic</li>
          <li>☐ Traffic</li>
          <li>☐ Heritage</li>
          <li>☐ Geotechnical</li>
          <li>☐ Contamination</li>
          <li>☐ Other: _____________________</li>
        </ul>

        <h4 style="border-bottom: 2px solid #3b82f6; padding-bottom: 8px; color: #1e40af; margin-top: 24px;">8. Declarations</h4>
        <p><strong>Applicant declaration:</strong></p>
        <ul style="list-style: none; padding-left: 0;">
          <li>• I declare that the information in this application is true and correct.</li>
          <li>• I understand that incomplete or inaccurate information may delay assessment.</li>
        </ul>
        <p>Signature (applicant): ___________________  Date: ___ / ___ / _____</p>
      </div>

      <hr style="margin: 30px 0; border: none; border-top: 2px solid #e2e8f0;" />

      <h4>What is BASIX?</h4>
      <p>Building Sustainability Index (BASIX) is mandatory for all new residential development in NSW. It sets targets for water and energy efficiency, and thermal comfort.</p>
      
      <h4>How to Obtain:</h4>
      <ol>
        <li>Visit: <a href="https://basix.nsw.gov.au" target="_blank">https://basix.nsw.gov.au</a></li>
        <li>Create account (free)</li>
        <li>Complete online assessment for your development</li>
        <li>Achieve required targets (typically 40 points water, 50 points energy)</li>
        <li>Download PDF certificate</li>
        <li>Submit with DA application</li>
      </ol>
      
      <h4>Required Targets (Cumberland Council LGA):</h4>
      <ul>
        <li><strong>Water:</strong> 40 points minimum</li>
        <li><strong>Energy:</strong> 50 points minimum</li>
        <li><strong>Thermal Comfort:</strong> Pass/Fail (heating and cooling loads must be reasonable)</li>
      </ul>
      
      <h4>Common Measures to Achieve Targets:</h4>
      
      <h5>Water (40 points):</h5>
      <ul>
        <li>3-star WELS rated showerheads (mandatory)</li>
        <li>4-star WELS rated taps</li>
        <li>4-star WELS rated toilets (dual flush)</li>
        <li>AAA-rated dishwasher and washing machine</li>
        <li>Rainwater tank (2,000L+) for toilet/laundry (significant points)</li>
      </ul>
      
      <h5>Energy (50 points):</h5>
      <ul>
        <li>4-6 star gas hot water system or heat pump</li>
        <li>LED lighting throughout</li>
        <li>Ceiling insulation (R3.0 minimum)</li>
        <li>Wall insulation (R1.5 minimum)</li>
        <li>Low-e double glazing (especially west-facing windows)</li>
        <li>Solar panels (2kW+ system - significant points)</li>
        <li>Draught sealing</li>
      </ul>
      
      <h5>Thermal Comfort:</h5>
      <ul>
        <li>North-facing living areas preferred</li>
        <li>Eaves/shading to north windows (summer shading)</li>
        <li>Minimal west-facing glazing (or well-shaded)</li>
        <li>Cross-ventilation to habitable rooms</li>
      </ul>
      
      <h4>Important Notes:</h4>
      <ul>
        <li>✓ Certificate must be <strong>current</strong> (typically valid 6 months)</li>
        <li>✓ Must match the DA proposal (same floor plans, same fittings)</li>
        <li>✓ Separate certificate required for <strong>each dwelling</strong> in multi-unit development</li>
        <li>✓ Must be submitted with DA - cannot be conditioned</li>
      </ul>
      
      <h4>Common Issues:</h4>
      <ul>
        <li>❌ Certificate expired - obtain new one</li>
        <li>❌ Floor plan doesn't match BASIX plan - update BASIX</li>
        <li>❌ Only one certificate for multi-unit development - need one per unit</li>
        <li>❌ Commitments not shown on plans (e.g., rainwater tank location not shown)</li>
      </ul>
      
      <h4>Integration with Architectural Plans:</h4>
      <p>Your architectural plans must show:</p>
      <ul>
        <li>Rainwater tank location and size (if committed)</li>
        <li>Solar panel array location (if committed)</li>
        <li>Insulation specifications noted</li>
        <li>All BASIX commitments must be referenced</li>
      </ul>
    `,
    assessmentCriteria: [
      'Current BASIX certificate provided (not expired)',
      'Certificate matches DA proposal (same floor plans)',
      'Water target achieved (minimum 40 points)',
      'Energy target achieved (minimum 50 points)',
      'Thermal comfort requirements passed',
      'Separate certificate for each dwelling (multi-unit developments)',
      'All BASIX commitments shown on architectural plans',
      'Certificate number recorded on DA application form'
    ]
  }
};

// Add more document types as needed
export function getDocumentGuidance(documentTitle: string) {
  return documentGuidance[documentTitle as keyof typeof documentGuidance] || {
    bestPracticeGuide: '<p>Best practice guidance is being developed for this document type.</p>',
    assessmentCriteria: ['Document must be complete and professional', 'All required information must be provided']
  };
}