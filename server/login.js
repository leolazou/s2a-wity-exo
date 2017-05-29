var logins = [
  {
    "id" : "002",
    "un" : "creati",
    "pw" : "wity"
  },
  {
    "id" : "001",
    "un" : "admin",
    "pw" : "itsgettinghotterinAntarctica"
  }
]
// ceci devrait être dans une DB à part. A titre d'exemple on utilise un simple json

function check_login(un, pw) {
  var login = {"un": un.value, "pw": pw.value};
  var state = "denied";
  // if (logins.indexOf(login)>-1) {   // surprisingly, this doesn't work
  for (var i=0; i<logins.length; i++) {
    if (logins[i].un == un.value && logins[i].pw == pw.value) {
      state = "accepted";
      break;
    }
  }
  if(state == "accepted") {
    alert("Welcome back, " + un.value+ " !");
  } else {
    alert("Try again or abandon ...");
  }
}
