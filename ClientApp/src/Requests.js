class Requests {
    constructor() {}

    async post(path, body = {}) {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        }

        return await fetch(path, options).then(res => res.json());
    }

    async get(path) {
        const options = {
            method:'GET',
            headers: {},
        }

        return await fetch(path, options).then(res => res.json());
    }

    async delete(path) {
        const options = {
            method:'DELETE',
            headers: {},
        }

        return await fetch(path, options).then(res => res.json());
    }

    async put(path, body = {}) {
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        }

        return await fetch(path, options).then(res => res.json());
    }

    async getCategories() {
        return await this.get("categories");
    }
    
    async createCategory(title) {
        return await this.post("categories", {Name:title})
    }

    async getItemsByCategoryId(id) {
        if(!id) return [];
        return await this.get(`categories/${id}/items`);
    }
    
    async createItem(categoryId, x, y) {
        return await this.post(`categories/${categoryId}`, {MainText:"New Note",X:x, Y:y})
    }
    
    async moveItem(id, x, y) {
        return await this.put(`items/${id}/position`, {X:x, Y:y});
    }
    
    async bulkDeleteItems(ids) {
        let params = ids.map(i => {return "ids="+i})
        const query = params.join("&");
        return await this.delete(`items?${query}`);
    }
    
    async toggleItem(id, value) {
        return await this.put(`items/${id}/done?value=${value}`);
    }
    
    async deleteItem(id) {
        return await this.delete("items/"+id)
    }
    
    async editItem(id, text) {
        return await this.put(`items/${id}/text?value=${text}`);
    }
}

export default new Requests();