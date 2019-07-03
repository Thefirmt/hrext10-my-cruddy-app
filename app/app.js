/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to modify data? (update action, delete action)

*/

//localStorage functions
var createItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

var updateItem = function(key, value) {
  return window.localStorage.setItem(key, value);
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
    $('tbody').append(`<tr><td>${key}</td><td>${window.localStorage.getItem(key)}</td></tr>`)
  }
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
  return window.localStorage.key(Math.floor(Math.random() * window.localStorage.length));
}

var checkSame = function(winner) {
  var loser = getGlad();
  if (winner === loser) {
    return checkSame(winner)
  }
  return loser;
}

var startFight = function () {


}


$(document).ready(function() {
  showDatabaseContents();


// var e = jQuery.Event("keydown"); //enter is an event
// e.which = 13; // keycode for the enter key
//   $('.input-group-text').keypress(e, function () { //same functionality as clicking
//     console.log('something')
//     if (getKeyInput() !== '' && getValueInput() !== '') {
//       if (keyExists(getKeyInput())) {
//         if(confirm('Gladiator already exists, do you want to update weapon?')) {
//           updateItem(getKeyInput(), getValueInput());
//           showDatabaseContents();
//           resetInputs();
//         }
//       } else {
//         createItem(getKeyInput(), getValueInput());
//         showDatabaseContents();
//         resetInputs();
//       }
//     } else  {
//       alert('Please enter a name and weapon for the gladiator');
//     }
//   });


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
        console.log(`${winner} is the champion!`)
        $('.display-4').text(`${winner} is the champion!`)   
      } else {
        var loser = checkSame(winner);
        console.log(`${winner} killed ${loser} with ${window.localStorage.getItem(winner)}!`)
        deleteItem(loser);
        showDatabaseContents();
        $('.lead1').append(`<p class="lead">${winner} killed ${loser} with ${window.localStorage.getItem(winner)}!</p>`)
          if (window.localStorage.length === 1) {
            console.log(`${winner} is the champion!`)
            $('.display-4').text(`${winner} is the champion!`)
          }
      }
    }
  })
})