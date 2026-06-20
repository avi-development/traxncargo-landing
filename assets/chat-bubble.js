// Floating "Chat with us" bubble for traxn.in.
//
// Loaded site-wide via a Next.js <Script /> tag in src/app/layout.tsx.
// Clicking the bubble opens the existing Infocomiva live-chat estimator
// (https://infocomiva.live/estimator) in a new tab. Behind the scenes
// both brands route to the same Super Admin chat console, so a visitor
// from traxn.in lands in the same queue as a visitor from infocomiva.live
// — we just brand the bubble in TraxnCargo colors so it doesn't look like
// a third-party widget on the page.
//
// Pure-DOM, no framework, inline styles — works on every Next.js page
// without depending on Tailwind being loaded for the bubble itself.

(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Don't render the bubble on the chat page itself (if we ever ship a
  // native /chat or /estimator route on traxn.in, the bubble auto-hides
  // there so we don't show a "Chat with us" CTA next to the chat input).
  var path = (location.pathname || '').replace(/\/+$/, '');
  if (path === '/estimator' || path.endsWith('/estimator') || path === '/chat' || path.endsWith('/chat')) return;

  // Where the bubble navigates. Pointed at the Infocomiva estimator for
  // now since that's the working live-chat backend; flip to a native
  // /chat route once we port the estimator UI + API endpoints into
  // traxn-in itself.
  var CHAT_URL = 'https://infocomiva.live/estimator';

  function mount() {
    if (document.getElementById('traxn-chat-bubble')) return;

    var btn = document.createElement('a');
    btn.id = 'traxn-chat-bubble';
    btn.href = CHAT_URL;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.setAttribute('aria-label', 'Open live chat with TraxnCargo');
    btn.style.cssText = [
      'position:fixed',
      'right:20px',
      'bottom:20px',
      'z-index:9998',
      'display:inline-flex',
      'align-items:center',
      'gap:10px',
      'padding:14px 18px',
      'border-radius:9999px',
      // TraxnCargo brand blue. Login screen + sidebar use #1d9bf0 for the
      // "Cargo" word, so the bubble matches.
      'background:#1d9bf0',
      'color:#fff',
      'font-family:Inter,system-ui,sans-serif',
      'font-weight:700',
      'font-size:14px',
      'line-height:1',
      'text-decoration:none',
      'box-shadow:0 10px 28px rgba(29,155,240,.35), 0 2px 8px rgba(0,0,0,.18)',
      'cursor:pointer',
      'transition:transform .15s ease, box-shadow .15s ease, background .15s ease',
    ].join(';');

    btn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>' +
      '</svg>' +
      '<span>Chat with us</span>';

    btn.addEventListener('mouseenter', function () {
      btn.style.transform = 'translateY(-2px)';
      btn.style.background = '#0d8ce0';
      btn.style.boxShadow = '0 14px 34px rgba(29,155,240,.42), 0 3px 10px rgba(0,0,0,.22)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'translateY(0)';
      btn.style.background = '#1d9bf0';
      btn.style.boxShadow = '0 10px 28px rgba(29,155,240,.35), 0 2px 8px rgba(0,0,0,.18)';
    });

    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
