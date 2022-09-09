// TODO: needs to be implemented with validators library / regex insufficient

export const validators = {
  email(value: string) {
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!value) {
      return new Error('E-Mail is required');
    } else if (!value.match(mailFormat)) {
      return new Error('Please enter a valid E-Mail');
    }
    return true;
  },
  password(value: string) {
    if (!value) {
      return new Error('Password is required');
    } else if (value.length < 8 || value.length > 64) {
      return new Error('The password must have between 8 and 64 characters');
    }
    return true;
  },
  passwordConfirm(value: string, password: string) {
    if (value !== password && password) {
      return new Error('The passwords do not match');
    } else if (!password) {
      return new Error('Enter a valid password first');
    }
    return true;
  },
  name(value: string) {
    const nameFormat = /^[a-zA-Z\u00C0-\u00ff]+$/;
    if (!value.match(nameFormat)) {
      return new Error('This name includes forbidden characters');
    }
    return true;
  },
  yearOfBirth(value: number) {
    if (!value) {
      return true;
    } else if (value < 1900 || value > 2050) {
      return new Error('Please choose a valid year of birth');
    }
    return true;
  },
};
