'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];


/***** STEP 1 *****/
function calculatePrice(nbPersons, nbHours, barId)
{
  var price = 0;
  for(var i=0; i<bars.length; i++)
  {
    if(barId == bars[i].id)
      price = bars[i].pricePerPerson * nbPersons + bars[i].pricePerHour * nbHours;
  }
  return price;
}

function changePriceForEachBooker(events)
{
  var nbPersons;
  var nbHours;
  var barId;
  for(var i=0; i<events.length; i++)
  {
    barId = events[i].barId;
    nbHours = events[i].time;
    nbPersons = events[i].persons;
    events[i].price = calculatePrice(nbPersons, nbHours, barId);
    if(nbPersons > 10)
      events[i].price = decreasePrice(nbPersons, nbHours, barId)
  }
}

changePriceForEachBooker(events);

/***** STEP 2 *****/
/*price per people
    decreases by 10% after 10 persons
    decreases by 30% after 20 persons
    decreases by 50% after 60 persons
*/
function decreasePrice(nbPersons, nbHours, barId)
{
  for(var i=0; i<bars.length; i++)
  {
    if(bars[i].id == barId)
    {
      var pricePerPerson = bars[i].pricePerPerson;
      var pricePerHour = bars[i].pricePerHour;
    }
  }
  if(nbPersons > 10 && nbPersons <= 20)
    return pricePerPerson* 0.9 * nbPersons + pricePerHour * nbHours;
  else if(nbPersons > 20 && nbPersons <=60)
    return pricePerPerson* 0.7 * nbPersons + pricePerHour * nbHours;
  else if(nbPersons > 60)
    return pricePerPerson* 0.5 * nbPersons + pricePerHour * nbHours;
}

/***** STEP 3 *****/
/* There is a 30% commission on the booking price to cover the costs.
The commission is split like this:

    insurance: half of commission
    the Treasury: 1€ by person
    Privateaser: the rest
*/

/***** STEP 4 *****/
/* The deductible

The booker is charged an additional 1€/person when he chooses the deductible reduction option.

The additional charge goes to Privateaser, not to the bar.
*/

function calculateCommission(price, nbPersons, deductibleReduction)
{
  var commission = {};
  if(deductibleReduction == true)
    price = price - nbPersons;
  var commissionTotal = price * 0.3;
  commission.insurance = commissionTotal / 2;
  commission.treasury = nbPersons;
  commission.privateaser = commissionTotal - commission.insurance - commission.treasury;
  if(deductibleReduction == true)
    commission.privateaser = commission.privateaser + nbPersons;
  return commission;
}

function changeCommissionForEachEvent(events)
{
  for(var i=0; i<events.length; i++)
  {
    var nbPersons = events[i].persons;
    var deductibleReduction = events[i].options.deductibleReduction;
    var price = events[i].price;
    if(deductibleReduction == true)
      {
        price = price + nbPersons;
        events[i].price = price;
      }
    var commission = calculateCommission(price, nbPersons, deductibleReduction);
    events[i].commission.insurance = commission.insurance;
    events[i].commission.treasury = commission.treasury;
    events[i].commission.privateaser = commission.privateaser;
  }
}

changeCommissionForEachEvent(events);

console.log(bars);
console.log(events);
console.log(actors);
