import * as bootstrap from "bootstrap";
window.onload = () => {
  detectOS(), validate();
};

var url = "";
var urlDownload = "";
var osName = "Unknown OS";
var os = null;
var systemSelector = document
  .getElementById("sysSelector")
  .querySelectorAll("a");

var configMenu = document.getElementById("list-config-list");
var installMenu = document.getElementById("list-install-list");

document.getElementById("resetOS").onclick = resetOS;
document.getElementById("download").onclick = download;
systemSelector.forEach((button) => {
  button.addEventListener("click", () => {
    selectOS(button);
  });
});

document.getElementById("list-os-list").addEventListener("click", () => {
  configMenu.classList.add("disabled");
  installMenu.classList.add("disabled");
});

function detectOS() {
  if (navigator.appVersion.indexOf("Win") != -1)
    (osName = "Windows"), (os = "win");
  if (navigator.appVersion.indexOf("Mac") != -1)
    (osName = "MacOS"), (os = "mac");
  //   if (navigator.appVersion.indexOf("X11") != -1)
  //     (osName = "UNIX"), (os = "unix");
  //   if (navigator.appVersion.indexOf("Linux") != -1)
  //     (osName = "Linux"), (os = "lin");

  document.getElementById("sys").innerHTML = osName;

  if (os != null) {
    document
      .getElementById("sysSelector")
      .querySelectorAll("a")
      .forEach((button) => {
        if (button.id != os) button.classList.add("disabled");
      });
  }
}

function selectOS(button) {
  os = button.id;
  osName = button.innerHTML;
  document.getElementById("sys").innerHTML = osName;
  document.getElementById("os").innerHTML = osName;

  configMenu.classList.remove("disabled");

  var config = new bootstrap.Tab(
    document.querySelector('#configurator a[href="#list-config"]')
  );
  config.show();
}

function resetOS() {
  systemSelector.forEach((button) => {
    button.classList.remove("disabled");
  });
}

function generate(mID, mPass) {
  installMenu.classList.remove("disabled");
  url = "zoommtg://zoom.us/join?confno=" + mID + "&pwd=" + mPass;
  urlDownload = "zoommtg://zoom.us/join?confno=" + mID + "&amp;pwd=" + mPass;
  var link = document.createElement("a");
  link.href = url;
  link.textContent = url;

  document.getElementById("link").innerHTML = "";
  document.getElementById("link").appendChild(link);

  var install = new bootstrap.Tab(
    document.querySelector('#configurator a[href="#list-install"]')
  );
  install.show();
}

function download() {
  var filename = "pleaseRenameMe.inetloc";

  var xmltext =
    "<?xml version='1.0' encoding='UTF-8'?>" +
    "<!DOCTYPE plist PUBLIC '-//Apple//DTD PLIST 1.0//EN' 'http://www.apple.com/DTDs/PropertyList-1.0.dtd'>" +
    "<plist version='1.0'><dict><key>URL</key><string>" +
    urlDownload +
    "</string></dict></plist>";

  if (os == "win") {
    filename = "pleaseRenameMe.url";
    xmltext = "[InternetShortcut] \nURL=" + urlDownload;
  }

  var link = document.createElement("a");
  var blobUrl = new Blob([xmltext], { type: "text/xml" });

  link.setAttribute("href", window.URL.createObjectURL(blobUrl));
  link.setAttribute("download", filename);

  link.dataset.downloadurl = ["text/xml", link.download, link.href].join(":");
  link.draggable = true;
  link.classList.add("dragout");

  link.click();
}

function validate() {
  "use strict";

  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          generate(forms[0][0].value, forms[0][1].value);
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
}
