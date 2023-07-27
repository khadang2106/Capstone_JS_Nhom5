export class Validation {
    checkEmpty = (value, errorId, mess) => {
      if (value.trim() === "") {
        document.getElementById(errorId).innerHTML = mess;
        document.getElementById(errorId).style.display = "block";
        return false;
      }
  
      document.getElementById(errorId).style.display = "none";
      return true;
    };
  }