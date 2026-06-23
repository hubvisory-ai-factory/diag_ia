(function () {
  if (!location.hostname.startsWith('staging.')) return;

  var banner = document.createElement('div');
  banner.id = 'diag-ia-staging-banner';
  banner.setAttribute('role', 'status');
  banner.textContent =
    'Prévisualisation — cette version n\u2019est pas la version client finale.';

  banner.style.cssText =
    'position:fixed;top:0;left:0;right:0;z-index:99999;' +
    'padding:8px 16px;text-align:center;' +
    'font:600 13px/1.4 Inter,system-ui,sans-serif;' +
    'color:#fff;background:#b45309;' +
    'box-shadow:0 1px 4px rgba(0,0,0,.15);';

  function mount() {
    document.body.prepend(banner);
    document.body.style.paddingTop = banner.offsetHeight + 4 + 'px';
  }

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
