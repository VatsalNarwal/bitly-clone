function home() {
  window.open("/", "_self");
}

$(document).ready(function () {
  $("#copyBtn").click(function () {
    var text = $("#discountCode").get(0);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand("copy");
  });
});
