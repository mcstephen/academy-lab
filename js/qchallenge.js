
function questionMarks() {
    console.time();
    let inVal = document.getElementById("textInput").value;
    // let inVal = document.getElementById("inputText").innerHTML
      // var inVal = prompt("please enter your SSN and bank account #");
      // let inVal =  "arrb6???4xxbl5???eee5";
      // console.log("lenght of input" + inVal.length);
      // console.log("test cond" + inVal[5]);


      let t = 0;
      let q = 0;
      let trues = 0;
      let bool = false;
      for(var i=0; i < inVal.length; i++) {
          if ($.isNumeric(inVal[i])) {
            t = Number.parseInt(inVal[i]) +t;
            // console.log("current string value :"+inVal[i]);
            } else {
              if (inVal[i] === "?" && t !==0) {
                q++;
              }
            };
            if (t==10 && q==3) {
              trues++;
              q=0;
              t=0;
            } 
      };
     
      if (trues > 0) {
          (bool = true) 
           };
      // return("input val : "+inVal")  ;
      var timeCount = console.timeEnd();
      console.log("string: " +inVal+ "t/f="+bool);
      };


  