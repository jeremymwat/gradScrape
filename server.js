
var request = require('request');
var cheerio = require('cheerio');

  var ourl = 'http://thegradcafe.com/survey/index.php?q=brown&t=a&pp=250&o=&p=';

  /*
  *  http://thegradcafe.com/survey/index.php?q=a*&t=a&o=&pp=250
  *
  *
  *
  */
  var pages = 0;


  // Get number of pages

  request('http://thegradcafe.com/survey/index.php?q=brown&t=a&pp=250&o=&p=1', function(error, response, html){

    if (error)
      console.log(error);
    else {

      var $ = cheerio.load(html);
      var element_array = $('[class^="pagination"]');
      pages = parseInt((element_array[0].children[2].data).split(" ")[2]);
    }

  var school, program, decision, greQ, greV, greW, GPA;
  var id_obj = { idNo : "" , school : "", program : "", decision : "", season : "",
      student_type : "", greV : "", greQ : "", greW : "", greSub : "", GPA : ""};

  var page_index;

  console.log("id,school,program,degree,decision,student_type,GPA,greV,greQ,greW,greSub,season");

  for (page_index = 1; page_index <= pages; page_index++) {

    url = ourl + page_index;
    console.log(url);

    request(url, function(error, response, html){

      if (error)
        console.log(error);
      else {
        //var string_output = ""; //INTERRUPTED!
        var $ = cheerio.load(html);

        if (pages == 1) {
          var pages_test = $('[class^="pagination"]');
          pages = parseInt((pages_test[0].children[2].data).split(" ")[2]);
          console.log(pages);
        }


        var tr_array = $('[class^="row"]');

        // Remove any rows none relevant rows
        tr_array = tr_array.filter(function (rowF) {
          return !('undefined' === typeof(tr_array[rowF].children[2].children[2]) || typeof(tr_array[rowF].children[2].children[0]) === 'undefined');
        });

        var index, len;
        for (index = 0, len = tr_array.length; index < len; ++index) {

          id_obj.idNo = (tr_array[index].attribs.onmouseover).replace(/\D/g,''); // ID, unique ID from gradcafe?

          id_obj.school = tr_array[index].children[0].children[0].data; //University
          id_obj.program = tr_array[index].children[1].children[0].data.substring(0, tr_array[index].children[1].children[0].data.length - 6).replace(",",""); //program etc
          id_obj.decision = tr_array[index].children[2].children[0].children[0].data; //accepted/rejected

          if (typeof(tr_array[index].children[3].children[0]) === 'undefined')
            id_obj.student_type = "";
          else
            id_obj.student_type = tr_array[index].children[3].children[0].data; //type of student

          id_obj.GPA = tr_array[index].children[2].children[2].children[0].children[1].data.substr(2);  // GPA

          var GREs = (tr_array[index].children[2].children[2].children[0].children[4].data).split("/"); // GRE
          id_obj.greV = GREs[0].replace(/\D/g,'');
          id_obj.greQ = GREs[1].replace(/\D/g,'');
          id_obj.greW = GREs[2];

          id_obj.greSub = tr_array[index].children[2].children[2].children[0].children[7].data.substr(2); // GRE subject

          id_obj.season = tr_array[index].children[1].children[0].data.slice(-5).replace(/[()]/g,''); //season, in format F/S + 2 digit year ex S15

          var csvS = id_obj.idNo + ',' + id_obj.school + ',' + id_obj.program + ',' + id_obj.decision + ',' + id_obj.student_type + ',' + id_obj.GPA + ','
            + id_obj.greV + ',' + id_obj.greQ + ',' + id_obj.greW + ',' + id_obj.greSub + ',' + id_obj.season

          //console.log(JSON.stringify(id_obj));

          console.log(csvS);
        }
      }
    })
  }
})
