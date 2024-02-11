const dealer_card1 = document.getElementById('dealer_card1');
const dealer_card2 = document.getElementById('dealer_card2');
const player_card1 = document.getElementById('player_card1');
const player_card2 = document.getElementById('player_card2');
const hit_for_another_card = document.getElementById('hit');
const stand_stop = document.getElementById('stand');
const isrunning = document.getElementById("isrunning");

const reset = document.getElementById('reset_button');

let array_subtraction = 0;
let seconds_delay = 1;


let random_dealer_card1;
let random_dealer_card2;
let dealer_card2_value;

let player_total = create_player_base();
let dealer_total = create_dealer_base();

function create_player_base()
{
  let random_player_card1 = Math.floor(Math.random() * 52)-array_subtraction;
  if(random_player_card1<0){random_player_card1=0;}
  let player_card1_value = deck_of_cards[random_player_card1];
  deck_of_cards.splice(random_player_card1, 1);
  array_subtraction++;

  let random_player_card2 = Math.floor(Math.random() * 52)-array_subtraction;
  if(random_player_card2<0){random_player_card2=0;}
  let player_card2_value = deck_of_cards[random_player_card2];
  deck_of_cards.splice(random_player_card2, 1);
  array_subtraction++;

  let player_total = player_card1_value+player_card2_value;
  console.log("Player: " + player_total);
  console.log(deck_of_cards);
  player_card1.textContent = player_card1_value.toString() + " ";
  player_card2.textContent = player_card2_value.toString() + " ";
  if(player_total>=21)
  {
    hit_for_another_card.disabled = true;
    stand_stop.disabled=true;
  }
  return player_total
}

function create_dealer_base()
{
  random_dealer_card1 = Math.floor(Math.random() * 52)-array_subtraction;
  if(random_dealer_card1<0){random_dealer_card1=0;}
  let dealer_card1_value = deck_of_cards[random_dealer_card1];
  deck_of_cards.splice(random_dealer_card1, 1);
  array_subtraction++;

  random_dealer_card2 = Math.floor(Math.random() * 52)-array_subtraction;
  if(random_dealer_card2<0){random_dealer_card2=0;}
  dealer_card2_value = deck_of_cards[random_dealer_card2];
  deck_of_cards.splice(random_dealer_card2, 1);
  array_subtraction++

  let dealer_total = dealer_card1_value+dealer_card2_value;
  console.log("Dealer: " + dealer_total);
  console.log(deck_of_cards);
  dealer_card1.textContent = dealer_card1_value.toString() + " ";

  return dealer_total
}

stand_stop.addEventListener('click',stand);

function stand()
{
  
  console.log("Stand");
  setTimeout(function() 
  {
    dealer_card2.textContent = dealer_card2_value.toString() + " ";
  }, 1000*seconds_delay-500);
  seconds_delay++;
  
  while(dealer_total < 17)
  {
    dealer_hit();
    seconds_delay++;
  }

  if(dealer_total>21)
  {
    setTimeout(function() 
    {
      isrunning.textContent="Dealer busted, player wins";
    }, 1000*seconds_delay-250);
    seconds_delay++;
  }
  else if(player_total>dealer_total)
  {
    setTimeout(function() 
    {
      isrunning.textContent="Player Won! Dealer lost";
    }, 1000*seconds_delay-250);
    seconds_delay++;
  }
  else if(player_total<dealer_total && dealer_total<=21)
  {
    setTimeout(function() 
    {
      isrunning.textContent="Dealer won, player lost";
    }, 1000*seconds_delay-250);
    seconds_delay++;
  }
  else if(player_total==dealer_total)
  {
    setTimeout(function() 
    {
      isrunning.textContent="Tie";
    }, 1000*seconds_delay-250);
    seconds_delay++;
  }
  hit_for_another_card.disabled = true;
  stand_stop.disabled=true;

  
  setTimeout(function() 
  {
    reset.style.display = 'block';
  }, 1000*seconds_delay-750);
  seconds_delay++;
  
}

function dealer_hit()
{
  const extra = document.createElement("h4");
  extra.classList.add("dealer_cards");
  let extra_card = Math.floor(Math.random() * 52)-array_subtraction;
  if(extra_card<0){extra_card=0;}
  let extra_card_value = deck_of_cards[extra_card];
  deck_of_cards.splice(extra_card,1);
  array_subtraction++;
  console.log(deck_of_cards);

  setTimeout(function()
  {
    extra.textContent = extra_card_value + " "; 
  },1000*seconds_delay);
  
  document.querySelector(".dealer_cards").appendChild(extra);
  dealer_total+=extra_card_value;
  console.log("Dealer: " + dealer_total);
}


hit_for_another_card.addEventListener('click', hit);
function hit() 
{
  const extra = document.createElement("h4");
  extra.classList.add("player_card"); 
  let extra_card = Math.floor(Math.random() * 52)-array_subtraction;
  let extra_card_value = deck_of_cards[extra_card];
  deck_of_cards.splice(extra_card,1);
  array_subtraction++;
  console.log(deck_of_cards);
  
  extra.textContent = extra_card_value + " "; 
  document.querySelector(".player_cards").appendChild(extra);
  player_total+=extra_card_value;
  console.log("Player: " + player_total);
  if(player_total>21)
  {
    hit_for_another_card.disabled = true;
    stand_stop.disabled=true;
    bust();
  }
  else if(player_total==21)
  {
    win();
    hit_for_another_card.disabled = true;
    stand_stop.disabled=true;
  }
}

function win()
{
  isrunning.textContent="Player Won! Dealer lost";
  reset.style.display = 'block';
}

function bust()
{
  isrunning.textContent="Player Busted, dealer wins";
  reset.style.display = 'block';
}

reset.addEventListener('click',reset_clicked);

function reset_clicked()
{
  reset.style.display = 'none';
  hit_for_another_card.disabled = false;
  stand_stop.disabled=false;
  dealer_total=0;
  player_total=0;

  const dealer_additional_cards = document.querySelectorAll(".dealer_cards h4");
  // Start removing from the third card onwards
  for (let i = 2; i < dealer_additional_cards.length; i++) {
    dealer_additional_cards[i].remove();
  }

  // Clear additional cards for player
  const player_additional_cards = document.querySelectorAll(".player_cards h4");
  // Start removing from the third card onwards
  for (let i = 2; i < player_additional_cards.length; i++) {
    player_additional_cards[i].remove();
  }
  renew();
  console.log(deck_of_cards);
  array_subtraction=0;
  seconds_delay=1;
  player_total = create_player_base();
  dealer_total = create_dealer_base();
  dealer_card2.textContent = "-";
  isrunning.textContent="...";
}
