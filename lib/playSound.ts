export const playSound = (file: string) => {
    const audio = new Audio(file); // Ajustez le chemin selon votre structure
    audio.volume = 0.3; // Réglez le volume (0.0 à 1.0)
    audio.play().catch(error => {
        console.log("Erreur lors de la lecture du son:", error);
    });
}; 