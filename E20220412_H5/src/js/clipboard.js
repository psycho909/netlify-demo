function copyLink(target,copy) {
  var clipboard = new ClipboardJS(target, {
      text: function () {
          return copy;
      }
  });
  clipboard.on('success', function (e) {
      $.gbox.open('已複製連結');
      clipboard.destroy();
  });
}