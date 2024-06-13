// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtmYftWtIyEua1auOz54Zd1uX99GTiFRQ",
  authDomain: "integrated-tech-project3reader.firebaseapp.com",
  projectId: "integrated-tech-project3reader",
  storageBucket: "integrated-tech-project3reader.appspot.com",
  messagingSenderId: "677368030852",
  appId: "1:677368030852:web:29d014400e07064c08c4d1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Function to create multiple documents with dummy data
async function createDummyDocuments(collectionPath, numberOfDocuments) {
    for (let i = 0; i < numberOfDocuments; i++) {
        const newDocId = `ReadTirta${(i+2).toString().padStart(2, '0')}`; // Generate a new document ID
        const docRef = doc(db, collectionPath, newDocId);
        
        const data = {
            AngkaMeteran: 9900057 + i, // Example data with increment
            CitraMeteran: `example${i}.jpg`,
            Id: i + 2,
            Perangkat: `meteran${(i + 2).toString().padStart(2, '0')}`,
            WaktuPengambilanCitra: `January ${i + 1}, 2025 at 7:00:00 AM UTC+7`
        };

        try {
            await setDoc(docRef, data);
            console.log(`Document ${newDocId} created successfully!`);
        } catch (error) {
            console.error(`Error creating document ${newDocId}: `, error);
        }
    }
}

// Example usage
createDummyDocuments('SmartWaterMeterReader', 35); // Creates 10 new documents