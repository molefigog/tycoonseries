<template>
  <IonPage>
    <br>
    <br>
    <hr>
    <IonContent fullscreen class="landing-content">

      <!-- Series Dropdown -->
      <!-- <ion-item>
        <ion-label>Select Series</ion-label>
        <ion-select v-model="selectedSeriesId" interface="popover">
          <ion-select-option v-for="series in seriesList" :key="series.id" :value="series.id">
            {{ series.title }}
          </ion-select-option>
        </ion-select>
      </ion-item> -->

      <div class="background-abstract"></div>

      <!-- Centered content -->
      <div class="content-wrapper">
        <!-- <ion-img src="/tycoon-series.png" style="width: 250px; height: 250px;" class="logo"></ion-img> -->
        <ion-label>Select Series</ion-label>
        <ion-select v-model="selectedSeriesId" interface="popover">
          <ion-select-option v-for="series in seriesList" :key="series.id" :value="series.id">
            {{ series.title }}
          </ion-select-option>
        </ion-select>
      </div>

      <!-- Seasons Accordion -->
      <ion-accordion-group v-model="openSeasonId">
        <ion-accordion v-for="season in filteredSeasons" :key="season.id" :value="season.id">
          <ion-item slot="header" class="gee">
            <ion-label>
              {{ currentSeries?.title }} – Season {{ season.season_no }}
            </ion-label>
          </ion-item>

          <div slot="content" class="ion-padding">
            <ion-grid>
              <ion-row>
                <ion-col size="6" size-md="2" v-for="episode in season.episodes" :key="episode.id">
                  <ion-card @click="goToEpisode(episode)" class="clickable-card">
                    <ion-img :src="episode.img" />
                    <ion-card-content class="ion-text-center">
                      <small class="text-muted">{{ episode.title }}</small>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>
        </ion-accordion>

      </ion-accordion-group>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonAccordionGroup,
  IonAccordion,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonImg,
} from '@ionic/vue';
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { API_URL } from '@/utils/auth';
const router = useRouter();

const openSeasonId = ref(null);
const seriesList = ref([]);
const selectedSeriesId = ref(null);
const search = ref('');

async function fetchSeriesData() {
  const { data } = await axios.get(`${API_URL}/episodes`);
  if (data.series) {
    seriesList.value = data.series;
    if (seriesList.value.length > 0) {
      selectedSeriesId.value = seriesList.value[0].id;
    }
  } else {
    seriesList.value = [];
  }
}

const currentSeries = computed(() =>
  seriesList.value.find(s => s.id === selectedSeriesId.value) || null
);

const filteredSeasons = computed(() => {
  if (!currentSeries.value) return [];
  return currentSeries.value.seasons.map(season => {
    const filteredEpisodes = season.episodes.filter(e =>
      e.title.toLowerCase().includes(search.value.toLowerCase())
    );
    return {
      ...season,
      episodes: filteredEpisodes
    };
  });
});

function goToEpisode(episode) {
  router.push({
    name: 'episode-show',
    params: { episode: episode.id }
  });
}

// function handleAccordionToggle(seasonId) {
//   openSeasonId.value = openSeasonId.value === seasonId ? null : seasonId;
//   sessionStorage.setItem('openSeasonId', openSeasonId.value ?? '');
// }

watch(selectedSeriesId, newVal => {
  sessionStorage.setItem('selectedSeriesId', newVal ?? '');
});

onMounted(async () => {
  await fetchSeriesData();
  const savedSeriesId = sessionStorage.getItem('selectedSeriesId');
  if (savedSeriesId && seriesList.value.some(s => s.id === parseInt(savedSeriesId))) {
    selectedSeriesId.value = parseInt(savedSeriesId);
  }
  const savedSeasonId = sessionStorage.getItem('openSeasonId');
  if (savedSeasonId) {
    openSeasonId.value = parseInt(savedSeasonId);
  }
});
</script>

<style scoped>
.gee {
  background: rgba(88, 107, 177, 0.432);
}

.clickable-card {
  cursor: pointer;
}

.landing-content {
  position: relative;
  text-align: center;
  --background: transparent;
}

.content-wrapper {
  z-index: 1;
  padding: 20px;
  max-width: 500px;
  margin: auto;
  padding-top: 60px;
}

.text-muted {
  color: gray;
  font-size: 13px;
}
</style>