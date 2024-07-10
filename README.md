# JS Mini Proj Documentation for bebi

Hi bebi. Use this as reference nalang for your work. You may or may not have the same approach as mine pero I'm pretty sure kayang kaya mo naman to.

## Structure

### index.html

Take note of the id of the tags for your DOM references.

```html
<div class="container-fluid py-5">
  <h1 id="upcoming-event-title" class="display-5 fw-bold">
    Upcoming Live Events 2023
  </h1>
  <h2 id="event-title"></h2>
  <h4 id="event-address"></h4>
  <p id="event-website"></p>
</div>
```

### XML Folder

#### XML DOM

Reference I used: https://www.w3schools.com/xml/xml_dom.asp

Take note of the tags sa xml file. It is similar lang din sa HTML DOM.

The structure can be divided into two.

#### For the first part, you may use this for task 1.

```xml
<title>Ear Candy</title>
<address>6353 Juan Tabo Boulevard, Apartment #6</address>
<website>ph.eventlive.com</website>
```

#### And for the second part focuses on the task 2.

```xml
<featured_bands>
    <band>
        <name>Peach Pit</name>
        <schedule>
            <date>June 6, 2023</date>
            <time>6:00 pm - 8:00 pm</time>
        </schedule>
        <price>200.00</price>
    </band>
    <band>
        <name>Mom Jeans</name>
        <schedule>
            <date>June 6, 2023</date>
            <time>8:00 pm - 10:00 pm</time>
        </schedule>
        <price>150.00</price>
    </band>
    <band>
        <name>Michael Cera Palin</name>
        <schedule>
            <date>June 7, 2023</date>
            <time>6:00 pm - 8:00 pm</time>
        </schedule>
        <price>100.00</price>
    </band>
    <band>
        <name>Save Face</name>
        <schedule>
            <date>June 7, 2023</date>
            <time>8:00 pm - 10:00 pm</time>
        </schedule>
        <price>150.00</price>
    </band>
    <band>
        <name>PUP</name>
        <schedule>
            <date>June 7, 2023</date>
            <time>10:00 PM - 12:00 AM</time>
        </schedule>
        <price>300.00</price>
    </band>
</featured_bands>
```

### js folder

Js folder contains 3 files. Pero disregard mo nalang yung jquery.

## app.js

I'll go through everything na nilagay ko sa app.js

### xmlPath

```js
const xmlPath = "/xml/data.xml";
```

Updated the path used for the entire file.

### loadXML function

```js
function loadXML(path, callback) {
  let req = new XMLHttpRequest();
  req.open("GET", path);
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) callback(req.responseXML);
  };
  req.send();
}
```

Basically, sinunod ko lang din yung yt link na sinend mo for this one. So everything about this is nandon na rin sa vid. Pero, yung header is unnecessary
naman na so di ko na sinama.

#### Note: Syempre to access the data sa XML need muna iload kasi hindi gagana yung ibang functions if wala to. HAHAHA.

#### Another note: Pwede mo iconsole log yung loadXML na function para macheck mo if naloload nang maayos and makita mo yung format ng XML para di ka na pabalik balik sa data.xml

```js
function loadXML(path, callback) {
  let req = new XMLHttpRequest();
  req.open("GET", path);
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) callback(req.responseXML);
  };
  req.send();
}

loadXML(xmlPath, function (xml) {
  console.log(xml);
});
```

it should display this sa console

```
#document (http://127.0.0.1:5500/xml/data.xml)
<event>
    <title>Ear Candy</title>
    <address>6353 Juan Tabo Boulevard, Apartment #6</address>
    <website>ph.eventlive.com</website>
    <featured_bands>...</featured_bands>
</event>
```

### updateEventDetails function

This function is included sa task 1.

```js
function updateEventDetails(xml) {
  let title = xml.getElementsByTagName("title")[0].textContent;
  let address = xml.getElementsByTagName("address")[0].textContent;
  let website = xml.getElementsByTagName("website")[0].textContent;

  document.getElementById("event-title").textContent = title;
  document.getElementById("event-address").textContent = address;
  document.getElementById("event-website").textContent = website;
}
```

