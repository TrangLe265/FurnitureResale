import { getDatabase, push, ref, onValue, Database } from 'firebase/database';
import {getAuth} from 'firebase/auth'; 
import {app} from '../firebaseConfig'; 

export const fetchData = (setItems) => {
    const database = getDatabase(app);
    const itemsRef = ref(database); 
    
        onValue(itemsRef, (snapshot) => {

            const data = snapshot.val();
            console.log("check if there is data?: ",data); 
            
            if (data) {
                const itemsArray = Object.values(data); 
                setItems(itemsArray); 
                console.log(itemsArray); 
            }else {
                setItems([]); 
            }
        }); 
}; 