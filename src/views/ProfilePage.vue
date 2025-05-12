<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>{{ heading }}</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding">
            <div style="max-height: 100%; overflow-y: auto">
                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>Hi! {{ name }} user ID {{ id }} </IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonInput v-model="name" label="Name" placeholder="Your name" />
                        <IonInput v-model="email" label="Email" placeholder="Your email" type="email" />
                        <IonInput v-model="tel" label="Tel" placeholder="Your Number" type="text" />
                        <IonInput v-model="password" label="New Password" type="password"
                            placeholder="New password (optional)" />
                        <IonInput v-model="password_confirmation" label="Confirm Password" type="password"
                            placeholder="Confirm password" />



                        <ion-grid>
                            <ion-row class="ion-justify-content-center">

                                <ion-button size="small" @click="updateProfile">
                                    Update
                                    <ion-icon slot="end" :icon="sendOutline"></ion-icon>
                                </ion-button>

                                <ion-button size="small" @click="handleLogout">
                                    Logout
                                    <ion-icon slot="end" :icon="powerOutline"></ion-icon>
                                </ion-button>


                            </ion-row>
                        </ion-grid>


                    </IonCardContent>
                </IonCard>

                <ion-list-header>Payment Info</ion-list-header>
                <ion-list :inset="true">
                    <ion-item>
                        <p>Transaction {{ formatDate(createdAt) }}</p>
                    </ion-item>
                    <ion-item>
                        <p>Expires {{ formatDate(expiresAt) }}</p>
                    </ion-item>
                    <ion-item>
                        <p>Status: {{ hasAccess ? 'Active' : 'Inactive' }}</p>
                    </ion-item>
                    <ion-item>
                        <p>Fee: LSL{{ amount }}</p>
                    </ion-item>
                </ion-list>
            </div>

            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Premium Access</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                    <ul>
                        <li>✔ Unlimited access to content</li>
                        <li>✔ Exclusive downloads</li>
                        <li>✔ Priority support</li>
                    </ul>

                    <IonButton expand="block" :color="hasAccess ? 'success' : 'primary'" :disabled="hasAccess"
                        @click="handlePaymentClick">
                        {{ hasAccess ? 'Paid' : 'Pay' }}
                    </IonButton>
                    <br>
                </IonCardContent>
            </IonCard>
            <ion-list-header>Device Info</ion-list-header>
            <ion-list :inset="true">

                <ion-item>
                    <p>Model: {{ model }}</p>
                </ion-item>
                <ion-item>
                    <p>manufacturer: {{ manufacturer }}</p>
                </ion-item>
            </ion-list>
            <br>
            <hr>
            <!-- Payment Modal -->
            <IonModal :is-open="showPaymentModal" @didDismiss="showPaymentModal = false">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Complete Payment</IonTitle>
                        <IonButtons slot="end">
                            <IonButton @click="showPaymentModal = false">Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent class="ion-padding">
                    <form @submit.prevent="handleSubscribe" @reset.prevent="resetForm">
                        <!-- Mpesa Number Input -->
                        <IonItem>
                            <IonLabel position="floating">Mpesa Number</IonLabel>
                            <IonInput v-model="mpesaNumber" required type="tel" />
                        </IonItem>

                        <!-- Hidden Fields -->
                        <input v-model="id" type="hidden" />
                        <input v-model="model" type="hidden" />
                        <input v-model="amount" type="hidden" />

                        <!-- Buttons -->
                        <IonGrid>
                            <IonRow class="ion-justify-content-end">
                                <IonCol size="auto">
                                    <IonButton type="submit" :disabled="submitting">
                                        <template v-if="submitting">Loading...</template>
                                        <template v-else>Buy LSL {{ amount }}</template>
                                    </IonButton>
                                </IonCol>

                                <IonCol size="auto">
                                    <IonButton type="reset" color="warning" fill="clear">Reset</IonButton>
                                </IonCol>

                                <IonCol size="auto">
                                    <IonButton fill="clear" color="medium" @click="showBuyDialog = false">x</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </form>
                </IonContent>
            </IonModal>
            <IonToast :is-open="showToast" :message="toastMessage" duration="2000" @didDismiss="showToast = false" />

        </IonContent>
    </IonPage>
