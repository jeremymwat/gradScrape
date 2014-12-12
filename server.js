
var request = require('request');
var cheerio = require('cheerio');


  // The URL we will scrape from - in our example Anchorman 2.

  var url = 'http://thegradcafe.com/survey/index.php?q=brown';
  //var json_array;
  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html

    var school, program, decision, greQ, greV, greW, GPA;
    var json = { school : "", program : "", decision : "", greV : "", greQ : "", greW : "", GPA : ""};

  request(url, function(error, response, html){

    // First we'll check to make sure no errors occurred when making the request
    console.log(error);
    if(!error){
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

      var $ = cheerio.load(html);
      // Finally, we'll define the variables we're going to capture
      var tr_array = $('[class^="row"]');
      //var test = $.getElementByClassName('[class^="row"]');
    //  console.log(tr_array.children('td.instcol').text());
      console.log(tr_array[0].children[1]);
    //  tr_array.forEach


    //  $('table.results').each(function(i,element){
    //    var results_table = $(this).children().next();
    //    console.log(results_table('').text());
    //  });


    }
  })
