
export function convertCamelToSnake(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(item => convertCamelToSnake(item));
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj: any = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newKey = key.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
                newObj[newKey] = (key === 'createdAt' || key === 'updatedAt') ? obj[key] : convertCamelToSnake(obj[key]);
                if (newKey === 'active' || newKey === 'is_email_confirmed' || newKey === 'is_blocked') {
                    newObj[newKey] = newObj[newKey] === 1 || newObj[newKey] === true ? true : false;
                }
            }
        }
        return newObj;
    }
    return obj;
}

