import { toastController } from '@ionic/vue'

export async function showToast(message: string): Promise<void> {
    const toast = await toastController.create({
        message,
        duration: 2000,
        color: 'primary',
    });

    await toast.present();
}