<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="--min-height: 100px;">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/tab1" text="Back"></ion-back-button>
        </ion-buttons>
        <ion-title>
          <ion-text></ion-text>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row class="ion-padding">
          <ion-col size="12" v-if="episode">
            <!-- Episode Thumbnail -->
            <ion-img :src="episode.img" class="ion-margin-bottom"></ion-img>

            <!-- Episode Info Card -->
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ episode.title }}</ion-card-title>
                <ion-card-subtitle>
                  Series: {{ episode.series_title }} | Season {{ episode.season_number }}
                </ion-card-subtitle>
              </ion-card-header>

              <!-- Video Player -->
              <ion-card-content>
                <video v-if="episode.file_path" :src="episode.file_path" class="ion-margin-top" controls
                  preload="metadata" playsinline controlsList="nodownload" @contextmenu.prevent
                  style="width: 100%; border-radius: 8px">
                  Your browser does not support the video tag.
                </video>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" v-else class="ion-text-center">
            <ion-spinner name="crescent" color="primary"></ion-spinner>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonCardHeader,
  IonCardSubtitle, IonCardTitle,
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonGrid, IonText,
  IonRow, IonButtons, IonBackButton,
  IonCol,
  IonCard,
  IonCardContent,
  IonImg,
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { API_URL } from '../utils/auth';

const route = useRoute();
const episode = ref<any>(null);

async function fetchEpisode() {
  const { data } = await axios.get(`${API_URL}/episodes/${route.params.episode}`);

  episode.value = {
    ...data.episode,
    seriesTitle: data.series_title,
    seasonNo: data.season_no
  };
}

onMounted(fetchEpisode);
</script>