</template>

<script lang="ts" setup>
import {
    IonPage, IonModal,
    IonHeader, IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton, IonButtons,
    IonToast,
    IonCard, loadingController,
    IonCardHeader,
    IonCardSubtitle, IonCardTitle, alertController,
    IonCardContent, IonIcon, IonCol, IonGrid, IonRow
} from '@ionic/vue';
import { powerOutline, sendOutline } from 'ionicons/icons';
import { ref, Ref, onMounted } from 'vue';
import { logout, getProfile, updateProfile as updateProfileRequest, subscribe } from '@/utils/auth';
import { useRouter } from 'vue-router';
import { Device } from '@capacitor/device';

const heading = ref('');
const name = ref('');
const email = ref('');
const tel = ref('');
const id = ref('');
const password = ref('');
const password_confirmation = ref('');
const showToast = ref(false);
const submitting = ref(false);
const showBuyDialog = ref(false);
const toastMessage = ref('');
const model = ref('Please wait...');
const manufacturer = ref('Please wait...');
const router = useRouter();
const hasAccess = ref(false);
const expiresAt = ref(null);
const createdAt = ref(null);
const amount = ref('');
const mpesaNumber: Ref<string> = ref('');



const showPaymentModal = ref(false);

const handlePaymentClick = () => {
    if (!hasAccess.value) {
        showPaymentModal.value = true;
    }
};
const updateProfile = async () => {
    const data = {
        name: name.value,
        email: email.value,
        tel: tel.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
    };

    const response = await updateProfileRequest(data);

    if (response.success) {
        toastMessage.value = 'Profile updated successfully!';
        password.value = '';
        password_confirmation.value = '';
    } else {
        toastMessage.value = response.message || 'Something went wrong.';
    }

    showToast.value = true;
};
const formatDate = (dateStr: string | number | Date) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString();
};
const handleLogout = async () => {
    await logout();
    router.push('/login');
};

async function handleSubscribe() {
    const userId = Number(id.value);

    if (!userId) {
        toastMessage.value = 'User ID is required';
        showToast.value = true;
        return;
    }

    if (!mpesaNumber.value) {
        toastMessage.value = 'Mpesa number is required';
        showToast.value = true;
        return;
    }

    if (!amount.value) {
        toastMessage.value = 'Amount is required';
        showToast.value = true;
        return;
    }

    const loading = await loadingController.create({
        message: 'Processing...',
        spinner: 'crescent',
    });
    await loading.present();

    try {
        await subscribe(model.value, userId, mpesaNumber.value, amount.value);
        await loading.dismiss();

        toastMessage.value = 'Payment submitted successfully!';
        showToast.value = true;

        showPaymentModal.value = false;
        resetForm();
        router.push('/tabs/tab1');
    } catch (error) {
        await loading.dismiss();

        if (error instanceof Error) {
            console.error(error);
            toastMessage.value = error.message || 'Payment Failed!';
            showToast.value = true;
            presentAlert();
        } else {
            toastMessage.value = 'An unexpected error occurred';
            showToast.value = true;
        }
    }
}

function resetForm() {
    mpesaNumber.value = '';
}

const presentAlert = async () => {
    const alert = await alertController.create({
        header: 'Payment Failed',
        subHeader: 'Contact Tycoon Series',
        message: 'Unable to complete your request.',
        buttons: ['OK'],
    });

    await alert.present();
};

onMounted(async () => {
    const info = await Device.getInfo();
    model.value = info.model || 'Unknown';
    manufacturer.value = info.manufacturer || 'Unknown';
    const response = await getProfile();
    if (response.success) {
        const user = response.user;
        name.value = user.name;
        email.value = user.email;
        tel.value = user.tel;
        id.value = user.id;
        heading.value = `Welcome back, ${user.name}`;

        hasAccess.value = user.has_access;
        expiresAt.value = user.expires_at;
        createdAt.value = user.created_at;
        amount.value = user.amount;
    } else {
        toastMessage.value = response.message;
        showToast.value = true;
    }
});

</script>
<style scoped>
.scroll-container {
    max-height: 100%;
    overflow-y: auto;
}
</style>