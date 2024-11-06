import { getDatabase, push, ref, onValue, Database } from 'firebase/database';
import {getAuth} from 'firebase/auth'; 
import {app} from '../firebaseConfig'; 

export const fetchData = (setItems) => {
    const database = getDatabase(app);
    const itemsRef = ref(database); 
    console.log(itemsRef); 
    
        onValue(itemsRef, (snapshot) => {

            const data = snapshot.val();
            console.log("check if there is data?: ",data); 

            const itemsArray =[];
            
            if (data) {
                for (let key in data){
                    itemsArray.push({id:key,...data[key]});
                } 
                setItems(itemsArray); 
                console.log(itemsArray); 
            }else {
                setItems([]); 
            }
        }); 
}; 