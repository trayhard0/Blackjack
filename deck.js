let deck_of_cards = 
[1,1,1,1
,2,2,2,2
,3,3,3,3
,4,4,4,4
,5,5,5,5
,6,6,6,6
,7,7,7,7
,8,8,8,8
,9,9,9,9
,10,10,10,10
,10,10,10,10
,10,10,10,10
,10,10,10,10
];

//console.log(deck_of_cards);

const x = deck_of_cards.splice(4,1);
//console.log(x);
//console.log(deck_of_cards);
renew();
//console.log(deck_of_cards);


function renew()
{
  deck_of_cards = 
  [1,1,1,1
  ,2,2,2,2
  ,3,3,3,3
  ,4,4,4,4
  ,5,5,5,5
  ,6,6,6,6
  ,7,7,7,7
  ,8,8,8,8
  ,9,9,9,9
  ,10,10,10,10
  ,10,10,10,10
  ,10,10,10,10
  ,10,10,10,10
  ];
}
