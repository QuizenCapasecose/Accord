# GOOGLE ANALYTICS 4 (GA4) IMPLEMENTATION GUIDE
## MetroBuild QMS - Complete Analytics & Event Tracking

---

## 📊 **OVERVIEW**

This guide provides complete instructions for implementing Google Analytics 4 (GA4) tracking in the MetroBuild Quality Management System.

**Implementation Files:**
- `/src/app/components/GoogleAnalytics.tsx` - Main GA4 component
- `/src/app/App.tsx` - App integration
- All page components - Event tracking integration

---

## 🚀 **QUICK START**

### **Step 1: Get Your GA4 Measurement ID**

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (or use existing)
3. Navigate to **Admin → Data Streams → Web**
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### **Step 2: Update the Measurement ID**

Edit `/src/app/components/GoogleAnalytics.tsx`:

```typescript
// Line 17 - Replace with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-YOUR-ACTUAL-ID-HERE';
```

### **Step 3: Verify Installation**

1. Open your app in browser
2. Open browser DevTools → Network tab
3. Filter by "google-analytics.com" or "gtag"
4. You should see requests being sent to GA4

**Alternative Verification:**
- Install [Google Tag Assistant](https://tagassistant.google.com/) Chrome extension
- Visit your app and click the extension
- Should show "Google Analytics 4 - Connected"

---

## 📈 **IMPLEMENTED EVENT TRACKING**

### **1. Automatic Events**

These fire automatically without any code changes:

| Event | Description | Triggered When |
|-------|-------------|----------------|
| `page_view` | Page view tracking | User navigates to any page |
| `first_visit` | First time visitor | User visits site for first time |
| `session_start` | New session begins | User starts new session |

---

### **2. Standard Events**

Pre-configured in the system:

#### **Content Viewing**
```typescript
import { trackEvent } from './components/GoogleAnalytics';

// Track viewing a blog post
trackEvent.viewContent('RFI Prevention Guide', 'blog', 'blog-001');

// Track viewing a document
trackEvent.metrobuild.viewDocument('DA Template', 'DA Application Form');
```

#### **Document Downloads**
```typescript
// Track PDF download
trackEvent.downloadDocument('BASIX Certificate Template', 'pdf');

// Track document download
trackEvent.downloadDocument('Cumberland DCP Checklist', 'xlsx');
```

#### **Search Events**
```typescript
// Track search queries
trackEvent.search('BASIX compliance', 'documents');

// Track filter usage
trackEvent.search('RFI prevention', 'guides');
```

#### **Form Submissions**
```typescript
// Track form submissions
trackEvent.submitForm('Contact Form', 'lead_generation');

// Track project creation
trackEvent.metrobuild.createProject('Residential DA', 450000);
```

---

### **3. MetroBuild Custom Events**

#### **DA Workflow Tracking**

```typescript
import { trackEvent } from './components/GoogleAnalytics';

// Track stage progression
trackEvent.metrobuild.viewDAStage('Pre-Lodgement', 'PRJ-001');
trackEvent.metrobuild.viewDAStage('Assessment', 'PRJ-001');
trackEvent.metrobuild.viewDAStage('Determination', 'PRJ-001');
```

**GA4 Dashboard View:**
- Event: `view_da_stage`
- Parameters: `stage_name`, `project_id`, `event_category`

#### **Compliance Checking**

```typescript
// Track compliance checks
trackEvent.metrobuild.checkCompliance(
  'LEP Control', 
  'Building Height 9m', 
  'pass'
);

trackEvent.metrobuild.checkCompliance(
  'DCP Control', 
  'Setback Requirements', 
  'warning'
);
```

**GA4 Dashboard View:**
- Event: `compliance_check`
- Parameters: `control_type`, `control_name`, `check_result`

#### **Document Management**

```typescript
// Track document uploads
trackEvent.metrobuild.uploadDocument('Architectural Plans', 'PRJ-001');

// Track document viewing
trackEvent.metrobuild.viewDocument('SEE', 'Statement of Environmental Effects');
```

**GA4 Dashboard View:**
- Event: `document_upload` / `document_view`
- Parameters: `document_type`, `document_name`, `project_id`

#### **RFI Management**

```typescript
// Track RFI submission
trackEvent.metrobuild.submitRFI('Additional Plans Required', 'PRJ-001');

// Track RFI resolution
trackEvent.metrobuild.resolveRFI('Additional Plans Required', 48);
```

**GA4 Dashboard View:**
- Event: `submit_rfi` / `resolve_rfi`
- Parameters: `rfi_type`, `project_id`, `resolution_time_hours`

#### **Quality Gate Approvals**

```typescript
// Track quality gate approval
trackEvent.metrobuild.approveQualityGate('Pre-Lodgement Gate', 'PRJ-001');
trackEvent.metrobuild.approveQualityGate('Lodgement Gate', 'PRJ-001');
```

**GA4 Dashboard View:**
- Event: `approve_quality_gate`
- Parameters: `gate_name`, `project_id`

#### **BASIX Certificate Tracking**

```typescript
// Track BASIX certificate viewing
trackEvent.metrobuild.viewBASIX('1234567');

// Track BASIX upload
trackEvent.metrobuild.uploadBASIX('1234567', 'PRJ-001');
```

**GA4 Dashboard View:**
- Event: `view_basix_certificate` / `upload_basix_certificate`
- Parameters: `certificate_number`, `project_id`

#### **API Integration Tracking**

```typescript
// Track API calls
trackEvent.metrobuild.apiCall('/api/nsw-planning-portal/submit', 'success');
trackEvent.metrobuild.apiCall('/api/nsw-planning-portal/status', 'error');
```

**GA4 Dashboard View:**
- Event: `api_call`
- Parameters: `api_endpoint`, `api_status`

#### **Content Marketing Tracking**

```typescript
// Track content calendar viewing
trackEvent.metrobuild.viewContentCalendar();

// Track content creation
trackEvent.metrobuild.createContent('Blog Post', 'RFI Prevention Tips');

// Track content publishing
trackEvent.metrobuild.publishContent('Blog Post', 'RFI Prevention Tips');
```

**GA4 Dashboard View:**
- Event: `view_content_calendar` / `create_content` / `publish_content`
- Parameters: `content_type`, `content_title`

#### **SEO & Search Console Tracking**

```typescript
// Track Search Console dashboard views
trackEvent.metrobuild.viewSearchConsole();

// Track crawl error fixes
trackEvent.metrobuild.fixCrawlError('404', '/old-page-moved');
```

**GA4 Dashboard View:**
- Event: `view_search_console` / `fix_crawl_error`
- Parameters: `error_type`, `error_url`

---

### **4. Conversion Events**

#### **User Authentication**

```typescript
// Track user signup
trackEvent.conversion.signup('email');

// Track user login
trackEvent.conversion.login('google');
```

#### **Trial & Purchase**

```typescript
// Track trial start
trackEvent.conversion.startTrial('Professional Plan');

// Track purchase
trackEvent.conversion.purchase('TXN-12345', 199.00, 'AUD');
```

---

## 🎯 **EXAMPLE IMPLEMENTATIONS**

### **Example 1: Track Button Click**

```typescript
// In any component
import { trackEvent } from './components/GoogleAnalytics';

function MyComponent() {
  const handleDownloadClick = () => {
    // Track the download
    trackEvent.downloadDocument('DA Checklist Template', 'pdf');
    
    // Then perform the download
    window.open('/documents/da-checklist.pdf', '_blank');
  };

  return (
    <button onClick={handleDownloadClick}>
      Download DA Checklist
    </button>
  );
}
```

### **Example 2: Track Page Navigation**

```typescript
// In HomePage.tsx
import { trackEvent } from './components/GoogleAnalytics';

function HomePage({ onNavigate }) {
  const handleNavigateToCompliance = () => {
    // Track navigation event
    trackEvent.pageView('Compliance Dashboard', 'Dashboard');
    
    // Navigate
    onNavigate('compliance');
  };

  return (
    <button onClick={handleNavigateToCompliance}>
      View Compliance
    </button>
  );
}
```

### **Example 3: Track Form Submission**

```typescript
// In ProjectSetupWizard.tsx
import { trackEvent } from './components/GoogleAnalytics';

function ProjectSetupWizard() {
  const handleSubmit = (formData) => {
    // Track form submission
    trackEvent.submitForm('Project Setup Wizard', 'project_creation');
    
    // Track project creation
    trackEvent.metrobuild.createProject(
      formData.projectType, 
      formData.estimatedCost
    );
    
    // Save project
    saveProject(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### **Example 4: Track Compliance Check**

```typescript
// In CompliancePage.tsx
import { trackEvent } from './components/GoogleAnalytics';

function CompliancePage() {
  const handleComplianceCheck = (control, result) => {
    // Track compliance check
    trackEvent.metrobuild.checkCompliance(
      control.type,
      control.name,
      result // 'pass', 'fail', or 'warning'
    );
    
    // Update UI
    updateComplianceStatus(control, result);
  };

  return (
    <div>
      {/* Compliance checks */}
    </div>
  );
}
```

---

## 📊 **GA4 DASHBOARD SETUP**

### **Recommended Custom Reports**

#### **1. DA Workflow Funnel**

**Path:** GA4 → Explore → Funnel Exploration

**Steps:**
1. view_da_stage (stage_name = "Pre-Lodgement")
2. view_da_stage (stage_name = "Lodgement")
3. view_da_stage (stage_name = "Assessment")
4. view_da_stage (stage_name = "Determination")
5. view_da_stage (stage_name = "Post-Consent")

**Purpose:** Track how many projects complete each stage

---

#### **2. Compliance Performance**

**Path:** GA4 → Explore → Free Form

**Metrics:**
- Event count (compliance_check)
- Breakdown by check_result (pass/fail/warning)

**Dimensions:**
- control_type
- control_name

**Purpose:** Identify which compliance checks fail most often

---

#### **3. Document Downloads**

**Path:** GA4 → Explore → Free Form

**Metrics:**
- Event count (file_download)

**Dimensions:**
- file_name
- file_extension

**Purpose:** Most popular document templates

---

#### **4. RFI Resolution Time**

**Path:** GA4 → Explore → Free Form

**Metrics:**
- Average resolution_time_hours

**Dimensions:**
- rfi_type

**Purpose:** Track RFI resolution performance

---

#### **5. Content Performance**

**Path:** GA4 → Explore → Free Form

**Metrics:**
- Event count (create_content, publish_content)

**Dimensions:**
- content_type
- content_title

**Purpose:** Track content marketing productivity

---

## 🔧 **ADVANCED CONFIGURATION**

### **User Properties**

Set user properties for segmentation:

```typescript
import { trackEvent } from './components/GoogleAnalytics';

// Set user properties after login
trackEvent.setUserProperties({
  user_type: 'builder',
  organization_size: '10-50',
  industry: 'residential_construction',
  subscription_tier: 'professional',
});
```

**Use in GA4:**
- Navigate to **Explore → User lifetime**
- Create segments based on user properties
- Compare behavior across user types

---

### **Custom Dimensions**

Add custom dimensions in GA4:

**Admin → Data display → Custom definitions → Create custom dimension**

**Recommended Custom Dimensions:**

| Name | Scope | Event Parameter |
|------|-------|-----------------|
| Project Type | Event | `project_type` |
| Control Type | Event | `control_type` |
| RFI Type | Event | `rfi_type` |
| Document Type | Event | `document_type` |
| Stage Name | Event | `stage_name` |
| Check Result | Event | `check_result` |

---

### **Conversion Goals**

Set up conversions in GA4:

**Admin → Events → Mark as conversion**

**Recommended Conversions:**

1. ✅ `sign_up` - User registration
2. ✅ `begin_checkout` - Trial start
3. ✅ `purchase` - Subscription purchase
4. ✅ `create_project` - First project created
5. ✅ `approve_quality_gate` - Quality gate approval
6. ✅ `publish_content` - Content published

---

## 🔒 **PRIVACY & COMPLIANCE**

### **Cookie Consent**

If you need cookie consent (GDPR/CCPA):

```typescript
// Update GoogleAnalytics.tsx
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
});

