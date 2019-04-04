console.log('Client-side code running');

const button = document.getElementById('myButton');

button.addEventListener('click', function(e) {

  console.log('button was clicked');
  button.classList.add("loading", "disabled");

  fetch('/clicked', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
    button.classList.remove("loading", "disabled");
});

// animateValue(0, `${data.length}`);

setInterval(function() {
    updateVal();
}, 5000);

function updateVal(anim = false){
    fetch('/clicks', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
        if (anim)
            animateValue(0, `${data.length}`);
        else
            document.getElementById('counter').innerHTML = `${data.length}`;
    })
    .catch(function(error) {
      console.log(error);
    });
}

function animateValue(start, end) {
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(1000 / range));
    var obj = document.getElementById("counter");
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}