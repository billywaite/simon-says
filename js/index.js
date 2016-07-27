
$('.container').hide();
$(document).ready(function() {
  var sounds = {
  "red": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  "green": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  "blue": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  "yellow": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};
  
  var count = 0;
  var player_count = 0;
  var player_turn = false;
  var player_color = '';
  var colors = ['green', 'blue', 'yellow', 'red'];
  var simon = [];
  var player = [];
  var strictMode = '';

  //player chooses either start or strict mode initially
  $('#start').click(function() {
    $('.intro').css("display", "none");
    $('.container').fadeIn(1000);
    document.getElementById('count').innerHTML = '00';
    count = 0;
    simon = [];
    setTimeout(random_generate, 2000);
    setTimeout(your_move,2000);
  });

  $('#strict').click(function() {
    $('.intro').css("display", "none");
    $('.container').fadeIn(1000);
    document.getElementById('count').innerHTML = '00';
    count = 0;
    simon = [];
    strictMode = true;
    setTimeout(random_generate, 2000);
    setTimeout(your_move, 2000);
  });

  //The function generates a number randomly between index 0 and index 3. We use that number to choose a color from the colors array, and put it inside the simon array.
  //loop through the simon array changing the color of each button, and playing a sound.
  //count++ & display the new count
  function random_generate() {
    count++;

    var random = Math.floor((Math.random() * 4));
    simon.push(colors[random]);
    simon_says();
  }

  function simon_says() {
    player = [];
    player_count = 0;
    document.getElementById('count').innerHTML = count;

    var i = 0;

    function loop() {
      
       $('#' + simon[i]).fadeTo('slow', 0).fadeTo('fast', 1);
      sounds[simon[i]].play();
      
      i++;
      if (i < simon.length) {
        setTimeout(loop, 1000);
      }

    }
    loop();
    player_turn = true;
  } //end simon says

  //players turn - player clicks a color, and then calls checkMove();
  function your_move() {
    if (player_turn == true) {
      $('button').click(function() {
        player_color = $(this).attr('id');
        sounds[player_color].play();
        checkMove();
      });
    }
  }
//checks if the color chosen is the right one
  function checkMove() {
    if (player_color == simon[player_count]) {
      player.push(player_color);//adds to player arr if correct
      player_count++;
      checkWin();
      return;
    } else if (player_color != simon[player_count]) {
      document.getElementById('count').innerHTML = '!!';
      player_turn = false;
      if (strictMode == true) { //alerts the player if incorrect
        count = 0;
        simon = [];
        setTimeout(random_generate, 1000);
      } else {
        setTimeout(simon_says, 1000);
      }
      return;
    }
  }
//after each click, check for a win
  function checkWin() {
    if (player.length == 20) {
      player_turn = false;
      won();
      return;
    } else if (player.length == simon.length) {
      player_turn = false;
      setTimeout(random_generate, 1000);
      return;
    } else if (player.length < simon.length) {
      return; //do nothing, allow player to continue their move.
    }
  }
//called if the player won the game
  function won() {
    $('.container').fadeOut();
    $('.ending').css("display", "block");
    
    $('#ending').click(function() {
      $('.ending').css("display", "none");
      $('.container').fadeIn();
      document.getElementById('count').innerHTML = '00';
      count = 0;
      simon = [];
      setTimeout(random_generate, 1000);
    });
  }
//reset
  $('#reset').click(function() {
    document.getElementById('count').innerHTML = '00';
    count = 0;
    simon = [];
    player_turn = false;
    setTimeout(random_generate, 1000);
  });

});