// After user accepts cookies:
gtag('consent', 'update', {
  'analytics_storage': 'granted',
  'ad_storage': 'granted',
});
```

### **IP Anonymization**

GA4 automatically anonymizes IPs. No additional configuration needed.

### **Data Retention**

Set data retention period:
**Admin → Data Settings → Data Retention**
- Recommended: 14 months (default)

---

## 📱 **TESTING & DEBUGGING**

### **1. Google Tag Assistant**

Install: [Google Tag Assistant](https://tagassistant.google.com/)

**Usage:**
1. Click extension icon
2. Connect to your site
3. Verify "Google Analytics 4" shows as connected
4. Click events to see parameters

---

### **2. GA4 DebugView**

Enable debug mode:

```typescript
// In GoogleAnalytics.tsx
gtag('config', GA_MEASUREMENT_ID, {
  debug_mode: true, // Add this line
});
```

**View in GA4:**
- Navigate to **Admin → DebugView**
- See real-time events with parameters

---

### **3. Browser Console**

Check for errors:

```javascript
// In browser console
dataLayer // Should show array of events
gtag // Should show function
```

---

## 📊 **KEY METRICS TO MONITOR**

### **Daily Monitoring**

| Metric | Location | Target |
|--------|----------|--------|
| Active Users | Reports → Realtime | Monitor growth |
| Page Views | Reports → Pages | Identify popular pages |
| Event Count | Reports → Events | Track engagement |
| Conversions | Reports → Conversions | Monitor signups/purchases |

### **Weekly Monitoring**

| Metric | Location | Target |
|--------|----------|--------|
| DA Stage Progression | Explore → Funnel | >80% completion |
| Compliance Pass Rate | Explore → Free Form | >90% pass |
| RFI Resolution Time | Explore → Free Form | <48 hours average |
| Document Downloads | Explore → Free Form | Track trends |

### **Monthly Monitoring**

| Metric | Location | Target |
|--------|----------|--------|
| User Acquisition | Reports → Acquisition | Growth MoM |
| Retention | Reports → Retention | >40% retention |
| Content Publishing | Explore → Free Form | 20+ posts/month |
| SEO Performance | Custom Report | Track rankings |

---

## 🎯 **IMPLEMENTATION CHECKLIST**

### **Pre-Launch**

- [ ] Create GA4 property in Google Analytics
- [ ] Copy Measurement ID
- [ ] Update `GA_MEASUREMENT_ID` in `GoogleAnalytics.tsx`
- [ ] Test in development environment
- [ ] Verify events in DebugView
- [ ] Set up custom dimensions
- [ ] Mark conversion events
- [ ] Configure data retention

### **Post-Launch**

- [ ] Verify tracking in production
- [ ] Create custom reports
- [ ] Set up alerts for critical metrics
- [ ] Train team on GA4 dashboard
- [ ] Schedule weekly review meetings
- [ ] Document findings and insights

---

## 🚨 **TROUBLESHOOTING**

### **Events Not Showing in GA4**

**Check:**
1. Measurement ID is correct
2. No ad blockers enabled
3. Browser console for errors
4. DebugView for real-time events
5. Wait 24-48 hours for data to appear in standard reports

### **Duplicate Events**

**Cause:** Multiple GA4 scripts loaded

**Fix:**
- Check only one `GoogleAnalytics` component is mounted
- Remove any duplicate scripts in `index.html`

### **Missing Event Parameters**

**Check:**
- Parameter names match exactly
- Parameters are being passed correctly
- Custom dimensions are set up in GA4

---

## 📚 **ADDITIONAL RESOURCES**

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 Dashboard](https://analytics.google.com/)
- [Tag Assistant](https://tagassistant.google.com/)

---

## 📧 **SUPPORT**

For issues or questions:
1. Check this guide
2. Review GA4 documentation
3. Check browser console for errors
4. Contact development team

---

**Last Updated:** December 27, 2025  
**Version:** 1.0.0  
**MetroBuild QMS GA4 Implementation**
