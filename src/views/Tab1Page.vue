<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="--min-height: 100px;">
        <ion-title>Tycoon Series</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Show content if user has access -->
      <div v-if="hasAccess">
        <IndexPage />
      </div>

      <!-- Show pay button if user does NOT have access -->
      <div v-else class="ion-padding"
        style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">


        <ion-list-header>Basic Plan</ion-list-header>
        <ion-list :inset="true">
          <ion-item>
            <p> Unlock premium content</p>
          </ion-item>

        </ion-list>

        <ion-button expand="full" @click="plan"> Pay {{ amount }} To Watch Movies & Series</ion-button>

      </div>

    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList,
  IonListHeader, IonButton
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import IndexPage from '../views/IndexPage.vue';
import { getProfile } from '@/utils/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const hasAccess = ref(false);
const amount = ref('');
const name = ref('');
const toastMessage = ref('');
const showToast = ref(false);


const plan = async () => {
  router.push('/tabs/tab3');
}

onMounted(async () => {
  const response = await getProfile();
  if (response.success) {
    const user = response.user;
    name.value = user.name;
    hasAccess.value = user.has_access;
    amount.value = user.amount;
  } else {
    toastMessage.value = response.message;
    showToast.value = true;
  }
});
</script>
