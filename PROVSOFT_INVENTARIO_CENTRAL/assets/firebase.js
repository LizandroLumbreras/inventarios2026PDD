// Configuración Firebase - completa estos valores desde Firebase Console > Configuración del proyecto > Tus apps
// La región/ubicación de Firestore (nam5) no se agrega aquí; Firebase la resuelve por el proyecto.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'PON_AQUI_API_KEY',
  authDomain: 'inventariopv-643f1.firebaseapp.com',
  projectId: 'inventariopv-643f1',
  storageBucket: 'inventariopv-643f1.firebasestorage.app',
  messagingSenderId: 'PON_AQUI_MESSAGING_SENDER_ID',
  appId: 'PON_AQUI_APP_ID'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
