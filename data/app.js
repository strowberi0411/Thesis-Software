(function(){
  var root = document.documentElement;
  var shell = document.querySelector('.shell');
  var moonPath = '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>';
  var sunPath = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';

  function applyTheme(t){
    var dark = t === 'dark';
    if(dark){ root.setAttribute('data-theme','dark'); } else { root.removeAttribute('data-theme'); }
    document.querySelectorAll('.js-theme-label').forEach(function(l){ l.textContent = dark ? 'Dark mode' : 'Light mode'; });
    document.querySelectorAll('.js-theme-icon').forEach(function(i){ i.innerHTML = dark ? moonPath : sunPath; });
  }
  var saved = 'light';
  try { saved = localStorage.getItem('mangosense-theme') || 'light'; } catch(e){}
  applyTheme(saved);

  document.querySelectorAll('.js-theme-toggle').forEach(function(btn){
    btn.addEventListener('click', function(){
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('mangosense-theme', next); } catch(e){}
    });
  });

  function goto(pageId){
    document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
    document.querySelectorAll('.nav-link').forEach(function(n){ n.classList.remove('active'); });
    document.getElementById('page-' + pageId).classList.add('active');
    var navBtn = document.querySelector('.nav-link[data-page="' + pageId + '"]');
    if(navBtn) navBtn.classList.add('active');
    shell.classList.toggle('chrome-hidden', pageId === 'landing' || pageId === 'remote');
    window.scrollTo(0,0);
  }
  document.querySelectorAll('.nav-link').forEach(function(n){
    n.addEventListener('click', function(){ goto(n.getAttribute('data-page')); });
  });
  document.querySelectorAll('[data-goto]').forEach(function(b){
    b.addEventListener('click', function(){ goto(b.getAttribute('data-goto')); });
  });
})();