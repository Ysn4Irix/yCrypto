const vue = new Vue({
  el: "#decryptApp",
  data: {
    encMessage: "",
    secret: "",
    errorVisible: false,
    decryptedVisible: false,
    loaderVisible: false,
    decrypted: null,
  },
  methods: {
    async decryptData() {
      this.error = "";
      this.errorVisible = false;
      this.loaderVisible = true;
      const response = await fetch("/api/dec", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          encMessage: this.encMessage,
          secret: this.secret,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        this.errorVisible = false;
        this.decryptedVisible = true;
        this.loaderVisible = false;

        this.decrypted = result.decryptedMessage;
      } else if (response.status === 429) {
        this.error =
          "You are sending too many requests. Try again in 60 seconds.";
        this.errorVisible = true;
        this.loaderVisible = false;
        this.decryptedVisible = false;
      } else {
        const result = await response.json();
        this.errorVisible = true;
        this.loaderVisible = false;
        this.decryptedVisible = false;
        this.error = result.message;
      }
    },
  },
});
