class Auth {
  constructor() {
    document.querySelector('body').style.display = 'none';
    const auth = localStorage.getItem('auth');
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    this.validateAuth(auth, user);
  }

  validateAuth = (auth, user) => {
    if (auth != 1) {
      window.location.replace('/login/view/login.html?');
    } else {
      document.querySelector('body').style.display = 'block';
      const span_username = document.querySelector('#fullName');
      span_username.innerHTML = user.name;
    }
  };

  logOut() {
    Swal.fire({
      title: 'Are you sure?',
      width: 400,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        window.location.replace('/login/view/login.html?');
      }
    });
  }
}
