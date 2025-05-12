<template>
  <IonPage>
    <IonContent fullscreen class="landing-content">
      <!-- Abstract background -->
      <div class="background-abstract"></div>

      <!-- Centered content -->
      <div class="content-wrapper">
        <ion-img src="/tycoon-series.png" class="logo"></ion-img>
        <h3 class="landing-title animate-text">Rea u amohela ho selikalikoe sa lits’oants’iso-pono tsa Sesotho</h3>

        <p class="landing-subtitle">Welcome to Sesotho Films Leading the world of Sesotho films</p>

        <ion-button color="primary" expand="block" class="cta-button" @click="scrollTo('contact')">
          Contact Us
        </ion-button>
      </div>



      <!-- Contact Section -->
      <div id="contact" class="section">
        <h2>Contact</h2>
        <ion-item>
          <ion-icon :icon="mailOutline" slot="start" />
          <ion-label>tycoonseries@gmail.com</ion-label>
        </ion-item>
        <ion-item>

          <ion-icon aria-hidden="true" :icon="callOutline" slot="start" />
          <ion-label>+266 58184033</ion-label>
        </ion-item>
      </div>

      <!-- Social Section -->
      <div id="social" class="section">
        <h2>Follow Us</h2>
        <ion-buttons class="social-icons text-primary">
          <ion-button href="https://www.facebook.com/tycoonseriesfilmacademy.ls/" target="_blank">
            <ion-icon aria-hidden="true" :icon="logoFacebook" />
          </ion-button>
          <ion-button href="https://twitter.com" target="_blank">
            <ion-icon aria-hidden="true" :icon="logoX" />
          </ion-button>
          <ion-button href="https://instagram.com" target="_blank">
            <ion-icon aria-hidden="true" :icon="logoInstagram" />
          </ion-button>
        </ion-buttons>
      </div>

      <ion-list-header></ion-list-header>
      <ion-list :inset="true">
        <ion-tab-bar slot="bottom">
          <ion-tab-button @click="scrollTo('top')">
            <ion-icon aria-hidden="true" :icon="homeOutline" />
            <ion-label>Home</ion-label>
          </ion-tab-button>
          <ion-tab-button @click="scrollTo('contact')">
            <ion-icon aria-hidden="true" :icon="callOutline" />
            <ion-label>Contact</ion-label>
          </ion-tab-button>
          <ion-tab-button @click="scrollTo('info')">
            <ion-icon aria-hidden="true" :icon="informationCircleOutline" />
            <ion-label>Info</ion-label>
          </ion-tab-button>
          <ion-tab-button @click="scrollTo('social')">
            <ion-icon aria-hidden="true" :icon="shareSocialOutline" />
            <ion-label>Social</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-list>
    </IonContent>

    <!-- Bottom Nav -->
    <ion-footer>
      <ion-tab-bar slot="bottom">
        <ion-tab-button @click="scrollTo('top')">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button @click="scrollTo('contact')">
          <ion-icon aria-hidden="true" :icon="callOutline" />
          <ion-label>Contact</ion-label>
        </ion-tab-button>
        <ion-tab-button @click="scrollTo('info')">
          <ion-icon aria-hidden="true" :icon="informationCircleOutline" />
          <ion-label>Info</ion-label>
        </ion-tab-button>
        <ion-tab-button @click="scrollTo('social')">
          <ion-icon aria-hidden="true" :icon="shareSocialOutline" />
          <ion-label>Social</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-footer>
  </IonPage>
</template>

<script setup>

import { IonPage, IonContent, IonListHeader, IonList, IonIcon, IonTabBar, IonTabButton, IonLabel, IonButton, IonButtons, IonImg, IonItem, IonFooter } from '@ionic/vue';
import { logoFacebook, logoX, logoInstagram, shareSocialOutline, informationCircleOutline, homeOutline, mailOutline, callOutline } from 'ionicons/icons';
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
.landing-content {
  position: relative;
  text-align: center;
  --background: transparent;
}

.background-abstract {
  --background: none;
  background-image: url('/bg.jpg');
  /* or your image path */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}

.content-wrapper {
  z-index: 1;
  padding: 20px;
  max-width: 500px;
  margin: auto;
  padding-top: 60px;
}

.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  /* border: 4px solid white; */
  margin: 0 auto 20px auto;
  display: block;
}

.landing-title {
  font-size: 28px;
  font-weight: bold;
  /* color: #222; */
  margin-bottom: 10px;
  animation: fadeIn 5s ease-in-out infinite alternate;
}

.landing-subtitle {
  font-size: 16px;
  /* color: #444; */
  margin-bottom: 30px;
}

.cta-button {
  font-size: 16px;
}

.section {
  z-index: 1;
  /* background: white; */
  padding: 30px 20px;
  margin-top: 40px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section h2 {
  margin-bottom: 10px;
  color: #222;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }

  100% {
    opacity: 50;
    transform: translateX(0);
  }
}
</style>
