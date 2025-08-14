(function(){
  const { storage, auth } = window.__APP__;
  async function uploadFile(file){
    const path = `uploads/${auth.currentUser.uid}/${Date.now()}_${file.name}`;
    const ref = storage.ref().child(path);
    await ref.put(file);
    const url = await ref.getDownloadURL();
    return { url, filename: file.name };
  }
  window.StorageAPI = { uploadFile };
})();
