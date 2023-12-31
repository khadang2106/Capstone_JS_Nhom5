export class Validation {
  checkEmpty = (value, errorId, mess) => {
    if (value.trim() === '') {
      showError(errorId, mess);
      return false;
    }

    hideError(errorId);
    return true;
  };

  checkSelc = (selcID, errorID, mess) => {
    if (domId(selcID).selectedIndex !== 0) {
      hideError(errorID);
      return true;
    }
    showError(errorID, mess);
    return false;
  };

  checkPattern = (value, pattern, errorId, mess) => {
    if (value.match(pattern)) {
      hideError(errorId);
      return true;
    }

    showError(errorId, mess);
    return false;
  };

  checkLength = (value, errorID, mess, max, min = 1) => {
    if (
      min <= value.trim().replace(/\s/g, '').length &&
      value.trim().replace(/\s/g, '').length <= max
    ) {
      hideError(errorID);
      return true;
    }

    showError(errorID, mess);
    return false;
  };

  checkLimit = (value, errorID, mess, max, min = 1) => {
    if (min <= value && value <= max) {
      hideError(errorID);
      return true;
    }

    showError(errorID, mess);
    return false;
  };

  checkCamResoLimit = (value, errorID, mess, max, min = 1) => {
    const matches = value.match(/(\d*\.)?\d+/gm);

    let check = true;
    matches.forEach((element) => {
      check &= this.checkLimit(element, errorID, mess, max, min);
    });

    if (check) {
      hideError(errorID);
      return check;
    } else {
      showError(errorID, mess);
      return check;
    }
  };

  checkExist = (value, errorId, mess) => {};
}
