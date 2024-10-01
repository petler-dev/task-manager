import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA0hopwCrQvN5ce3wrSH9Hdbu2aEHeq0bA",
    authDomain: "task-manager-f0cab.firebaseapp.com",
    projectId: "task-manager-f0cab",
    storageBucket: "task-manager-f0cab.appspot.com",
    messagingSenderId: "168414310351",
    appId: "1:168414310351:web:8d69b4584a7e3ff0652cba"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Получение доступа к базе данных
const database = getDatabase(app);  // Получаем базу данных

export { database };
