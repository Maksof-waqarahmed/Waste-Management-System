import bcrypt from 'bcryptjs';


// Function to hash a password
const saltRounds = 10;
async function hashPassword(password: string) {
  try {
    return bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw error;
  }
}

// Function to verify a password
async function verifyPassword(password: string, hashedPassword: string) {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw error;
  }
}

export { hashPassword, verifyPassword };