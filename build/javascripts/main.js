var pieWidth = 400;
var pieLength = 400;
var pieRadius = 200;
var pepperoniSrc = '/images/pepperoni_small.png';

function Pizza() {
  this.hits = 0;
  this.total = 0;

  // methods
  this.addPepperoni = addPepperoni;
  this.inPie = inPie;

  function addPepperoni() {
    var randX = Math.random()*pieWidth;
    var randY = Math.random()*pieLength;
    this.total++;
    if (this.inPie(randX, randY)) { this.hits++; }

    var pepperoni = '<div class="above-all"><img src='+pepperoniSrc+'></div>';
    $("#pie-container").append(pepperoni);
    var position = $("#pie-container img:last")
    .css('left', randX-10)
    .css('top', randY-10);
  }

  function inPie(x,y) {
    x = x - (pieRadius);
    y = y - (pieRadius);
    if (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(pieRadius, 2))
    return true;
    return false;
  }
};

$(document).ready(function() {
  $('#btn-continue').hide();

  var myPizza = new Pizza();

  var topper = window.setInterval(function() {
    myPizza.addPepperoni();
    $('#counter-total').html("Total: "+myPizza.total);
    $('#counter-hits').html("Hits: "+myPizza.hits);
    $('#counter-approximation').html("Approximate Pi: "+myPizza.hits/myPizza.total*4);
  }, 1);

  // bindings
  $("#btn-pause").click(function() {
    if (topper) { clearInterval(topper); }
    $("#btn-pause").hide();
    $("#btn-continue").show();
  });

  $("#btn-continue").click(function() {
    topper = window.setInterval(function() {
      myPizza.addPepperoni();
      $('#counter-total').html("Total: "+myPizza.total);
      $('#counter-hits').html("Hits: "+myPizza.hits);
      $('#counter-approximation').html("Approximate Pi: "+myPizza.hits/myPizza.total*4);
    }, 10);	
    $("#btn-pause").show();
    $("#btn-continue").hide();
  });

});
