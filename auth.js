(function(){
  const { auth, db } = window.__APP__;

  function requireAuth(){
    auth.onAuthStateChanged(user => {
      const protectedPages = ['dashboard.html','upload.html','share.html','profile.html'];
      const page = location.pathname.split('/').pop();
      if(protectedPages.includes(page) && !user){ location.href='login.html'; }
    });
  }

  async function register(email, password, name, aadhaar){
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection('users').doc(cred.user.uid).set({
      name, email, aadhaar, createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    await Logger.log('REGISTER', { aadhaar });
    return cred.user;
  }

  async function login(email, password){
    const u = await auth.signInWithEmailAndPassword(email, password);
    await Logger.log('LOGIN', {});
    return u.user;
  }

  function logout(){ return auth.signOut(); }

  window.Auth = { requireAuth, register, login, logout };
})();
