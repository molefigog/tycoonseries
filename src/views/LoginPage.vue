<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Login</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding">
            <IonInput v-model="email" type="email" placeholder="Email" />
            <IonInput v-model="password" type="password" placeholder="Password" />
            <IonButton expand="block" @click="handleLogin">Login</IonButton>

            <IonToast :is-open="showToast" :message="toastMessage" duration="2000" @didDismiss="showToast = false" />
        </IonContent>
    </IonPage>
</template>

<script lang="ts" setup>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonToast,
} from '@ionic/vue';
import { ref } from 'vue';
import { login } from '@/utils/auth';

const email = ref('');
const password = ref('');
const showToast = ref(false);
const toastMessage = ref('');

const handleLogin = async () => {
    const result = await login(email.value, password.value);
    if (result.success) {
        toastMessage.value = 'Login successful!';
        // You can also route to home here
        // router.push('/home');
    } else {
        toastMessage.value = result.message;
    }
    showToast.value = true;
};
</script>