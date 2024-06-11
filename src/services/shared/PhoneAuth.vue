<template>
  <div>
    <div id="recaptcha-container"></div>
    <input v-model="phoneNumber" placeholder="Enter phone number" />
    <button @click="sendVerificationCode">Send Code</button>
    <input v-model="verificationCode" placeholder="Enter verification code" />
    <button @click="verifyCode">Verify Code</button>
  </div>
</template>

<script>
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../shared/firebase.js';

export default {
  data() {
    return {
      phoneNumber: '',
      verificationCode: '',
      confirmationResult: null,
      recaptchaVerifier: null,
    };
  },
  methods: {
    initializeRecaptcha() {
      if (!this.recaptchaVerifier) {
        console.log("Initializing reCAPTCHA");
        this.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            console.log("reCAPTCHA solved, callback invoked");
            this.sendVerificationCode();
          }
        });
      }
    },
    isValidPhoneNumber(phoneNumber) {
      const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
      return phoneNumberPattern.test(phoneNumber);
    },
    sendVerificationCode() {
      if (!this.isValidPhoneNumber(this.phoneNumber)) {
        alert("Please enter a valid phone number in E.164 format (e.g., +201234567890)");
        return;
      }

      this.initializeRecaptcha();
      console.log("Sending verification code to:", this.phoneNumber);
      signInWithPhoneNumber(auth, this.phoneNumber, this.recaptchaVerifier)
          .then((confirmationResult) => {
            this.confirmationResult = confirmationResult;
            console.log("SMS sent, confirmationResult received:", confirmationResult);
            alert('SMS sent');
          })
          .catch((error) => {
            console.error("Error during signInWithPhoneNumber:", error);
          });
    },
    verifyCode() {
      if (this.confirmationResult) {
        console.log("Verifying code:", this.verificationCode);
        this.confirmationResult.confirm(this.verificationCode)
            .then((result) => {
              const user = result.user;
              console.log("Verification successful, user:", user);
              user.getIdToken().then((idToken) => {
                console.log("ID token received:", idToken);
                fetch('http://your-laravel-api-url/api/verify-token', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({token: idToken})
                })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("Server response:", data);
                    });
              });
            })
            .catch((error) => {
              console.error("Error during confirmationResult.confirm:", error);
            });
      } else {
        console.error("No confirmation result available");
      }
    }
  },
  mounted() {
    this.initializeRecaptcha();
  }
};
</script>
