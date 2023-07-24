const domId = (id) => document.getElementById(id);

const showError = (id, sentence) => {
  domId(id).innerHTML = sentence;
  domId(id).style.display = 'block';
};

const hideError = (id) => {
  domId(id).innerHTML = '';
  domId(id).style.display = 'none';
};
