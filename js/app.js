const xmlPath = "/xml/data.xml";

function loadXML(path, callback) {
  let req = new XMLHttpRequest();
  req.open("GET", path);
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) callback(req.responseXML);
  };
  req.send();
}

function updateFeaturedBand(xml) {
  let bands = xml.getElementsByTagName("band");
  let bandCount = bands.length;
  let featuredIndex = getRandNum(0, bandCount - 1);
  let featuredBand = bands[featuredIndex];

  let bandName = featuredBand.getElementsByTagName("name")[0].textContent;
  let scheduleDate = featuredBand.getElementsByTagName("date")[0].textContent;
  let scheduleTime = featuredBand.getElementsByTagName("time")[0].textContent;
  let price = featuredBand.getElementsByTagName("price")[0].textContent;

  document.getElementById("band-title").textContent = bandName;
  document.getElementById(
    "band-schedule"
  ).textContent = `${scheduleDate} - ${scheduleTime}`;
  document.getElementById("band-price").textContent = `Price: $${price}`;

  updateBandList(xml, featuredIndex, bandCount);
}

function updateBandList(xml, bandNum, bandListLength) {
  let bands = xml.getElementsByTagName("band");
  let bandList = document.getElementById("band-list");

  bandList.innerHTML = "";

  for (let i = 0; i < bandListLength; i++) {
    if (i !== bandNum) {
      let bandName = bands[i].getElementsByTagName("name")[0].textContent;
      let scheduleDate = bands[i].getElementsByTagName("date")[0].textContent;
      let scheduleTime = bands[i].getElementsByTagName("time")[0].textContent;
      let price = bands[i].getElementsByTagName("price")[0].textContent;

      let bandInfo = document.createElement("div");
      bandInfo.classList.add("band-info");
      bandInfo.innerHTML = `<h5>${bandName}</h5><p>${scheduleDate} - ${scheduleTime}</p><p>Price: $${price}</p>`;
      bandList.appendChild(bandInfo);
    }
  }
}

function updateEventDetails(xml) {
  let title = xml.getElementsByTagName("title")[0].textContent;
  let address = xml.getElementsByTagName("address")[0].textContent;
  let website = xml.getElementsByTagName("website")[0].textContent;

  document.getElementById("event-title").textContent = title;
  document.getElementById("event-address").textContent = address;
  document.getElementById("event-website").textContent = website;
}

function updateEventDetails(xml) {
  let title = xml.getElementsByTagName("title")[0].textContent;
  let address = xml.getElementsByTagName("address")[0].textContent;
  let website = xml.getElementsByTagName("website")[0].textContent;

  document.getElementById("event-title").textContent = title;
  document.getElementById("event-address").textContent = address;
  document.getElementById("event-website").textContent = website;
}

function updateForm(xml) {
  let bandSelect = document.getElementById("band-form");
  let dateSelect = document.getElementById("date-form");
  let timeSelect = document.getElementById("time-form");
  let priceField = document.getElementById("price-form");

  const bands = xml.getElementsByTagName("band");

  for (let band of bands) {
    const option = document.createElement("option");
    option.value = band.getElementsByTagName("name")[0].textContent;
    option.textContent = band.getElementsByTagName("name")[0].textContent;
    bandSelect.appendChild(option);
  }

  bandSelect.addEventListener("change", () => {
    const selectedBand = bandSelect.value;
    dateSelect.innerHTML = '<option value="" selected>Choose...</option>';
    timeSelect.innerHTML = '<option value="" selected>Choose...</option>';
    priceField.value = "";

    if (selectedBand) {
      dateSelect.disabled = false;
      timeSelect.disabled = false;

      const bandData = Array.from(bands).find(
        (b) => b.getElementsByTagName("name")[0].textContent === selectedBand
      );

      if (bandData) {
        const schedules = bandData.getElementsByTagName("schedule");

        for (let schedule of schedules) {
          const dateOption = document.createElement("option");
          dateOption.value =
            schedule.getElementsByTagName("date")[0].textContent;
          dateOption.textContent = dateOption.value;
          dateSelect.appendChild(dateOption);

          const timeOption = document.createElement("option");
          timeOption.value =
            schedule.getElementsByTagName("time")[0].textContent;
          timeOption.textContent = timeOption.value;
          timeSelect.appendChild(timeOption);
        }

        const price = bandData.getElementsByTagName("price")[0].textContent;
        bandSelect.dataset.price = price;
      }
    } else {
      dateSelect.disabled = true;
      timeSelect.disabled = true;
      delete bandSelect.dataset.price;
    }

    checkCompletion(bandSelect.dataset.price);
  });

  dateSelect.addEventListener("change", () =>
    checkCompletion(bandSelect.dataset.price)
  );
  timeSelect.addEventListener("change", () =>
    checkCompletion(bandSelect.dataset.price)
  );
}

function checkCompletion(price) {
  let dateSelect = document.getElementById("date-form");
  let timeSelect = document.getElementById("time-form");
  let priceField = document.getElementById("price-form");

  if (dateSelect.value && timeSelect.value) {
    priceField.value = price;
  } else {
    priceField.value = "";
  }
}

function getRandNum(min, max) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

function getFeaturedBand() {
  loadXML(xmlPath, updateFeaturedBand);
}

function getEventDetails() {
  loadXML(xmlPath, updateEventDetails);
}

function getFormDetails() {
  loadXML(xmlPath, updateForm);
}

function loadData() {
  getFeaturedBand();
  getEventDetails();
  getFormDetails();
}
