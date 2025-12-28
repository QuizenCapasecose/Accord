import { useState, useEffect } from 'react';
import { useProject } from '../context/ProjectContext';
import { CheckCircle2, AlertCircle, HelpCircle, Download, Save, Eye } from 'lucide-react';

interface FormData {
  // Section 1: Site details
  unitStreetNo: string;
  streetName: string;
  suburb: string;
  postcode: string;
  lot: string;
  dpSp: string;
  
  // Section 2: Applicant details
  companyName: string;
  contactPerson: string;
  position: string;
  postalAddress: string;
  phone: string;
  email: string;
  
  // Section 3: Owner's consent
  ownerName: string;
  ownerAddress: string;
  ownerSignature: string;
  ownerDate: string;
  ownerCapacity: string;
  
  // Section 4: Proposal
  developmentType: string[];
  developmentTypeOther: string;
  worksDescription: string;
  
  // Section 5: Estimated cost
  constructionCost: string;
  costCalculationMethod: string;
  
  // Section 6: Related approvals
  previousNumbers: string;
  isIntegratedDevelopment: boolean;
  integratedDetails: string;
  
  // Section 7: Documents
  attachedDocuments: string[];
  specialistReports: string[];
  specialistReportsOther: string;
}

export function DAFormFillable() {
  const { project } = useProject();
  const [formData, setFormData] = useState<FormData>({
    unitStreetNo: '',
    streetName: '',
    suburb: '',
    postcode: '',
    lot: '',
    dpSp: '',
    companyName: '',
    contactPerson: '',
    position: '',
    postalAddress: '',
    phone: '',
    email: '',
    ownerName: '',
    ownerAddress: '',
    ownerSignature: '',
    ownerDate: '',
    ownerCapacity: '',
    developmentType: [],
    developmentTypeOther: '',
    worksDescription: '',
    constructionCost: '',
    costCalculationMethod: '',
    previousNumbers: '',
    isIntegratedDevelopment: false,
    integratedDetails: '',
    attachedDocuments: [],
    specialistReports: [],
    specialistReportsOther: ''
  });

  const [activeSection, setActiveSection] = useState(1);
  const [showHelp, setShowHelp] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Pre-fill from project data
  useEffect(() => {
    if (project) {
      setFormData(prev => ({
        ...prev,
        streetName: project.address.split(',')[0] || '',
        suburb: 'Cumberland',
        postcode: '2145',
        companyName: 'MetroBuild Group',
        worksDescription: project.projectName
      }));
    }
  }, [project]);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user updates field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleCheckbox = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(value)) {
      updateField(field, currentArray.filter(item => item !== value));
    } else {
      updateField(field, [...currentArray, value]);
    }
  };

  const validateSection = (section: number): boolean => {
    const errors: Record<string, string> = {};

    switch (section) {
      case 1:
        if (!formData.streetName) errors.streetName = 'Street name is required';
        if (!formData.suburb) errors.suburb = 'Suburb is required';
        if (!formData.postcode) errors.postcode = 'Postcode is required';
        if (!formData.lot) errors.lot = 'Lot number is required';
        if (!formData.dpSp) errors.dpSp = 'DP/SP number is required';
        break;
      case 2:
        if (!formData.contactPerson) errors.contactPerson = 'Contact person is required';
        if (!formData.phone) errors.phone = 'Phone number is required';
        if (!formData.email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
        break;
      case 3:
        if (!formData.ownerName) errors.ownerName = 'Owner name is required';
        if (!formData.ownerAddress) errors.ownerAddress = 'Owner address is required';
        if (!formData.ownerCapacity) errors.ownerCapacity = 'Capacity is required';
        break;
      case 4:
        if (formData.developmentType.length === 0) errors.developmentType = 'Select at least one development type';
        if (!formData.worksDescription || formData.worksDescription.length < 50) {
          errors.worksDescription = 'Provide detailed description (minimum 50 characters)';
        }
        break;
      case 5:
        if (!formData.constructionCost) errors.constructionCost = 'Construction cost is required';
        if (!formData.costCalculationMethod) errors.costCalculationMethod = 'Calculation method is required';
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const helpContent: Record<string, any> = {
    lotDp: {
      title: 'Lot & DP/SP Numbers',
      content: `
        <p><strong>What are these?</strong></p>
        <ul>
          <li><strong>Lot:</strong> The lot number on the title (e.g., "1", "12", "A")</li>
          <li><strong>DP:</strong> Deposited Plan number (e.g., "DP 123456")</li>
          <li><strong>SP:</strong> Strata Plan number (for units/strata, e.g., "SP 98765")</li>
        </ul>
        <p><strong>Where to find:</strong></p>
        <ul>
          <li>✓ Section 10.7 Certificate (Planning Certificate)</li>
          <li>✓ Property title documents</li>
          <li>✓ Rates notice</li>
        </ul>
        <p><strong>⚠️ Common mistake:</strong> Numbers must match title EXACTLY - incorrect Lot/DP is a common RFI trigger!</p>
      `
    },
    ownerConsent: {
      title: 'Owner\'s Consent Requirements',
      content: `
        <p><strong>Who must sign?</strong></p>
        <ul>
          <li>ALL registered owners on the title</li>
          <li>If multiple owners, all must sign or provide separate consent forms</li>
          <li>For companies: Director or authorized signatory</li>
          <li>For trusts: Trustee(s)</li>
        </ul>
        <p><strong>Capacity examples:</strong></p>
        <ul>
          <li>"Individual owner"</li>
          <li>"Director of [Company Name]"</li>
          <li>"Trustee of [Trust Name]"</li>
          <li>"Joint owner"</li>
        </ul>
        <p><strong>⚠️ RFI trigger:</strong> Missing signatures from all owners is the #1 cause of RFIs!</p>
      `
    },
    worksDescription: {
      title: 'Description of Works - Best Practice',
      content: `
        <p><strong>What to include:</strong></p>
        <ul>
          <li>✓ Specific use (e.g., "Residential flat building comprising 12 units")</li>
          <li>✓ Number of dwellings/units</li>
          <li>✓ Number of storeys</li>
          <li>✓ Building height (metres)</li>
          <li>✓ Gross Floor Area (GFA in m²)</li>
          <li>✓ Number of parking spaces</li>
          <li>✓ Any demolition works</li>
          <li>✓ Any tree removal</li>
        </ul>
        <p><strong>Example (good):</strong><br/>
        "Demolition of existing single-storey dwelling and construction of a three-storey residential flat building containing 12 units (4 x 1-bed, 6 x 2-bed, 2 x 3-bed), with a maximum building height of 11.5m, GFA of 1,200m², and 18 car parking spaces in basement level. Works include removal of 2 trees and construction of new vehicular access from Smith Street."</p>
        <p><strong>Example (poor - causes RFI):</strong><br/>
        "New residential building"</p>
      `
    },
    constructionCost: {
      title: 'Estimated Cost of Works (ECW)',
      content: `
        <p><strong>What to include:</strong></p>
        <ul>
          <li>All construction costs (building, landscaping, driveways, etc.)</li>
          <li>EXCLUDE land purchase cost</li>
          <li>EXCLUDE professional fees (architect, engineer)</li>
        </ul>
        <p><strong>Calculation methods (in order of preference):</strong></p>
        <ol>
          <li><strong>Quantity Surveyor report</strong> (best - provides detailed cost estimate)</li>
          <li><strong>Builder's quote</strong> (from licensed builder)</li>
          <li><strong>Industry rates</strong> (e.g., $2,000-3,500/m² for residential units)</li>
        </ol>
        <p><strong>Industry benchmark rates:</strong></p>
        <ul>
          <li>Dwelling house: $1,500 - $2,500/m²</li>
          <li>Residential units: $2,000 - $3,500/m²</li>
          <li>Commercial: $2,500 - $4,000/m²</li>
        </ul>
        <p><strong>⚠️ Why it matters:</strong> Determines application fees and Section 7.11/7.12 contributions (can be $10,000s)</p>
      `
    },
    basix: {
      title: 'BASIX Certificate Requirements',
      content: `
        <p><strong>What is BASIX?</strong></p>
        <p>Building Sustainability Index - mandatory for all new residential development and major renovations.</p>
        <p><strong>When required:</strong></p>
        <ul>
          <li>✓ New dwellings (houses, units, townhouses)</li>
          <li>✓ Alterations adding habitable floor area</li>
          <li>✓ Alterations to existing dwelling over $50,000</li>
        </ul>
        <p><strong>How to obtain:</strong></p>
        <ol>
          <li>Visit <a href="https://basix.nsw.gov.au" target="_blank" class="text-blue-600 underline">basix.nsw.gov.au</a></li>
          <li>Complete online assessment (FREE)</li>
          <li>Achieve targets: 40 points (water), 50 points (energy)</li>
          <li>Download PDF certificate</li>
        </ol>
        <p><strong>⚠️ Critical:</strong></p>
        <ul>
          <li>❌ Cannot be conditioned - MUST submit with DA</li>
          <li>❌ Must be current (typically 6 months validity)</li>
          <li>❌ Must match floor plans exactly</li>
          <li>❌ Need separate certificate for EACH dwelling</li>
        </ul>
      `
    }
  };

  const getSectionCompletion = (section: number): number => {
    let completed = 0;
    let total = 0;

    switch (section) {
      case 1:
        total = 5;
        if (formData.streetName) completed++;
        if (formData.suburb) completed++;
        if (formData.postcode) completed++;
        if (formData.lot) completed++;
        if (formData.dpSp) completed++;
        break;
      case 2:
        total = 4;
        if (formData.contactPerson) completed++;
        if (formData.phone) completed++;
        if (formData.email) completed++;
        if (formData.postalAddress) completed++;
        break;
      case 3:
        total = 3;
        if (formData.ownerName) completed++;
        if (formData.ownerAddress) completed++;
        if (formData.ownerCapacity) completed++;
        break;
      case 4:
        total = 2;
        if (formData.developmentType.length > 0) completed++;
        if (formData.worksDescription.length >= 50) completed++;
        break;
      case 5:
        total = 2;
        if (formData.constructionCost) completed++;
        if (formData.costCalculationMethod) completed++;
        break;
    }

    return Math.round((completed / total) * 100);
  };

  const InputField = ({ 
    label, 
    field, 
    placeholder = '', 
    helpKey = '',
    required = false,
    type = 'text'
  }: { 
    label: string; 
    field: keyof FormData; 
    placeholder?: string; 
    helpKey?: string;
    required?: boolean;
    type?: string;
  }) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label} {required && <span className="text-red-600">*</span>}
        {helpKey && (
          <button
            type="button"
            onClick={() => setShowHelp(showHelp === helpKey ? null : helpKey)}
            className="ml-2 inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        )}
      </label>
      <input
        type={type}
        value={formData[field] as string}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
          validationErrors[field]
            ? 'border-red-300 bg-red-50 focus:border-red-500'
            : 'border-slate-300 focus:border-blue-500'
        }`}
      />
      {validationErrors[field] && (
        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          {validationErrors[field]}
        </div>
      )}
    </div>
  );

  const TextAreaField = ({ 
    label, 
    field, 
    placeholder = '', 
    helpKey = '',
    required = false,
    rows = 4,
    showCharCount = false,
    minChars = 0
  }: { 
    label: string; 
    field: keyof FormData; 
    placeholder?: string; 
    helpKey?: string;
    required?: boolean;
    rows?: number;
    showCharCount?: boolean;
    minChars?: number;
  }) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label} {required && <span className="text-red-600">*</span>}
        {helpKey && (
          <button
            type="button"
            onClick={() => setShowHelp(showHelp === helpKey ? null : helpKey)}
            className="ml-2 inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        )}
      </label>
      <textarea
        value={formData[field] as string}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
          validationErrors[field]
            ? 'border-red-300 bg-red-50 focus:border-red-500'
            : 'border-slate-300 focus:border-blue-500'
        }`}
      />
      {showCharCount && (
        <div className={`text-sm mt-1 ${
          (formData[field] as string).length >= minChars ? 'text-green-600' : 'text-slate-500'
        }`}>
          {(formData[field] as string).length} / {minChars} characters
          {(formData[field] as string).length >= minChars && ' ✓'}
        </div>
      )}
      {validationErrors[field] && (
        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          {validationErrors[field]}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <span className="text-2xl">📋</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Development Application Form</h1>
            <p className="text-sm opacity-90">Cumberland City Council - NSW Planning Portal</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm mt-4">
          <p className="text-sm">
            Complete all mandatory fields (*) accurately. Incomplete or incorrect information will delay assessment and likely result in an RFI.
          </p>
        </div>
      </div>

      {/* Section Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-bold text-slate-800 mb-4">Form Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { num: 1, title: 'Site Details' },
            { num: 2, title: 'Applicant' },
            { num: 3, title: 'Owner Consent' },
            { num: 4, title: 'Proposal' },
            { num: 5, title: 'Cost' }
          ].map(section => {
            const completion = getSectionCompletion(section.num);
            return (
              <button
                key={section.num}
                onClick={() => setActiveSection(section.num)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  activeSection === section.num
                    ? 'border-blue-500 bg-blue-50'
                    : completion === 100
                    ? 'border-green-300 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs text-slate-600 mb-1">Section {section.num}</div>
                <div className="font-semibold text-sm mb-2">{section.title}</div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      completion === 100 ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${completion}%` }}
                  ></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Help Panel */}
      {showHelp && helpContent[showHelp] && (
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 shadow-lg">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-blue-900">
              {helpContent[showHelp].title}
            </h3>
            <button
              onClick={() => setShowHelp(null)}
              className="text-blue-600 hover:text-blue-800 font-bold"
            >
              ✕
            </button>
          </div>
          <div 
            className="prose prose-sm max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: helpContent[showHelp].content }}
          />
        </div>
      )}

      {/* Form Sections */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Section 1: Site Details */}
        {activeSection === 1 && (
          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-slate-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">
                1
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Site Details</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InputField
                label="Unit / Street No"
                field="unitStreetNo"
                placeholder="e.g., 123 or Unit 5, 123"
              />
              <InputField
                label="Street Name"
                field="streetName"
                placeholder="e.g., Smith Street"
                required
              />
              <InputField
                label="Suburb"
                field="suburb"
                placeholder="e.g., Granville"
                required
              />
              <InputField
                label="Postcode"
                field="postcode"
                placeholder="e.g., 2142"
                required
              />
              <InputField
                label="Lot Number"
                field="lot"
                placeholder="e.g., 1, 12, A"
                helpKey="lotDp"
                required
              />
              <InputField
                label="DP / SP Number"
                field="dpSp"
                placeholder="e.g., DP 123456 or SP 98765"
                helpKey="lotDp"
                required
              />
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-sm text-slate-600">
                <strong>Local Government Area:</strong> Cumberland City Council
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Applicant Details */}
        {activeSection === 2 && (
          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-slate-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">
                2
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Applicant Details</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InputField
                label="Company Name (if applicable)"
                field="companyName"
                placeholder="e.g., MetroBuild Group Pty Ltd"
              />
              <InputField
                label="Contact Person"
                field="contactPerson"
                placeholder="Full name"
                required
              />
              <InputField
                label="Position / Role"
                field="position"
                placeholder="e.g., Project Manager, Director"
              />
              <InputField
                label="Phone Number"
                field="phone"
                placeholder="e.g., 02 9876 5432"
                type="tel"
                required
              />
              <div className="lg:col-span-2">
                <InputField
                  label="Email Address"
                  field="email"
                  placeholder="e.g., contact@metrobuild.com.au"
                  type="email"
                  required
                />
              </div>
              <div className="lg:col-span-2">
                <InputField
                  label="Postal Address"
                  field="postalAddress"
                  placeholder="Full postal address"
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Owner's Consent */}
        {activeSection === 3 && (
          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-slate-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">
                3
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800">Owner's Consent</h2>
                <p className="text-sm text-slate-600 mt-1">
                  All registered owners must provide consent
                </p>
              </div>
              <button
                onClick={() => setShowHelp('ownerConsent')}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold text-sm flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                Help
              </button>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <strong>⚠️ #1 RFI Trigger:</strong> Missing owner signatures or incorrect owner details.
                  Ensure ALL registered owners on the title sign this form or provide separate consent.
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <InputField
                label="Registered Owner Name(s)"
                field="ownerName"
                placeholder="Full legal name(s) as shown on title"
                helpKey="ownerConsent"
                required
              />
              <InputField
                label="Owner's Address"
                field="ownerAddress"
                placeholder="Full address"
                required
              />
              <InputField
                label="Capacity"
                field="ownerCapacity"
                placeholder="e.g., Individual owner, Director, Trustee"
                helpKey="ownerConsent"
                required
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Signature <span className="text-red-600">*</span>
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                    <p className="text-sm text-slate-600 mb-2">Digital signature required</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      Sign Electronically
                    </button>
                  </div>
                </div>
                <InputField
                  label="Date"
                  field="ownerDate"
                  type="date"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Proposal Description */}
        {activeSection === 4 && (
          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-slate-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">
                4
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800">Proposal Description</h2>
              </div>
              <button
                onClick={() => setShowHelp('worksDescription')}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold text-sm flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                Best Practice
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Type of Development <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    'New dwelling',
                    'Alterations & additions',
                    'Dual occupancy',
                    'Townhouses / units',
                    'Commercial / industrial',
                    'Other'
                  ].map(type => (
                    <label
                      key={type}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.developmentType.includes(type)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.developmentType.includes(type)}
                        onChange={() => toggleCheckbox('developmentType', type)}
                        className="w-5 h-5"
                      />
                      <span className="font-semibold text-sm">{type}</span>
                    </label>
                  ))}
                </div>
                {formData.developmentType.includes('Other') && (
                  <div className="mt-3">
                    <InputField
                      label="Specify Other"
                      field="developmentTypeOther"
                      placeholder="Describe development type"
                    />
                  </div>
                )}
              </div>

              <TextAreaField
                label="Brief Description of Works"
                field="worksDescription"
                placeholder="Provide a comprehensive description including: number of dwellings, storeys, building height, GFA, parking spaces, any demolition, and tree removal. See help for example."
                helpKey="worksDescription"
                required
                rows={6}
                showCharCount
                minChars={50}
              />
            </div>
          </div>
        )}

        {/* Section 5: Estimated Cost */}
        {activeSection === 5 && (
          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-slate-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">
                5
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800">Estimated Cost of Works</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Excludes land cost - construction only
                </p>
              </div>
              <button
                onClick={() => setShowHelp('constructionCost')}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold text-sm flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                Calculator
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Construction Cost (excl. land) <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600 font-semibold text-lg">
                    $
                  </span>
                  <input
                    type="text"
                    value={formData.constructionCost}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      updateField('constructionCost', value);
                    }}
                    placeholder="e.g., 2500000"
                    className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-lg font-semibold ${
                      validationErrors.constructionCost
                        ? 'border-red-300 bg-red-50 focus:border-red-500'
                        : 'border-slate-300 focus:border-blue-500'
                    }`}
                  />
                </div>
                {formData.constructionCost && (
                  <div className="text-sm text-slate-600 mt-2">
                    = ${parseInt(formData.constructionCost).toLocaleString()}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Method of Calculation <span className="text-red-600">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'qs', label: 'Quantity Surveyor Report', desc: 'Most accurate - recommended' },
                    { value: 'builder', label: 'Builder\'s Quote/Estimate', desc: 'From licensed builder' },
                    { value: 'industry', label: 'Industry Benchmark Rates', desc: 'e.g., $2,500/m² × GFA' }
                  ].map(method => (
                    <label
                      key={method.value}
                      className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.costCalculationMethod === method.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="costMethod"
                        checked={formData.costCalculationMethod === method.value}
                        onChange={() => updateField('costCalculationMethod', method.value)}
                        className="w-5 h-5 mt-0.5"
                      />
                      <div>
                        <div className="font-semibold text-sm">{method.label}</div>
                        <div className="text-xs text-slate-600">{method.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="bg-slate-50 px-6 py-4 border-t-2 border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              if (activeSection > 1) {
                setActiveSection(activeSection - 1);
              }
            }}
            disabled={activeSection === 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeSection === 1
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-300'
            }`}
          >
            ← Previous Section
          </button>

          <div className="text-center">
            <div className="text-sm text-slate-600">Section</div>
            <div className="text-2xl font-bold text-slate-800">{activeSection} / 5</div>
          </div>

          {activeSection < 5 ? (
            <button
              onClick={() => {
                if (validateSection(activeSection)) {
                  setActiveSection(activeSection + 1);
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Next Section →
            </button>
          ) : (
            <button
              onClick={() => {
                if (validateSection(5)) {
                  alert('✅ DA Form completed! Ready to submit.');
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Complete Form
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="px-6 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Save Draft
        </button>
        <button className="px-6 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
          <Eye className="w-5 h-5" />
          Preview Form
        </button>
        <button className="px-6 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Download PDF
        </button>
      </div>
    </div>
  );
}
