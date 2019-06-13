import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-encryption-anim",
  templateUrl: "./encryption-anim.component.html",
  styleUrls: ["./encryption-anim.component.scss"]
})
export class EncryptionAnimComponent implements OnInit {
  // Credit Reference: https://codepen.io/Kolefn/pen/yoBmxd

  value: string;
  constructor() {}

  ngOnInit() {}

  decrypt(i, max, value, input:HTMLInputElement) {
    var inp = input;
    var possible = "~`+-/|=_.,!@#$%^&*><?";
    var encrypted = "";
    for (var c = 0; c < max - i; c++) {
      var newChar = possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
      encrypted += newChar;
    }

    var newValue = encrypted + value.substr(max - i);
    if (i <= max) {
      setTimeout(function() {
        i++;
        inp.value = newValue;
        this.decrypt(i, max, value);
      }, 100);
    }
  }

  encrypt(i, max, value, callback, input:HTMLInputElement) {
    var inp = input;
    var possible = "~`+-/|=_.,!@#$%^&*><?";
    var encrypted = "";
    for (var c = 0; c < i; c++) {
      var newChar = possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
      encrypted += newChar;
    }

    var newValue = encrypted + value.substr(i + 1);
    if (i <= max) {
      setTimeout(function() {
        i++;
        inp.value = newValue;
        this.encrypt(i, max, value, callback);
      }, 100);
    } else {
      callback();
    }
  }
}
