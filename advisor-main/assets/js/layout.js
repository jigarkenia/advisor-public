/* ============================================
   LABOUR CODES ADVISOR — GLOBAL HEADER + FOOTER
   Handles UI injection, mobile nav, mega-dropdown,
   library sidebar injection, and JSON-LD Schema.
   ============================================ */

(function () {
  const HEADER_HTML = `
    <div class="container">
      <a href="/" class="wordmark">Labour Codes <span>Advisor</span></a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">&#9776;</button>
      
      <nav class="main-nav" aria-label="Main navigation">
        <a href="/tools/">Calculators</a>
        <a href="/minimum-wages/">Minimum Wages</a>
        
        <div class="nav-dropdown">
          <button class="dropdown-trigger" aria-haspopup="true" aria-expanded="false">
            Library & Resources <span class="chevron">▾</span>
          </button>
          
          <div class="dropdown-menu">
            <div class="dropdown-grid">
              <div class="dropdown-col">
                <span class="dropdown-heading">Compliance Library</span>
                <a href="/library/labour-codes/" class="dropdown-link"><strong>Labour Codes</strong><span class="dropdown-desc">Full text & gazettes</span></a>
                <a href="/library/state-rules/" class="dropdown-link"><strong>State Rules</strong><span class="dropdown-desc">State-wise notifications</span></a>
                <a href="/library/register-formats/" class="dropdown-link"><strong>Register Formats</strong><span class="dropdown-desc">Downloadable templates</span></a>
                <a href="/library/audit-checklists/" class="dropdown-link"><strong>Audit Checklists</strong><span class="dropdown-desc">Compliance audit tools</span></a>
                <a href="/library/holiday-calendar/" class="dropdown-link"><strong>Holiday Calendar</strong><span class="dropdown-desc">State-wise official holidays</span></a>
              </div>
              <div class="dropdown-col">
                <span class="dropdown-heading">Quick Reference</span>
                <a href="/resources/pan-india-pt-rates/" class="dropdown-link"><strong>Professional Tax</strong><span class="dropdown-desc">State-wise PT slabs</span></a>
                <a href="/resources/lwf-rates/" class="dropdown-link"><strong>LWF Rates</strong><span class="dropdown-desc">State-wise Labour Welfare Fund</span></a>
                <a href="/resources/working-hours/" class="dropdown-link"><strong>Working Hours</strong><span class="dropdown-desc">Statutory state rules</span></a>
              </div>
              <div class="dropdown-col">
                <span class="dropdown-heading">Learn</span>
                <a href="/glossary/" class="dropdown-link"><strong>Glossary</strong><span class="dropdown-desc">Labour law definitions</span></a>
                <a href="/faq/" class="dropdown-link"><strong>FAQ</strong><span class="dropdown-desc">Common compliance questions</span></a>
              </div>
            </div>
          </div>
        </div>
        
        <a href="/blog/">Blog</a>
      </nav>
    </div>
  `;

  const FOOTER_HTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Labour Codes Advisor</h4>
          <p>Plain-language guides, free calculators, and compliance resources for India's 4 New Labour Codes — built for HR professionals and business owners.</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <a href="/tools/">Calculators</a>
          <a href="/minimum-wages/">Minimum Wages</a>
          <a href="/library/">Library</a>
          <a href="/glossary/">Glossary</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="/about/">About</a>
          <a href="/blog/">Blog</a>
          <a href="/faq/">FAQ</a>
          <a href="/contact/">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <a href="/privacy/">Privacy Policy</a>
          <a href="/terms/">Terms of Use</a>
          <a href="/disclaimer/">Disclaimer</a>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; <span id="copyright-year"></span> labourcodesadvisor.com — Information provided is for general guidance only and does not constitute legal advice.
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
    'labour-codes': 'Labour Codes',
    'state-rules': 'State Rules',
    'register-formats': 'Register Formats',
    'hr-letters': 'HR Letters',
    'audit-checklists': 'Audit Checklists',
    'holiday-calendar': 'Holiday Calendar',
    'resources': 'Resources',
    'pan-india-pt-rates': 'Pan-India PT Rates',
    'lwf-rates': 'LWF Rates',
    'working-hours': 'Working Hours',
    'glossary': 'Glossary',
    'blog': 'Blog',
    'about': 'About',
    'faq': 'FAQ',
    'contact': 'Contact'
  };

  const LIBRARY_SECTIONS = [
    {
      title: "Compliance Library",
      links: [
        { href: "/library/labour-codes/", text: "Labour Codes" },
        { href: "/library/state-rules/", text: "State Rules" },
        { href: "/library/register-formats/", text: "Register Formats" },
        { href: "/library/audit-checklists/", text: "Audit Checklists" },
        { href: "/library/holiday-calendar/", text: "Holiday Calendar" }
      ]
    },
    {
      title: "Quick Reference",
      links: [
        { href: "/resources/pan-india-pt-rates/", text: "PT Rates" },
        { href: "/resources/lwf-rates/", text: "LWF Rates" },
        { href: "/minimum-wages/", text: "Minimum Wages" }
      ]
    }
  ];

  function injectSchema() {
    const path = window.location.pathname;
    const schemas = [];

    if (path === '/' || path === '/index.html') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL + '/',
        description: "Free tools and plain-language guides for India's 4 New Labour Codes.",
        areaServed: 'IN'
      });
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL + '/'
      });
    } else {
      const segments = path.split('/').filter(Boolean);
      const itemListElement = [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' }
      ];

      let cumulativePath = '';
      segments.forEach(function (seg, i) {
        seg = seg.replace('.html', '');
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

  function injectLibrarySidebar() {
    const contentContainer = document.getElementById('library-content');
    if (!contentContainer) return; // Only execute on pages that need the sidebar

    const path = window.location.pathname;
    let sidebarHTML = '<aside class="lib-sidebar"><div class="lib-sidebar-inner">';

    LIBRARY_SECTIONS.forEach(function(section) {
      sidebarHTML += '<div class="lib-sidebar-title">' + section.title + '</div>';
      section.links.forEach(function(link) {
        const isActive = path.startsWith(link.href) ? 'active' : '';
        sidebarHTML += '<a href="' + link.href + '" class="lib-sidebar-link ' + isActive + '">' + link.text + '</a>';
      });
    });

    sidebarHTML += '</div></aside>';

    // Wrap the existing content inside the library grid layout
    const existingContent = contentContainer.innerHTML;
    contentContainer.className = 'lib-layout';
    contentContainer.innerHTML = sidebarHTML + '<div class="lib-main">' + existingContent + '</div>';
  }

  function injectLayout() {
    injectSchema();
    injectLibrarySidebar();

    const headerMount = document.getElementById('site-header');
    const footerMount = document.getElementById('site-footer');

    if (headerMount) {
      headerMount.classList.add('site-header');
      headerMount.innerHTML = HEADER_HTML;

      const path = window.location.pathname;
      
      // Highlight active primary nav links
      headerMount.querySelectorAll('.main-nav > a').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href !== '/' && path.startsWith(href)) {
          link.classList.add('active');
        } else if (href === '/' && path === '/') {
          link.classList.add('active');
        }
      });

      // Highlight active dropdown links
      headerMount.querySelectorAll('.dropdown-link').forEach(function (link) {
        const href = link.getAttribute('href');
        if (path.startsWith(href)) {
          link.classList.add('active');
          link.closest('.nav-dropdown').querySelector('.dropdown-trigger').classList.add('active');
        }
      });

      // Mobile Hamburger Toggle
      const toggle = headerMount.querySelector('.nav-toggle');
      const nav = headerMount.querySelector('.main-nav');

      if (toggle && nav) {
        toggle.addEventListener('click', function () {
          const isOpen = nav.classList.toggle('open');
          toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      }

      // Mega-Dropdown Toggle
      const dropdown = headerMount.querySelector('.nav-dropdown');
      const dropTrigger = headerMount.querySelector('.dropdown-trigger');
      
      if (dropTrigger && dropdown) {
        dropTrigger.addEventListener('click', function (e) {
          e.stopPropagation(); 
          const isOpen = dropdown.classList.toggle('open');
          dropTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      }

      // Close dropdown if clicking outside
      window.addEventListener('click', function (e) {
        if (dropdown && !dropdown.contains(e.target)) {
          dropdown.classList.remove('open');
          if(dropTrigger) dropTrigger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    if (footerMount) {
      footerMount.classList.add('site-footer');
      footerMount.innerHTML = FOOTER_HTML;
      const yearEl = footerMount.querySelector('#copyright-year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
  }

  // Execute
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectLayout);
  } else {
    injectLayout();
  }
})();
