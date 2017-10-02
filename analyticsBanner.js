(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
window.addEventListener("load", function() {
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#edeff5",
        "text": "#838391"
      },
      "button": {
        "background": "#4b81e8"
      }
    },
    "position": "top",
    "type": "opt-out",
    "content": {
      "message": "Ce site internet utilise les cookies de Google Analytics à des fins d'analyse de trafic.",
      "dismiss": "Ok!",
      "deny": "Je refuse!",
      "link": "Plus d'infos..."
    },
    onInitialise: function(status) {
      var type = this.options.type;
      var didConsent = this.hasConsented();
      if (type == 'opt-in' && didConsent) {
        // enable cookies
        window['ga-disable-UA-78627361-1'] = false;
        console.log(window['ga-disable-UA-78627361-1']);
        ga('create', 'UA-78627361-1', 'auto');
        ga('send', 'pageview');
      }
      if (type == 'opt-out' && !didConsent) {
        // disable cookies
        window['ga-disable-UA-78627361-1'] = true;
        console.log(window['ga-disable-UA-78627361-1']);
        ga('create', 'UA-78627361-1', 'auto');
        ga('send', 'pageview');
      }
    },

    onStatusChange: function(status, chosenBefore) {
      var type = this.options.type;
      var didConsent = this.hasConsented();
      if (type == 'opt-in' && didConsent) {
        // enable cookies
        window['ga-disable-UA-78627361-1'] = false;
        console.log(window['ga-disable-UA-78627361-1']);
        ga('create', 'UA-78627361-1', 'auto');
        ga('send', 'pageview');
      }
      if (type == 'opt-out' && !didConsent) {
        // disable cookies
        window['ga-disable-UA-78627361-1'] = true;
        console.log(window['ga-disable-UA-78627361-1']);
        ga('create', 'UA-78627361-1', 'auto');
        ga('send', 'pageview');
      }
    },

    onRevokeChoice: function() {
      var type = this.options.type;
      if (type == 'opt-in') {
        // disable cookies
        window['ga-disable-UA-78627361-1'] = true;
        console.log(window['ga-disable-UA-78627361-1']);
        ga('create', 'UA-78627361-1', 'auto');
        ga('send', 'pageview');
      }
      if (type == 'opt-out') {
        // enable cookies
        window['ga-disable-UA-78627361-1'] = false;
        console.log(window['ga-disable-UA-78627361-1']);
        ga('create', 'UA-78627361-1', 'auto');
        ga('send', 'pageview');
      }
    }
  })
});