#### Parameter xml

This is the XML file that we loaded from the data.xml file.

#### Access elements from xml through tag name

```js
let title = xml.getElementsByTagName("title")[0].textContent;
let address = xml.getElementsByTagName("address")[0].textContent;
let website = xml.getElementsByTagName("website")[0].textContent;
```

Basically, we use getElementByTagName to get the elements (XML DOM) and store it sa variable. If you are wondering bakit may [0], if you remove the [0] ang irereturn nya ay obj and may property sya na textContent which explains the .textContent and bale si text content ay eto:

```xml
<title>TEXT CONTENT</title>
```

#### HTML DOM

```js
document.getElementById("event-title").textContent = title;
document.getElementById("event-address").textContent = address;
document.getElementById("event-website").textContent = website;
```

After getting the values that we need sa XML, we then update our HTML DOM.

##### Note: Kinuha ko yung ID sa html to know where to put yung values.

```html
<div class="p-5 mb-4 bg-light rounded-3">
  <div class="container-fluid py-5">
    <h1 id="upcoming-event-title" class="display-5 fw-bold">
      Upcoming Live Events 2023
    </h1>
    <h2 id="event-title"></h2>
    <h4 id="event-address"></h4>
    <p id="event-website"></p>
  </div>
</div>
```

After doing this, Tapos ka na sa task 1.

### updateFeaturedBand function

For task 2, Need madisplay yung featured band and display it sa left side and yung bands sa right side and wala na dapat yung featured band don. So si updateFeaturedBand will handle the left side.

```js
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
```

Same protocol parin. We access the band from xml. Get the length, get a random number to determine kung ano yung magiging featured band. Then we get the band name, schedule date, schedule time, and price and update the HTML DOM. After that we invoke updateBandList function to make sure na wala na ron yung featuredBand pero before that, let's talk about the getRandNum muna.

```xml
<featured_bands>
    <band>
        <name>Peach Pit</name>
        <schedule>
            <date>June 6, 2023</date>
            <time>6:00 pm - 8:00 pm</time>
        </schedule>
        <price>200.00</price>
    </band>
    <band>
        <name>Mom Jeans</name>
        <schedule>
            <date>June 6, 2023</date>
            <time>8:00 pm - 10:00 pm</time>
        </schedule>
        <price>150.00</price>
    </band>
    <band>
        <name>Michael Cera Palin</name>
        <schedule>
            <date>June 7, 2023</date>
            <time>6:00 pm - 8:00 pm</time>
        </schedule>
        <price>100.00</price>
    </band>
    <band>
        <name>Save Face</name>
        <schedule>
            <date>June 7, 2023</date>
            <time>8:00 pm - 10:00 pm</time>
        </schedule>
        <price>150.00</price>
    </band>
    <band>
        <name>PUP</name>
        <schedule>
            <date>June 7, 2023</date>
            <time>10:00 PM - 12:00 AM</time>
        </schedule>
        <price>300.00</price>
    </band>
</featured_bands>
```

### getRandNum Function

```js
function getRandNum(min, max) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}
```

To generate the random number, we want our min and max value to be inclusive. Let's talk about the functions muna.

#### Math.ceil()

The Math.ceil() static method always rounds up and returns the smallest integer greater than or equal to a given number.

```js
console.log(Math.ceil(0.95));
// Expected output: 1

console.log(Math.ceil(4));
// Expected output: 4

console.log(Math.ceil(7.004));
// Expected output: 8

console.log(Math.ceil(-7.004));
// Expected output: -7
```

#### Math.floor()

The Math.floor() static method always rounds down and returns the largest integer less than or equal to a given number.

```js
console.log(Math.floor(5.95));
// Expected output: 5

console.log(Math.floor(5.05));
// Expected output: 5

console.log(Math.floor(5));
// Expected output: 5

console.log(Math.floor(-5.05));
// Expected output: -6
```

