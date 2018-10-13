'use strict';

const { nativeImage } = require('electron');

exports = module.exports = ({ ipc, iconPath }) => {
  return () => {
    const icon = nativeImage.createFromPath(iconPath);
    var mutationObserver = new MutationObserver(function(mutations) {
      var el = document.getElementById("toast-container");
      if(el) {
        if (mutations[0].target.id == "aria-live-polite") {
          if (mutations[0].addedNodes.length > 0) {
            var notification = new Notification("Microsoft Teams", {
                body: mutations[0].addedNodes[0].data,
                tag: "teams",
                renotify: true,
                icon: icon.toDataURL()
            });
            notification.onclick = () => {
              ipcRenderer.send('nativeNotificationClick');
            };
          }
        }
      }
    });

    mutationObserver.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  };
};
