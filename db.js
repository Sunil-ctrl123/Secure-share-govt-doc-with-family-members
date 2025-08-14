(function(){
  const { db, auth } = window.__APP__;

  function userDoc(){ return db.collection('users').doc(auth.currentUser.uid); }

  async function getProfile(){
    const snap = await userDoc().get();
    return snap.exists ? snap.data() : null;
  }

  async function updateProfile(data){
    await userDoc().set(data, { merge:true });
    await Logger.log('PROFILE_UPDATE', {});
  }

  async function saveDocument(meta){
    const payload = {
      ...meta,
      owner: auth.currentUser.uid,
      sharedWith: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    const ref = await db.collection('documents').add(payload);
    await Logger.log('DOC_SAVED', { id: ref.id });
    return ref.id;
  }

  async function listMyDocuments(){
    const qs = await db.collection('documents').where('owner','==',auth.currentUser.uid).orderBy('createdAt','desc').get();
    return qs.docs.map(d => ({ id:d.id, ...d.data() }));
  }

  async function addShare(docId, emails){
    const ref = db.collection('documents').doc(docId);
    await ref.update({ sharedWith: firebase.firestore.FieldValue.arrayUnion(...emails) });
    await Logger.log('DOC_SHARED', { docId, emails });
  }

  window.DB = { getProfile, updateProfile, saveDocument, listMyDocuments, addShare };
})();
