export const useCookies = () => ({
  setToken: (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=Token ' + cvalue + ';' + expires + ';path=/';
    // console.log('cookie armazenado: ', document.cookie);
  },

  deleteToken: () => {
    document.cookie = 'Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log('cookie deletado: ', document.cookie);
  }
});
