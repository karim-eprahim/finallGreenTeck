// get the reading from firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const appSettings = {
  databaseURL: "https://test-a17dc-default-rtdb.firebaseio.com/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
let sensorData = {};

function fetchData() {
  const sensorsRef = ref(database, "sensors");

  onValue(sensorsRef, (snapshot) => {
    sensorData = snapshot.val();
    getReading();
  });
}

fetchData();
setInterval(fetchData, 1000);

// Elements
let temperatureReading = document.querySelector(".temperature");
let lightReading = document.querySelector(".light");
let humidityReading = document.querySelector(".humidity");

function getReading() {
  let temperature = sensorData["temperature"];
  let humidity = sensorData["humidity"];
  let lightIntensity = sensorData["light-intensity"];
  let airquality = sensorData["airquality"];
  // setReading
  temperatureReading.innerHTML = `${temperature} <span class="fs-4">&#8451;</span>`;
  lightReading.innerHTML = `${lightIntensity} <span class="fs-4">&#8451;</span>`;
  humidityReading.innerHTML = `${humidity} <span class="fs-4">&#8451;</span>`;
}

// show and hide control
fetchControlData();
let controlData = {};

function fetchControlData() {
  const controlsRef = ref(database, "controls");

  onValue(controlsRef, (snapshot) => {
    controlData = snapshot.val();
    setDataControl();
  });
}

setInterval(fetchControlData, 1000);

function setDataControl() {
               // ............... 
               // for thermostat
               // .................. 

  if (controlData["thermostat"]["auto"] == true) {
    document.getElementById("thermo-auto").classList.add("active");
    document.getElementById("auto-btn").classList.add("show");
    document.getElementById("thermo-btn").classList.remove("show");
  } else {
    document.getElementById("thermo-manual").classList.add("active");
    document.getElementById("thermo-btn").classList.add("show");
    document.getElementById("auto-btn").classList.remove("show");
  }

  document.getElementById("thermo-auto").addEventListener("click", function (event) {
    event.preventDefault();
    // Auto True 
    const thermostatAutoValueRef = ref(database, "controls/thermostat/auto");
    set(thermostatAutoValueRef, true).then(() => {
      console.log("atuto:true");
    }).catch((error) => {
      console.error("Error updating 'auto' for 'thermostat'", error);
    });
    showAutoManulaContentThermo();
  });

  document.getElementById("thermo-manual").addEventListener("click", function (event) {
    event.preventDefault();
    // Auto false
    const thermostatAutoValueRef = ref(database, "controls/thermostat/auto");
    set(thermostatAutoValueRef, false).then(() => {
      console.log("Successfully updated 'auto' for 'thermostat' control to false.");
    }).catch((error) => {
      console.error("Error updating 'auto' for 'thermostat' control:", error);
    });
    showAutoManulaContentThermo();
  });

  // Event listener for the checkbox
  document.getElementById("thermostatSwitch").addEventListener("change", function () {
    const thermostatManualControlRef = ref(database, "controls/thermostat/manual-control");
    set(thermostatManualControlRef, document.getElementById("thermostatSwitch").checked).then(() => {
      console.log("Successfully updated 'manual-control' for 'thermostat' control.");
    }).catch((error) => {
      console.error("Error updating 'manual-control' for 'thermostat' control:", error);
    });
    thermoManual(); 
  });

  thermoManual(); 


          // ............... 
        // for light
        // ............... 



        if (controlData["light"]["auto"] == true) {
          document.getElementById("light-auto").classList.add("active");
          document.getElementById("auto-light-btn").classList.add("show");
          document.getElementById("light-btn").classList.remove("show");
        } else {
          document.getElementById("light-manual").classList.add("active");
          document.getElementById("light-btn").classList.add("show");
          document.getElementById("auto-light-btn").classList.remove("show");
        }
      
        document.getElementById("light-auto").addEventListener("click", function (event) {
          event.preventDefault();
          // Auto True 
          const lightstatAutoValueRef = ref(database, "controls/light/auto");
          set(lightstatAutoValueRef, true).then(() => {
            console.log("atuto:true");
          }).catch((error) => {
            console.error("Error updating 'auto' for 'thermostat'", error);
          });
          showAutoManulaContentLight();
        });
      
        document.getElementById("light-manual").addEventListener("click", function (event) {
          event.preventDefault();
          // Auto false
          const lightstatAutoValueRef = ref(database, "controls/light/auto");
          set(lightstatAutoValueRef, false).then(() => {
            console.log("Successfully updated 'auto' for 'thermostat' control to false.");
          }).catch((error) => {
            console.error("Error updating 'auto' for 'thermostat' control:", error);
          });
          showAutoManulaContentLight();
        });
      
        // Event listener for the checkbox
        document.getElementById("lightSwitch").addEventListener("change", function () {
          const thermostatManualControlRef = ref(database, "controls/light/manual-control");
          set(thermostatManualControlRef, document.getElementById("lightSwitch").checked).then(() => {
            console.log("Successfully updated 'manual-control' for 'light' control.");
          }).catch((error) => {
            console.error("Error updating 'manual-control' for 'light' control:", error);
          });
          lightManual(); 
        });
      
        lightManual();


        // ............. 
        // for Irrigation system
        // ............. 

        if (controlData["irrigation"]["auto"] == true) {
          document.getElementById("irrigation-auto").classList.add("active");
          document.getElementById("auto-irrigation-btn").classList.add("show");
          document.getElementById("irrigation-btn").classList.remove("show");
        } else {
          document.getElementById("irrigation-manual").classList.add("active");
          document.getElementById("irrigation-btn").classList.add("show");
          document.getElementById("auto-irrigation-btn").classList.remove("show");
        }
      
        document.getElementById("irrigation-auto").addEventListener("click", function (event) {
          event.preventDefault();
          // Auto True 
          const irrigationstatAutoValueRef = ref(database, "controls/irrigation/auto");
          set(irrigationstatAutoValueRef, true).then(() => {
            console.log("atuto:true");
          }).catch((error) => {
            console.error("Error updating 'auto' for 'thermostat'", error);
          });
          showAutoManulaContentIrrigation();
        });
      
        document.getElementById("irrigation-manual").addEventListener("click", function (event) {
          event.preventDefault();
          // Auto false
          const irrigationstatAutoValueRef = ref(database, "controls/irrigation/auto");
          set(irrigationstatAutoValueRef, false).then(() => {
            console.log("Successfully updated 'auto' for 'thermostat' control to false.");
          }).catch((error) => {
            console.error("Error updating 'auto' for 'thermostat' control:", error);
          });
          showAutoManulaContentIrrigation();
        });
      
        // Event listener for the checkbox
        document.getElementById("irrigationSwitch").addEventListener("change", function () {
          const thermostatManualControlRef = ref(database, "controls/irrigation/manual-control");
          set(thermostatManualControlRef, document.getElementById("irrigationSwitch").checked).then(() => {
            console.log("Successfully updated 'manual-control' for 'irrigation' control.");
          }).catch((error) => {
            console.error("Error updating 'manual-control' for 'irrigation' control:", error);
          });
          irrigationManual(); 
        });
      
        irrigationManual();
}


