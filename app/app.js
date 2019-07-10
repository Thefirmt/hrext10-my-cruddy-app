/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to modify data? (update action, delete action)

*/


//localStorage functions
var createItem = function(key, value) {
  var stats = [value.toLowerCase(), 10, getType()]
  return window.localStorage.setItem(key, JSON.stringify(stats));
}

var updateItem = function(key, value) {
  var prevStat = JSON.parse(window.localStorage.getItem(key))
  prevStat[0] = value.toLowerCase();
  prevStat[2] = getType();
  return window.localStorage.setItem(key, JSON.stringify(prevStat));
}

var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
}

var clearDatabase = function() {
  return window.localStorage.clear();
}

var showDatabaseContents = function() {
  $('tbody').html('');

  for (var i = 0; i < window.localStorage.length; i++) {
    var key = window.localStorage.key(i);
    var weapon = JSON.parse(localStorage.getItem("names"))
    if (!key.includes('HP')) {
          $('tbody').append(`<tr><td>${key}</td>
            <td>${JSON.parse(window.localStorage.getItem(key))[0]}</td>
            <td>${healthBar(key)}</td></tr>`)
    }
  }
}

var healthBar = function(key) {
  var currentHP = JSON.parse(window.localStorage.getItem(key))[1]
  var percentHP = currentHP*10
  if (percentHP >50) {
    return `<div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: ${percentHP}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${JSON.parse(window.localStorage.getItem(key))[1]}</div></div>`;
  } else if (percentHP > 20) {
    return `<div class="progress"><div class="progress-bar bg-warning" role="progressbar" style="width: ${percentHP}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${JSON.parse(window.localStorage.getItem(key))[1]}</div></div>`;
  }
    return `<div class="progress"><div class="progress-bar bg-danger" role="progressbar" style="width: ${percentHP}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${JSON.parse(window.localStorage.getItem(key))[1]}</div></div>`;
}

var keyExists = function(key) {
  return window.localStorage.getItem(key) !== null
}

var getKeyInput = function() {
  return $('.key').val();
}

var getValueInput = function() {
  return $('.value').val();
}

var resetInputs = function() {
  $('.key').val('');
  $('.value').val('');
}

var getGlad = function() {
  var notHP = window.localStorage.key(Math.floor(Math.random() * window.localStorage.length));
  if (!notHP.includes('HP')) {
    return notHP;
  } else {
    return getGlad();
  }
}

var checkSame = function(winner) {
  var loser = getGlad();
  if (winner === loser) {
    return checkSame(winner)
  }
  return loser;
}

//UNFINISHED WEAPON DAMAGE CODE FOR CATEGORY
var weaponDMG = function(winner) {
  var type = JSON.parse(window.localStorage.getItem(winner))[2]
  if(type === 'light') {
    return 3;
  }
  if(type === 'medium') {
    return 5;
  }
  if(type === 'heavy') {
    return 7;
  }
}

//Null weapon type bug
var getType = function() {
    if(light) {
    return 'light';
  }
  if(medium) {
    return 'medium';
  }
  if(heavy) {
    return 'heavy';
  }
}

var keepSize = function() {
  var leadVar = document.body.getElementsByClassName('lead')
  if (leadVar.length > 6) {
    leadVar[0].remove()
  }
}

var light = true;
var medium = false;
var heavy = false;

//POSSIBLY UNFINISHED CODE FOR DAMAGE FOMRULA
var loseHP = function(winner, loser) {
  var dmg = Math.floor(Math.random()*weaponDMG(winner)) + 1
  var loserHP = JSON.parse(window.localStorage.getItem(loser))[1];
  if (loserHP > dmg) {
    $('.lead1').append(`<p class="lead">${winner} attacked ${loser} with a ${JSON.parse(window.localStorage.getItem(winner))[0]} for ${dmg} damage!</p>`)
    var damagedLoser = JSON.parse(window.localStorage.getItem(loser))
    damagedLoser[1] -= dmg;
    console.log(damagedLoser)
    window.localStorage.setItem(loser, JSON.stringify(damagedLoser));
  } else {
   $('.lead1').append(`<p class="lead" style="color:red;font-weight:600">${winner} has ${randomVerb(verbs)} ${loser} with ${dmg} damage from their ${JSON.parse(window.localStorage.getItem(winner))[0]}!!</p>`)
    deleteItem(loser);
  }
}

var randomVerb = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
var verbs = ['decimated', 'annihilated', 'eviscerated', 'destroyed', 'slayed', 'eliminated', 'deleted', 'banished', 'abolished', 'pummeled', 'vaporized', 'minced', 'smooshed', 'smashed', 'assassinated', 'slaughtered', 'eradicated', 'neutralized', 'obliterated', 'wasted', 'dispatched', 'smothered', 'suffocated', 'wiped out', 'exterminated', 'finished', 'ended'];


$(document).ready(function() {
  showDatabaseContents();



  $('.create').click(function() {
    if (getKeyInput() !== '' && getValueInput() !== '') {
      if (keyExists(getKeyInput())) {
        if(confirm('Gladiator already exists, do you want to update weapon?')) {
          updateItem(getKeyInput(), getValueInput());
          showDatabaseContents();
          resetInputs();
        }
      } else {
        createItem(getKeyInput(), getValueInput());
        showDatabaseContents();
        resetInputs();
      }
    } else  {
      alert('Please enter a name and weapon for the gladiator');
    }
  });

  $('.update').click(function() {
    if (getKeyInput() !== '' && getValueInput() !== '') {
      if (keyExists(getKeyInput())) {
        updateItem(getKeyInput(), getValueInput());
        showDatabaseContents();
        resetInputs();
      } else {
        alert('Gladiator does not exist');
      }
    } else {
      alert('Please enter a name and weapon for the gladiator');
    }
  });

  $('.delete').click(function() {
     if (getKeyInput() !== '') {
      if (keyExists(getKeyInput())) {
        deleteItem(getKeyInput());
        showDatabaseContents();
        resetInputs();
      } else {
        alert('Gladiator does not exist');
      }
    } else {
      alert('Enter the name of the gladiator you wish to retire');
    }
  });

  $('#light-btn').click(function(){
    light = true;
    medium  = false;
    heavy = false;
  })

  $('#medium-btn').click(function(){
    light = false;
    medium  = true;
    heavy = false;
  })

  $('#heavy-btn').click(function(){
    light = false;
    medium  = false;
    heavy = true;
  })
  // $('.reset').click(function() {
  //   resetInputs();
  // })

  $('.clear').click(function() {
    clearDatabase();
    showDatabaseContents();
  })

  ///FIght
  //Acquire 2 random gladiators
  //display message Gladiator 1 kills gladiator 2
  //delete glad 2



  $('.fight').click(function() {
    if(window.localStorage.length === 0) {
      alert('Please create gladiators to fight in the arena!')
    } else {
    var winner = getGlad();
      if (window.localStorage.length === 1) {
        $('.display-4').text(`${winner} is the champion!`)   
      } else {
        var loser = checkSame(winner);
        // deleteItem(loser);
        loseHP(winner, loser);
        showDatabaseContents();
        keepSize();
          if (window.localStorage.length === 1) {
            $('.display-4').text(`${winner} is the champion!`)
          }
      }
    }
  })
})