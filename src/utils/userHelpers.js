import User from "../Models/userModel.js"; 

/**
 * @param {string} userId - ID del usuario a buscar.
 * @returns {Promise<User>} - El documento del usuario encontrado.
 */

export const findUserByIdAndCheck = async (userId) => {
    
    // Validar que el ID es proporcionado
    if (!userId) {
        const error = new Error("User ID is required");
        error.statusCode = 400;
        throw error;
    }

    // Buscar el usuario
    const userFound = await User.findById(userId);

    // Si no existe, lanzar un error 404 
    if (!userFound) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    //Devolver el usuario
    return userFound;
}