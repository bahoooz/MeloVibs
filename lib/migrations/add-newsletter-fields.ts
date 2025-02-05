import connectDb from "@/lib/mongodb";
import User from "@/models/user";

export async function addNewsletterFields() {
  try {
    await connectDb();
    
    // Mettre à jour tous les utilisateurs existants
    const result = await User.updateMany(
      { isSubscribedToNewsletter: { $exists: false } },
      { 
        $set: { 
          isSubscribedToNewsletter: true,
          newsletterUnsubscribeToken: null
        } 
      }
    );

    console.log(`Migration terminée: ${result.modifiedCount} utilisateurs mis à jour`);
    return result;
  } catch (error) {
    console.error("Erreur lors de la migration:", error);
    throw error;
  }
}