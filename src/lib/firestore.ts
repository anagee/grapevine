import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import type { ContentIdea } from './types';

export const saveIdeas = async (trendId: string, trendTitle: string, ideas: ContentIdea[]) => {
  try {
    for (const idea of ideas) {
      await addDoc(collection(db, 'ideas'), {
        trendId,
        trendTitle,
        ...idea,
        createdAt: new Date(),
      });
    }
  } catch (error) {
    console.error('Error saving ideas to Firestore:', error);
    throw error;
  }
};

export const getIdeas = async (trendId: string): Promise<ContentIdea[]> => {
  try {
    const q = query(collection(db, 'ideas'), where('trendId', '==', trendId));
    const querySnapshot = await getDocs(q);
    const ideas: ContentIdea[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      ideas.push({
        platform: data.platform,
        idea: data.idea,
      });
    });
    return ideas;
  } catch (error) {
    console.error('Error getting ideas from Firestore:', error);
    return [];
  }
};
