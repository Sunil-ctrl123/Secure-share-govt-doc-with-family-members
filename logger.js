(function(){
  const { auth, db } = window.__APP__;
  async function log(action, details={}){
    try{
      const user = auth.currentUser;
      await db.collection('logs').add({
        uid: user ? user.uid : null,
        email: user ? user.email : null,
        action, details,
        ts: firebase.firestore.FieldValue.serverTimestamp()
      });
    }catch(e){ console.warn('log err', e); }
  }
  window.Logger = { log };
})();
