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
  checkExist = (value, errorId, mess) => {};
}