// thermo functions 
function showAutoManulaContentThermo() {
  document.getElementById("thermo-btns").addEventListener("click", function (event) {
    if (event.target.classList.contains("control-btn")) {
      event.preventDefault();

      document.querySelectorAll("#thermo-btns .control-btn").forEach(function (tab) {
        tab.classList.remove("active");
      });

      document.querySelectorAll(".thermo-sits .control-content").forEach(function (tabPane) {
        tabPane.classList.remove("show");
      });

      // Add 'active' class to the clicked tab and corresponding tab pane
      event.target.classList.add("active");

      if (event.target.id == "auto-btn") {
        document.getElementById("auto-btn").classList.add("show");
      } else {
        document.getElementById("thermo-btn").classList.add("show");
      }

      console.log(event.target.id);
    }
  });
}
function thermoManual() {
  var label = document.querySelector('.form-check-label[for="thermostatSwitch"]');
  if (controlData["thermostat"]["manual-control"] == true) {
    thermostatSwitch.checked = true;
    label.textContent = 'ON';
  } else {
    thermostatSwitch.checked = false;
    label.textContent = 'OFF';
  }
}

// light functions 
function showAutoManulaContentLight() {
  document.getElementById("light-btns").addEventListener("click", function (event) {
    if (event.target.classList.contains("control-btn")) {
      event.preventDefault();

      document.querySelectorAll("#light-btns .control-btn").forEach(function (tab) {
        tab.classList.remove("active");
      });

      document.querySelectorAll(".light-content").forEach(function (tabPane) {
        tabPane.classList.remove("show");
      });

      // Add 'active' class to the clicked tab and corresponding tab pane
      event.target.classList.add("active");

      if (event.target.id == "auto-btn") {
        document.getElementById("auto-btn").classList.add("show");
      } else {
        document.getElementById("thermo-btn").classList.add("show");
      }

      console.log(event.target.id);
    }
  });
}
function lightManual() {
  var label = document.querySelector('.form-check-label[for="lightSwitch"]');
  if (controlData["light"]["manual-control"] == true) {
    lightSwitch.checked = true;
    label.textContent = 'ON';
  } else {
    lightSwitch.checked = false;
    label.textContent = 'OFF';
  }
}

// Irrigation system functions 
function showAutoManulaContentIrrigation() {
  document.getElementById("irrigation-btns").addEventListener("click", function (event) {
    if (event.target.classList.contains("control-btn")) {
      event.preventDefault();

      document.querySelectorAll("#irrigation-btns .control-btn").forEach(function (tab) {
        tab.classList.remove("active");
      });

      document.querySelectorAll(".irrigation-content").forEach(function (tabPane) {
        tabPane.classList.remove("show");
      });

      // Add 'active' class to the clicked tab and corresponding tab pane
      event.target.classList.add("active");

      if (event.target.id == "auto-btn") {
        document.getElementById("auto-btn").classList.add("show");
      } else {
        document.getElementById("thermo-btn").classList.add("show");
      }

      console.log(event.target.id);
    }
  });
}
function irrigationManual() {
  var label = document.querySelector('.form-check-label[for="irrigationSwitch"]');
  if (controlData["irrigation"]["manual-control"] == true) {
    irrigationSwitch.checked = true;
    label.textContent = 'ON';
  } else {
    irrigationSwitch.checked = false;
    label.textContent = 'OFF';
  }
}
