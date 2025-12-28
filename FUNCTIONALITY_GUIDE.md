# MetroBuild DA QMS - Functionality Guide

## Fully Operational Features

### 1. **Main Dashboard**
✅ **Stage Navigation**
- Click on any stage in the Stage Tracker to switch between stages
- Visual progress indicators update in real-time
- "Open Detailed View" button launches stage-specific interfaces

✅ **Compliance Monitoring**
- Real-time compliance score updates
- "Run Smart Check" button triggers compliance verification
- Color-coded status indicators (green/amber/red)

✅ **Document Management**
- Drag & drop file upload (click upload area or drag files)
- Category filtering (All, Plans, Reports, Certifications, etc.)
- Document actions:
  - Download documents (hover to see actions)
  - Delete documents with confirmation
  - View document details
- Auto-categorization of uploaded files
- Version tracking

### 2. **Pre-Lodgement View** (Detailed Stage View)
✅ **Site Analysis Section**
- Interactive LEP controls matrix
- DCP controls summary cards
- Zoning compliance indicators

✅ **Documents Section**
- **Collapsible Categories** - Click headers to expand/collapse
- **Document Checklists** - Click checkboxes to mark complete/incomplete
- **File Upload** - Click upload button on incomplete items
- **Progress Tracking** - Updates automatically when documents are checked
- **Template Downloads** - "Download All Templates" button
- **Real-time Calculation** - Completion percentage updates live

✅ **Compliance Section**
- **Run Smart Check** - Interactive compliance audit
- **Compliance Score** - Updates based on document completion
- **Non-compliant Items Counter** - Dynamic count
- **Download Variation Template** - For required variations

✅ **Recommendations Section**
- **Upload Missing Documents** - Direct upload buttons
- **Download Templates** - One-click template access
- **Schedule Consultation** - Opens modal form with:
  - Date picker
  - Time picker
  - Topic selection
  - Notes field
  - Form submission confirmation

✅ **Proceed to Lodgement**
- Button enabled only when compliance ≥90% AND all docs complete
- Changes stage when clicked
- Visual feedback on requirements

### 3. **Assessment View** (Detailed Stage View)
✅ **Assessment Timeline**
- Visual phase tracker with status indicators
- Statutory benchmark table
- Days remaining calculator

✅ **RFI Management**
- **Load Template** button - Populates response with structured template
- **File Upload** - Upload supporting documents for RFI responses
- **Upload Management** - View and remove uploaded files
- **Submit Response** - Confirmation dialog before submission
- **Status Updates** - RFI status changes from pending → responded
- Success notifications

✅ **Public Submissions**
- View submission details
- "Prepare Right of Reply" button (future functionality)

### 4. **RFI Management Page**
✅ **RFI Selection**
- Click any RFI card to view details
- Visual selection indicator

✅ **Response Management**
- Text area for detailed responses
- Character count (optional)
- **Load Template** - Pre-fills common response structure
- **File Upload** - Drag-drop or click to upload
- **File List** - Shows uploaded files with remove option
- **Submit Response** - With confirmation dialog

✅ **Statistics**
- Live counts of pending, responded, and resolved RFIs
- Average response time
- RFI prevention insights

### 5. **Conditions Panel**
✅ **Conditions Management**
- Expandable categories (Pre-Construction, During Construction, etc.)
- **Status Dropdowns** - Change status: Not Started → In Progress → Completed → Verified
- Real-time progress bars
- Summary statistics

✅ **Pre-Construction Alert**
- Shows outstanding pre-construction conditions
- Action buttons for checklists and plans

### 6. **KPI Dashboard**
✅ **Interactive Metrics**
- Live KPI cards
- Trend indicators
- Performance tracking

✅ **Charts & Visualizations**
- RFI trend analysis (bar charts)
- Compliance score distribution
- Visual progress indicators

