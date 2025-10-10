// utils/validation.ts
export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

export const validatePhone = (phone: string): string => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  if (!phone) return 'Phone number is required';
  if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
  if (phone.replace(/\D/g, '').length < 10) return 'Phone number is too short';
  return '';
};

export const validatePrice = (price: string): string => {
  if (!price) return 'Price is required';
  if (parseFloat(price) < 0) return 'Price cannot be negative';
  if (parseFloat(price) > 10000000) return 'Price is too high';
  return '';
};

export const validateRequired = (value: string, fieldName: string): string => {
  if (!value?.trim()) return `${fieldName} is required`;
  return '';
};