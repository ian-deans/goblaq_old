import btoa from "btoa";
import fetch from "isomorphic-unfetch";

const configuration = {
  apiKey: "4150de0906b2e01661030d8a294f7f62-us12",
  listID_business: "540b068fae",
  listID_subscriber: "e5420d6327",
};

export class MailChimpAPI {
  private apiKey: string;
  private authKey: string;
  private dc: string;
  private authString: string;
  private listID_business: string;
  private listID_subscriber: string;
  private baseURL: string;
  private listURL_business: string;
  private listURL_subscriber: string;

  constructor(config) {
    this.apiKey = config.apiKey;
    this.listID_business = config.listID_business;
    this.listID_subscriber = config.listID_subscriber;

    this.init();

    this.postToList = this.postToList.bind(this);
    this.addToBusinessList = this.addToBusinessList.bind(this);
    this.addToSubscriberList = this.addToSubscriberList.bind(this);
  }

  init() {
    this.dc = this.apiKey.split("-")[1];
    this.authKey = this.apiKey.split("-")[0];
    this.baseURL = `https://${this.dc}.api.mailchimp.com/3.0`;
    this.authString = btoa(`anystring:${this.authKey}`);
    this.listURL_business = `${this.baseURL}/lists/${this.listID_business}/members`;
    this.listURL_subscriber = `${this.baseURL}/lists/${this.listID_subscriber}/members`;
  }

  postToList(url, entryData) {
    return fetch(url, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + this.authString,
      },
      body: JSON.stringify(entryData),
    });
  }

  addToBusinessList(entryData) {
    return this.postToList(this.listURL_business, entryData);
  }

  addToSubscriberList(entryData) {
    return this.postToList(this.listURL_subscriber, entryData);
  }
}

export default new MailChimpAPI(configuration);

// fetch("https://us12.api.mailchimp.com/3.0/lists/e5420d6327/members", {
//   method: "POST",
//   mode: "no-cors",
//   headers: {
//     "content-type": "application/json",
//     "authorization": "Basic 4150de0906b2e01661030d8a294f7f62-us12",
//     body: JSON.stringify({
//       email: "testfrom@console.com",
//       status: "subscribed",
//     }),
//   },
// })
//   .then(response => response.json())
//   .then(thing => console.log(thing))
//   .catch( console.error );
