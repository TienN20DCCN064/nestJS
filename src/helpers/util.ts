const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPasswordHelper = async (plainPassword: string) => {
    try {
        // Lưu thẳng text password nếu muốn không mã hóa.
        return plainPassword;
    } catch (error) {
        console.log(error);
    }
}

export const comparePasswordHelper = async (plainPassword: string, storedPassword: string) => {
    try {
        if (!storedPassword) return false;

        // Nếu password lưu cũ dạng bcrypt hash còn dùng được
        if (typeof storedPassword === 'string' && storedPassword.startsWith('$2')) {
            return await bcrypt.compare(plainPassword, storedPassword);
        }

        // So sánh thẳng với password đang lưu bình thường
        return plainPassword === storedPassword;
    } catch (error) {
        console.log(error);
        return false;
    }
}
