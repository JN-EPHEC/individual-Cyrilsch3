import User from '../models/User.js';

export const userService = {
    // Récupérer uniquement les membres actifs (non archivés)
    async getActiveUsers() {
        return await User.findAll({ where: { isArchived: false } });
    },

    // Logique pour archiver
    async archiveUser(id: string) {
        const user = await User.findByPk(id);
        if (!user) return null;
        return await user.update({ isArchived: true });
    },

    // Logique pour changer le tag avec validation (Point 6.2.4)
    async updateTag(id: string, newTag: string) {
        const user = await User.findByPk(id);
        if (!user) return null;
        
        const authorizedTags = ['MEMBRE', 'ADMIN', 'VIP', 'INVITÉ'];
        if (!authorizedTags.includes(newTag.toUpperCase())) {
            throw new Error("Tag non autorisé");
        }
        
        return await user.update({ tag: newTag.toUpperCase() });
    }
};