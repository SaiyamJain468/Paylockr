import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    return {
      success: true,
      user: {
        id: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        username: result.user.email?.split('@')[0],
        phone: result.user.phoneNumber || '',
        panCard: ''
      }
    };
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
