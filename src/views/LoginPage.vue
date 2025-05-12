<template>
    <IonPage>
        <IonHeader>
            <IonToolbar style="--min-height: 100px;">
                <IonTitle slot="start">Login</IonTitle>

                <ion-avatar slot="end">
                    <ion-img src="/tycoon-series.png" class="" style="height: 50px; width: 50px;"></ion-img>
                </ion-avatar>
            </IonToolbar>

        </IonHeader>

        <IonContent class="ion-padding background-container">

            <div class="login-content">

                <ion-button expand="block" @click="setOpen(true)">Login</ion-button>
                <ion-button expand="block" @click="setOpen2(true)">Register</ion-button>
            </div>

            <IonToast :is-open="showToast" :message="toastMessage" duration="2000" @didDismiss="showToast = false" />
            <br>
            <ion-modal :is-open="isOpen">
                <ion-header>
                    <ion-toolbar style="--min-height: 100px;">
                        <ion-buttons slot="start">
                            <ion-button @click="setOpen(false)">Close</ion-button>
                        </ion-buttons>
                        <ion-title>Welcome</ion-title>
                        <ion-buttons slot="end">
                            <ion-button :strong="true" @click="handleLogin()">Login</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <ion-item>
                        <ion-input v-model="name" type="text" placeholder="username" />

                    </ion-item>

                    <ion-item>
                        <ion-input v-model="password" type="password" placeholder="Password">
                            <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                        </ion-input>
                    </ion-item>


                    <ion-button :strong="true" @click="handleLogin()">Login</ion-button>

                </ion-content>
            </ion-modal>

            <ion-modal :is-open="isOpen2">
                <ion-header>
                    <ion-toolbar>
                        <ion-buttons slot="start">
                            <ion-button @click="setOpen2(false)">Close</ion-button>
                        </ion-buttons>
                        <ion-title>Welcome</ion-title>
                        <ion-buttons slot="end">
                            <ion-button :strong="true" @click="handleRegister()">Login</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <form @submit="handleSubmit">
                        <ion-item>
                            <ion-input v-model="name" type="text" placeholder="username" />

                        </ion-item>

                        <ion-item>
                            <ion-input v-model="email" type="email" placeholder="username" />

                        </ion-item>

                        <ion-item>
                            <ion-input v-model="password_confirmation" type="password" placeholder="Confim_Password">
                                <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                            </ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-input v-model="password" type="password" placeholder="Password">
                                <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                            </ion-input>
                        </ion-item>
                    </form>
                </ion-content>
            </ion-modal>
            <IonLoading :is-open="isLoading" message="Logging in..." />
        </IonContent>
    </IonPage>
</template>

<script lang="ts" setup>
import {
    IonPage, IonModal,
    IonHeader, IonToolbar,
    IonTitle, IonItem,
    IonContent, IonInputPasswordToggle,
    IonInput, IonAvatar,
    IonButton, IonLoading,
    IonToast, IonButtons, IonImg
} from '@ionic/vue';
import { ref } from 'vue';
import { login, register } from '@/utils/auth';
import { useRouter } from 'vue-router';
import { initializeFirebase } from '@/firebase/init';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const showToast = ref(false);
const toastMessage = ref('');
const isOpen = ref(false);
const isOpen2 = ref(false);
const isLoading = ref(false);
const setOpen = (open: boolean) => (isOpen.value = open);
const setOpen2 = (open: boolean) => (isOpen2.value = open);

const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

};

const handleLogin = async () => {
    isLoading.value = true; // show loading

    const result = await login(name.value, password.value);
    const user = result.user;

    isLoading.value = false;

    if (result.success) {
        toastMessage.value = 'Login successful!';
        isOpen.value = false;
        router.push('/tabs/tab2');
        if (user?.id) {
            await initializeFirebase(user);
        }
    } else {
        toastMessage.value = result.message;
    }

    showToast.value = true;
};


const handleRegister = async () => {
    isLoading.value = true;
    const result = await register(name.value, email.value, password.value, password_confirmation.value);

    isLoading.value = false;
    if (result.success) {
        toastMessage.value = 'Registered successful!';
        isOpen2.value = false;
        router.push('/tabs/tab2');
    } else {
        toastMessage.value = result.message;
    }
    showToast.value = true;
};
</script>

<style scoped>
.dd {
    padding: 0px 0px
}

.background-container {
    --background: none;
    background-image: url('/bg.jpg');
    /* or your image path */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
}

.login-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    height: 80vh;
    background-color: rgba(102, 152, 251, 0.036);
    /* subtle white overlay */
    padding: 2rem;
    border-radius: 16px;
    backdrop-filter: blur(4px);
}

.avatar-img {
    width: 100px;
    height: 100px;

}
</style>