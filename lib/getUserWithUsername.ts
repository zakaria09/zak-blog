import { collection, collectionGroup, doc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from './firebase';

export async function getUserWithUsername(username: string) {
    const collectionRef = collection(firestore, 'users');

    const queryRes = await query(collectionRef, where('username', '==', username));
    
    const res = await getDocs(queryRes);

    return new Promise((resolve, reject) => {
        res.forEach(doc => resolve(doc.data()));
    });
}

export async function getUserPosts() {
    const postDoc = collectionGroup(firestore, 'posts');
    const res = await getDocs(postDoc);
    const allPosts: any[] = [];
    
    res.forEach(doc => allPosts.push(doc.data()));

    return new Promise((resolve, reject) => {
        resolve(allPosts);
    })
}