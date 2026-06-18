/* ============================================
   LABOUR CODES ADVISOR — GLOBAL HEADER + FOOTER
   Edit this ONE file to update nav/footer on
   every page across the site.
   ============================================ */

(function () {

  const HEADER_HTML = `
    <div class="container">
      <a href="/" class="wordmark">Labour Codes <span>Advisor</span></a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">&#9776;</button>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="/tools/">Tools</a>
        <a href="/minimum-wages/">Minimum Wages</a>
        <a href="/library/">Library</a>
        <a href="/resources/">Resources</a>
        <a href="/glossary/">Glossary</a>
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

  // Friendly labels for breadcrumb segments — extend this as new sections are added
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
    'resources': 'Resources',
    'glossary': 'Glossary',
    'blog': 'Blog',
    'about': 'About',
    'faq': 'FAQ',
    'contact': 'Contact'
  };

  function injectSchema() {
    const path = window.location.pathname;
    const schemas = [];

    // Organization + WebSite schema — only on the homepage
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
      // Breadcrumb schema — every inner page, generated automatically from the URL
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

  const LIBRARY_SECTIONS = [
    { label: 'Holiday Calendar 2026', href: '/library/holiday-calendar/' },
    { label: 'Labour Codes — Full Text', href: '/library/labour-codes/' },
    { label: 'State-wise Rules', href: '/library/state-rules/' },
    { label: 'Register Formats', href: '/library/register-formats/' },
    { label: 'HR Letter Templates', href: '/library/hr-letters/' },
    { label: 'Audit Checklists', href: '/library/audit-checklists/' }
  ];

  function buildLibrarySidebarHtml(currentPath) {
    const items = LIBRARY_SECTIONS.map(function (sec) {
      const isActive = currentPath === sec.href || currentPath.startsWith(sec.href);
      return '<a href="' + sec.href + '" class="lib-sidebar-link' + (isActive ? ' active' : '') + '">' + sec.label + '</a>';
    }).join('');
    return (
      '<div class="lib-sidebar-inner">' +
        '<div class="lib-sidebar-title">Library</div>' +
        items +
      '</div>'
    );
  }

  function injectLibrarySidebar() {
    const path = window.location.pathname;
    if (!path.startsWith('/library/')) return;

    const contentMount = document.getElementById('library-content');
    if (!contentMount) return; // page hasn't opted into the sidebar layout

    // Wrap existing content in a flex layout with the sidebar
    const wrapper = document.createElement('div');
    wrapper.className = 'lib-layout';

    const sidebar = document.createElement('aside');
    sidebar.className = 'lib-sidebar';
    sidebar.innerHTML = buildLibrarySidebarHtml(path);

    const mainArea = document.createElement('div');
    mainArea.className = 'lib-main';
    while (contentMount.firstChild) {
      mainArea.appendChild(contentMount.firstChild);
    }

    wrapper.appendChild(sidebar);
    wrapper.appendChild(mainArea);
    contentMount.appendChild(wrapper);
  }

  function injectLayout() {
    injectSchema();

    const headerMount = document.getElementById('site-header');
    const footerMount = document.getElementById('site-footer');

    if (headerMount) {
      headerMount.classList.add('site-header');
      headerMount.innerHTML = HEADER_HTML;

      // Mark active nav link based on current path
      const path = window.location.pathname;
      headerMount.querySelectorAll('.main-nav a').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href !== '/' && path.startsWith(href)) {
          link.classList.add('active');
        } else if (href === '/' && path === '/') {
          link.classList.add('active');
        }
      });

      // Mobile nav toggle
      const toggle = headerMount.querySelector('.nav-toggle');
      const nav = headerMount.querySelector('.main-nav');
      if (toggle && nav) {
        toggle.addEventListener('click', function () {
          const isOpen = nav.classList.toggle('open');
          toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      }
    }

    if (footerMount) {
      footerMount.classList.add('site-footer');
      footerMount.innerHTML = FOOTER_HTML;
      const yearEl = footerMount.querySelector('#copyright-year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    injectLibrarySidebar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectLayout);
  } else {
    injectLayout();
  }

})();