#### Math.random()

The Math.random() static method returns a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1, with approximately uniform distribution over that range — which you can then scale to your desired range.

```js
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

console.log(getRandomInt(3));
// Expected output: 0, 1 or 2

console.log(getRandomInt(1));
// Expected output: 0

console.log(Math.random());
// Expected output: a number from 0 to <1
```

Refer to these documentations:

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_number_between_two_values

### updateBandList function

```js
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
```

For this one, the parameter bandNum is yung index ng featured band so we know kung ano yung hindi isasama sa band list and yung bandlistlength yung number ng lahat ng bands.

Same as before we get the bands sa xml file and yung bandList sa HTML DOM.

#### Note: Nakalimutan ko ilagay kanina pero always check. pag xml.getElementByTagName XML DOM yon and pag document.getElementById HTML DOM yon

Then, we have to make sure na icclear natin before natin ipopulate yung bandList

```js
bandList.innerHTML = "";
```

Then to populate, nag iterate ako sa bandlist using for loop. Tpaos yung if condition ensures na hindi isasama yung featured band. Then we get the band name, schedule data, schedule time, and price.

```js
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
```

Then update the dom ulet and create a new div for the band details and then append sa bandList. Basically this will go over the bands and it will look like this.

```html
<div class="band-info">
  <h5>Band Name</h5>
  <p>schedule date - schedule time</p>
  <p>Price: $price</p>
</div>
```

After doing this, tapos ka na sa Task 2. yey

### updateForm function

For task 3, mejo tricky to since you'll handle the select on forms and mag dedepend yung date and time sa kung anong band yung iseselect.

```js
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
```

For the updateForm function, same as before, we get the the elements needed sa XML DOM and HTML DOM

```html
<select class="form-select" id="band-form">
  <option selected>Choose...</option>
</select>

<select class="form-select" id="date-form">
  <option value="" selected>Choose...</option>
</select>

<select class="form-select" id="time-form">
  <option value="" selected>Choose...</option>
</select>

<input
  class="form-control"
  id="price-form"
  type="text"
  value=""
  aria-label="Price"
  readonly
/>
```

We then populate the select by adding the band name in the option tag

```js
for (let band of bands) {
  const option = document.createElement("option");
  option.value = band.getElementsByTagName("name")[0].textContent;
  option.textContent = band.getElementsByTagName("name")[0].textContent;
  bandSelect.appendChild(option);
}
```

The html structure will look like this.

```html
<select class="form-select" id="band form">
  <option selected>Choose...</option>
  <option value="Peach Pit">Peach Pit</option>
  <option value="Mom Jeans">Mom Jeans</option>
  <option value="Michael Cera Palin">Michael Cera Palin</option>
  <option value="Save Face">Save Face</option>
  <option value="PUP">PUP</option>
</select>
```

After populating the bands, We then add an event listener to listen for changes.

We then use the value of the selected option to get the band object and then populate the date and time.

```js
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
      dateOption.value = schedule.getElementsByTagName("date")[0].textContent;
      dateOption.textContent = dateOption.value;
      dateSelect.appendChild(dateOption);

      const timeOption = document.createElement("option");
      timeOption.value = schedule.getElementsByTagName("time")[0].textContent;
      timeOption.textContent = timeOption.value;
      timeSelect.appendChild(timeOption);
    }

    const price = bandData.getElementsByTagName("price")[0].textContent;
    bandSelect.dataset.price = price;
  }
}
```

we then invoke the check completion function

### checkCompletionFunction function

```js
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
```

Wala, sineset lang neto yung price sa priceField HAHAHAHAHA

After neto you're done na! yey congrats!

# P.S.

- Sana nabasa mo muna message ko sa messenger.
- Hindi ko maisip bakit need pa ng ajax for this one kasi yung magbabago lang naman is yung band list and wala naman event listener don.
- Wala rin namang submit feature sooooo...
