const vue = new Vue({
  el: "#encryptApp",
  data: {
    message: "",
    secret: "",
    errorVisible: false,
    cryptedVisible: false,
    loaderVisible: false,
    crypted: null,
  },
  methods: {
    async encryptData() {
      this.error = "";
      this.errorVisible = false;
      this.loaderVisible = true;
      const response = await fetch("/api/enc", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          message: this.message,
          secret: this.secret,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        this.errorVisible = false;
        this.cryptedVisible = true;
        this.loaderVisible = false;

        this.crypted = result.encryptedMessage;
      } else if (response.status === 429) {
        this.error =
          "You are sending too many requests. Try again in 60 seconds.";
        this.errorVisible = true;
        this.loaderVisible = false;
        this.cryptedVisible = false;
      } else {
        const result = await response.json();
        this.errorVisible = true;
        this.loaderVisible = false;
        this.cryptedVisible = false;
        this.error = result.message;
      }
    },
    async gen_run() {
      const response = await fetch("/api/gen", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();

        this.secret = result.generatedPass;
      } else if (response.status === 429) {
        this.error =
          "You are sending too many requests. Try again in 60 seconds.";
        this.errorVisible = true;
        this.loaderVisible = false;
        this.cryptedVisible = false;
      }
    },
  },
});
