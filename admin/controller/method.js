const domId = (id) => document.getElementById(id);

const showError = (id, sentence) => {
  domId(id).innerHTML = sentence;
  domId(id).style.display = 'block';
};

const hideError = (id) => {
  domId(id).innerHTML = '';
  domId(id).style.display = 'none';
};

const resetError = () => {
  hideError('errorName');
  hideError('errorPrice');
  hideError('errorScreen');
  hideError('errorBackCam');
  hideError('errorFrontCam');
  hideError('errorImg');
  hideError('errorDesc');
  hideError('errorSelc');
};

const fillFormValues = (
  name = '',
  price = '',
  screen = '',
  backCamera = '',
  frontCamera = '',
  img = '',
  desc = '',
  type = 'Select brand'
) => {
  domId('phoneName').value = name;
  domId('phonePrice').value = price;
  domId('phoneScreen').value = screen;
  domId('phoneBackCam').value = backCamera;
  domId('phoneFrontCam').value = frontCamera;
  domId('phoneImg').value = img;
  domId('phoneDesc').value = desc;
  domId('selcBrand').value = type;
};

const resetFormValues = () => {
  const name = domId('phoneName').value;
  const price = domId('phonePrice').value;
  const screen = domId('phoneScreen').value;
  const backCamera = domId('phoneBackCam').value;
  const frontCamera = domId('phoneFrontCam').value;
  const img = domId('phoneImg').value;
  const desc = domId('phoneDesc').value;
  const type = domId('selcBrand').value;

  if (
    name !== '' &&
    price !== '' &&
    screen !== '' &&
    backCamera !== '' &&
    frontCamera !== '' &&
    img !== '' &&
    desc !== '' &&
    type !== 'Select brand'
  ) {
    fillFormValues();
  }
};
