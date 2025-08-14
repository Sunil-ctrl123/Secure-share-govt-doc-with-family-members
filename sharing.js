(function(){
  async function shareWithEmails(docId, emails){
    if(!docId) throw new Error('Document ID required');
    if(!emails?.length) throw new Error('Provide at least one email');
    await DB.addShare(docId, emails);
  }
  window.Sharing = { shareWithEmails };
})();
