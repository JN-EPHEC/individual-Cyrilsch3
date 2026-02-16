import User from '../models/User.js';

export const userService = {
    async getActiveUsers() {
        return await User.findAll({ where: { isArchived: false } });
    },

    async archiveUser(id: string) {
        const user = await User.findByPk(id);
        if (!user) return null;
        return await user.update({ isArchived: true });
    },

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