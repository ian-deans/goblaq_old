import firebase from "./firebase";

class ErrorLogger {
  ref: any;

  constructor() {
    this.ref = firebase.firestore.collection("errors_dev");
    this.log = this.log.bind(this);
  }

  log(error) {
    const data = {
      code: error.code || "500",
      message: error.message || "Unknown Error",
      timestamp: Date.now(),
      detail: JSON.stringify(error),
    };
    this.ref.add(data).catch(error => console.error("Error in error loggin."));
  }
}

export default new ErrorLogger();
