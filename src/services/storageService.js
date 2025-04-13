export const saveIdea = (idea, pitch = null) => {
    try {
        const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
        const newIdea = {
            id: Date.now().toString(),
            idea,
            pitch,
            createdAt: new Date().toISOString()
        };
        savedIdeas.push(newIdea);
        localStorage.setItem('savedIdeas', JSON.stringify(savedIdeas));
        return newIdea.id;
    } catch (error) {
        console.error('Error saving idea:', error);
        throw error;
    }
};

export const getSavedIdeas = () => {
    try {
        return JSON.parse(localStorage.getItem('savedIdeas') || '[]');
    } catch (error) {
        console.error('Error getting ideas:', error);
        return [];
    }
};

export const deleteIdea = (ideaId) => {
    try {
        const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
        const filteredIdeas = savedIdeas.filter(idea => idea.id !== ideaId);
        localStorage.setItem('savedIdeas', JSON.stringify(filteredIdeas));
        return true;
    } catch (error) {
        console.error('Error deleting idea:', error);
        throw error;
    }
};

export const updateIdeaWithPitch = (ideaId, pitch) => {
    try {
        const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
        const updatedIdeas = savedIdeas.map(idea => 
            idea.id === ideaId ? { ...idea, pitch } : idea
        );
        localStorage.setItem('savedIdeas', JSON.stringify(updatedIdeas));
        return true;
    } catch (error) {
        console.error('Error updating idea with pitch:', error);
        throw error;
    }
};