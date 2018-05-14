
function questionMarks() {
    console.time();
    let inVal = document.getElementById("textInput").value;
      let t = 0;
      let q = 0;
      let trues = 0;
      let bool = false;
      for(var i=0; i < inVal.length; i++) {
          if ($.isNumeric(inVal[i])) {
            t = Number.parseInt(inVal[i]) +t;
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
      var timeCount = console.timeEnd();
      console.log("string: " +inVal+ "t/f="+bool);
      };


  