### 7. **Checklist Panel**
✅ **Interactive Checklists**
- Click checkboxes to toggle items
- Expandable/collapsible sections
- Real-time progress calculation
- Status indicators (complete/variation/pending/NA)

✅ **Actions**
- **Expand All** - Opens all sections
- **Collapse All** - Closes all sections
- **Export** - Download checklist report
- **Run Compliance Audit** - Triggers full audit with alert
- **Download Report** - Generates PDF-ready report

### 8. **Navigation**
✅ **Header Navigation**
- Dashboard
- Pre-Lodgement (detailed view)
- Assessment (detailed view)
- KPIs
- RFIs
- Conditions

✅ **Breadcrumb Navigation**
- Back navigation on detailed views
- Clear path indicators

### 9. **Notifications & Alerts**
✅ **System Alerts**
- Success messages (green)
- Warning messages (amber)
- Error messages (red)
- Info messages (blue)

✅ **Confirmations**
- Delete confirmations
- Submit confirmations
- Action confirmations

### 10. **State Management**
✅ **Persistent State**
- Compliance score updates across views
- Document status persists
- Checklist progress saves
- RFI status tracking
- Condition status tracking

---

## How To Use Key Features

### Upload Documents
1. Navigate to Document Panel (right sidebar) or Pre-Lodgement → Documents
2. Click the upload area OR drag files onto it
3. Files are automatically added with metadata
4. Use category filters to organize

### Complete Pre-Lodgement
1. Go to Pre-Lodgement view
2. Navigate through each section using top tabs
3. Check off completed documents
4. Upload any missing files
5. Run compliance check
6. When score ≥90% and docs complete, "Proceed to Lodgement" activates

### Respond to RFI
1. Go to RFI Management or Assessment → RFI section
2. Click on the RFI card
3. Click "Load Template" for structured response
4. Fill in the response text
5. Upload supporting documents
6. Click "Submit Response"
7. Confirm submission

### Track Progress
1. Main Dashboard shows overall progress
2. Stage Tracker shows current stage
3. Compliance Panel shows score and issues
4. Timeline Panel shows days elapsed
5. KPI Dashboard shows detailed metrics

### Manage Conditions
1. Navigate to Conditions panel
2. Click category header to expand
3. Use dropdown to change condition status
4. Progress bars update automatically
5. Pre-construction alert shows outstanding items

---

## Interactive Elements Summary

| Element | Action | Result |
|---------|--------|--------|
| Stage Tracker Items | Click | Changes current stage |
| Checklist Items | Click checkbox | Toggles complete/incomplete |
| Document Upload Area | Click or Drag | Opens file picker/uploads files |
| Category Buttons | Click | Filters documents |
| Collapsible Headers | Click | Expands/collapses content |
| Run Smart Check | Click | Triggers compliance audit |
| Load Template | Click | Pre-fills RFI response |
| Submit Response | Click | Submits RFI with confirmation |
| Download Buttons | Click | Downloads template/report |
| Status Dropdowns | Select | Updates condition status |
| Schedule Consultation | Click | Opens modal form |
| Proceed to Lodgement | Click (when enabled) | Advances to next stage |

---

## Technical Features

✅ **Real-time Updates**
- Compliance scores recalculate on changes
- Progress bars update immediately
- Counters update dynamically

✅ **Form Validation**
- Required fields enforced
- Confirmation dialogs
- Error prevention

✅ **User Feedback**
- Success/error alerts
- Loading states
- Hover effects
- Visual confirmations

✅ **Responsive Design**
- Works on desktop, tablet, mobile
- Adaptive layouts
- Touch-friendly interactions

---

## Future Enhancements (Not Yet Implemented)

- PDF generation for reports
- Email notifications
- Calendar integration for consultations
- Document OCR for automatic data extraction
- Integration with NSW Planning Portal API
- Real-time collaboration
- Document e-signatures
- Advanced search and filtering
- Export to Excel/CSV
- Print-friendly views

---

*Last Updated: December 2024*
*MetroBuild Group DA Quality Management System*
