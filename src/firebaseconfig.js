// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
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

export { db }; // Export db variable

// Function to create multiple documents with dummy data
async function createDummyDocuments(collectionPath, numberOfDocuments) {
    for (let i = 0; i < numberOfDocuments; i++) {
        const newDocId = `ReadTirta${(i + 2).toString().padStart(2, '0')}`; // Generate a new document ID
        const docRef = doc(db, collectionPath, newDocId);

        // Generate random values
        const randomAngkaMeteran = getRandomNumber(9000000, 9999999);
        const randomWaktuPengambilanCitra = getRandomDate(new Date(2025, 0, 1), new Date(2025, 11, 31)).toISOString();

        // Function to generate a random number between min (inclusive) and max (exclusive)
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        // Function to generate a random date between start date and end date
        function getRandomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }

        // Log the random values for debugging
        console.log(`Document ID: ${newDocId}`);
        console.log(`AngkaMeteran: ${randomAngkaMeteran}`);
        console.log(`WaktuPengambilanCitra: ${randomWaktuPengambilanCitra}`);

        const data = {
            AngkaMeteran: randomAngkaMeteran, // Randomized Angka Meteran
            CitraMeteran: `example${i}.jpg`,
            Id: i + 2,
            Perangkat: `meteran${(i + 2).toString().padStart(2, '0')}`,
            WaktuPengambilanCitra: randomWaktuPengambilanCitra // Randomized Waktu Pengambilan Citra
        };

        try {
            await setDoc(docRef, data);
            console.log(`Document ${newDocId} created successfully!`);
        } catch (error) {
            console.error(`Error creating document ${newDocId}: `, error);
        }
    }
}

// Example usage (uncomment to run)
createDummyDocuments('SmartWaterMeterReader', 150); // Creates X amount of new documents

// Fetch data from Firestore and sort it numerically
import { collection, getDocs } from 'firebase/firestore';

const fetchDataAndSort = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'SmartWaterMeterReader'));
        const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sort data based on numerical ID
        const sortedData = dataList.sort((a, b) => {
            const numA = parseInt(a.id.replace('ReadTirta', ''), 10);
            const numB = parseInt(b.id.replace('ReadTirta', ''), 10);
            return numA - numB;
        });

        console.log(sortedData); // Output sorted data
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};

fetchDataAndSort(); // Call the function to fetch and sort data

//
