export const saveIdea = (uid, idea, pitch = null) => {
    try {
        const savedIdeas = JSON.parse(localStorage.getItem(`savedIdeas_${uid}`) || '[]');
        const newIdea = {
            id: Date.now().toString(),
            idea,
            pitch,
            createdAt: new Date().toISOString()
        };
        savedIdeas.push(newIdea);
        localStorage.setItem(`savedIdeas_${uid}`, JSON.stringify(savedIdeas));
        return newIdea.id;
    } catch (error) {
        console.error('Error saving idea:', error);
        throw error;
    }
};

export const getSavedIdeas = (uid) => {
    try {
        return JSON.parse(localStorage.getItem(`savedIdeas_${uid}`) || '[]');
    } catch (error) {
        console.error('Error getting ideas:', error);
        return [];
    }
};

export const deleteIdea = (uid, ideaId) => {
    try {
        const savedIdeas = JSON.parse(localStorage.getItem(`savedIdeas_${uid}`) || '[]');
        const filteredIdeas = savedIdeas.filter(idea => idea.id !== ideaId);
        localStorage.setItem(`savedIdeas_${uid}`, JSON.stringify(filteredIdeas));
        return true;
    } catch (error) {
        console.error('Error deleting idea:', error);
        throw error;
    }
};

export const updateIdeaWithPitch = (uid, ideaId, pitch) => {
    try {
        const savedIdeas = JSON.parse(localStorage.getItem(`savedIdeas_${uid}`) || '[]');
        const updatedIdeas = savedIdeas.map(idea => 
            idea.id === ideaId ? { ...idea, pitch } : idea
        );
        localStorage.setItem(`savedIdeas_${uid}`, JSON.stringify(updatedIdeas));
        return true;
    } catch (error) {
        console.error('Error updating idea with pitch:', error);
        throw error;
    }
};
