// Floating "Chat with us" bubble for traxn.in / traxncargo-landing.
//
// Click the bubble → an iframe modal slides in from the right with the
// Infocomiva estimator chat widget inside (email + OTP + scoping
// wizard + live admin handoff). Same Super Admin queue regardless of
// the brand, but the visitor stays on the traxn.in domain instead of
// being kicked out to another tab.
//
// Pure-DOM, no framework. Inline styles so it works on every page
// without depending on Tailwind being loaded.

(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Auto-hide on chat / estimator paths so we don't show a bubble next
  // to the chat panel once we ship a native route on traxn.in.
  var path = (location.pathname || '').replace(/\/+$/, '');
  if (path === '/estimator' || path.endsWith('/estimator') || path === '/chat' || path.endsWith('/chat')) return;

  // Source of the embedded chat. The Infocomiva estimator is the live
  // chat backend today; swap to a traxn.in route when we port it.
  var CHAT_URL = 'https://infocomiva.live/estimator';

  var btn = null;
  var overlay = null;
  var modal = null;

  function ensureModal() {
    if (overlay) return;

    // Dim backdrop. Clicking it closes the chat.
    overlay = document.createElement('div');
    overlay.id = 'traxn-chat-overlay';
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'background:rgba(15,23,42,.55)',
      'opacity:0',
      'transition:opacity .2s ease',
      'z-index:9998',
      'display:none',
    ].join(';');
    overlay.addEventListener('click', closeChat);

    // The chat panel itself — right-aligned card with a close button
    // and an iframe filling the body.
    modal = document.createElement('div');
    modal.id = 'traxn-chat-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Chat with TraxnCargo');
    modal.style.cssText = [
      'position:fixed',
      'right:20px',
      'bottom:20px',
      'top:20px',
      'width:420px',
      'max-width:calc(100vw - 40px)',
      'max-height:calc(100vh - 40px)',
      'background:#fff',
      'border-radius:16px',
      'box-shadow:0 30px 80px rgba(15,23,42,.35), 0 8px 24px rgba(0,0,0,.18)',
      'overflow:hidden',
      'transform:translateY(20px)',
      'opacity:0',
      'transition:transform .25s ease, opacity .25s ease',
      'z-index:9999',
      'display:none',
      'flex-direction:column',
    ].join(';');

    var close = document.createElement('button');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close chat');
    close.innerHTML = '×';
    close.style.cssText = [
      'position:absolute',
      'top:8px',
      'right:10px',
      'z-index:2',
      'width:32px',
      'height:32px',
      'border:0',
      'border-radius:9999px',
      'background:rgba(15,23,42,.65)',
      'color:#fff',
      'font-size:22px',
      'line-height:1',
      'cursor:pointer',
      'display:inline-flex',
      'align-items:center',
      'justify-content:center',
      'box-shadow:0 4px 10px rgba(0,0,0,.25)',
    ].join(';');
    close.addEventListener('click', closeChat);

    var iframe = document.createElement('iframe');
    iframe.id = 'traxn-chat-iframe';
    iframe.title = 'Chat with TraxnCargo';
    iframe.src = CHAT_URL;
    iframe.loading = 'lazy';
    iframe.style.cssText = [
      'flex:1',
      'border:0',
      'width:100%',
      'height:100%',
      'background:#fff',
    ].join(';');

    modal.appendChild(close);
    modal.appendChild(iframe);
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
  }

  function openChat() {
    ensureModal();
    overlay.style.display = 'block';
    modal.style.display = 'flex';
    // Force reflow so the opacity transition fires from the just-set
    // display:block state.
    void overlay.offsetWidth;
    overlay.style.opacity = '1';
    modal.style.opacity = '1';
    modal.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden';
  }

  function closeChat() {
    if (!overlay) return;
    overlay.style.opacity = '0';
    modal.style.opacity = '0';
    modal.style.transform = 'translateY(20px)';
    document.body.style.overflow = '';
    setTimeout(function () {
      if (!overlay) return;
      overlay.style.display = 'none';
      modal.style.display = 'none';
    }, 220);
  }

  function mount() {
    if (document.getElementById('traxn-chat-bubble')) return;

    btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'traxn-chat-bubble';
    btn.setAttribute('aria-label', 'Open chat with TraxnCargo');
    btn.style.cssText = [
      'position:fixed',
      'right:20px',
      'bottom:20px',
      'z-index:9997',
      'display:inline-flex',
      'align-items:center',
      'gap:10px',
      'padding:14px 18px',
      'border:0',
      'border-radius:9999px',
      // TraxnCargo brand blue (#1d9bf0) — matches the "Cargo" wordmark.
      'background:#1d9bf0',
      'color:#fff',
      'font-family:Inter,system-ui,sans-serif',
      'font-weight:700',
      'font-size:14px',
      'line-height:1',
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
    btn.addEventListener('click', openChat);

    document.body.appendChild(btn);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay && overlay.style.display === 'block') closeChat();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
