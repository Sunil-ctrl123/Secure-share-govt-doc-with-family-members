window.UI = {
  flash(msg, kind){ 
    const n = document.createElement('div');
    n.className = 'flash' + (kind==='error' ? ' error' : '');
    n.textContent = msg;
    document.body.appendChild(n);
    setTimeout(()=> n.remove(), 3000);
  },
  copy(text){
    navigator.clipboard.writeText(text).then(()=>UI.flash('Copied'));
  }
};
