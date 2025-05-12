<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title heading="profile">Profile Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Profile Settings</ion-title>
        </ion-toolbar>
      </ion-header>

      <ProfilePage name="Tab 3 page" />

      <!-- <DarkMode /> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ProfilePage from '@/views/ProfilePage.vue';
// import DarkMode from '@/components/DarkMode.vue';
</script>
