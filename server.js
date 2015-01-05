
var request = require('request');
var cheerio = require('cheerio');

  var listO = new Array();
  var url = 'http://thegradcafe.com/survey/index.php?q=brown';

  /*
  * replace *a* with every letter: http://thegradcafe.com/survey/index.php?q=*a*&t=a&o=&pp=250
  *
  *
  *
  */

  var school, program, decision, greQ, greV, greW, GPA;
  var id_obj = { idNo : "" , school : "", program : "", decision : "", season : "", year : "" ,
      student_type : "", greV : "", greQ : "", greW : "", greSub : "", GPA : ""};

  var pages = 14;
  var page_index;
  for (page_index = 1; index <= pages; page_index++) {


    request(url, function(error, response, html){

      // First we'll check to make sure no errors occurred when making the request
      if (error)
        console.log(error);
      if(!error){
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

        var $ = cheerio.load(html);

        var tr_array = $('[class^="row"]');

        var index, len;
        var a = ["a", "b", "c"];
        for (index = 0, len = a.length; index < len; ++index) {
          console.log(a[index]);
        }
        
          id_obj.school = tr_array[5].children[0].children[0].data; //University
          id_obj.program = tr_array[5].children[1].children[0].data; //program etc
          id_obj.decision = tr_array[5].children[2].children[0].children[0].data; //accepted/rejected
          id_obj.student_type = tr_array[5].children[3].children[0].data; //type of student

          id_obj.GPA = tr_array[5].children[2].children[2].children[0].children[1].data.substr(2);  // GPA

          var GREs = (tr_array[5].children[2].children[2].children[0].children[4].data).split("/"); // GRE
          id_obj.greV = GREs[0];
          id_obj.greQ = GREs[1];
          id_obj.greW = GREs[2];

          id_obj.greSub = tr_array[5].children[2].children[2].children[0].children[7].data.substr(2); // GRE subject, test for ": n/a"
          id_obj.idNo = (tr_array[5].attribs.onmouseover).replace(/\D/g,'');

          listO.push(id_obj);

      }
    })
  }
