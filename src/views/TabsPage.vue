<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="logoYoutube" />
          <!-- <ion-label>Tab 1</ion-label> -->
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon aria-hidden="true" :icon="informationCircle" />
          <!-- <ion-label>Tab 2</ion-label> -->
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon aria-hidden="true" :icon="personCircleOutline" />
          <!-- <ion-label>Tab 3</ion-label> -->
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { logoYoutube, informationCircle, personCircleOutline } from 'ionicons/icons';
import { LocalNotifications } from '@capacitor/local-notifications';

const requestPermissions = async () => {
  await LocalNotifications.requestPermissions();

};
requestPermissions();
</script>
