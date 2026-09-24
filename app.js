(function(){
  var q = new URLSearchParams(window.location.search);
  var provider = document.body.dataset.provider;
  var code = q.get("code");
  var err = q.get("error");
  var errDesc = q.get("error_description");
  var status = document.getElementById("status");
  var headline = document.getElementById("headline");
  var subhead = document.getElementById("subhead");

  if (err){
    headline.textContent = "Authorisation failed";
    subhead.textContent = provider + " returned an error. Start the sign-in again from your terminal.";
    status.className = "status err";
    status.textContent = "✗ " + err + (errDesc ? " — " + errDesc : "");
    return;
  }
  if (code){
    document.getElementById("result").style.display = "block";
    // Values go into readonly inputs via .value — never parsed as HTML.
    document.querySelectorAll("#result input").forEach(function(el){
      el.value = el.id === "fullurl" ? window.location.href : (q.get(el.id) || "(none)");
    });
    headline.textContent = "You're signed in to " + provider;
    subhead.textContent = "Copy the full redirect URL below back into your terminal to finish.";
    status.className = "status ok";
    status.textContent = "✓ Authorisation code received";
    document.querySelectorAll("button[data-copy]").forEach(function(btn){
      btn.addEventListener("click", function(){
        var el = document.getElementById(btn.dataset.copy); el.select();
        navigator.clipboard.writeText(el.value).then(function(){
          btn.textContent = "Copied"; setTimeout(function(){ btn.textContent = "Copy"; }, 1500);
        });
      });
    });
    return;
  }
  // No params: someone visited the page directly.
  status.className = "status";
  status.textContent = "No authorisation code in the URL yet.";
})();
