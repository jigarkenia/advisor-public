
(function () {
  const HEADER_HTML = `
    <div class="container">
      <a href="/" class="wordmark">Labour Codes <span>Advisor</span></a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">&#9776;</button>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="/tools/">Calculators</a>
        <a href="/minimum-wages/">Minimum Wages</a>
        
        <!-- Premium Mega-Dropdown for Resources & Compliance Assets -->
        <div class="nav-dropdown" id="resourcesDropdown">
          <button class="dropdown-trigger" aria-haspopup="true" aria-expanded="false">
            Resources <span class="chevron">▾</span>
          </button>
          <div class="dropdown-menu">
            <div class="dropdown-grid">
              
              <!-- Column 1: Quick Reference Rates -->
              <div class="dropdown-col">
                <span class="dropdown-heading">Quick Reference Rates</span>
                <a href="/resources/lwf-rates/" class="dropdown-link">
                  <strong>LWF Rates</strong>
                  <span class="dropdown-desc">State-wise Labour Welfare Fund rates</span>
                </a>
                <a href="/resources/pan-india-pt-rates/" class="dropdown-link">
                  <strong>Professional Tax</strong>
                  <span class="dropdown-desc">State-wise PT slabs and rate cards</span>
                </a>
                <a href="/resources/working-hours/" class="dropdown-link">
                  <strong>Working Hours</strong>
                  <span class="dropdown-desc">State-wise statutory working hour rules</span>
                </a>
              </div>
              
              <!-- Column 2: Compliance Library -->
              <div class="dropdown-col">
                <span class="dropdown-heading">Compliance Library</span>
                <a href="/library/register-formats/" class="dropdown-link">
                  <strong>Register Formats</strong>
                  <span class="dropdown-desc">Downloadable statutory register formats</span>
                </a>
                <a href="/library/labour-codes/" class="dropdown-link">
                  <strong>Labour Code Downloads</strong>
                  <span class="dropdown-desc">Full official text, rules, and gazettes</span>
                </a>
                <a href="/library/state-rules/" class="dropdown-link">
                  <strong>Labour Rules & Acts</strong>
                  <span class="dropdown-desc">State-wise notified rules and implementations</span>
                </a>
                <a href="/library/audit-checklists/" class="dropdown-link">
                  <strong>Audit Checklists</strong>
                  <span class="dropdown-desc">Compliance checklists for statutory audits</span>
                </a>
              </div>
              
              <!-- Column 3: Legal Helpers -->
              <div class="dropdown-col">
                <span class="dropdown-heading">Legal Helpers</span>
                <a href="/glossary/" class="dropdown-link">
                  <strong>Glossary</strong>
                  <span class="dropdown-desc">Plain-language labour law terms & definitions</span>
                </a>
              </div>
              
            </div>
          </div>
        </div>
        
        <a href="/blog/">Blog</a>
        <a href="/about/">About</a>
      </nav>
    </div>
  `;

  const FOOTER_HTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Labour Codes Advisor</h4>
          <p>Plain-language guides, free calculators, and statutory compliance resources for India's 4 New Labour Codes — built for HR professionals and business owners.</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <a href="/tools/">Calculators</a>
          <a href="/minimum-wages/">Minimum Wages</a>
          <a href="/resources/pan-india-pt-rates/">Professional Tax Slabs</a>
          <a href="/glossary/">Labour Law Glossary</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="/about/">About Us</a>
          <a href="/blog/">Blog & Updates</a>
          <a href="/faq/">FAQ Hub</a>
          <a href="/contact/">Contact Us</a>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <a href="/privacy/">Privacy Policy</a>
          <a href="/terms/">Terms of Use</a>
          <a href="/disclaimer/">Legal Disclaimer</a>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; <span id="copyright-year"></span> labourcodesadvisor.com | Designed for 2026 Compliance. Information provided is for general guidance only and does not constitute formal legal advice.
      </div>
    </div>
  `;

  const SITE_URL = 'https://labourcodesadvisor.com';
  const SITE_NAME = 'Labour Codes Advisor';

  const SEGMENT_LABELS = {
    'tools': 'Tools',
    'gratuity-calculator': 'Gratuity Calculator',
    'epf-calculator': 'EPF Calculator',
    'esi-calculator': 'ESI Calculator',
    'ctc-calculator': 'CTC Calculator',
    'bonus-calculator': 'Bonus Calculator',
    'professional-tax': 'Professional Tax',
    'minimum-wages': 'Minimum Wages',
    'library': 'Library',
    'labour-codes': 'Labour Codes Full Text',
    'state-rules': 'State Rules',
    'register-formats': 'Register Formats',
    'hr-letters': 'HR Letters',
    'audit-checklists': 'Audit Checklists',
    'resources': 'Resources',
    'pan-india-pt-rates': 'PAN India PT Rates',
    'lwf-rates': 'LWF Rates',
    'working-hours': 'Working Hours',
    'glossary': 'Glossary',
    'blog': 'Blog',
    'about': 'About',
    'faq': 'FAQ',
    'contact': 'Contact'
  };

  function injectSchema() {
    const path = window.location.pathname;
    const schemas = [];

    // Organization & WebSite schemas on Homepage
    if (path === '/' || path === '/index.html') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL + '/',
        description: "Free tools and plain-language compliance guides for India's 4 New Labour Codes.",
        areaServed: 'IN'
      });
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL + '/'
      });
    } else {
      // Dynamic, automated Breadcrumb injection based on URL segments
      const segments = path.split('/').filter(Boolean);
      const itemListElement = [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' }
      ];
      
      let cumulativePath = '';
      segments.forEach(function (seg, i) {
        cumulativePath += '/' + seg;
        const label = SEGMENT_LABELS[seg] || (seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '));
        itemListElement.push({
          '@type': 'ListItem',
          position: i + 2,
          name: label,
          item: SITE_URL + cumulativePath + '/'
        });
      });

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: itemListElement
      });
    }

    schemas.forEach(function (schemaObj) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });
  }

  function injectLayout() {
    injectSchema();
    const headerMount = document.getElementById('site-header');
    const footerMount = document.getElementById('site-footer');

    if (headerMount) {
      headerMount.classList.add('site-header');
      headerMount.innerHTML = HEADER_HTML;

      const path = window.location.pathname;

      // Handle active state highlights on direct main-nav anchors
      headerMount.querySelectorAll('.main-nav > a').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href !== '/' && path.startsWith(href)) {
          link.classList.add('active');
        } else if (href === '/' && path === '/') {
          link.classList.add('active');
        }
      });

      // Handle active states on dropdown sub-links, highlighting the trigger
      let anySubLinkActive = false;
      headerMount.querySelectorAll('.dropdown-link').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href && path.startsWith(href)) {
          link.classList.add('active');
          anySubLinkActive = true;
        }
      });

      if (anySubLinkActive) {
        const trigger = headerMount.querySelector('.dropdown-trigger');
        if (trigger) trigger.classList.add('active');
      }

      // Toggle Mobile Hamburg menu
      const toggle = headerMount.querySelector('.nav-toggle');
      const nav = headerMount.querySelector('.main-nav');
      if (toggle && nav) {
        toggle.addEventListener('click', function (e) {
          e.stopPropagation();
          const isOpen = nav.classList.toggle('open');
          toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      }

      // Configure touch-friendly interactions for resources dropdown (especially critical for iPads & phones)
      const dropdown = headerMount.querySelector('.nav-dropdown');
      const trigger = headerMount.querySelector('.dropdown-trigger');

      if (trigger && dropdown) {
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          const isOpened = dropdown.classList.contains('open');
          
          // Toggle current trigger
          dropdown.classList.toggle('open', !isOpened);
          trigger.setAttribute('aria-expanded', !isOpened ? 'true' : 'false');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function () {
          dropdown.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        });
      }
    }

    if (footerMount) {
      footerMount.classList.add('site-footer');
      footerMount.innerHTML = FOOTER_HTML;
      const yearEl = footerMount.querySelector('#copyright-year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
  }

  // Self-initializing lifecycle management
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectLayout);
  } else {
    injectLayout();
  }
})();
